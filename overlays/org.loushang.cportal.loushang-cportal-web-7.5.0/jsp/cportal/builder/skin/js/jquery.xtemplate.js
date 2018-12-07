(function($){
	$.XTemplate = function(){
	    $.XTemplate.superclass.constructor.apply(this, arguments);
	    var s = this.html;

	    s = ['<tpl>', s, '</tpl>'].join('');

	    var re = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/;

	    var nameRe = /^<tpl\b[^>]*?for="(.*?)"/;
	    var ifRe = /^<tpl\b[^>]*?if="(.*?)"/;
	    var execRe = /^<tpl\b[^>]*?exec="(.*?)"/;
	    var m, id = 0;
	    var tpls = [];

	    while(m = s.match(re)){
	       var m2 = m[0].match(nameRe);
	       var m3 = m[0].match(ifRe);
	       var m4 = m[0].match(execRe);
	       var exp = null, fn = null, exec = null;
	       var name = m2 && m2[1] ? m2[1] : '';
	       if(m3){
	           exp = m3 && m3[1] ? m3[1] : null;
	           if(exp){
	               fn = new Function('values', 'parent', 'xindex', 'xcount', 'with(values){ return '+($.htmlDecode(exp))+'; }');
	           }
	       }
	       if(m4){
	           exp = m4 && m4[1] ? m4[1] : null;
	           if(exp){
	               exec = new Function('values', 'parent', 'xindex', 'xcount', 'with(values){ '+($.htmlDecode(exp))+'; }');
	           }
	       }
	       if(name){
	           switch(name){
	               case '.': name = new Function('values', 'parent', 'with(values){ return values; }'); break;
	               case '..': name = new Function('values', 'parent', 'with(values){ return parent; }'); break;
	               default: name = new Function('values', 'parent', 'with(values){ return '+name+'; }');
	           }
	       }
	       tpls.push({
	            id: id,
	            target: name,
	            exec: exec,
	            test: fn,
	            body: m[1]||''
	        });
	       s = s.replace(m[0], '{xtpl'+ id + '}');
	       ++id;
	    }
	    for(var i = tpls.length-1; i >= 0; --i){
	        this.compileTpl(tpls[i]);
	    }
	    this.master = tpls[tpls.length-1];
	    this.tpls = tpls;
	};
	$.inherit($.XTemplate, $.Template, {
	    // private
	    re : /\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,
	    // private
	    codeRe : /\{\[((?:\\\]|.|\n)*?)\]\}/g,

	    // private
	    applySubTemplate : function(id, values, parent, xindex, xcount){
	        var t = this.tpls[id];
	        if(t.test && !t.test.call(this, values, parent, xindex, xcount)){
	            return '';
	        }
	        if(t.exec && t.exec.call(this, values, parent, xindex, xcount)){
	            return '';
	        }
	        var vs = t.target ? t.target.call(this, values, parent) : values;
	        parent = t.target ? values : parent;
	        if(t.target && $.isArray(vs)){
	            var buf = [];
	            for(var i = 0, len = vs.length; i < len; i++){
	                buf[buf.length] = t.compiled.call(this, vs[i], parent, i+1, len);
	            }
	            return buf.join('');
	        }
	        return t.compiled.call(this, vs, parent, xindex, xcount);
	    },

	    // private
	    compileTpl : function(tpl){
	        var sep = /gecko/.test(navigator.userAgent.toLowerCase()) ? "+" : ",";
	        var fn = function(m, name, format, args, math){
	            if(name.substr(0, 4) == 'xtpl'){
	                return "'"+ sep +'this.applySubTemplate('+name.substr(4)+', values, parent, xindex, xcount)'+sep+"'";
	            }
	            var v;
	            if(name === '.'){
	                v = 'values';
	            }else if(name === '#'){
	                v = 'xindex';
	            }else if(name.indexOf('.') != -1){
	                v = name;
	            }else{
	                v = "values['" + name + "']";
	            }
	            if(math){
	                v = '(' + v + math + ')';
	            }
	            args= ''; format = "("+v+" === undefined ? '' : ";
	            return "'"+ sep + format + v + args + ")"+sep+"'";
	        };
	        var codeFn = function(m, code){
	            return "'"+ sep +'('+code+')'+sep+"'";
	        };

	        var body;
	        // branched to use + in gecko and [].join() in others
	        if(/gecko/.test(navigator.userAgent.toLowerCase())){
	            body = "tpl.compiled = function(values, parent, xindex, xcount){ return '" +
	                   tpl.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn).replace(this.codeRe, codeFn) +
	                    "';};";
	        }else{
	            body = ["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];
	            body.push(tpl.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn).replace(this.codeRe, codeFn));
	            body.push("'].join('');};");
	            body = body.join('');
	        }
	        eval(body);
	        return this;
	    },

	    /**
	     * Returns an HTML fragment of this template with the specified values applied.
	     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
	     * @return {String} The HTML fragment
	     */
	    applyTemplate : function(values){
	        return this.master.compiled.call(this, values, {}, 1, 1);
	    },

	    /**
	     * Compile the template to a function for optimized performance.  Recommended if the template will be used frequently.
	     * @return {Function} The compiled function
	     */
	    compile : function(){return this;}
	});
	/**
	 * Alias for {@link #applyTemplate}
	 * Returns an HTML fragment of this template with the specified values applied.
	 * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
	 * @return {String} The HTML fragment
	 * @method apply
	 */
	$.XTemplate.prototype.apply = $.XTemplate.prototype.applyTemplate;

})(jQuery);
