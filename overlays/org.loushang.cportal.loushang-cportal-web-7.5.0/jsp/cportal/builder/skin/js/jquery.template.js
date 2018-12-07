/**
 * 轻量级html模版工具，用于处理html片段。模版可以使用参数
 * 例如：
 * 
 * <pre><code>
 * var t = new $.Template('<div name="{id}">',
 * 		'<span class="{cls}">{name:trim} {value:ellipsis(10)}</span>', '</div>');
 * 
 * t.append('some-element', {
 * 	id : 'myid',
 * 	cls : 'myclass',
 * 	name : 'foo',
 * 	value : 'bar'
 * });
 * </code></pre>
 * 
 * @class $.Template
 * @constructor
 * @param {String/Array}
 *            html
 */
(function($){
	$.Template = function(html) {
		var a = arguments;
		if ($.isArray(html)) {
			html = html.join("");
		} else if (a.length > 1) {
			var buf = [];
			for ( var i = 0, len = a.length; i < len; i++) {
				if (typeof a[i] == 'object') {
					$.apply(this, a[i]);
				} else {
					buf[buf.length] = a[i];
				}
			}
			html = buf.join('');
		}
		/** @private */
		this.html = html;
		if (this.compiled) {
			this.compile();
		}
	};
	$.Template.prototype = {
		/**
		 * 应用指定参数值生成HTML片段
		 * 
		 * @param {Object}
		 *            values 应用到模版上的参数值. (比如. {foo: 'bar'})
		 * 
		 * @return {String} HTML片段
		 */
		applyTemplate : function(values) {
			if (this.compiled) {
				return this.compiled(values);
			}
			var fn = function(m, name, format, args) {
				return values[name] !== undefined ? values[name] : "";
			};
			return this.html.replace(this.re, fn);
		},

		/**
		 * 设置这个模版使用的html片段
		 * 
		 * @param {String}
		 *            html
		 * @param {Boolean}
		 *            compile (optional) true表示编译这个模版(默认是 undefined)
		 * @return {$.Template} this
		 * @private
		 */
		set : function(html, compile) {
			this.html = html;
			this.compiled = null;
			if (compile) {
				this.compile();
			}
			return this;
		},

		/**
		 * @type RegExp
		 * @property
		 */
		re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,

		/**
		 * 编译模版
		 * 
		 * @return {$.Template} this
		 * @private
		 */
		compile : function() {
			var sep = $.browser.gecko ? "+" : ",";
			var fn = function(m, name, format, args) {
				args = '';
				format = "(values['" + name + "'] == undefined ? '' : ";
				return "'" + sep + format + "values['" + name + "']" + args + ")"
						+ sep + "'";
			};
			var body;
			// branched to use + in gecko and [].join() in others
			if ($.browser.gecko) {
				body = "this.compiled = function(values){ return '"
						+ this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g,
								'\\n').replace(/'/g, "\\'").replace(this.re, fn)
						+ "';};";
			} else {
				body = [ "this.compiled = function(values){ return ['" ];
				body.push(this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g,
						'\\n').replace(/'/g, "\\'").replace(this.re, fn));
				body.push("'].join('');};");
				body = body.join('');
			}
			eval(body);
			return this;
		},

		/**
		 * @private
		 */
		call : function(fnName, value, allValues) {
			return this[fnName](value, allValues);
		},

		/**
		 * 应用指定参数值生成内容，并将生成的内容插入到指定元素中作为给元素的第一个子元素。
		 * 
		 * @param {Mixed}
		 *            el 父元素、生成的新的内容插入到这个元素中
		 * @param {Object}
		 *            values 应用到模版上的参数值. (比如. {foo: 'bar'})
		 * @param {Boolean}
		 *            returnElement (optional)
		 *            true表示返回值是个jQuery对象false表示返回的是HTMLElement对象 (默认是
		 *            undefined)
		 * 
		 * @return {HTMLElement/jQuery} 新节点或是新的jQuery对象
		 */
		insertFirst : function(el, values, returnElement) {
			el = $(el);
			var first = el.children().first(),re;
			el.prepend(this.applyTemplate(values));
			re = first.length==0 ? el.children() : first.prevAll();
			if(returnElement===true) {
				return re;
			} else {
				return re.toArray();
			}
		},

		/**
		 * 应用指定参数值生成内容，并将生成的内容插入到指定元素的前面，作为指定元素的前一个兄弟节点。
		 * 
		 * @param {Mixed}
		 *            el 指定元素，新内容会是这个元素的前一个兄弟节点
		 * @param {Object}
		 *            values 应用到模版上的参数值. (比如. {foo: 'bar'})
		 * @param {Boolean}
		 *            returnElement (optional)
		 *            true表示返回值是个jQuery对象false表示返回的是HTMLElement对象 (默认是
		 *            undefined)
		 * @return {HTMLElement/jQuery} 新节点或是新的jQuery对象
		 */
		insertBefore : function(el, values, returnElement) {
			el = $(el);
			var prev = el.prev(),re;
			el.before(this.applyTemplate(values));
			re = prev.length==0?el.prevUntil():prev.nextUntil(el);
			if(returnElement===true) {
				return re;
			} else {
				return re.toArray();
			}
		},

		/**
		 * 应用指定参数值生成内容，并将生成的内容插入到指定元素后面，作为指定元素的后一个兄弟节点。
		 * 
		 * @param {Mixed}
		 *            el 指定元素，新内容会是这个元素的后一个兄弟节点
		 * @param {Object}
		 *            values 应用到模版上的参数值. (比如. {foo: 'bar'})
		 * @param {Boolean}
		 *            returnElement (optional)
		 *            true表示返回值是个jQuery对象false表示返回的是HTMLElement对象 (默认是
		 *            undefined)
		 * @return {HTMLElement/jQuery} 新节点或是新的jQuery对象
		 */
		insertAfter : function(el, values, returnElement) {
			el = $(el);
			var next = el.next(),re;
			el.after(this.applyTemplate(values));
			re = next.length==0?el.nextUntil():el.nextUntil(next[0]);
			if(returnElement===true) {
				return re;
			} else {
				return re.toArray();
			}
		},

		/**
		 * 应用指定参数值生成内容，并将生成的内容插入到指定元素中作为给元素的最后一个子元素。
		 * 
		 * @param {Mixed}
		 *            el 父元素、生成的新的内容插入到这个元素中
		 * @param {Object}
		 *            values 应用到模版上的参数值. (比如. {foo: 'bar'})
		 * @param {Boolean}
		 *            returnElement (optional)
		 *            true表示返回值是个jQuery对象false表示返回的是HTMLElement对象 (默认是
		 *            undefined)
		 * 
		 * @return {HTMLElement/jQuery} 新节点或是新的jQuery对象
		 */
		append : function(el, values, returnElement) {
			el = $(el);
			var last = el.children().last(),re;
			el.append(this.applyTemplate(values));
			re = last.length==0? el.children() : last.nextUntil();
			if(returnElement===true) {
				return re;
			} else {
				return re.toArray();
			}
		},

		/**
		 * 应用指定参数值生成内容，并将生成的内容覆盖指定元素的innerHTML。
		 * 
		 * @param el
		 *            要换innerHTML的元素
		 * @param {Object}
		 *            values 应用到模版上的参数值. (比如. {foo: 'bar'})
		 * @param {Boolean}
		 *            returnElement (optional)
		 *            true表示返回值是个jQuery对象false表示返回的是HTMLElement对象 (默认是
		 *            undefined)
		 * @return {HTMLElement/jQuery} 新节点或是新的jQuery对象
		 */
		overwrite : function(el, values, returnElement) {
			el = $(el);
			el.html(this.applyTemplate(values));
			return returnElement ? el.children() : el.children().toArray();
		}
	};
	/**
	 * 应用指定参数值生成HTML片段
	 * 
	 * @param {Object}
	 *            values 应用到模版上的参数值. (比如. {foo: 'bar'})
	 * 
	 * @return {String} HTML片段
	 */
	$.Template.prototype.apply = $.Template.prototype.applyTemplate;
})(jQuery);