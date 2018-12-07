
L5={version:'5.0'};(function(){var paths=document.location.pathname.split("/");if(paths[0]==''){L5.webPath="/"+paths[1];}else{L5.webPath="/"+paths[0];}})();if(L5.initObj==null){L5.initObj={};if(L5.loadData==null){L5.loadData={};}}
window["undefined"]=window["undefined"];(function(){var idSeed=0;var ua=navigator.userAgent.toLowerCase();var isStrict=document.compatMode=="CSS1Compat",isOpera=ua.indexOf("opera")>-1,isChrome=ua.indexOf("chrome")>-1,isSafari=!isChrome&&(/webkit|khtml/).test(ua),isSafari3=isSafari&&ua.indexOf('webkit/5')!=-1,isIE=!isOpera&&ua.indexOf("msie")>-1,isIE7=!isOpera&&ua.indexOf("msie 7")>-1,isIE8=!isOpera&&ua.indexOf("msie 8")>-1,isGecko=!isSafari&&!isChrome&&ua.indexOf("gecko")>-1,isGecko3=isGecko&&ua.indexOf("rv:1.9")>-1,isBorderBox=isIE&&!isStrict,isWindows=(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1),isMac=(ua.indexOf("macintosh")!=-1||ua.indexOf("mac os x")!=-1),isAir=(ua.indexOf("adobeair")!=-1),isLinux=(ua.indexOf("linux")!=-1),isSecure=window.location.href.toLowerCase().indexOf("https")===0;if(isIE&&!isIE7){try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}}
L5.isStrict=isStrict;L5.isSecure=isSecure;L5.isReady=false;L5.preventScriptInjection=false;L5.enableGarbageCollector=true;L5.enableListenerCollection=false;L5.SSL_SECURE_URL="javascript:false";L5.BLANK_IMAGE_URL="http:/"+"/loushang.com/s.gif";L5.emptyFn=function(){};L5.isOpera=isOpera;L5.isChrome=isChrome;L5.isSafari=isSafari;L5.isSafari3=isSafari3;L5.isSafari2=isSafari&&!isSafari3;L5.isIE=isIE;L5.isIE6=isIE&&!isIE7&&!isIE8;L5.isIE7=isIE7;L5.isIE8=isIE8;L5.isGecko=isGecko;L5.isGecko2=isGecko&&!isGecko3;L5.isGecko3=isGecko3;L5.isBorderBox=isBorderBox;L5.isLinux=isLinux;L5.isWindows=isWindows;L5.isMac=isMac;L5.isAir=isAir;L5.useShims=((isIE&&!isIE7)||(isMac&&isGecko&&!isGecko3));L5.id=function(el,prefix){return(el=L5.getDom(el)||{}).id=el.id||(prefix||"L5-gen")
+(++idSeed);};L5.removeNode=isIE?function(){var d;return function(n){if(n&&n.tagName!='BODY'){d=d||document.createElement('div');d.appendChild(n);d.innerHTML='';}}}():function(n){if(n&&n.parentNode&&n.tagName!='BODY'){n.parentNode.removeChild(n);}};})();L5.apply=function(o,c,defaults){if(defaults){L5.apply(o,defaults);}
if(o&&c&&typeof c=='object'){for(var p in c){o[p]=c[p];}}
return o;};L5.applyIf=function(o,c){if(o&&c){for(var p in c){if(typeof o[p]=="undefined"){o[p]=c[p];}}}
return o;};L5.urlEncode=function(o){if(!o){return"";}
var buf=[];for(var key in o){var ov=o[key],k=encodeURIComponent(key);var type=typeof ov;if(type=='undefined'){buf.push(k,"=&");}else if(type!="function"&&type!="object"){buf.push(k,"=",encodeURIComponent(ov),"&");}else if(L5.isDate(ov)){var s=L5.encode(ov).replace(/"/g,'');buf.push(k,"=",s,"&");}else if(L5.isArray(ov)){if(ov.length){for(var i=0,len=ov.length;i<len;i++){buf.push(k,"=",encodeURIComponent(ov[i]===undefined?'':ov[i]),"&");}}else{buf.push(k,"=&");}}}
buf.pop();return buf.join("");};L5.urlDecode=function(string,overwrite){if(!string||!string.length){return{};}
var obj={};var pairs=string.split('&');var pair,name,value;for(var i=0,len=pairs.length;i<len;i++){pair=pairs[i].split('=');name=decodeURIComponent(pair[0]);value=decodeURIComponent(pair[1]);if(overwrite!==true){if(typeof obj[name]=="undefined"){obj[name]=value;}else if(typeof obj[name]=="string"){obj[name]=[obj[name]];obj[name].push(value);}else{obj[name].push(value);}}else{obj[name]=value;}}
return obj;};L5.ns=L5.namespace=function(){var a=arguments,o=null,i,j,d,rt;for(i=0;i<a.length;++i){d=a[i].split(".");rt=d[0];eval('if (typeof '+rt+' == "undefined"){'+rt+' = {};} o = '
+rt+';');for(j=1;j<d.length;++j){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}};L5.getDom=function(el){if(!el||!document){return null;}
return el.dom?el.dom:(typeof el=='string'?document.getElementById(el):el);};L5.getDoc=function(){return L5.get(document);};L5.getBody=function(){return L5.get(document.body||document.documentElement);};L5.getCmp=function(id){return L5.ComponentMgr.get(id);};L5.escapeRe=function(s){return s.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1");};L5.callback=function(cb,scope,args,delay){if(typeof cb=="function"){if(delay){cb.defer(delay,scope,args||[]);}else{cb.apply(scope,args||[]);}}};L5.num=function(v,defaultValue){if(typeof v!='number'||isNaN(v)){return defaultValue;}
return v;};L5.destroy=function(){for(var i=0,a=arguments,len=a.length;i<len;i++){var as=a[i];if(as){if(typeof as.destroy=='function'){as.destroy();}else if(as.dom){as.removeAllListeners();as.remove();}}}};L5.each=function(array,fn,scope){if(typeof array.length=="undefined"||typeof array=="string"){array=[array];}
for(var i=0,len=array.length;i<len;i++){if(fn.call(scope||array[i],array[i],i,array)===false){return i;}}};L5.combine=function(){var as=arguments,l=as.length,r=[];for(var i=0;i<l;i++){var a=as[i];if(L5.isArray(a)){r=r.concat(a);}else if(a.length!==undefined&&!a.substr){r=r.concat(Array.prototype.slice.call(a,0));}else{r.push(a);}}
return r;};L5.getScrollBarWidth=function(force){if(!L5.isReady){return 0;}
var scrollWidth=null;if(force===true||scrollWidth===null){var div=L5.getBody().createChild('<div class="l-hide-offsets" style="width:100px;height:50px;overflow:hidden;"><div style="height:200px;"></div></div>'),child=div.child('div',true);var w1=child.offsetWidth;div.setStyle('overflow',(L5.isWebKit||L5.isGecko)?'auto':'scroll');var w2=child.offsetWidth;div.remove();scrollWidth=w1-w2+2;}
return scrollWidth;};L5.type=function(o){if(o===undefined||o===null){return false;}
if(o.htmlElement){return'element';}
var t=typeof o;if(t=='object'&&o.nodeName){switch(o.nodeType){case 1:return'element';case 3:return(/\S/).test(o.nodeValue)?'textnode':'whitespace';}}
if(t=='object'||t=='function'){switch(o.constructor){case Array:return'array';case RegExp:return'regexp';case Date:return'date';}
if(typeof o.length=='number'&&typeof o.item=='function'){return'nodelist';}}
return t;};L5.isDefined=function(v){return typeof v!=='undefined';};L5.isEmpty=function(v,allowBlank){return v===null||v===undefined||(!allowBlank?v==='':false);};L5.value=function(v,defaultValue,allowBlank){return L5.isEmpty(v,allowBlank)?defaultValue:v;};L5.isArray=function(v){return v&&typeof v.length=='number'&&typeof v.splice=='function';};L5.isDate=function(v){return v&&typeof v.getFullYear=='function';};L5.Exception=function(code,message,javaStack){this.code=code;this.message=message;var name;if(javaStack){this.javaStack=javaStack;}};L5.Exception.prototype=new Error();L5.Exception.prototype.toString=function(){return this.message;};L5.ns("L5","L5.util","L5.grid","L5.dd","L5.tree","L5.model","L5.form","L5.menu","L5.state","L5.lib","L5.layout","L5.app","L5.ux");L5.releaseIframe=function(obj){if(obj==null)
obj=document.body;if(L5.fly(obj)){var iframes=L5.fly(obj).query('iframe');if(iframes){for(var i=0;i<iframes.length;i++){if(iframes[i].src){try{iframes[i].src=false;iframes[i].contentWindow.document.write('');L5.removeNode(iframes[i]);delete iframes[i];}catch(e){}}}}}
if(L5.isIE){setTimeout(CollectGarbage,1);setTimeout(CollectGarbage,10);}}
L5.fireEvent=function(control,eventName){var ele;if(typeof control=="string"){ele=document.getElementById(control);}else{ele=control;}
if(document.all)
{eval("ele.fireEvent('on"+eventName+"');");}else
{var e=document.createEvent('HTMLEvents');e.initEvent(eventName,true,true);ele.dispatchEvent(e);}};

L5.extend=function(){var io=function(o){for(var m in o){this[m]=o[m];}};var oc=Object.prototype.constructor;return function(sb,sp,overrides){if(typeof sp=='object'){overrides=sp;sp=sb;sb=overrides.constructor!=oc?overrides.constructor:function(){sp.apply(this,arguments);};}
var spp=sp.prototype;var F=function(){};F.prototype=spp;var sbp=sb.prototype=new F();sbp.constructor=sb;sb.superclass=spp;if(spp.constructor==oc){spp.constructor=sp;}
L5.override(sb,overrides);sb.override=function(o){L5.override(sb,o);};sbp.override=io;return sb;};}();L5.override=function(origclass,overrides){if(overrides){var p=origclass.prototype;for(var method in overrides){p[method]=overrides[method];}
if(L5.isIE&&overrides.toString!=origclass.toString){p.toString=overrides.toString;}}};

L5.applyIf(Array.prototype,{indexOf:function(o){for(var i=0,len=this.length;i<len;i++){if(this[i]==o)
return i;}
return-1;},remove:function(o){var index=this.indexOf(o);if(index!=-1){this.splice(index,1);}
return this;}});

(function(){function xf(format){var args=Array.prototype.slice.call(arguments,1);return format.replace(/\{(\d+)\}/g,function(m,i){return args[i];});}
Date.parseCodes={d:{g:1,c:"d = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},j:{g:1,c:"d = parseInt(results[{0}], 10);\n",s:"(\\d{1,2})"},D:function(){for(var a=[],i=0;i<7;a.push(Date.getShortDayName(i)),++i);return{g:0,c:null,s:"(?:"+a.join("|")+")"}},l:function(){return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"}},N:{g:0,c:null,s:"[1-7]"},S:{g:0,c:null,s:"(?:st|nd|rd|th)"},w:{g:0,c:null,s:"[0-6]"},z:{g:0,c:null,s:"(?:\\d{1,3})"},W:{g:0,c:null,s:"(?:\\d{2})"},F:function(){return{g:1,c:"m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",s:"("+Date.monthNames.join("|")+")"}},M:function(){for(var a=[],i=0;i<12;a.push(Date.getShortMonthName(i)),++i);return L5.applyIf({s:"("+a.join("|")+")"},$f("F"));},m:{g:1,c:"m = parseInt(results[{0}], 10) - 1;\n",s:"(\\d{2})"},n:{g:1,c:"m = parseInt(results[{0}], 10) - 1;\n",s:"(\\d{1,2})"},t:{g:0,c:null,s:"(?:\\d{2})"},L:{g:0,c:null,s:"(?:1|0)"},o:function(){return $f("Y");},Y:{g:1,c:"y = parseInt(results[{0}], 10);\n",s:"(\\d{4})"},y:{g:1,c:"var ty = parseInt(results[{0}], 10);\n"
+"y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"},a:{g:1,c:"if (results[{0}] == 'am') {\n"+"if (h == 12) { h = 0; }\n"
+"} else { if (h < 12) { h += 12; }}",s:"(am|pm)"},A:{g:1,c:"if (results[{0}] == 'AM') {\n"+"if (h == 12) { h = 0; }\n"
+"} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"},g:function(){return $f("G");},G:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(\\d{1,2})"},h:function(){return $f("H");},H:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},i:{g:1,c:"i = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},s:{g:1,c:"s = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},u:{g:1,c:"ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",s:"(\\d+)"},O:{g:1,c:["o = results[{0}];","var sn = o.substring(0,1);","var hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60);","var mn = o.substring(3,5) % 60;","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),s:"([+\-]\\d{4})"},P:{g:1,c:["o = results[{0}];","var sn = o.substring(0,1);","var hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60);","var mn = o.substring(4,6) % 60;","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),s:"([+\-]\\d{2}:\\d{2})"},T:{g:0,c:null,s:"[A-Z]{1,4}"},Z:{g:1,c:"z = results[{0}] * 1;\n"
+"z = (-43200 <= z && z <= 50400)? z : null;\n",s:"([+\-]?\\d{1,5})"},c:function(){var calc=[],arr=[$f("Y",1),$f("m",2),$f("d",3),$f("h",4),$f("i",5),$f("s",6),{c:"ms = (results[7] || '.0').substring(1); ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"},{c:["if(results[9] == 'Z'){","z = 0;","}else{",$f("P",9).c,"}"].join('\n')}];for(var i=0,l=arr.length;i<l;++i){calc.push(arr[i].c);}
return{g:1,c:calc.join(""),s:arr[0].s+"-"+arr[1].s+"-"+arr[2].s+"T"+arr[3].s
+":"+arr[4].s+":"+arr[5].s+"((\.|,)\\d+)?"
+"(Z|([+\-]\\d{2}:\\d{2}))"}},U:{g:1,c:"u = parseInt(results[{0}], 10);\n",s:"(-?\\d+)"}};Date.formatCodeToRegex=function(character,currentGroup){var p=Date.parseCodes[character];if(p){p=L5.type(p)=='function'?p():p;Date.parseCodes[character]=p;}
return p?L5.applyIf({c:p.c?xf(p.c,currentGroup||"{0}"):p.c},p):{g:0,c:null,s:L5.escapeRe(character)}}
var $f=Date.formatCodeToRegex;Date.parseFunctions={count:0};Date.createParser=function(){var code=["Date.{0} = function(input){","var y, m, d, h = 0, i = 0, s = 0, ms = 0, o, z, u, v;","input = String(input);","d1 = new Date();","y = d1.getFullYear();","m = d1.getMonth();","d1 = d1.getDate();","var results = input.match(Date.parseRegexes[{1}]);","if(results && results.length > 0){","{2}","if(d==null){","var d2 = new Date(y, m);","d = d1>d2.getDaysInMonth()?d2.getDaysInMonth():d1;","}","if(u){","v = new Date(u * 1000);","}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0 && ms >= 0){","v = new Date(y, m, d, h, i, s, ms);","}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0){","v = new Date(y, m, d, h, i, s);","}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0){","v = new Date(y, m, d, h, i);","}else if (y >= 0 && m >= 0 && d > 0 && h >= 0){","v = new Date(y, m, d, h);","}else if (y >= 0 && m >= 0 && d > 0){","v = new Date(y, m, d);","}else if (y >= 0 && m >= 0){","v = new Date(y, m);","}else if (y >= 0){","v = new Date(y);","}","}","return (v && (z != null || o != null))?"
+" (L5.type(z) == 'number' ? v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - z) :"
+" v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn))) : v;","}"].join('\n');return function(format){var funcName="parse"+Date.parseFunctions.count++,regexNum=Date.parseRegexes.length,currentGroup=1,calc="",regex="",special=false,ch="";Date.parseFunctions[format]=funcName;for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else if(special){special=false;regex+=String.escape(ch);}else{var obj=$f(ch,currentGroup);currentGroup+=obj.g;regex+=obj.s;if(obj.g&&obj.c){calc+=obj.c;}}}
Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$","i");eval(xf(code,funcName,regexNum,calc));}}();Date.parseDate=function(input,format){var p=Date.parseFunctions;if(p[format]==null){Date.createParser(format);}
var func=p[format];var o=Date[func](input);if(o)
o.formatstr=format;return o;};L5.apply(Date,{parseRegexes:[],y2kYear:50});}());Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};Date.getShortMonthName=function(month){return Date.monthNames[month].substring(0,3);};Date.getShortDayName=function(day){return Date.dayNames[day].substring(0,3);};Date.getMonthNumber=function(name){return Date.monthNumbers[name.substring(0,1).toUpperCase()
+name.substring(1,3).toLowerCase()];};Date.formatCodes={d:"String.leftPad(this.getDate(), 2, '0')",D:"Date.getShortDayName(this.getDay())",j:"this.getDate()",l:"Date.dayNames[this.getDay()]",N:"(this.getDay() ? this.getDay() : 7)",S:"this.getSuffix()",w:"this.getDay()",z:"this.getDayOfYear()",W:"String.leftPad(this.getWeekOfYear(), 2, '0')",F:"Date.monthNames[this.getMonth()]",m:"String.leftPad(this.getMonth() + 1, 2, '0')",M:"Date.getShortMonthName(this.getMonth())",n:"(this.getMonth() + 1)",t:"this.getDaysInMonth()",L:"(this.isLeapYear() ? 1 : 0)",o:"(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",Y:"this.getFullYear()",y:"('' + this.getFullYear()).substring(2, 4)",a:"(this.getHours() < 12 ? 'am' : 'pm')",A:"(this.getHours() < 12 ? 'AM' : 'PM')",g:"((this.getHours() % 12) ? this.getHours() % 12 : 12)",G:"this.getHours()",h:"String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",H:"String.leftPad(this.getHours(), 2, '0')",i:"String.leftPad(this.getMinutes(), 2, '0')",s:"String.leftPad(this.getSeconds(), 2, '0')",u:"String.leftPad(this.getMilliseconds(), 3, '0')",O:"this.getGMTOffset()",P:"this.getGMTOffset(true)",T:"this.getTimezone()",Z:"(this.getTimezoneOffset() * -60)",c:function(){for(var c="Y-m-dTH:i:sP",code=[],i=0,l=c.length;i<l;++i){var e=c.charAt(i);code.push(e=="T"?"'T'":Date.getFormatCode(e));}
return code.join(" + ");},U:"Math.round(this.getTime() / 1000)"};Date.getFormatCode=function(character){var f=Date.formatCodes[character];if(f){f=L5.type(f)=='function'?f():f;Date.formatCodes[character]=f;}
return f||("'"+String.escape(character)+"'");};Date.formatFunctions={count:0};Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++,code="Date.prototype."
+funcName+" = function(){return ",special=false,ch='';Date.formatFunctions[format]=funcName;for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else if(special){special=false;code+="'"+String.escape(ch)+"' + ";}else{code+=Date.getFormatCode(ch)+" + ";}}
eval(code.substring(0,code.length-3)+";}");};Date.prototype.dateFormat=function(format){if(Date.formatFunctions[format]==null){Date.createNewFormat(format);}
var func=Date.formatFunctions[format];return this[func]();};Date.prototype.getDayOfYear=function(){var num=0;Date.daysInMonth[1]=this.isLeapYear()?29:28;for(var i=0;i<this.getMonth();++i){num+=Date.daysInMonth[i];}
return num+this.getDate()-1;};Date.prototype.getWeekOfYear=function(){var ms1d=864e5,ms7d=7*ms1d;return function(){var DC3=Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()+3)/ms1d,AWN=Math.floor(DC3/7),Wyr=new Date(AWN*ms7d).getUTCFullYear();return AWN-Math.floor(Date.UTC(Wyr,0,7)/ms7d)+1;}}();Date.prototype.isLeapYear=function(){var year=this.getFullYear();return!!((year&3)==0&&(year%100||(year%400==0&&year)));};Date.prototype.getFirstDayOfMonth=function(){var day=(this.getDay()-(this.getDate()-1))%7;return(day<0)?(day+7):day;};Date.prototype.getLastDayOfMonth=function(){var day=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;return(day<0)?(day+7):day;};Date.prototype.getFirstDateOfMonth=function(){return new Date(this.getFullYear(),this.getMonth(),1);};Date.prototype.getLastDateOfMonth=function(){return new Date(this.getFullYear(),this.getMonth(),this.getDaysInMonth());};Date.prototype.getDaysInMonth=function(){Date.daysInMonth[1]=this.isLeapYear()?29:28;return Date.daysInMonth[this.getMonth()];};Date.prototype.getTimezone=function(){return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,"$1$2").replace(/[^A-Z]/g,"");};Date.prototype.getGMTOffset=function(colon){return(this.getTimezoneOffset()>0?"-":"+")
+String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())/60),2,"0")
+(colon?":":"")
+String.leftPad(Math.abs(this.getTimezoneOffset()%60),2,"0");};Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};Date.prototype.clone=function(){return new Date(this.getTime());};Date.prototype.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};Date.MILLI="ms";Date.SECOND="s";Date.MINUTE="mi";Date.HOUR="h";Date.DAY="d";Date.MONTH="mo";Date.YEAR="y";Date.prototype.add=function(interval,value){var d=this.clone();if(!interval||value===0)
return d;switch(interval.toLowerCase()){case Date.MILLI:d.setMilliseconds(this.getMilliseconds()+value);break;case Date.SECOND:d.setSeconds(this.getSeconds()+value);break;case Date.MINUTE:d.setMinutes(this.getMinutes()+value);break;case Date.HOUR:d.setHours(this.getHours()+value);break;case Date.DAY:d.setDate(this.getDate()+value);break;case Date.MONTH:var day=this.getDate();if(day>28){day=Math.min(day,this.getFirstDateOfMonth().add('mo',value).getLastDateOfMonth().getDate());}
d.setDate(day);d.setMonth(this.getMonth()+value);break;case Date.YEAR:d.setFullYear(this.getFullYear()+value);break;}
return d;};Date.prototype.between=function(start,end){var t=this.getTime();return start.getTime()<=t&&t<=end.getTime();};Date.prototype.format=Date.prototype.dateFormat;Date.prototype.getElapsed=function(date){return Math.abs((date||new Date()).getTime()-this.getTime());};Date.prototype.toString=function(){if(this.formatstr){return this.format(this.formatstr);}else{return this.format('Y-m-d');}};Date.prototype.toJsonString=function(){var obj=new Object();obj.javaClass="Date";obj.time=this.valueOf();return L5.encode(obj);};if(L5.isSafari){Date.brokenSetMonth=Date.prototype.setMonth;Date.prototype.setMonth=function(num){if(num<=-1){var n=Math.ceil(-num);var back_year=Math.ceil(n/12);var month=(n%12)?12-n%12:0;this.setFullYear(this.getFullYear()-back_year);return Date.brokenSetMonth.call(this,month);}else{return Date.brokenSetMonth.apply(this,arguments);}};}

L5.apply(Function.prototype,{createCallback:function(){var args=arguments;var method=this;return function(){return method.apply(window,args);};},createDelegate:function(obj,args,appendArgs){var method=this;return function(){var callArgs=args||arguments;if(appendArgs===true){callArgs=Array.prototype.slice.call(arguments,0);callArgs=callArgs.concat(args);}else if(typeof appendArgs=="number"){callArgs=Array.prototype.slice.call(arguments,0);var applyArgs=[appendArgs,0].concat(args);Array.prototype.splice.apply(callArgs,applyArgs);}
return method.apply(obj||window,callArgs);};},defer:function(millis,obj,args,appendArgs){var fn=this.createDelegate(obj,args,appendArgs);if(millis){return setTimeout(fn,millis);}
fn();return 0;},createSequence:function(fcn,scope){if(typeof fcn!="function"){return this;}
var method=this;return function(){var retval=method.apply(this||window,arguments);fcn.apply(scope||this||window,arguments);return retval;};},createInterceptor:function(fcn,scope){if(typeof fcn!="function"){return this;}
var method=this;return function(){fcn.target=this;fcn.method=method;if(fcn.apply(scope||this||window,arguments)===false){return;}
return method.apply(this||window,arguments);};}});(function(){if(L5.isIE){function fnCleanUp(){var p=Function.prototype;delete p.createSequence;delete p.defer;delete p.createDelegate;delete p.createCallback;delete p.createInterceptor;window.detachEvent("onunload",fnCleanUp);}
window.attachEvent("onunload",fnCleanUp);}})();

L5.applyIf(Number.prototype,{constrain:function(min,max){return Math.min(Math.max(this,min),max);}});

L5.applyIf(String,{escape:function(string){return string.replace(/('|\\)/g,"\\$1");},leftPad:function(val,size,ch){var result=new String(val);if(!ch){ch=" ";}
while(result.length<size){result=ch+result;}
return result.toString();},format:function(format){var args=Array.prototype.slice.call(arguments,1);return format.replace(/\{(\d+)\}/g,function(m,i){return args[i];});}});String.prototype.toggle=function(value,other){return this==value?other:value;};String.prototype.trim=function(){var re=/^\s+|\s+$/g;return function(){return this.replace(re,"");};}();

L5.lib.Dom=function(){};(function(){var libFlyweight;L5.lib.Dom.fly=function(el){if(!libFlyweight){libFlyweight=new L5.Element.Flyweight();}
libFlyweight.dom=el;return libFlyweight;};})();L5.lib.Dom.getViewWidth=function(full){return full?this.getDocumentWidth():this.getViewportWidth();};L5.lib.Dom.getViewHeight=function(full){return full?this.getDocumentHeight():this.getViewportHeight();};L5.lib.Dom.getDocumentHeight=function(){var scrollHeight=(document.compatMode!="CSS1Compat")?document.body.scrollHeight:document.documentElement.scrollHeight;return Math.max(scrollHeight,this.getViewportHeight());};L5.lib.Dom.getDocumentWidth=function(){var scrollWidth=(document.compatMode!="CSS1Compat")?document.body.scrollWidth:document.documentElement.scrollWidth;return Math.max(scrollWidth,this.getViewportWidth());};L5.lib.Dom.getViewportHeight=function(){if(L5.isIE){return L5.isStrict?document.documentElement.clientHeight:document.body.clientHeight;}else{return self.innerHeight;}};L5.lib.Dom.getViewportWidth=function(){if(L5.isIE){return L5.isStrict?document.documentElement.clientWidth:document.body.clientWidth;}else{return self.innerWidth;}};L5.lib.Dom.isAncestor=function(p,c){p=L5.getDom(p);c=L5.getDom(c);if(!p||!c){return false;}
if(p.contains&&!L5.isSafari){return p.contains(c);}else if(p.compareDocumentPosition){return!!(p.compareDocumentPosition(c)&16);}else{var parent=c.parentNode;while(parent){if(parent==p){return true;}else if(!parent.tagName||parent.tagName.toUpperCase()=="HTML"){return false;}
parent=parent.parentNode;}
return false;}};L5.lib.Dom.getRegion=function(el){return L5.lib.Region.getRegion(el);};L5.lib.Dom.getY=function(el){return this.getXY(el)[1];};L5.lib.Dom.getX=function(el){return this.getXY(el)[0];};L5.lib.Dom.getXY=function(el){var p,pe,b,scroll,bd=(document.body||document.documentElement);el=L5.getDom(el);if(el==bd){return[0,0];}
if(el.getBoundingClientRect){b=el.getBoundingClientRect();scroll=this.fly(document).getScroll();return[b.left+scroll.left,b.top+scroll.top];}
var x=0,y=0;p=el;var hasAbsolute=this.fly(el).getStyle("position")=="absolute";while(p){x+=p.offsetLeft;y+=p.offsetTop;if(!hasAbsolute&&this.fly(p).getStyle("position")=="absolute"){hasAbsolute=true;}
if(L5.isGecko){pe=this.fly(p);var bt=parseInt(pe.getStyle("borderTopWidth"),10)||0;var bl=parseInt(pe.getStyle("borderLeftWidth"),10)||0;x+=bl;y+=bt;if(p!=el&&pe.getStyle('overflow')!='visible'){x+=bl;y+=bt;}}
p=p.offsetParent;}
if(L5.isSafari&&hasAbsolute){x-=bd.offsetLeft;y-=bd.offsetTop;}
if(L5.isGecko&&!hasAbsolute){var dbd=this.fly(bd);x+=parseInt(dbd.getStyle("borderLeftWidth"),10)||0;y+=parseInt(dbd.getStyle("borderTopWidth"),10)||0;}
p=el.parentNode;while(p&&p!=bd){if(!L5.isOpera||(p.tagName!='TR'&&this.fly(p).getStyle("display")!="inline")){x-=p.scrollLeft;y-=p.scrollTop;}
p=p.parentNode;}
return[x,y];};L5.lib.Dom.setXY=function(el,xy){el=L5.fly(el,'_setXY');el.position();var pts=el.translatePoints(xy);if(xy[0]!==false){el.dom.style.left=pts.left+"px";}
if(xy[1]!==false){el.dom.style.top=pts.top+"px";}};L5.lib.Dom.setX=function(el,x){this.setXY(el,[x,false]);};L5.lib.Dom.setY=function(el,y){this.setXY(el,[false,y]);};

L5.lib.Event=function(){};(function(){var loadComplete=false;var listeners=[];var unloadListeners=[];var retryCount=0;var onAvailStack=[];var counter=0;var lastError=null;L5.lib.Event.POLL_RETRYS=200;L5.lib.Event.POLL_INTERVAL=20;L5.lib.Event.EL=0;L5.lib.Event.TYPE=1;L5.lib.Event.FN=2;L5.lib.Event.WFN=3;L5.lib.Event.OBJ=3;L5.lib.Event.ADJ_SCOPE=4;L5.lib.Event._interval=null;L5.lib.Event.elCache={};L5.lib.Event.clearCache=function(){};L5.lib.Event.startInterval=function(){if(!this._interval){var self=this;var callback=function(){self._tryPreloadAttach();};this._interval=setInterval(callback,this.POLL_INTERVAL);}};L5.lib.Event.onAvailable=function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:false});retryCount=this.POLL_RETRYS;this.startInterval();};L5.lib.Event.addListener=function(el,eventName,fn){el=L5.getDom(el);if(!el||!fn){return false;}
if("unload"==eventName){unloadListeners[unloadListeners.length]=[el,eventName,fn];return true;}
var wrappedFn=function(e){return typeof L5!='undefined'?fn(L5.lib.Event.getEvent(e)):false;};var li=[el,eventName,fn,wrappedFn];var index=listeners.length;listeners[index]=li;this.doAdd(el,eventName,wrappedFn,false);return true;};L5.lib.Event.removeListener=function(el,eventName,fn){var i,len;el=L5.getDom(el);if(!fn){return this.purgeElement(el,false,eventName);}
if("unload"==eventName){for(i=0,len=unloadListeners.length;i<len;i++){var li=unloadListeners[i];if(li&&li[0]==el&&li[1]==eventName&&li[2]==fn){unloadListeners.splice(i,1);return true;}}
return false;}
var cacheItem=null;var index=arguments[3];if("undefined"==typeof index){index=this._getCacheIndex(el,eventName,fn);}
if(index>=0){cacheItem=listeners[index];}
if(!el||!cacheItem){return false;}
this.doRemove(el,eventName,cacheItem[this.WFN],false);delete listeners[index][this.WFN];delete listeners[index][this.FN];listeners.splice(index,1);return true;};L5.lib.Event.getTarget=function(ev,resolveTextNode){ev=ev.browserEvent||ev;var t=ev.target||ev.srcElement;return this.resolveTextNode(t);};L5.lib.Event.resolveTextNode=function(node){if(L5.isSafari&&node&&3==node.nodeType){return node.parentNode;}else{return node;}};L5.lib.Event.getPageX=function(ev){ev=ev.browserEvent||ev;var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(L5.isIE){x+=this.getScroll()[1];}}
return x;};L5.lib.Event.getPageY=function(ev){ev=ev.browserEvent||ev;var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(L5.isIE){y+=this.getScroll()[0];}}
return y;};L5.lib.Event.getXY=function(ev){ev=ev.browserEvent||ev;return[this.getPageX(ev),this.getPageY(ev)];};L5.lib.Event.getRelatedTarget=function(ev){ev=ev.browserEvent||ev;var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else if(ev.type=="mouseover"){t=ev.fromElement;}}
return this.resolveTextNode(t);};L5.lib.Event.getTime=function(ev){ev=ev.browserEvent||ev;if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(ex){lastError=ex;return t;}}
return ev.time;};L5.lib.Event.stopEvent=function(ev){this.stopPropagation(ev);this.preventDefault(ev);};L5.lib.Event.stopPropagation=function(ev){ev=ev.browserEvent||ev;if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}};L5.lib.Event.preventDefault=function(ev){ev=ev.browserEvent||ev;if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}};L5.lib.Event.getEvent=function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}
c=c.caller;}}
return ev;};L5.lib.Event.getCharCode=function(ev){ev=ev.browserEvent||ev;return ev.charCode||ev.keyCode||0;};L5.lib.Event._getCacheIndex=function(el,eventName,fn){for(var i=0,len=listeners.length;i<len;++i){var li=listeners[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==eventName){return i;}}
return-1;};L5.lib.Event.getEl=function(id){return document.getElementById(id);};L5.lib.Event._load=function(e){loadComplete=true;var EU=L5.lib.Event;if(L5.isIE){EU.doRemove(window,"load",EU._load);}};L5.lib.Event._tryPreloadAttach=function(){if(this.locked){return false;}
this.locked=true;var tryAgain=!loadComplete;if(!tryAgain){tryAgain=(retryCount>0);}
var notAvail=[];for(var i=0,len=onAvailStack.length;i<len;++i){var item=onAvailStack[i];if(item){var el=this.getEl(item.id);if(el){if(!item.checkReady||loadComplete||el.nextSibling||(document&&document.body)){var scope=el;if(item.override){if(item.override===true){scope=item.obj;}else{scope=item.override;}}
item.fn.call(scope,item.obj);onAvailStack[i]=null;}}else{notAvail.push(item);}}}
retryCount=(notAvail.length===0)?0:retryCount-1;if(tryAgain){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;return true;};L5.lib.Event.purgeElement=function(el,recurse,eventName){var elListeners=this.getListeners(el,eventName);if(elListeners){for(var i=0,len=elListeners.length;i<len;++i){var l=elListeners[i];this.removeListener(el,l.type,l.fn);}}
if(recurse&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],recurse,eventName);}}};L5.lib.Event.getListeners=function(el,eventName){var results=[],searchLists;if(!eventName){searchLists=[listeners,unloadListeners];}else if(eventName=="unload"){searchLists=[unloadListeners];}else{searchLists=[listeners];}
for(var j=0;j<searchLists.length;++j){var searchList=searchLists[j];if(searchList&&searchList.length>0){for(var i=0,len=searchList.length;i<len;++i){var l=searchList[i];if(l&&l[this.EL]===el&&(!eventName||eventName===l[this.TYPE])){results.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.OBJ],adjust:l[this.ADJ_SCOPE],index:i});}}}}
return(results.length)?results:null;};L5.lib.Event._unload=function(e){var EU=L5.lib.Event,i,j,l,len,index;for(i=0,len=unloadListeners.length;i<len;++i){l=unloadListeners[i];if(l){var scope=window;if(l[EU.ADJ_SCOPE]){if(l[EU.ADJ_SCOPE]===true){scope=l[EU.OBJ];}else{scope=l[EU.ADJ_SCOPE];}}
l[EU.FN].call(scope,EU.getEvent(e),l[EU.OBJ]);unloadListeners[i]=null;l=null;scope=null;}}
unloadListeners=null;if(listeners&&listeners.length>0){j=listeners.length;while(j){index=j-1;l=listeners[index];if(l){EU.removeListener(l[EU.EL],l[EU.TYPE],l[EU.FN],index);}
j=j-1;}
l=null;EU.clearCache();}
EU.doRemove(window,"unload",EU._unload);}
L5.lib.Event.getScroll=function(){var dd=document.documentElement,db=document.body;if(dd&&(dd.scrollTop||dd.scrollLeft)){return[dd.scrollTop,dd.scrollLeft];}else if(db){return[db.scrollTop,db.scrollLeft];}else{return[0,0];}};L5.lib.Event.doAdd=function(){if(window.addEventListener){return function(el,eventName,fn,capture){el.addEventListener(eventName,fn,(capture));};}else if(window.attachEvent){return function(el,eventName,fn,capture){el.attachEvent("on"+eventName,fn);};}else{return function(){};}}();L5.lib.Event.doRemove=function(){if(window.removeEventListener){return function(el,eventName,fn,capture){el.removeEventListener(eventName,fn,(capture));};}else if(window.detachEvent){return function(el,eventName,fn){el.detachEvent("on"+eventName,fn);};}else{return function(){};}}();})();(function(){var E=L5.lib.Event;E.on=E.addListener;E.un=E.removeListener;if(document&&document.body){E._load();}else{E.doAdd(window,"load",E._load);}
E.doAdd(window,"unload",E._unload);E._tryPreloadAttach();})();

L5.lib.Ajax=function(){};L5.lib.Ajax.activeX=['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'];L5.lib.Ajax.defaultHeaders={'X-Requested-With':'XMLHttpRequest'};L5.lib.Ajax.defaultPostHeader='application/x-www-form-urlencoded; charset=UTF-8';L5.lib.Ajax.poll={};L5.lib.Ajax.timeout={};L5.lib.Ajax.pollInterval=50;L5.lib.Ajax.transactionId=0;L5.lib.Ajax.request=function(method,uri,cb,data,options){var headers={};if(options){if(options.headers){for(var h in options.headers){if(options.headers.hasOwnProperty(h)){this.addHeader(headers,h,options.headers[h]);}}}
if(options.xmlData){if(!headers||!headers['Content-Type']){this.addHeader(headers,'Content-Type','text/xml');}
method=(method?method:(options.method?options.method:'POST'));data=options.xmlData;}else if(options.jsonData){if(!headers||!headers['Content-Type']){this.addHeader(headers,'Content-Type','application/json');}
method=(method?method:(options.method?options.method:'POST'));data=typeof options.jsonData=='object'?L5.encode(options.jsonData):options.jsonData;}}
if(data&&!headers['Content-Type']){this.addHeader(headers,'Content-Type',this.defaultPostHeader);}
return this["sync"in options?"syncRequest":"asyncRequest"](method,uri,cb,data,headers);};L5.lib.Ajax.serializeForm=function(form){if(typeof form=='string'){form=(document.getElementById(form)||document.forms[form]);}
var el,name,val,disabled,data='',hasSubmit=false;for(var i=0;i<form.elements.length;i++){el=form.elements[i];disabled=form.elements[i].disabled;name=form.elements[i].name;val=form.elements[i].value;if(!disabled&&name){switch(el.type){case'select-one':case'select-multiple':for(var j=0;j<el.options.length;j++){if(el.options[j].selected){if(L5.isIE){data+=encodeURIComponent(name)
+'='
+encodeURIComponent(el.options[j].attributes['value'].specified?el.options[j].value:el.options[j].text)+'&';}else{data+=encodeURIComponent(name)
+'='
+encodeURIComponent(el.options[j].hasAttribute('value')?el.options[j].value:el.options[j].text)+'&';}}}
break;case'radio':case'checkbox':if(el.checked){data+=encodeURIComponent(name)+'='
+encodeURIComponent(val)+'&';}
break;case'file':case undefined:case'reset':case'button':break;case'submit':if(hasSubmit==false){data+=encodeURIComponent(name)+'='
+encodeURIComponent(val)+'&';hasSubmit=true;}
break;default:data+=encodeURIComponent(name)+'='
+encodeURIComponent(val)+'&';break;}}}
data=data.substr(0,data.length-1);return data;};L5.lib.Ajax.setPollingInterval=function(i){if(typeof i=='number'&&isFinite(i)){L5.lib.Ajax.pollInterval=i;}};L5.lib.Ajax.createXhrObject=function(transactionId){var obj,http;try{http=new XMLHttpRequest();obj={conn:http,tId:transactionId};}catch(e){for(var i=0;i<this.activeX.length;++i){try{http=new ActiveXObject(this.activeX[i]);obj={conn:http,tId:transactionId};break;}catch(e){}}}finally{return obj;}};L5.lib.Ajax.getConnectionObject=function(){var o;var tId=this.transactionId;try{o=this.createXhrObject(tId);if(o){this.transactionId++;}}catch(e){}finally{return o;}};L5.lib.Ajax.asyncRequest=function(method,uri,callback,postData,headers){var o=this.getConnectionObject();if(!o){return null;}else{o.conn.open(method,uri,true);this.setHeader(headers,o);this.handleReadyState(o,callback);try{o.conn.send(postData||null);}catch(e){throw new L5.Exception(550,L5.connectionError?L5.connectionError:"Failed to connect to server failed.");}
return o;}};L5.lib.Ajax.syncRequest=function(method,uri,callback,postData,headers){var o=this.getConnectionObject();if(!o){return null;}else{o.conn.open(method,uri,false);this.setHeader(headers,o);try{o.conn.send(postData||null);}catch(e){throw new L5.Exception(550,L5.connectionError?L5.connectionError:"Failed to connect to server failed.");}
this.handleTransactionResponse(o,callback);return o;}};L5.lib.Ajax.handleReadyState=function(o,callback){var oConn=this;if(callback&&callback.timeout){this.timeout[o.tId]=window.setTimeout(function(){oConn.abort(o,callback,true);},callback.timeout);}
this.poll[o.tId]=window.setInterval(function(){if(o.conn&&o.conn.readyState==4){window.clearInterval(oConn.poll[o.tId]);delete oConn.poll[o.tId];if(callback&&callback.timeout){window.clearTimeout(oConn.timeout[o.tId]);delete oConn.timeout[o.tId];}
oConn.handleTransactionResponse(o,callback);}},this.pollInterval);};L5.lib.Ajax.handleTransactionResponse=function(o,callback,isAbort){if(!callback){this.releaseObject(o);return;}
var httpStatus,responseObject;try{if(o.conn.status!==undefined&&o.conn.status!=0){httpStatus=o.conn.status;}else{httpStatus=13030;}}catch(e){httpStatus=13030;}
if((httpStatus>=200&&httpStatus<300)||(L5.isIE&&httpStatus==1223)){responseObject=this.createResponseObject(o,callback.argument);if(callback.success){if(!callback.scope){callback.success(responseObject);}else{callback.success.apply(callback.scope,[responseObject]);}}}else{switch(httpStatus){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:responseObject=this.createExceptionObject(o.tId,callback.argument,(isAbort?isAbort:false));if(callback.failure){if(!callback.scope){callback.failure(responseObject);}else{callback.failure.apply(callback.scope,[responseObject]);}}
break;default:responseObject=this.createResponseObject(o,callback.argument);if(callback.failure){if(!callback.scope){callback.failure(responseObject);}else{callback.failure.apply(callback.scope,[responseObject]);}}}}
this.releaseObject(o);responseObject=null;};L5.lib.Ajax.createResponseObject=function(o,callbackArg){var obj={};var headerObj={};try{var headerStr=o.conn.getAllResponseHeaders();var header=headerStr.split('\n');for(var i=0;i<header.length;i++){var delimitPos=header[i].indexOf(':');if(delimitPos!=-1){headerObj[header[i].substring(0,delimitPos)]=header[i].substring(delimitPos+2);}}}catch(e){}
obj.tId=o.tId;obj.status=o.conn.status;obj.statusText=o.conn.statusText;obj.getResponseHeader=headerObj;obj.getAllResponseHeaders=headerStr;obj.responseText=o.conn.responseText;obj.responseXML=o.conn.responseXML;if(typeof callbackArg!==undefined){obj.argument=callbackArg;}
return obj;};L5.lib.Ajax.createExceptionObject=function(tId,callbackArg,isAbort){var COMM_CODE=0;var COMM_ERROR=L5.connectionError?L5.connectionError:'communication failure';var ABORT_CODE=-1;var ABORT_ERROR='transaction aborted';var obj={};obj.tId=tId;if(isAbort){obj.status=ABORT_CODE;obj.statusText=ABORT_ERROR;}else{obj.status=COMM_CODE;obj.statusText=COMM_ERROR;}
if(callbackArg){obj.argument=callbackArg;}
return obj;};L5.lib.Ajax.addHeader=function(headers,label,value){var headerObj=headers;if(headerObj[label]===undefined){headerObj[label]=value;}else{headerObj[label]=value+","+headerObj[label];}};L5.lib.Ajax.setHeader=function(h,o){for(var prop in this.defaultHeaders){if(this.defaultHeaders.hasOwnProperty(prop)){o.conn.setRequestHeader(prop,this.defaultHeaders[prop]);}}
for(var prop in h){if(h.hasOwnProperty(prop)){o.conn.setRequestHeader(prop,h[prop]);}}};L5.lib.Ajax.abort=function(o,callback,isTimeout){if(this.isCallInProgress(o)){o.conn.abort();window.clearInterval(this.poll[o.tId]);delete this.poll[o.tId];if(isTimeout){delete this.timeout[o.tId];}
this.handleTransactionResponse(o,callback,true);return true;}else{return false;}},L5.lib.Ajax.isCallInProgress=function(o){if(o.conn){return o.conn.readyState!=4&&o.conn.readyState!=0;}else{return false;}};L5.lib.Ajax.releaseObject=function(o){o.conn=null;o=null;};

L5.util.Observable=function(){if(this.listeners){this.on(this.listeners);delete this.listeners;}};L5.util.Observable.prototype={fireEvent:function(){if(this.eventsSuspended!==true){var ce=this.events[arguments[0].toLowerCase()];if(typeof ce=="object"){return ce.fire.apply(ce,Array.prototype.slice.call(arguments,1));}}
return true;},filterOptRe:/^(?:scope|delay|buffer|single)$/,addListener:function(eventName,fn,scope,o){if(typeof eventName=="object"){o=eventName;for(var e in o){if(this.filterOptRe.test(e)){continue;}
if(typeof o[e]=="function"){this.addListener(e,o[e],o.scope,o);}else{this.addListener(e,o[e].fn,o[e].scope,o[e]);}}
return;}
o=(!o||typeof o=="boolean")?{}:o;eventName=eventName.toLowerCase();var ce=this.events[eventName]||true;if(typeof ce=="boolean"){ce=new L5.util.Event(this,eventName);this.events[eventName]=ce;}
ce.addListener(fn,scope,o);},removeListener:function(eventName,fn,scope){var ce=this.events[eventName.toLowerCase()];if(typeof ce=="object"){ce.removeListener(fn,scope);}},purgeListeners:function(){for(var evt in this.events){if(typeof this.events[evt]=="object"){this.events[evt].clearListeners();}}},relayEvents:function(o,events){var createHandler=function(ename){return function(){return this.fireEvent.apply(this,L5.combine(ename,Array.prototype.slice.call(arguments,0)));};};for(var i=0,len=events.length;i<len;i++){var ename=events[i];if(!this.events[ename]){this.events[ename]=true;}
o.on(ename,createHandler(ename),this);}},addEvents:function(o){if(!this.events){this.events={};}
if(typeof o=='string'){for(var i=0,a=arguments,v;v=a[i];i++){if(!this.events[a[i]]){this.events[a[i]]=true;}}}else{L5.applyIf(this.events,o);}},hasListener:function(eventName){var e=this.events[eventName];return typeof e=="object"&&e.listeners.length>0;},suspendEvents:function(){this.eventsSuspended=true;},resumeEvents:function(){this.eventsSuspended=false;}};L5.util.Observable.prototype.on=L5.util.Observable.prototype.addListener;L5.util.Observable.prototype.un=L5.util.Observable.prototype.removeListener;(function(){var createBuffered=function(h,o,scope){var task=new L5.util.DelayedTask();return function(){task.delay(o.buffer,h,scope,Array.prototype.slice.call(arguments,0));};};var createSingle=function(h,e,fn,scope){return function(){e.removeListener(fn,scope);return h.apply(scope,arguments);};};var createDelayed=function(h,o,scope){return function(){var args=Array.prototype.slice.call(arguments,0);setTimeout(function(){h.apply(scope,args);},o.delay||10);};};L5.util.Event=function(obj,name){this.name=name;this.obj=obj;this.listeners=[];};L5.util.Event.prototype={addListener:function(fn,scope,options){scope=scope||this.obj;if(!this.isListening(fn,scope)){var l=this.createListener(fn,scope,options);if(!this.firing){this.listeners.push(l);}else{this.listeners=this.listeners.slice(0);this.listeners.push(l);}}},createListener:function(fn,scope,o){o=o||{};scope=scope||this.obj;var l={fn:fn,scope:scope,options:o};var h=fn;if(o.delay){h=createDelayed(h,o,scope);}
if(o.single){h=createSingle(h,this,fn,scope);}
if(o.buffer){h=createBuffered(h,o,scope);}
l.fireFn=h;return l;},findListener:function(fn,scope){scope=scope||this.obj;var ls=this.listeners;for(var i=0,len=ls.length;i<len;i++){var l=ls[i];if(l.fn==fn&&l.scope==scope){return i;}}
return-1;},isListening:function(fn,scope){return this.findListener(fn,scope)!=-1;},removeListener:function(fn,scope){var index;if((index=this.findListener(fn,scope))!=-1){if(!this.firing){this.listeners.splice(index,1);}else{this.listeners=this.listeners.slice(0);this.listeners.splice(index,1);}
return true;}
return false;},clearListeners:function(){this.listeners=[];},fire:function(){var ls=this.listeners,scope,len=ls.length;if(len>0){this.firing=true;var args=Array.prototype.slice.call(arguments,0);for(var i=0;i<len;i++){var l=ls[i];if(l.fireFn.apply(l.scope||this.obj||window,arguments)===false){this.firing=false;return false;}}
this.firing=false;}
return true;}};})();L5.util.Observable.capture=function(o,fn,scope){o.fireEvent=o.fireEvent.createInterceptor(fn,scope);};L5.util.Observable.releaseCapture=function(o){o.fireEvent=L5.util.Observable.prototype.fireEvent;};

L5.util.Observable.prototype.beforeMethod=function(method,fn,scope){var e=this.getMethodEvent(method);e.before.push({fn:fn,scope:scope});};L5.util.Observable.prototype.afterMethod=function(method,fn,scope){var e=this.getMethodEvent(method);e.after.push({fn:fn,scope:scope});};L5.util.Observable.prototype.getMethodEvent=function(method){if(!this.methodEvents){this.methodEvents={};}
var e=this.methodEvents[method];if(!e){e={};this.methodEvents[method]=e;e.originalFn=this[method];e.methodName=method;e.before=[];e.after=[];var returnValue,v,cancel;var obj=this;var makeCall=function(fn,scope,args){if((v=fn.apply(scope||obj,args))!==undefined){if(typeof v==='object'){if(v.returnValue!==undefined){returnValue=v.returnValue;}else{returnValue=v;}
if(v.cancel===true){cancel=true;}}else if(v===false){cancel=true;}else{returnValue=v;}}}
this[method]=function(){returnValue=v=undefined;cancel=false;var args=Array.prototype.slice.call(arguments,0);for(var i=0,len=e.before.length;i<len;i++){makeCall(e.before[i].fn,e.before[i].scope,args);if(cancel){return returnValue;}}
if((v=e.originalFn.apply(obj,args))!==undefined){returnValue=v;}
for(var i=0,len=e.after.length;i<len;i++){makeCall(e.after[i].fn,e.after[i].scope,args);if(cancel){return returnValue;}}
return returnValue;};}
return e;};L5.util.Observable.prototype.removeMethodListener=function(method,fn,scope){var e=this.getMethodEvent(method);for(var i=0,len=e.before.length;i<len;i++){if(e.before[i].fn==fn&&e.before[i].scope==scope){e.before.splice(i,1);return;}}
for(var i=0,len=e.after.length;i<len;i++){if(e.after[i].fn==fn&&e.after[i].scope==scope){e.after.splice(i,1);return;}}};

L5.EventManager=function(){};(function(){var E=L5.lib.Event,D=L5.lib.Dom;var propRe=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;var elHash={};var createBuffered=function(h,o){var task=new L5.util.DelayedTask(h);return function(e){e=new L5.EventObjectImpl(e);task.delay(o.buffer,h,null,[e]);};};var createSingle=function(h,el,ename,fn,scope){return function(e){L5.EventManager.removeListener(el,ename,fn,scope);h(e);};};var createDelayed=function(h,o){return function(e){e=new L5.EventObjectImpl(e);setTimeout(function(){h(e);},o.delay||10);};};var addListener=function(el,ename,fn,wrap,scope){var id=L5.id(el);if(!elHash[id]){elHash[id]={};}
var es=elHash[id];if(!es[ename]){es[ename]=[];}
var ls=es[ename];ls.push({id:id,ename:ename,fn:fn,wrap:wrap,scope:scope});E.on(el,ename,wrap);if(ename=="mousewheel"&&el.addEventListener){el.addEventListener("DOMMouseScroll",wrap,false);E.on(window,'unload',function(){el.removeEventListener("DOMMouseScroll",wrap,false);});}
if(ename=="mousedown"&&el==document){L5.EventManager.stoppedMouseDownEvent.addListener(wrap);}};var removeListener=function(el,ename,fn,scope){el=L5.getDom(el);var id=L5.id(el),es=elHash[id],wrap;if(es){var ls=es[ename],l;if(ls){for(var i=0,len=ls.length;i<len;i++){l=ls[i];if(l.fn==fn&&(!scope||l.scope==scope)){wrap=l.wrap;E.un(el,ename,wrap);ls.splice(i,1);break;}}}}
if(ename=="mousewheel"&&el.addEventListener&&wrap){el.removeEventListener("DOMMouseScroll",wrap,false);}
if(ename=="mousedown"&&el==document&&wrap){L5.EventManager.stoppedMouseDownEvent.removeListener(wrap);}};var removeAll=function(el){el=L5.getDom(el);var id=L5.id(el),es=elHash[id],ls;if(es){for(var ename in es){if(es.hasOwnProperty(ename)){ls=es[ename];for(var i=0,len=ls.length;i<len;i++){E.un(el,ename,ls[i].wrap);ls[i]=null;}}
es[ename]=null;}
delete elHash[id];}};var removeAllByEvent=function(el,ename){el=L5.getDom(el);var id=L5.id(el),es=elHash[id],ls;if(es){if(es.hasOwnProperty(ename)){ls=es[ename];for(var i=0,len=ls.length;i<len;i++){E.un(el,ename,ls[i].wrap);ls[i]=null;}}
es[ename]=null;}};var listen=function(element,ename,opt,fn,scope){var o=(!opt||typeof opt=="boolean")?{}:opt;fn=fn||o.fn;scope=scope||o.scope;var el=L5.getDom(element);if(!el){throw"Error listening for \""+ename+'\". Element "'+element
+'" doesn\'t exist.';}
var h=function(e){if(!window['L5']){return;}
e=L5.EventObject.setEvent(e);var t;if(o.delegate){t=e.getTarget(o.delegate,el);if(!t){return;}}else{t=e.target;}
if(o.stopEvent===true){e.stopEvent();}
if(o.preventDefault===true){e.preventDefault();}
if(o.stopPropagation===true){e.stopPropagation();}
if(o.normalized===false){e=e.browserEvent;}
fn.call(scope||el,e,t,o);};if(o.delay){h=createDelayed(h,o);}
if(o.single){h=createSingle(h,el,ename,fn,scope);}
if(o.buffer){h=createBuffered(h,o);}
addListener(el,ename,fn,h,scope);return h;};L5.EventManager.stoppedMouseDownEvent=new L5.util.Event();L5.EventManager.addListener=function(element,eventName,fn,scope,options){if(typeof eventName=="object"){var o=eventName;for(var e in o){if(propRe.test(e)){continue;}
if(typeof o[e]=="function"){listen(element,e,o,o[e],o.scope);}else{listen(element,e,o[e]);}}
return;}
return listen(element,eventName,options,fn,scope);};L5.EventManager.removeListener=function(element,eventName,fn,scope){return removeListener(element,eventName,fn,scope);};L5.EventManager.removeAll=function(element){return removeAll(element);};L5.EventManager.removeAllByEvent=function(element,eventName){return removeAllByEvent(element,eventName);};})();(function(){var docReadyEvent;var docReadyProcId;var docReadyFired=false;var resizeEvent,resizeTask;var E=L5.lib.Event;var D=L5.lib.Dom;var checkReadyState=function(e){if(L5.isIE&&doScrollChk()){return true;}
if(document.readyState=="complete"){fireDocReady();return true;}
if(!docReadyFired){docReadyProcId=setTimeout(arguments.callee,0)}
return false;}
var doScrollChk=function(){if(window!=top){return false;}
try{document.documentElement.doScroll('left');}catch(e){return false;}
fireDocReady();return true;};var fireDocReady=function(){if(!docReadyFired){docReadyFired=true;L5.isReady=true;if(docReadyProcId){clearInterval(docReadyProcId);}
if(L5.isGecko||L5.isOpera){document.removeEventListener("DOMContentLoaded",fireDocReady,false);}
if(L5.isIE){document.detachEvent('onreadystatechange',checkReadyState);}
if(docReadyEvent){docReadyEvent.fire();docReadyEvent.clearListeners();}}};var initDocReadyEvent=function(){docReadyEvent=new L5.util.Event();if(L5.isGecko||L5.isOpera){document.addEventListener("DOMContentLoaded",fireDocReady,false);}else if(L5.isIE){if(!checkReadyState()){document.attachEvent('onreadystatechange',checkReadyState);}}else if(L5.isSafari){docReadyProcId=setInterval(function(){var rs=document.readyState;if(rs=="complete"){fireDocReady();}},10);}
E.on(window,"load",fireDocReady);};var doResizeEvent=function(){resizeEvent.fire(D.getViewWidth(),D.getViewHeight());};var fireWindowResize=function(){if(resizeEvent){if((L5.isIE||L5.isAir)&&resizeTask){resizeTask.delay(50);}else{resizeEvent.fire(D.getViewWidth(),D.getViewHeight());}}};L5.EventManager.textResizeInterval=50;L5.EventManager.onDocumentReady=function(fn,scope,options){if(docReadyFired){docReadyEvent.addListener(fn,scope,options);docReadyEvent.fire();docReadyEvent.clearListeners();return;}
if(!docReadyEvent){initDocReadyEvent();}
options=options||{};if(!options.delay){options.delay=1;}
docReadyEvent.addListener(fn,scope,options);};L5.EventManager.onWindowResize=function(fn,scope,options){if(!resizeEvent){resizeEvent=new L5.util.Event();resizeTask=new L5.util.DelayedTask(doResizeEvent);E.on(window,"resize",fireWindowResize,this);}
resizeEvent.addListener(fn,scope,options);};L5.EventManager.removeResizeListener=function(fn,scope){if(resizeEvent){resizeEvent.removeListener(fn,scope);}};})();L5.EventManager.on=L5.EventManager.addListener;L5.EventManager.un=L5.EventManager.removeListener;L5.onReady=L5.EventManager.onDocumentReady;(function(){var initL5Css=function(){var bd=document.body||document.getElementsByTagName('body')[0];if(!bd){return false;}
var cls=[' ',L5.isIE?"L5-ie "
+(L5.isIE6?'L5-ie6':(L5.isIE7?'L5-ie7':'L5-ie8')):L5.isGecko?"L5-gecko "
+(L5.isGecko2?'L5-gecko2':'L5-gecko3'):L5.isOpera?"L5-opera":L5.isSafari?"L5-safari":L5.isChrome?"L5-chrome":""];if(L5.isMac){cls.push("L5-mac");}
if(L5.isLinux){cls.push("L5-linux");}
if(L5.isBorderBox){cls.push('L5-border-box');}
if(L5.isStrict){var p=bd.parentNode;if(p){p.className+=' L5-strict';}}
bd.className+=cls.join(' ');return true;}
if(!initL5Css()){L5.onReady(initL5Css);}
L5.EventManager.on(window,'unload',function(){L5.releaseIframe();});L5.onReady(function(){if(typeof initData!='undefined'&&initData instanceof Function)
initData();for(var p in L5.initObj){if(L5.initObj[p]instanceof Function)
L5.initObj[p]();}
L5.bindingdata();for(var m in L5.loadData){if(L5.loadData[m]instanceof Function)
L5.loadData[m]();}
if(typeof init!='undefined'&&init instanceof Function)
init();});})();

L5.EventObjectImpl=function(e){if(e){this.setEvent(e.browserEvent||e);}};(function(){var E=L5.lib.Event;var safariKeys={3:13,63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35};var btnMap=L5.isIE?{1:0,4:1,2:2}:(L5.isSafari?{1:0,2:1,3:2}:{0:0,1:1,2:2});L5.EventObjectImpl.prototype={browserEvent:null,button:-1,shiftKey:false,ctrlKey:false,altKey:false,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,RETURN:13,SHIFT:16,CTRL:17,CONTROL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGEUP:33,PAGE_DOWN:34,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,setEvent:function(e){if(e==this||(e&&e.browserEvent)){return e;}
this.browserEvent=e;if(e){this.button=e.button?btnMap[e.button]:(e.which?e.which-1:-1);if(e.type=='click'&&this.button==-1){this.button=0;}
this.type=e.type;this.shiftKey=e.shiftKey;this.ctrlKey=e.ctrlKey||e.metaKey;this.altKey=e.altKey;this.keyCode=e.keyCode;this.charCode=e.charCode;this.target=E.getTarget(e);this.xy=E.getXY(e);}else{this.button=-1;this.shiftKey=false;this.ctrlKey=false;this.altKey=false;this.keyCode=0;this.charCode=0;this.target=null;this.xy=[0,0];}
return this;},stopEvent:function(){if(this.browserEvent){if(this.browserEvent.type=='mousedown'){L5.EventManager.stoppedMouseDownEvent.fire(this);}
E.stopEvent(this.browserEvent);}},preventDefault:function(){if(this.browserEvent){E.preventDefault(this.browserEvent);}},isNavKeyPress:function(){var k=this.keyCode;k=L5.isSafari?(safariKeys[k]||k):k;return(k>=33&&k<=40)||k==this.RETURN||k==this.TAB||k==this.ESC;},isSpecialKey:function(){var k=this.keyCode;return(this.type=='keypress'&&this.ctrlKey)||k==9||k==13||k==40||k==27||(k==16)||(k==17)||(k>=18&&k<=20)||(k>=33&&k<=35)||(k>=36&&k<=39)||(k>=44&&k<=45);},stopPropagation:function(){if(this.browserEvent){if(this.browserEvent.type=='mousedown'){L5.EventManager.stoppedMouseDownEvent.fire(this);}
E.stopPropagation(this.browserEvent);}},getCharCode:function(){return this.charCode||this.keyCode;},getKey:function(){var k=this.keyCode||this.charCode;return L5.isSafari?(safariKeys[k]||k):k;},getPageX:function(){return this.xy[0];},getPageY:function(){return this.xy[1];},getTime:function(){if(this.browserEvent){return E.getTime(this.browserEvent);}
return null;},getXY:function(){return this.xy;},getTarget:function(selector,maxDepth,returnEl){return selector?L5.fly(this.target).findParent(selector,maxDepth,returnEl):(returnEl?L5.get(this.target):this.target);},getRelatedTarget:function(){if(this.browserEvent){return E.getRelatedTarget(this.browserEvent);}
return null;},getWheelDelta:function(){var e=this.browserEvent;var delta=0;if(e.wheelDelta){delta=e.wheelDelta/120;}else if(e.detail){delta=-e.detail/3;}
return delta;},hasModifier:function(){return((this.ctrlKey||this.altKey)||this.shiftKey)?true:false;},within:function(el,related,allowEl){var t=this[related?"getRelatedTarget":"getTarget"]();return t&&((allowEl?(t===L5.getDom(el)):false)||L5.fly(el).contains(t));},getPoint:function(){return new L5.lib.Point(this.xy[0],this.xy[1]);}};})();L5.EventObject=function(){return new L5.EventObjectImpl();}();

L5.DomHelper=function(){};(function(){if((typeof Range!=="undefined")&&!Range.prototype.createContextualFragment){Range.prototype.createContextualFragment=function(html){var frag=document.createDocumentFragment(),div=document.createElement("div");frag.appendChild(div);div.outerHTML=html;return frag;};}
var tempTableEl=null;var emptyTags=/^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i;var tableRe=/^table|tbody|tr|td$/i;var createHtml=function(o){if(typeof o=='string'){return o;}
var b="";if(L5.isArray(o)){for(var i=0,l=o.length;i<l;i++){b+=createHtml(o[i]);}
return b;}
if(!o.tag){o.tag="div";}
b+="<"+o.tag;for(var attr in o){if(attr=="tag"||attr=="children"||attr=="cn"||attr=="html"||typeof o[attr]=="function")
continue;if(attr=="style"){var s=o["style"];if(typeof s=="function"){s=s.call();}
if(typeof s=="string"){b+=' style="'+s+'"';}else if(typeof s=="object"){b+=' style="';for(var key in s){if(typeof s[key]!="function"){b+=key+":"+s[key]+";";}}
b+='"';}}else{if(attr=="cls"){b+=' class="'+o["cls"]+'"';}else if(attr=="htmlFor"){b+=' for="'+o["htmlFor"]+'"';}else{b+=" "+attr+'="'+o[attr]+'"';}}}
if(emptyTags.test(o.tag)){b+="/>";}else{b+=">";var cn=o.children||o.cn;if(cn){b+=createHtml(cn);}else if(o.html){b+=o.html;}
b+="</"+o.tag+">";}
return b;};var createDom=function(o,parentNode){var el;if(L5.isArray(o)){el=document.createDocumentFragment();for(var i=0,l=o.length;i<l;i++){createDom(o[i],el);}}else if(typeof o=="string"){el=document.createTextNode(o);}else{el=document.createElement(o.tag||'div');var useSet=!!el.setAttribute;for(var attr in o){if(attr=="tag"||attr=="children"||attr=="cn"||attr=="html"||attr=="style"||typeof o[attr]=="function")
continue;if(attr=="cls"){el.className=o["cls"];}else{if(useSet)
el.setAttribute(attr,o[attr]);else
el[attr]=o[attr];}}
L5.DomHelper.applyStyles(el,o.style);var cn=o.children||o.cn;if(cn){createDom(cn,el);}else if(o.html){el.innerHTML=o.html;}}
if(parentNode){parentNode.appendChild(el);}
return el;};var ieTable=function(depth,s,h,e){tempTableEl.innerHTML=[s,h,e].join('');var i=-1,el=tempTableEl;while(++i<depth){el=el.firstChild;}
return el;};var ts='<table>',te='</table>',tbs=ts+'<tbody>',tbe='</tbody>'
+te,trs=tbs+'<tr>',tre='</tr>'+tbe;var insertIntoTable=function(tag,where,el,html){if(!tempTableEl){tempTableEl=document.createElement('div');}
var node;var before=null;if(tag=='td'){if(where=='afterbegin'||where=='beforeend'){return;}
if(where=='beforebegin'){before=el;el=el.parentNode;}else{before=el.nextSibling;el=el.parentNode;}
node=ieTable(4,trs,html,tre);}else if(tag=='tr'){if(where=='beforebegin'){before=el;el=el.parentNode;node=ieTable(3,tbs,html,tbe);}else if(where=='afterend'){before=el.nextSibling;el=el.parentNode;node=ieTable(3,tbs,html,tbe);}else{if(where=='afterbegin'){before=el.firstChild;}
node=ieTable(4,trs,html,tre);}}else if(tag=='tbody'){if(where=='beforebegin'){before=el;el=el.parentNode;node=ieTable(2,ts,html,te);}else if(where=='afterend'){before=el.nextSibling;el=el.parentNode;node=ieTable(2,ts,html,te);}else{if(where=='afterbegin'){before=el.firstChild;}
node=ieTable(3,tbs,html,tbe);}}else{if(where=='beforebegin'||where=='afterend'){return;}
if(where=='afterbegin'){before=el.firstChild;}
node=ieTable(2,ts,html,te);}
el.insertBefore(node,before);return node;};L5.DomHelper.useDom=false;L5.DomHelper.markup=function(o){return createHtml(o);};L5.DomHelper.applyStyles=function(el,styles){if(styles){el=L5.fly(el);if(typeof styles=="string"){var re=/\s?([a-z\-]*)\:\s?([^;]*);?/gi;var matches;while((matches=re.exec(styles))!=null){el.setStyle(matches[1],matches[2]);}}else if(typeof styles=="object"){for(var style in styles){el.setStyle(style,styles[style]);}}else if(typeof styles=="function"){L5.DomHelper.applyStyles(el,styles.call());}}};L5.DomHelper.insertHtml=function(where,el,html){where=where.toLowerCase();if(el.insertAdjacentHTML){if(tableRe.test(el.tagName)){var rs;if(rs=insertIntoTable(el.tagName.toLowerCase(),where,el,html)){return rs;}}
switch(where){case"beforebegin":el.insertAdjacentHTML('BeforeBegin',html);return el.previousSibling;case"afterbegin":el.insertAdjacentHTML('AfterBegin',html);return el.firstChild;case"beforeend":el.insertAdjacentHTML('BeforeEnd',html);return el.lastChild;case"afterend":el.insertAdjacentHTML('AfterEnd',html);return el.nextSibling;}
throw'Illegal insertion point -> "'+where+'"';}
var range=el.ownerDocument.createRange();var frag;switch(where){case"beforebegin":range.setStartBefore(el);frag=range.createContextualFragment(html);el.parentNode.insertBefore(frag,el);return el.previousSibling;case"afterbegin":if(el.firstChild){range.setStartBefore(el.firstChild);frag=range.createContextualFragment(html);el.insertBefore(frag,el.firstChild);return el.firstChild;}else{el.innerHTML=html;return el.firstChild;}
case"beforeend":if(el.lastChild){range.setStartAfter(el.lastChild);frag=range.createContextualFragment(html);el.appendChild(frag);return el.lastChild;}else{el.innerHTML=html;return el.lastChild;}
case"afterend":range.setStartAfter(el);frag=range.createContextualFragment(html);el.parentNode.insertBefore(frag,el.nextSibling);return el.nextSibling;}
throw'Illegal insertion point -> "'+where+'"';};L5.DomHelper.insertBefore=function(el,o,returnElement){return this.doInsert(el,o,returnElement,"beforeBegin");};L5.DomHelper.insertAfter=function(el,o,returnElement){return this.doInsert(el,o,returnElement,"afterEnd","nextSibling");};L5.DomHelper.insertFirst=function(el,o,returnElement){return this.doInsert(el,o,returnElement,"afterBegin","firstChild");};L5.DomHelper.doInsert=function(el,o,returnElement,pos,sibling){el=L5.getDom(el);var newNode;if(this.useDom){newNode=createDom(o,null);(sibling==="firstChild"?el:el.parentNode).insertBefore(newNode,sibling?el[sibling]:el);}else{var html=createHtml(o);newNode=this.insertHtml(pos,el,html);}
return returnElement?L5.get(newNode,true):newNode;};L5.DomHelper.append=function(el,o,returnElement){el=L5.getDom(el);var newNode;if(this.useDom){newNode=createDom(o,null);el.appendChild(newNode);}else{var html=createHtml(o);newNode=this.insertHtml("beforeEnd",el,html);}
return returnElement?L5.get(newNode,true):newNode;};L5.DomHelper.overwrite=function(el,o,returnElement){el=L5.getDom(el);el.innerHTML=createHtml(o);return returnElement?L5.get(el.firstChild,true):el.firstChild;};L5.DomHelper.createTemplate=function(o){var html=createHtml(o);return new L5.Template(html);};})();

L5.DomQuery=function(){};(function(){var cache={},simpleCache={},valueCache={};var nonSpace=/\S/;var trimRe=/^\s+|\s+$/g;var tplRe=/\{(\d+)\}/g;var modeRe=/^(\s?[\/>+~]\s?|\s|$)/;var tagTokenRe=/^(#)?([\w-\*]+)/;var nthRe=/(\d*)n\+?(\d*)/,nthRe2=/\D/;function child(p,index){var i=0;var n=p.firstChild;while(n){if(n.nodeType==1){if(++i==index){return n;}}
n=n.nextSibling;}
return null;}
function next(n){while((n=n.nextSibling)&&n.nodeType!=1);return n;}
function prev(n){while((n=n.previousSibling)&&n.nodeType!=1);return n;}
function children(d){var n=d.firstChild,ni=-1;while(n){var nx=n.nextSibling;if(n.nodeType==3&&!nonSpace.test(n.nodeValue)){d.removeChild(n);}else{n.nodeIndex=++ni;}
n=nx;}
return this;}
function byClassName(c,a,v){if(!v){return c;}
var r=[],ri=-1,cn;for(var i=0,ci;ci=c[i];i++){if((' '+ci.className+' ').indexOf(v)!=-1){r[++ri]=ci;}}
return r;}
function attrValue(n,attr){if(!n.tagName&&typeof n.length!="undefined"){n=n[0];}
if(!n){return null;}
if(attr=="for"){return n.htmlFor;}
if(attr=="class"||attr=="className"){return n.className;}
return n.getAttribute(attr)||n[attr];}
function getNodes(ns,mode,tagName){var result=[],ri=-1,cs;if(!ns){return result;}
tagName=tagName||"*";if(typeof ns.getElementsByTagName!="undefined"){ns=[ns];}
if(!mode){for(var i=0,ni;ni=ns[i];i++){cs=ni.getElementsByTagName(tagName);for(var j=0,ci;ci=cs[j];j++){result[++ri]=ci;}}}else if(mode=="/"||mode==">"){var utag=tagName.toUpperCase();for(var i=0,ni,cn;ni=ns[i];i++){cn=ni.children||ni.childNodes;for(var j=0,cj;cj=cn[j];j++){if(cj.nodeName==utag||cj.nodeName==tagName||tagName=='*'){result[++ri]=cj;}}}}else if(mode=="+"){var utag=tagName.toUpperCase();for(var i=0,n;n=ns[i];i++){while((n=n.nextSibling)&&n.nodeType!=1);if(n&&(n.nodeName==utag||n.nodeName==tagName||tagName=='*')){result[++ri]=n;}}}else if(mode=="~"){for(var i=0,n;n=ns[i];i++){while((n=n.nextSibling)&&(n.nodeType!=1||(tagName=='*'||n.tagName.toLowerCase()!=tagName)));if(n){result[++ri]=n;}}}
return result;}
function concat(a,b){if(b.slice){return a.concat(b);}
for(var i=0,l=b.length;i<l;i++){a[a.length]=b[i];}
return a;}
function byTag(cs,tagName){if(cs.tagName||cs==document){cs=[cs];}
if(!tagName){return cs;}
var r=[],ri=-1;tagName=tagName.toLowerCase();for(var i=0,ci;ci=cs[i];i++){if(ci.nodeType==1&&ci.tagName.toLowerCase()==tagName){r[++ri]=ci;}}
return r;}
function byId(cs,attr,id){if(cs.tagName||cs==document){cs=[cs];}
if(!id){return cs;}
var r=[],ri=-1;for(var i=0,ci;ci=cs[i];i++){if(ci&&ci.id==id){r[++ri]=ci;return r;}}
return r;}
function byAttribute(cs,attr,value,op,custom){var r=[],ri=-1,st=custom=="{";var f=L5.DomQuery.operators[op];for(var i=0,ci;ci=cs[i];i++){var a;if(st){a=L5.DomQuery.getStyle(ci,attr);}else if(attr=="class"||attr=="className"){a=ci.className;}else if(attr=="for"){a=ci.htmlFor;}else if(attr=="href"){a=ci.getAttribute("href",2);}else{a=ci.getAttribute(attr);}
if((f&&f(a,value))||(!f&&(a===0?true:a))){r[++ri]=ci;}}
return r;}
function byPseudo(cs,name,value){return L5.DomQuery.pseudos[name](cs,value);}
var isIE=window.ActiveXObject?true:false;eval("var batch = 30803;");var key=30803;function nodupIEXml(cs){var d=++key;cs[0].setAttribute("_nodup",d);var r=[cs[0]];for(var i=1,len=cs.length;i<len;i++){var c=cs[i];if(!c.getAttribute("_nodup")!=d){c.setAttribute("_nodup",d);r[r.length]=c;}}
for(var i=0,len=cs.length;i<len;i++){cs[i].removeAttribute("_nodup");}
return r;}
function nodup(cs){if(!cs){return[];}
var len=cs.length,c,i,r=cs,cj,ri=-1;if(!len||typeof cs.nodeType!="undefined"||len==1){return cs;}
if(isIE&&typeof cs[0].selectSingleNode!="undefined"){return nodupIEXml(cs);}
var d=++key;cs[0]._nodup=d;for(i=1;c=cs[i];i++){if(c._nodup!=d){c._nodup=d;}else{r=[];for(var j=0;j<i;j++){r[++ri]=cs[j];}
for(j=i+1;cj=cs[j];j++){if(cj._nodup!=d){cj._nodup=d;r[++ri]=cj;}}
return r;}}
return r;}
function quickDiffIEXml(c1,c2){var d=++key;for(var i=0,len=c1.length;i<len;i++){c1[i].setAttribute("_qdiff",d);}
var r=[];for(var i=0,len=c2.length;i<len;i++){if(c2[i].getAttribute("_qdiff")!=d){r[r.length]=c2[i];}}
for(var i=0,len=c1.length;i<len;i++){c1[i].removeAttribute("_qdiff");}
return r;}
function quickDiff(c1,c2){var len1=c1.length;if(!len1){return c2;}
if(isIE&&c1[0].selectSingleNode){return quickDiffIEXml(c1,c2);}
var d=++key;for(var i=0;i<len1;i++){c1[i]._qdiff=d;}
var r=[];for(var i=0,len=c2.length;i<len;i++){if(c2[i]._qdiff!=d){r[r.length]=c2[i];}}
return r;}
function quickId(ns,mode,root,id){if(ns==root){var d=root.ownerDocument||root;return d.getElementById(id);}
ns=getNodes(ns,mode,"*");return byId(ns,null,id);}
L5.DomQuery.matchers=[{re:/^\.([\w-]+)/,select:'n = byClassName(n, null, " {1} ");'},{re:/^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,select:'n = byPseudo(n, "{1}", "{2}");'},{re:/^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,select:'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'},{re:/^#([\w-]+)/,select:'n = byId(n, null, "{1}");'},{re:/^@([\w-]+)/,select:'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'}];L5.DomQuery.operators={"=":function(a,v){return a==v;},"!=":function(a,v){return a!=v;},"^=":function(a,v){return a&&a.substr(0,v.length)==v;},"$=":function(a,v){return a&&a.substr(a.length-v.length)==v;},"*=":function(a,v){return a&&a.indexOf(v)!==-1;},"%=":function(a,v){return(a%v)==0;},"|=":function(a,v){return a&&(a==v||a.substr(0,v.length+1)==v+'-');},"~=":function(a,v){return a&&(' '+a+' ').indexOf(' '+v+' ')!=-1;}};L5.DomQuery.pseudos={"first-child":function(c){var r=[],ri=-1,n;for(var i=0,ci;ci=n=c[i];i++){while((n=n.previousSibling)&&n.nodeType!=1);if(!n){r[++ri]=ci;}}
return r;},"last-child":function(c){var r=[],ri=-1,n;for(var i=0,ci;ci=n=c[i];i++){while((n=n.nextSibling)&&n.nodeType!=1);if(!n){r[++ri]=ci;}}
return r;},"nth-child":function(c,a){var r=[],ri=-1;var m=nthRe.exec(a=="even"&&"2n"||a=="odd"&&"2n+1"||!nthRe2.test(a)&&"n+"+a||a);var f=(m[1]||1)-0,l=m[2]-0;for(var i=0,n;n=c[i];i++){var pn=n.parentNode;if(batch!=pn._batch){var j=0;for(var cn=pn.firstChild;cn;cn=cn.nextSibling){if(cn.nodeType==1){cn.nodeIndex=++j;}}
pn._batch=batch;}
if(f==1){if(l==0||n.nodeIndex==l){r[++ri]=n;}}else if((n.nodeIndex+l)%f==0){r[++ri]=n;}}
return r;},"only-child":function(c){var r=[],ri=-1;;for(var i=0,ci;ci=c[i];i++){if(!prev(ci)&&!next(ci)){r[++ri]=ci;}}
return r;},"empty":function(c){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var cns=ci.childNodes,j=0,cn,empty=true;while(cn=cns[j]){++j;if(cn.nodeType==1||cn.nodeType==3){empty=false;break;}}
if(empty){r[++ri]=ci;}}
return r;},"contains":function(c,v){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if((ci.textContent||ci.innerText||'').indexOf(v)!=-1){r[++ri]=ci;}}
return r;},"nodeValue":function(c,v){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(ci.firstChild&&ci.firstChild.nodeValue==v){r[++ri]=ci;}}
return r;},"checked":function(c){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(ci.checked==true){r[++ri]=ci;}}
return r;},"not":function(c,ss){return L5.DomQuery.filter(c,ss,true);},"any":function(c,selectors){var ss=selectors.split('|');var r=[],ri=-1,s;for(var i=0,ci;ci=c[i];i++){for(var j=0;s=ss[j];j++){if(L5.DomQuery.is(ci,s)){r[++ri]=ci;break;}}}
return r;},"odd":function(c){return this["nth-child"](c,"odd");},"even":function(c){return this["nth-child"](c,"even");},"nth":function(c,a){return c[a-1]||[];},"first":function(c){return c[0]||[];},"last":function(c){return c[c.length-1]||[];},"has":function(c,ss){var s=L5.DomQuery.select;var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(s(ss,ci).length>0){r[++ri]=ci;}}
return r;},"next":function(c,ss){var is=L5.DomQuery.is;var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var n=next(ci);if(n&&is(n,ss)){r[++ri]=ci;}}
return r;},"prev":function(c,ss){var is=L5.DomQuery.is;var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var n=prev(ci);if(n&&is(n,ss)){r[++ri]=ci;}}
return r;}};L5.DomQuery.getStyle=function(el,name){return L5.fly(el).getStyle(name);};L5.DomQuery.compile=function(path,type){type=type||"select";var fn=["var f = function(root){\n var mode; ++batch; var n = root || document;\n"];var q=path,mode,lq;var tk=L5.DomQuery.matchers;var tklen=tk.length;var mm;var lmode=q.match(modeRe);if(lmode&&lmode[1]){fn[fn.length]='mode="'+lmode[1].replace(trimRe,"")+'";';q=q.replace(lmode[1],"");}
while(path.substr(0,1)=="/"){path=path.substr(1);}
while(q&&lq!=q){lq=q;var tm=q.match(tagTokenRe);if(type=="select"){if(tm){if(tm[1]=="#"){fn[fn.length]='n = quickId(n, mode, root, "'+tm[2]
+'");';}else{fn[fn.length]='n = getNodes(n, mode, "'+tm[2]
+'");';}
q=q.replace(tm[0],"");}else if(q.substr(0,1)!='@'){fn[fn.length]='n = getNodes(n, mode, "*");';}}else{if(tm){if(tm[1]=="#"){fn[fn.length]='n = byId(n, null, "'+tm[2]+'");';}else{fn[fn.length]='n = byTag(n, "'+tm[2]+'");';}
q=q.replace(tm[0],"");}}
while(!(mm=q.match(modeRe))){var matched=false;for(var j=0;j<tklen;j++){var t=tk[j];var m=q.match(t.re);if(m){fn[fn.length]=t.select.replace(tplRe,function(x,i){return m[i];});q=q.replace(m[0],"");matched=true;break;}}
if(!matched){throw'Error parsing selector, parsing failed at "'+q
+'"';}}
if(mm[1]){fn[fn.length]='mode="'+mm[1].replace(trimRe,"")+'";';q=q.replace(mm[1],"");}}
fn[fn.length]="return nodup(n);\n}";eval(fn.join(""));return f;};L5.DomQuery.select=function(path,root,type){if(!root||root==document){root=document;}
if(typeof root=="string"){root=document.getElementById(root);}
var paths=path.split(",");var results=[];for(var i=0,len=paths.length;i<len;i++){var p=paths[i].replace(trimRe,"");if(!cache[p]){cache[p]=L5.DomQuery.compile(p);if(!cache[p]){throw p+" is not a valid selector";}}
var result=cache[p](root);if(result&&result!=document){results=results.concat(result);}}
if(paths.length>1){return nodup(results);}
return results;};L5.DomQuery.selectNode=function(path,root){return L5.DomQuery.select(path,root)[0];};L5.DomQuery.selectValue=function(path,root,defaultValue){path=path.replace(trimRe,"");if(!valueCache[path]){valueCache[path]=L5.DomQuery.compile(path,"select");}
var n=valueCache[path](root);n=n[0]?n[0]:n;var browser=navigator.userAgent.toLowerCase();var v=null;if(browser.indexOf("chrome")!=-1&&n.length!=0){if(n.firstChild){v=(n&&n.firstChild?n.firstChild.nodeValue:null);}else
v=n.nextSibling.data.trim();}else
v=(n&&n.firstChild?n.firstChild.nodeValue:null);return((v===null||v===undefined||v==='')?defaultValue:v);};L5.DomQuery.selectNumber=function(path,root,defaultValue){var v=L5.DomQuery.selectValue(path,root,defaultValue||0);return parseFloat(v);};L5.DomQuery.is=function(el,ss){if(typeof el=="string"){el=document.getElementById(el);}
var isArray=L5.isArray(el);var result=L5.DomQuery.filter(isArray?el:[el],ss);return isArray?(result.length==el.length):(result.length>0);};L5.DomQuery.filter=function(els,ss,nonMatches){ss=ss.replace(trimRe,"");if(!simpleCache[ss]){simpleCache[ss]=L5.DomQuery.compile(ss,"simple");}
var result=simpleCache[ss](els);return nonMatches?quickDiff(result,els):result;};})();L5.query=L5.DomQuery.select;

L5.Element=function(element,forceNew){var dom=typeof element=="string"?document.getElementById(element):element;if(!dom){return null;}
var id=dom.id;if(forceNew!==true&&id&&L5.Element.cache[id]){return L5.Element.cache[id];}
this.dom=dom;this.id=id||L5.id(dom);};(function(){var D=L5.lib.Dom;var E=L5.lib.Event;var A=L5.lib.Anim;var noBoxAdjust=L5.isStrict?{select:1}:{input:1,select:1,textarea:1};if(L5.isIE||L5.isGecko){noBoxAdjust['button']=1;}
var El=L5.Element;var unitPattern=/\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i;L5.Element.prototype={defaultUnit:"px",autoBoxAdjust:true,is:function(simpleSelector){return L5.DomQuery.is(this.dom,simpleSelector);},clean:function(forceReclean){if(this.isCleaned&&forceReclean!==true){return this;}
var ns=/\S/;var d=this.dom,n=d.firstChild,ni=-1;while(n){var nx=n.nextSibling;if(n.nodeType==3&&!ns.test(n.nodeValue)){d.removeChild(n);}else{n.nodeIndex=++ni;}
n=nx;}
this.isCleaned=true;return this;},contains:function(el){try{return!el?false:L5.lib.Dom.isAncestor(this.dom,el.dom?el.dom:el);}catch(e){return false;}},select:function(selector,unique){return El.select(selector,unique,this.dom);},focus:function(){try{this.dom.focus();}catch(e){}
return this;},blur:function(){try{this.dom.blur();}catch(e){}
return this;},getValue:function(asNumber){return asNumber?parseInt(this.dom.value,10):this.dom.value;},setValue:function(value){if(!value){return;}
this.dom.value=value;},addListener:function(eventName,fn,scope,options){L5.EventManager.on(this.dom,eventName,fn,scope||this,options);},removeListener:function(eventName,fn,scope){L5.EventManager.removeListener(this.dom,eventName,fn,scope||this);return this;},removeAllListeners:function(){L5.EventManager.removeAll(this.dom);return this;},relayEvent:function(eventName,observable){this.on(eventName,function(e){observable.fireEvent(eventName,e);});},addUnits:function(v){if(v===""||v=="auto"){return v;}
if(v===undefined){return'';}
if(typeof v=="number"||!unitPattern.test(v)){return v+(this.defaultUnit||'px');}
return v;},update:function(html,loadScripts,callback){if(typeof html=="undefined"){html="";}
if(loadScripts!==true){this.dom.innerHTML=html;if(typeof callback=="function"){callback();}
return this;}
var id=L5.id();var dom=this.dom;html+='<span id="'+id+'"></span>';E.onAvailable(id,function(){var hd=document.getElementsByTagName("head")[0];var re=/(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;var srcRe=/\ssrc=([\'\"])(.*?)\1/i;var typeRe=/\stype=([\'\"])(.*?)\1/i;var match;var scriptstring="";while(match=re.exec(html)){var attrs=match[1];var srcMatch=attrs?attrs.match(srcRe):false;if(srcMatch&&srcMatch[2]){if(typeof callback=="object"){L5.Ajax.request({url:srcMatch[2],sync:true,success:function(rep){scriptstring+=rep.responseText;}});}else{var s=document.createElement("script");s.src=srcMatch[2];var typeMatch=attrs.match(typeRe);if(typeMatch&&typeMatch[2]){s.type=typeMatch[2];}
hd.appendChild(s);}}else if(match[2]&&match[2].length>0){scriptstring+=match[2];}}
if(scriptstring.length>0)
if(window.execScript){if(typeof callback=="object"){try{var f=Function(scriptstring);f.apply(callback);}catch(e){if(L5.widgetDebug){var exp="";if(callback.header!=null){exp="Erring widget:"
+callback.header.dom.innerText
+"\n";}
alert(exp+"Error type:  "+e.name
+"\nMessage:  "+e.message);}}}else{window.execScript(scriptstring);}}else{if(typeof callback=="object"){try{var f=Function(scriptstring);f.apply(callback);}catch(e){if(L5.widgetDebug){var exp="";if(callback.header!=null){exp="Erring widget:"
+callback.header.dom.innerText
+"\n";}
alert(exp+"Error type:  "+e.name
+"\nMessage:  "+e.message);}}}else{window.eval(scriptstring);}}
var el=document.getElementById(id);if(el){L5.removeNode(el);}
if(typeof callback=="function"){callback();}});dom.innerHTML=html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,"");return this;},load:function(){var um=this.getUpdater();um.update.apply(um,arguments);return this;},getUpdater:function(){if(!this.updateManager){this.updateManager=new L5.Updater(this);}
return this.updateManager;},isBorderBox:function(){return noBoxAdjust[this.dom.tagName.toLowerCase()]||L5.isBorderBox;},createProxy:function(config,renderTo,matchBox){config=typeof config=="object"?config:{tag:"div",cls:config};var proxy;if(renderTo){proxy=L5.DomHelper.append(renderTo,config,true);}else{proxy=L5.DomHelper.insertBefore(this.dom,config,true);}
if(matchBox){proxy.setBox(this.getBox());}
return proxy;},remove:function(){L5.removeNode(this.dom);delete El.cache[this.dom.id];},hover:function(overFn,outFn,scope){var preOverFn=function(e){if(!e.within(this,true)){overFn.apply(scope||this,arguments);}};var preOutFn=function(e){if(!e.within(this,true)){outFn.apply(scope||this,arguments);}};this.on("mouseover",preOverFn,this.dom);this.on("mouseout",preOutFn,this.dom);return this;},swallowEvent:function(eventName,preventDefault){var fn=function(e){e.stopPropagation();if(preventDefault){e.preventDefault();}};if(L5.isArray(eventName)){for(var i=0,len=eventName.length;i<len;i++){this.on(eventName[i],fn);}
return this;}
this.on(eventName,fn);return this;},set:function(o,useSet){var el=this.dom;useSet=typeof useSet=='undefined'?(el.setAttribute?true:false):useSet;for(var attr in o){if(attr=="style"||typeof o[attr]=="function")
continue;if(attr=="cls"){el.className=o["cls"];}else if(o.hasOwnProperty(attr)){if(useSet)
el.setAttribute(attr,o[attr]);else
el[attr]=o[attr];}}
if(o.style){L5.DomHelper.applyStyles(el,o.style);}
return this;},getAttributeNS:L5.isIE?function(ns,name){var d=this.dom;var type=typeof d[ns+":"+name];if(type!='undefined'&&type!='unknown'){return d[ns+":"+name];}
return d[name];}:function(ns,name){var d=this.dom;return d.getAttributeNS(ns,name)||d.getAttribute(ns+":"+name)||d.getAttribute(name)||d[name];},getTextWidth:function(text,min,max){return(L5.util.TextMetrics.measure(this.dom,L5.value(text,this.dom.innerHTML,true)).width).constrain(min||0,max||1000000);}};})();L5.Element.prototype.on=L5.Element.prototype.addListener;L5.Element.prototype.un=L5.Element.prototype.removeListener;

(function(){var D=L5.lib.Dom;L5.Element.prototype.getAnchorXY=function(anchor,local,s){var w,h,vp=false;if(!s){var d=this.dom;if(d==document.body||d==document){vp=true;w=D.getViewWidth();h=D.getViewHeight();}else{w=this.getWidth();h=this.getHeight();}}else{w=s.width;h=s.height;}
var x=0,y=0,r=Math.round;switch((anchor||"tl").toLowerCase()){case"c":x=r(w*.5);y=r(h*.5);break;case"t":x=r(w*.5);y=0;break;case"l":x=0;y=r(h*.5);break;case"r":x=w;y=r(h*.5);break;case"b":x=r(w*.5);y=h;break;case"tl":x=0;y=0;break;case"bl":x=0;y=h;break;case"br":x=w;y=h;break;case"tr":x=w;y=0;break;}
if(local===true){return[x,y];}
if(vp){var sc=this.getScroll();return[x+sc.left,y+sc.top];}
var o=this.getXY();return[x+o[0],y+o[1]];};L5.Element.prototype.getAlignToXY=function(el,p,o){el=L5.get(el);if(!el||!el.dom){throw"Element.alignToXY with an element that doesn't exist";}
var d=this.dom;var c=false;var p1="",p2="";o=o||[0,0];if(!p){p="tl-bl";}else if(p=="?"){p="tl-bl?";}else if(p.indexOf("-")==-1){p="tl-"+p;}
p=p.toLowerCase();var m=p.match(/^([a-z]+)-([a-z]+)(\?)?$/);if(!m){throw"Element.alignTo with an invalid alignment "+p;}
p1=m[1];p2=m[2];c=!!m[3];var a1=this.getAnchorXY(p1,true);var a2=el.getAnchorXY(p2,false);var x=a2[0]-a1[0]+o[0];var y=a2[1]-a1[1]+o[1];if(c){var w=this.getWidth(),h=this.getHeight(),r=el.getRegion();var dw=D.getViewWidth()-5,dh=D.getViewHeight()-5;var p1y=p1.charAt(0),p1x=p1.charAt(p1.length-1);var p2y=p2.charAt(0),p2x=p2.charAt(p2.length-1);var swapY=((p1y=="t"&&p2y=="b")||(p1y=="b"&&p2y=="t"));var swapX=((p1x=="r"&&p2x=="l")||(p1x=="l"&&p2x=="r"));var doc=document;var scrollX=(doc.documentElement.scrollLeft||doc.body.scrollLeft||0)+5;var scrollY=(doc.documentElement.scrollTop||doc.body.scrollTop||0)+5;if((x+w)>dw+scrollX){x=swapX?r.left-w:dw+scrollX-w;}
if(x<scrollX){x=swapX?r.right:scrollX;}
if((y+h)>dh+scrollY){y=swapY?r.top-h:dh+scrollY-h;}
if(y<scrollY){y=swapY?r.bottom:scrollY;}}
return[x,y];};L5.Element.prototype.getConstrainToXY=function(){var os={top:0,left:0,bottom:0,right:0};return function(el,local,offsets,proposedXY){el=L5.get(el);offsets=offsets?L5.applyIf(offsets,os):os;var vw,vh,vx=0,vy=0;if(el.dom==document.body||el.dom==document){vw=L5.lib.Dom.getViewWidth();vh=L5.lib.Dom.getViewHeight();}else{vw=el.dom.clientWidth;vh=el.dom.clientHeight;if(!local){var vxy=el.getXY();vx=vxy[0];vy=vxy[1];}}
var s=el.getScroll();vx+=offsets.left+s.left;vy+=offsets.top+s.top;vw-=offsets.right;vh-=offsets.bottom;var vr=vx+vw;var vb=vy+vh;var xy=proposedXY||(!local?this.getXY():[this.getLeft(true),this.getTop(true)]);var x=xy[0],y=xy[1];var w=this.dom.offsetWidth,h=this.dom.offsetHeight;var moved=false;if((x+w)>vr){x=vr-w;moved=true;}
if((y+h)>vb){y=vb-h;moved=true;}
if(x<vx){x=vx;moved=true;}
if(y<vy){y=vy;moved=true;}
return moved?[x,y]:false;};}();L5.Element.prototype.adjustForConstraints=function(xy,parent,offsets){return this.getConstrainToXY(parent||document,false,offsets,xy)||xy;};L5.Element.prototype.alignTo=function(element,position,offsets,animate){var xy=this.getAlignToXY(element,position,offsets);this.setXY(xy,this.preanim(arguments,3));return this;};L5.Element.prototype.anchorTo=function(el,alignment,offsets,animate,monitorScroll,callback){var action=function(){this.alignTo(el,alignment,offsets,animate);L5.callback(callback,this);};L5.EventManager.onWindowResize(action,this);var tm=typeof monitorScroll;if(tm!='undefined'){L5.EventManager.on(window,'scroll',action,this,{buffer:tm=='number'?monitorScroll:50});}
action.call(this);return this;};L5.Element.prototype.getCenterXY=function(){return this.getAlignToXY(document,'c-c');},L5.Element.prototype.center=function(centerIn){this.alignTo(centerIn||document,'c-c');return this;};})();

(function(){var El=L5.Element;L5.Element.VISIBILITY=1;L5.Element.DISPLAY=2;L5.Element.prototype.originalDisplay="";L5.Element.prototype.visibilityMode=1;L5.Element.prototype.setVisibilityMode=function(visMode){this.visibilityMode=visMode;return this;};L5.Element.prototype.setVisible=function(visible,animate){if(!animate||!A){if(this.visibilityMode==El.DISPLAY){this.setDisplayed(visible);}else{this.fixDisplay();this.dom.style.visibility=visible?"visible":"hidden";}}else{var dom=this.dom;var visMode=this.visibilityMode;if(visible){this.setOpacity(.01);this.setVisible(true);}
this.anim({opacity:{to:(visible?1:0)}},this.preanim(arguments,1),null,.35,'easeIn',function(){if(!visible){if(visMode==El.DISPLAY){dom.style.display="none";}else{dom.style.visibility="hidden";}
L5.get(dom).setOpacity(1);}});}
return this;};L5.Element.prototype.isVisible=function(deep){var vis=!(this.getStyle("visibility")=="hidden"||this.getStyle("display")=="none");if(deep!==true||!vis){return vis;}
var p=this.dom.parentNode;while(p&&p.tagName.toLowerCase()!="body"){if(!L5.fly(p,'_isVisible').isVisible()){return false;}
p=p.parentNode;}
return true;};L5.Element.prototype.toggle=function(animate){this.setVisible(!this.isVisible(),this.preanim(arguments,0));return this;};L5.Element.prototype.setDisplayed=function(value){if(typeof value=="boolean"){value=value?this.originalDisplay:"none";}
this.setStyle("display",value);return this;};L5.Element.prototype.fixDisplay=function(){if(this.getStyle("display")=="none"){this.setStyle("visibility","hidden");this.setStyle("display",this.originalDisplay);if(this.getStyle("display")=="none"){this.setStyle("display","block");}}};L5.Element.prototype.hide=function(animate){this.setVisible(false,this.preanim(arguments,0));return this;};L5.Element.prototype.show=function(animate){this.setVisible(true,this.preanim(arguments,0));return this;};L5.Element.prototype.isDisplayed=function(){return this.getStyle("display")!="none";};L5.Element.prototype.enableDisplayMode=function(display){this.setVisibilityMode(El.DISPLAY);if(typeof display!="undefined")
this.originalDisplay=display;return this;};L5.Element.prototype.mask=function(msg,msgCls){if(this.getStyle("position")=="static"){this.addClass("l-masked-relative");}
if(this._maskMsg){this._maskMsg.remove();}
if(this._mask){this._mask.remove();}
this._mask=L5.DomHelper.append(this.dom,{cls:"L5-el-mask"},true);this.addClass("l-masked");this._mask.setDisplayed(true);if(typeof msg=='string'){this._maskMsg=L5.DomHelper.append(this.dom,{cls:"L5-el-mask-msg",cn:{tag:'div'}},true);var mm=this._maskMsg;mm.dom.className=msgCls?"L5-el-mask-msg "+msgCls:"L5-el-mask-msg";mm.dom.firstChild.innerHTML=msg;mm.setDisplayed(true);mm.center(this);}
if(L5.isIE&&!(L5.isIE7&&L5.isStrict)&&this.getStyle('height')=='auto'){this._mask.setSize(this.getWidth(),this.getHeight());}
return this._mask;};L5.Element.prototype.unmask=function(){if(this._mask){if(this._maskMsg){this._maskMsg.remove();delete this._maskMsg;}
this._mask.remove();delete this._mask;}
this.removeClass(["l-masked","l-masked-relative"]);};L5.Element.prototype.isMasked=function(){return this._mask&&this._mask.isVisible();};L5.Element.prototype.createShim=function(){var el=document.createElement('iframe');el.frameBorder='0';el.className='L5-shim';if(L5.isIE&&L5.isSecure){el.src=L5.SSL_SECURE_URL;}
var shim=L5.get(this.dom.parentNode.insertBefore(el,this.dom));shim.autoBoxAdjust=false;return shim;};})();

L5.Element.prototype.addKeyListener=function(key,fn,scope){var config;if(typeof key!="object"||L5.isArray(key)){config={key:key,fn:fn,scope:scope};}else{config={key:key.key,shift:key.shift,ctrl:key.ctrl,alt:key.alt,fn:fn,scope:scope};}
return new L5.KeyMap(this,config);};L5.Element.prototype.addKeyMap=function(config){return new L5.KeyMap(this,config);};

(function(){var D=L5.lib.Dom;var A=L5.lib.Anim;L5.Element.prototype.getX=function(){return D.getX(this.dom);};L5.Element.prototype.getY=function(){return D.getY(this.dom);};L5.Element.prototype.getXY=function(){return D.getXY(this.dom);};L5.Element.prototype.getOffsetsTo=function(el){var o=this.getXY();var e=L5.fly(el,'_internal').getXY();return[o[0]-e[0],o[1]-e[1]];};L5.Element.prototype.setX=function(x,animate){if(!animate||!A){D.setX(this.dom,x);}else{this.setXY([x,this.getY()],this.preanim(arguments,1));}
return this;};L5.Element.prototype.setY=function(y,animate){if(!animate||!A){D.setY(this.dom,y);}else{this.setXY([this.getX(),y],this.preanim(arguments,1));}
return this;};L5.Element.prototype.setLeft=function(left){this.setStyle("left",this.addUnits(left));return this;};L5.Element.prototype.setTop=function(top){this.setStyle("top",this.addUnits(top));return this;};L5.Element.prototype.setRight=function(right){this.setStyle("right",this.addUnits(right));return this;};L5.Element.prototype.setBottom=function(bottom){this.setStyle("bottom",this.addUnits(bottom));return this;};L5.Element.prototype.setXY=function(pos,animate){if(!animate||!A){D.setXY(this.dom,pos);}else{this.anim({points:{to:pos}},this.preanim(arguments,1),'motion');}
return this;};L5.Element.prototype.setLocation=function(x,y,animate){this.setXY([x,y],this.preanim(arguments,2));return this;};L5.Element.prototype.getLeft=function(local){if(!local){return this.getX();}else{return parseInt(this.getStyle("left"),10)||0;}};L5.Element.prototype.getRight=function(local){if(!local){return this.getX()+this.getWidth();}else{return(this.getLeft(true)+this.getWidth())||0;}};L5.Element.prototype.getTop=function(local){if(!local){return this.getY();}else{return parseInt(this.getStyle("top"),10)||0;}};L5.Element.prototype.getBottom=function(local){if(!local){return this.getY()+this.getHeight();}else{return(this.getTop(true)+this.getHeight())||0;}};L5.Element.prototype.position=function(pos,zIndex,x,y){if(!pos){if(this.getStyle('position')=='static'){this.setStyle('position','relative');}}else{this.setStyle("position",pos);}
if(zIndex){this.setStyle("z-index",zIndex);}
if(x!==undefined&&y!==undefined){this.setXY([x,y]);}else if(x!==undefined){this.setX(x);}else if(y!==undefined){this.setY(y);}};L5.Element.prototype.clearPositioning=function(value){value=value||'';this.setStyle({"left":value,"right":value,"top":value,"bottom":value,"z-index":"","position":"static"});return this;};L5.Element.prototype.getPositioning=function(){var l=this.getStyle("left");var t=this.getStyle("top");return{"position":this.getStyle("position"),"left":l,"right":l?"":this.getStyle("right"),"top":t,"bottom":t?"":this.getStyle("bottom"),"z-index":this.getStyle("z-index")};};L5.Element.prototype.moveTo=function(x,y,animate){this.setXY([x,y],this.preanim(arguments,2));return this;};L5.Element.prototype.translatePoints=function(x,y){if(typeof x=='object'||L5.isArray(x)){y=x[1];x=x[0];}
var p=this.getStyle('position');var o=this.getXY();var l=parseInt(this.getStyle('left'),10);var t=parseInt(this.getStyle('top'),10);if(isNaN(l)){l=(p=="relative")?0:this.dom.offsetLeft;}
if(isNaN(t)){t=(p=="relative")?0:this.dom.offsetTop;}
return{left:(x-o[0]+l),top:(y-o[1]+t)};};L5.Element.prototype.setLeftTop=function(left,top){this.dom.style.left=this.addUnits(left);this.dom.style.top=this.addUnits(top);return this;};L5.Element.prototype.getBox=function(contentBox,local){var xy;if(!local){xy=this.getXY();}else{var left=parseInt(this.getStyle("left"),10)||0;var top=parseInt(this.getStyle("top"),10)||0;xy=[left,top];}
var el=this.dom,w=el.offsetWidth,h=el.offsetHeight,bx;if(!contentBox){bx={x:xy[0],y:xy[1],0:xy[0],1:xy[1],width:w,height:h};}else{var l=this.getBorderWidth("l")+this.getPadding("l");var r=this.getBorderWidth("r")+this.getPadding("r");var t=this.getBorderWidth("t")+this.getPadding("t");var b=this.getBorderWidth("b")+this.getPadding("b");bx={x:xy[0]+l,y:xy[1]+t,0:xy[0]+l,1:xy[1]+t,width:w-(l+r),height:h-(t+b)};}
bx.right=bx.x+bx.width;bx.bottom=bx.y+bx.height;return bx;};L5.Element.prototype.setBox=function(box,adjust,animate){var w=box.width,h=box.height;if((adjust&&!this.autoBoxAdjust)&&!this.isBorderBox()){w-=(this.getBorderWidth("lr")+this.getPadding("lr"));h-=(this.getBorderWidth("tb")+this.getPadding("tb"));}
this.setBounds(box.x,box.y,w,h,this.preanim(arguments,2));return this;};L5.Element.prototype.getRegion=function(){return D.getRegion(this.dom);};L5.Element.prototype.setBounds=function(x,y,width,height,animate){if(!animate||!A){this.setSize(width,height);this.setLocation(x,y);}else{width=this.adjustWidth(width);height=this.adjustHeight(height);this.anim({points:{to:[x,y]},width:{to:width},height:{to:height}},this.preanim(arguments,4),'motion');}
return this;};L5.Element.prototype.setPositioning=function(pc){this.applyStyles(pc);if(pc.right=="auto"){this.dom.style.right="";}
if(pc.bottom=="auto"){this.dom.style.bottom="";}
return this;};L5.Element.prototype.setRegion=function(region,animate){this.setBounds(region.left,region.top,region.right-region.left,region.bottom-region.top,this.preanim(arguments,1));return this;};L5.Element.prototype.move=function(direction,distance,animate){var xy=this.getXY();direction=direction.toLowerCase();switch(direction){case"l":case"left":this.moveTo(xy[0]-distance,xy[1],this.preanim(arguments,2));break;case"r":case"right":this.moveTo(xy[0]+distance,xy[1],this.preanim(arguments,2));break;case"t":case"top":case"up":this.moveTo(xy[0],xy[1]-distance,this.preanim(arguments,2));break;case"b":case"bottom":case"down":this.moveTo(xy[0],xy[1]+distance,this.preanim(arguments,2));break;}
return this;};})();

L5.Element.prototype.isScrollable=function(){var dom=this.dom;return dom.scrollHeight>dom.clientHeight||dom.scrollWidth>dom.clientWidth;};L5.Element.prototype.scrollTo=function(side,value,animate){var prop=side.toLowerCase()=="left"?"scrollLeft":"scrollTop";if(!animate||!L5.lib.Anim){this.dom[prop]=value;}else{var to=prop=="scrollLeft"?[value,this.dom.scrollTop]:[this.dom.scrollLeft,value];this.anim({scroll:{"to":to}},this.preanim(arguments,2),'scroll');}
return this;};L5.Element.prototype.scroll=function(direction,distance,animate){if(!this.isScrollable()){return;}
var el=this.dom;var l=el.scrollLeft,t=el.scrollTop;var w=el.scrollWidth,h=el.scrollHeight;var cw=el.clientWidth,ch=el.clientHeight;direction=direction.toLowerCase();var scrolled=false;var a=this.preanim(arguments,2);switch(direction){case"l":case"left":if(w-l>cw){var v=Math.min(l+distance,w-cw);this.scrollTo("left",v,a);scrolled=true;}
break;case"r":case"right":if(l>0){var v=Math.max(l-distance,0);this.scrollTo("left",v,a);scrolled=true;}
break;case"t":case"top":case"up":if(t>0){var v=Math.max(t-distance,0);this.scrollTo("top",v,a);scrolled=true;}
break;case"b":case"bottom":case"down":if(h-t>ch){var v=Math.min(t+distance,h-ch);this.scrollTo("top",v,a);scrolled=true;}
break;}
return scrolled;};L5.Element.prototype.getScroll=function(){var d=this.dom,doc=document;if(d==doc||d==doc.body){var l,t;if(L5.isIE&&L5.isStrict){l=doc.documentElement.scrollLeft||(doc.body.scrollLeft||0);t=doc.documentElement.scrollTop||(doc.body.scrollTop||0);}else{l=window.pageXOffset||(doc.body.scrollLeft||0);t=window.pageYOffset||(doc.body.scrollTop||0);}
return{left:l,top:t};}else{return{left:d.scrollLeft,top:d.scrollTop};}};L5.Element.prototype.scrollIntoView=function(container,hscroll){var c=L5.getDom(container)||L5.getBody().dom;var el=this.dom;var o=this.getOffsetsTo(c),l=o[0]+c.scrollLeft,t=o[1]
+c.scrollTop,b=t+el.offsetHeight,r=l+el.offsetWidth;var ch=c.clientHeight;var ct=parseInt(c.scrollTop,10);var cl=parseInt(c.scrollLeft,10);var cb=ct+ch;var cr=cl+c.clientWidth;if(el.offsetHeight>ch||t<ct){c.scrollTop=t;}else if(b>cb){c.scrollTop=b-ch;}
c.scrollTop=c.scrollTop;if(hscroll!==false){if(el.offsetWidth>c.clientWidth||l<cl){c.scrollLeft=l;}else if(r>cr){c.scrollLeft=r-c.clientWidth;}
c.scrollLeft=c.scrollLeft;}
return this;};L5.Element.prototype.scrollChildIntoView=function(child,hscroll){L5.fly(child,'_scrollChildIntoView').scrollIntoView(this,hscroll);};

(function(){var El=L5.Element;L5.Element.cache={};var docEl;L5.Element.get=function(el){var ex,elm,id;if(!el){return null;}
if(typeof el=="string"){if(!(elm=document.getElementById(el))){return null;}
if(ex=El.cache[el]){ex.dom=elm;}else{ex=El.cache[el]=new El(elm);}
return ex;}else if(el.tagName){if(!(id=el.id)){id=L5.id(el);}
if(ex=El.cache[id]){ex.dom=el;}else{ex=El.cache[id]=new El(el);}
return ex;}else if(el instanceof El){if(el!=docEl){el.dom=document.getElementById(el.id)||el.dom;El.cache[el.id]=el;}
return el;}else if(el.isComposite){return el;}else if(L5.isArray(el)){return El.select(el);}else if(el==document){if(!docEl){var f=function(){};f.prototype=El.prototype;docEl=new f();docEl.dom=document;}
return docEl;}
return null;};L5.Element.uncache=function(el){for(var i=0,a=arguments,len=a.length;i<len;i++){if(a[i]){delete El.cache[a[i].id||a[i]];}}};var garbageCollect=function(){if(!L5.enableGarbageCollector){clearInterval(El.collectorThread);return;}
for(var eid in El.cache){var el=El.cache[eid],d=el.dom;if(!d||!d.parentNode||(!d.offsetParent&&!document.getElementById(eid))){delete El.cache[eid];if(d&&L5.enableListenerCollection){L5.EventManager.removeAll(d);}}}}
L5.Element.collectorThreadId=setInterval(garbageCollect,30000);var flyFn=function(){};flyFn.prototype=El.prototype;var _cls=new flyFn();L5.Element.Flyweight=function(dom){this.dom=dom;};L5.Element.Flyweight.prototype=_cls;L5.Element.Flyweight.prototype.isFlyweight=true;L5.Element._flyweights={};L5.Element.fly=function(el,name){named=name||'_global';el=L5.getDom(el);if(!el){return null;}
if((El._flyweights!=undefined)&&!El._flyweights[named]){El._flyweights[named]=new El.Flyweight();}
if((El._flyweights!=undefined)&&(El._flyweights[named]!=undefined))
El._flyweights[named].dom=el;if((El._flyweights!=undefined)&&(El._flyweights[named]!=undefined)){return El._flyweights[named];}else{return null;}};L5.get=El.get;L5.fly=El.fly;L5.EventManager.on(window,'unload',function(){delete El.cache;delete El._flyweights;});})();

(function(){var D=L5.lib.Dom;var A=L5.lib.Anim;var camelRe=/(-[a-z])/gi;var camelFn=function(m,a){return a.charAt(1).toUpperCase();};var view=document.defaultView;var borders={l:"border-left-width",r:"border-right-width",t:"border-top-width",b:"border-bottom-width"};var paddings={l:"padding-left",r:"padding-right",t:"padding-top",b:"padding-bottom"};var margins={l:"margin-left",r:"margin-right",t:"margin-top",b:"margin-bottom"};L5.Element.boxMarkup='<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';var El=L5.Element;var propCache={};L5.Element.prototype.classReCache={},L5.Element.prototype.addClass=function(className){if(L5.isArray(className)){for(var i=0,len=className.length;i<len;i++){this.addClass(className[i]);}}else{if(className&&!this.hasClass(className)){this.dom.className=this.dom.className+" "+className;}}
return this;};L5.Element.prototype.radioClass=function(className){var siblings=this.dom.parentNode.childNodes;for(var i=0;i<siblings.length;i++){var s=siblings[i];if(s.nodeType==1){L5.get(s).removeClass(className);}}
this.addClass(className);return this;};L5.Element.prototype.removeClass=function(className){if(className===true){this.dom.className=" ";return this;}
if(!className||!this.dom.className){return this;}
if(L5.isArray(className)){for(var i=0,len=className.length;i<len;i++){this.removeClass(className[i]);}}else{if(this.hasClass(className)){var re=this.classReCache[className];if(!re){re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)',"g");this.classReCache[className]=re;}
this.dom.className=this.dom.className.replace(re," ");}}
return this;};L5.Element.prototype.toggleClass=function(className){if(this.hasClass(className)){this.removeClass(className);}else{this.addClass(className);}
return this;};L5.Element.prototype.hasClass=function(className){return className&&(' '+this.dom.className+' ').indexOf(' '+className
+' ')!=-1;};L5.Element.prototype.replaceClass=function(oldClassName,newClassName){this.removeClass(oldClassName);this.addClass(newClassName);return this;};L5.Element.prototype.getStyles=function(){var a=arguments,len=a.length,r={};for(var i=0;i<len;i++){r[a[i]]=this.getStyle(a[i]);}
return r;};L5.Element.prototype.getStyle=function(){return view&&view.getComputedStyle?function(prop){var el=this.dom,v,cs,camel;if(prop=='float'){prop="cssFloat";}
if(v=el.style[prop]){return v;}
if(cs=view.getComputedStyle(el,"")){if(!(camel=propCache[prop])){camel=propCache[prop]=prop.replace(camelRe,camelFn);}
return cs[camel];}
return null;}:function(prop){var el=this.dom,v,cs,camel;if(prop=='opacity'){if(typeof el.style.filter=='string'){var m=el.style.filter.match(/alpha\(opacity=(.*)\)/i);if(m){var fv=parseFloat(m[1]);if(!isNaN(fv)){return fv?fv/100:0;}}}
return 1;}else if(prop=='float'){prop="styleFloat";}
if(!(camel=propCache[prop])){camel=propCache[prop]=prop.replace(camelRe,camelFn);}
if(v=el.style[camel]){return v;}
if(cs=el.currentStyle){return cs[camel];}
return null;};}();L5.Element.prototype.setStyle=function(prop,value){if(typeof prop=="string"){var camel;if(!(camel=propCache[prop])){camel=propCache[prop]=prop.replace(camelRe,camelFn);}
if(camel=='opacity'){this.setOpacity(value);}else{this.dom.style[camel]=value;}}else{for(var style in prop){if(typeof prop[style]!="function"){this.setStyle(style,prop[style]);}}}
return this;};L5.Element.prototype.applyStyles=function(style){L5.DomHelper.applyStyles(this.dom,style);return this;};L5.Element.prototype.getMargins=function(side){if(!side){return{top:parseInt(this.getStyle("margin-top"),10)||0,left:parseInt(this.getStyle("margin-left"),10)||0,bottom:parseInt(this.getStyle("margin-bottom"),10)||0,right:parseInt(this.getStyle("margin-right"),10)||0};}else{return this.addStyles(side,margins);}};L5.Element.prototype.addStyles=function(sides,styles){var val=0,v,w;for(var i=0,len=sides.length;i<len;i++){v=this.getStyle(styles[sides.charAt(i)]);if(v){w=parseInt(v,10);if(w){val+=(w>=0?w:-1*w);}}}
return val;};L5.Element.prototype.unselectable=function(){this.dom.unselectable="on";this.swallowEvent("selectstart",true);this.applyStyles("-moz-user-select:none;-khtml-user-select:none;");this.addClass("l-unselectable");return this;};L5.Element.prototype.repaint=function(){var dom=this.dom;this.addClass("l-repaint");setTimeout(function(){L5.get(dom).removeClass("l-repaint");},1);return this;};L5.Element.prototype.getSize=function(contentSize){return{width:this.getWidth(contentSize),height:this.getHeight(contentSize)};};L5.Element.prototype.getStyleSize=function(){var w,h,d=this.dom,s=d.style;if(s.width&&s.width!='auto'){w=parseInt(s.width,10);if(L5.isBorderBox){w-=this.getFrameWidth('lr');}}
if(s.height&&s.height!='auto'){h=parseInt(s.height,10);if(L5.isBorderBox){h-=this.getFrameWidth('tb');}}
return{width:w||this.getWidth(true),height:h||this.getHeight(true)};};L5.Element.prototype.getViewSize=function(){var d=this.dom,doc=document,aw=0,ah=0;if(d==doc||d==doc.body){return{width:D.getViewWidth(),height:D.getViewHeight()};}else{return{width:d.clientWidth,height:d.clientHeight};}};L5.Element.prototype.addClassOnOver=function(className){this.hover(function(){L5.fly(this,'_internal').addClass(className);},function(){L5.fly(this,'_internal').removeClass(className);});return this;};L5.Element.prototype.addClassOnFocus=function(className){this.on("focus",function(){L5.fly(this,'_internal').addClass(className);},this.dom);this.on("blur",function(){L5.fly(this,'_internal').removeClass(className);},this.dom);return this;};L5.Element.prototype.addClassOnClick=function(className){var dom=this.dom;this.on("mousedown",function(){L5.fly(dom,'_internal').addClass(className);var d=L5.getDoc();var fn=function(){L5.fly(dom,'_internal').removeClass(className);d.removeListener("mouseup",fn);};d.on("mouseup",fn);});return this;};L5.Element.prototype.getComputedHeight=function(){var h=Math.max(this.dom.offsetHeight,this.dom.clientHeight);if(!h){h=parseInt(this.getStyle('height'),10)||0;if(!this.isBorderBox()){h+=this.getFrameWidth('tb');}}
return h;};L5.Element.prototype.getComputedWidth=function(){var w=Math.max(this.dom.offsetWidth,this.dom.clientWidth);if(!w){w=parseInt(this.getStyle('width'),10)||0;if(!this.isBorderBox()){w+=this.getFrameWidth('lr');}}
return w;};L5.Element.prototype.getFrameWidth=function(sides,onlyContentBox){return onlyContentBox&&L5.isBorderBox?0:(this.getPadding(sides)+this.getBorderWidth(sides));};L5.Element.prototype.setSize=function(width,height,animate){if(typeof width=="object"){height=width.height;width=width.width;}
width=this.adjustWidth(width);height=this.adjustHeight(height);if(!animate||!A){this.dom.style.width=this.addUnits(width);this.dom.style.height=this.addUnits(height);}else{this.anim({width:{to:width},height:{to:height}},this.preanim(arguments,2));}
return this;};L5.Element.prototype.adjustWidth=function(width){if(typeof width=="number"){if(this.autoBoxAdjust&&!this.isBorderBox()){width-=(this.getBorderWidth("lr")+this.getPadding("lr"));}
if(width<0){width=0;}}
return width;};L5.Element.prototype.adjustHeight=function(height){if(typeof height=="number"){if(this.autoBoxAdjust&&!this.isBorderBox()){height-=(this.getBorderWidth("tb")+this.getPadding("tb"));}
if(height<0){height=0;}}
return height;};L5.Element.prototype.setWidth=function(width,animate){width=this.adjustWidth(width);if(!animate||!A){this.dom.style.width=this.addUnits(width);}else{this.anim({width:{to:width}},this.preanim(arguments,1));}
return this;};L5.Element.prototype.setHeight=function(height,animate){height=this.adjustHeight(height);if(!animate||!A){this.dom.style.height=this.addUnits(height);}else{this.anim({height:{to:height}},this.preanim(arguments,1));}
return this;};L5.Element.prototype.clip=function(){if(!this.isClipped){this.isClipped=true;this.originalClip={"o":this.getStyle("overflow"),"x":this.getStyle("overflow-x"),"y":this.getStyle("overflow-y")};this.setStyle("overflow","hidden");this.setStyle("overflow-x","hidden");this.setStyle("overflow-y","hidden");}
return this;};L5.Element.prototype.unclip=function(){if(this.isClipped){this.isClipped=false;var o=this.originalClip;if(o.o){this.setStyle("overflow",o.o);}
if(o.x){this.setStyle("overflow-x",o.x);}
if(o.y){this.setStyle("overflow-y",o.y);}}
return this;};L5.Element.prototype.getBorderWidth=function(side){return this.addStyles(side,borders);};L5.Element.prototype.getPadding=function(side){return this.addStyles(side,paddings);};L5.Element.prototype.getHeight=function(contentHeight){var h=this.dom.offsetHeight||0;h=contentHeight!==true?h:h-this.getBorderWidth("tb")
-this.getPadding("tb");return h<0?0:h;};L5.Element.prototype.getWidth=function(contentWidth){var w=this.dom.offsetWidth||0;w=contentWidth!==true?w:w-this.getBorderWidth("lr")
-this.getPadding("lr");return w<0?0:w;};L5.Element.prototype.clearOpacity=function(){if(window.ActiveXObject){if(typeof this.dom.style.filter=='string'&&(/alpha/i).test(this.dom.style.filter)){this.dom.style.filter="";}}else{this.dom.style.opacity="";this.dom.style["-moz-opacity"]="";this.dom.style["-khtml-opacity"]="";}
return this;};L5.Element.prototype.setOpacity=function(opacity,animate){if(!animate||!A){var s=this.dom.style;if(L5.isIE){s.zoom=1;s.filter=(s.filter||'').replace(/alpha\([^\)]*\)/gi,"")
+(opacity==1?"":" alpha(opacity="+opacity*100+")");}else{s.opacity=opacity;}}else{this.anim({opacity:{to:opacity}},this.preanim(arguments,1),null,.35,'easeIn');}
return this;};L5.Element.prototype.getColor=function(attr,defaultValue,prefix){var v=this.getStyle(attr);if(!v||v=="transparent"||v=="inherit"){return defaultValue;}
var color=typeof prefix=="undefined"?"#":prefix;if(v.substr(0,4)=="rgb("){var rvs=v.slice(4,v.length-1).split(",");for(var i=0;i<3;i++){var h=parseInt(rvs[i]);var s=h.toString(16);if(h<16){s="0"+s;}
color+=s;}}else{if(v.substr(0,1)=="#"){if(v.length==4){for(var i=1;i<4;i++){var c=v.charAt(i);color+=c+c;}}else if(v.length==7){color+=v.substr(1);}}}
return(color.length>5?color.toLowerCase():defaultValue);};L5.Element.prototype.boxWrap=function(cls){cls=cls||'l-box';var el=L5.get(this.insertHtml('beforeBegin',String.format('<div class="{0}">'+El.boxMarkup+'</div>',cls)));el.child('.'+cls+'-mc').dom.appendChild(this.dom);return el;};L5.Element.prototype.autoHeight=function(animate,duration,onComplete,easing){var oldHeight=this.getHeight();this.clip();this.setHeight(1);setTimeout(function(){var height=parseInt(this.dom.scrollHeight,10);if(!animate){this.setHeight(height);this.unclip();if(typeof onComplete=="function"){onComplete();}}else{this.setHeight(oldHeight);this.setHeight(height,animate,duration,function(){this.unclip();if(typeof onComplete=="function")
onComplete();}.createDelegate(this),easing);}}.createDelegate(this),0);return this;};L5.Element.prototype.setElFalseStyle=function(qtitle,qtip){if(this.dom.nodeName=="TD"||this.dom.nodeName=="td"){this.setStyle("border","1px solid #FA8072");}else{this.setStyle("border-color","#FA8072");}
this.dom.setAttribute("L5:qtitle",qtitle);this.dom.setAttribute("L5:qtip",qtip);};L5.Element.prototype.setElTrueStyle=function(){if(this.dom.nodeName=="TD"||this.dom.nodeName=="td"){this.setStyle("border","");}else{this.setStyle("border-color","");}
this.dom.removeAttribute("L5:qtitle");this.dom.removeAttribute("L5:qtip");};L5.Element.prototype.setOverflow=function(v){if(v=='auto'&&L5.isMac&&L5.isGecko2){this.dom.style.overflow='hidden';(function(){this.dom.style.overflow='auto';}).defer(1,this);}else{this.dom.style.overflow=v;}};})();

L5.Element.prototype.child=function(selector,returnDom){var n=L5.DomQuery.selectNode(selector,this.dom);return returnDom?n:L5.get(n);};L5.Element.prototype.down=function(selector,returnDom){var n=L5.DomQuery.selectNode(" > "+selector,this.dom);return returnDom?n:L5.get(n);};L5.Element.prototype.findParent=function(simpleSelector,maxDepth,returnEl){var p=this.dom,b=document.body,depth=0,dq=L5.DomQuery,stopEl;maxDepth=maxDepth||50;if(typeof maxDepth!="number"){stopEl=L5.getDom(maxDepth);maxDepth=10;}
while(p&&p.nodeType==1&&depth<maxDepth&&p!=b&&p!=stopEl){if(dq.is(p,simpleSelector)){return returnEl?L5.get(p):p;}
depth++;p=p.parentNode;}
return null;};L5.Element.prototype.findParentNode=function(simpleSelector,maxDepth,returnEl){var p=L5.fly(this.dom.parentNode,'_internal');return p?p.findParent(simpleSelector,maxDepth,returnEl):null;};L5.Element.prototype.up=function(simpleSelector,maxDepth){return this.findParentNode(simpleSelector,maxDepth,true);};L5.Element.prototype.query=function(selector){return L5.DomQuery.select(selector,this.dom);};L5.Element.prototype.parent=function(selector,returnDom){return this.matchNode('parentNode','parentNode',selector,returnDom);};L5.Element.prototype.next=function(selector,returnDom){return this.matchNode('nextSibling','nextSibling',selector,returnDom);};L5.Element.prototype.prev=function(selector,returnDom){return this.matchNode('previousSibling','previousSibling',selector,returnDom);};L5.Element.prototype.first=function(selector,returnDom){return this.matchNode('nextSibling','firstChild',selector,returnDom);};L5.Element.prototype.last=function(selector,returnDom){return this.matchNode('previousSibling','lastChild',selector,returnDom);};L5.Element.prototype.matchNode=function(dir,start,selector,returnDom){var n=this.dom[start];while(n){if(n.nodeType==1&&(!selector||L5.DomQuery.is(n,selector))){return!returnDom?L5.get(n):n;}
n=n[dir];}
return null;};

(function(){var El=L5.Element;L5.Element.prototype.appendChild=function(el){el=L5.get(el);el.appendTo(this);return this;};L5.Element.prototype.createChild=function(config,insertBefore,returnDom){config=config||{tag:'div'};if(insertBefore){return L5.DomHelper.insertBefore(insertBefore,config,returnDom!==true);}
return L5.DomHelper[!this.dom.firstChild?'overwrite':'append'](this.dom,config,returnDom!==true);};L5.Element.prototype.appendTo=function(el){el=L5.getDom(el);el.appendChild(this.dom);return this;};L5.Element.prototype.insertBefore=function(el){el=L5.getDom(el);el.parentNode.insertBefore(this.dom,el);return this;};L5.Element.prototype.insertAfter=function(el){el=L5.getDom(el);el.parentNode.insertBefore(this.dom,el.nextSibling);return this;};L5.Element.prototype.insertFirst=function(el,returnDom){el=el||{};if(typeof el=='object'&&!el.nodeType&&!el.dom){return this.createChild(el,this.dom.firstChild,returnDom);}else{el=L5.getDom(el);this.dom.insertBefore(el,this.dom.firstChild);return!returnDom?L5.get(el):el;}};L5.Element.prototype.insertSibling=function(el,where,returnDom){var rt;if(L5.isArray(el)){for(var i=0,len=el.length;i<len;i++){rt=this.insertSibling(el[i],where,returnDom);}
return rt;}
where=where?where.toLowerCase():'before';el=el||{};var refNode=where=='before'?this.dom:this.dom.nextSibling;if(typeof el=='object'&&!el.nodeType&&!el.dom){if(where=='after'&&!this.dom.nextSibling){rt=L5.DomHelper.append(this.dom.parentNode,el,!returnDom);}else{rt=L5.DomHelper[where=='after'?'insertAfter':'insertBefore'](this.dom,el,!returnDom);}}else{rt=this.dom.parentNode.insertBefore(L5.getDom(el),refNode);if(!returnDom){rt=L5.get(rt);}}
return rt;};L5.Element.prototype.wrap=function(config,returnDom){if(!config){config={tag:"div"};}
var newEl=L5.DomHelper.insertBefore(this.dom,config,!returnDom);newEl.dom?newEl.dom.appendChild(this.dom):newEl.appendChild(this.dom);return newEl;};L5.Element.prototype.replace=function(el){el=L5.get(el);this.insertBefore(el);el.remove();return this;};L5.Element.prototype.replaceWith=function(el){if(typeof el=='object'&&!el.nodeType&&!el.dom){el=this.insertSibling(el,'before');}else{el=L5.getDom(el);this.dom.parentNode.insertBefore(el,this.dom);}
El.uncache(this.id);L5.removeNode(this.dom);this.dom=el;this.id=L5.id(el);El.cache[this.id]=this;return this;};L5.Element.prototype.insertHtml=function(where,html,returnEl){var el=L5.DomHelper.insertHtml(where,this.dom,html);return returnEl?L5.get(el):el;};})();

L5.CompositeElement=function(els){this.elements=[];this.addElements(els);};L5.CompositeElement.prototype={isComposite:true,addElements:function(els){if(!els)return this;if(typeof els=="string"){els=L5.Element.selectorFunction(els);}
var yels=this.elements;var index=yels.length-1;for(var i=0,len=els.length;i<len;i++){yels[++index]=L5.get(els[i]);}
return this;},fill:function(els){this.elements=[];this.add(els);return this;},filter:function(selector){var els=[];this.each(function(el){if(el.is(selector)){els[els.length]=el.dom;}});this.fill(els);return this;},invoke:function(fn,args){var els=this.elements;for(var i=0,len=els.length;i<len;i++){L5.Element.prototype[fn].apply(els[i],args);}
return this;},add:function(els){if(typeof els=="string"){this.addElements(L5.Element.selectorFunction(els));}else if(els.length!==undefined){this.addElements(els);}else{this.addElements([els]);}
return this;},each:function(fn,scope){var els=this.elements;for(var i=0,len=els.length;i<len;i++){if(fn.call(scope||els[i],els[i],this,i)===false){break;}}
return this;},item:function(index){return this.elements[index]||null;},first:function(){return this.item(0);},last:function(){return this.item(this.elements.length-1);},getCount:function(){return this.elements.length;},contains:function(el){return this.indexOf(el)!==-1;},indexOf:function(el){return this.elements.indexOf(L5.get(el));},removeElement:function(el,removeDom){if(L5.isArray(el)){for(var i=0,len=el.length;i<len;i++){this.removeElement(el[i]);}
return this;}
var index=typeof el=='number'?el:this.indexOf(el);if(index!==-1&&this.elements[index]){if(removeDom){var d=this.elements[index];if(d.dom){d.remove();}else{L5.removeNode(d);}}
this.elements.splice(index,1);}
return this;},replaceElement:function(el,replacement,domReplace){var index=typeof el=='number'?el:this.indexOf(el);if(index!==-1){if(domReplace){this.elements[index].replaceWith(replacement);}else{this.elements.splice(index,1,L5.get(replacement))}}
return this;},clear:function(){this.elements=[];}};(function(){L5.CompositeElement.createCall=function(proto,fnName){if(!proto[fnName]){proto[fnName]=function(){return this.invoke(fnName,arguments);};}};for(var fnName in L5.Element.prototype){if(typeof L5.Element.prototype[fnName]=="function"){L5.CompositeElement.createCall(L5.CompositeElement.prototype,fnName);}};})();L5.CompositeElementLite=function(els){L5.CompositeElementLite.superclass.constructor.call(this,els);this.el=new L5.Element.Flyweight();};L5.extend(L5.CompositeElementLite,L5.CompositeElement,{addElements:function(els){if(els){if(L5.isArray(els)){this.elements=this.elements.concat(els);}else{var yels=this.elements;var index=yels.length-1;for(var i=0,len=els.length;i<len;i++){yels[++index]=els[i];}}}
return this;},invoke:function(fn,args){var els=this.elements;var el=this.el;for(var i=0,len=els.length;i<len;i++){el.dom=els[i];L5.Element.prototype[fn].apply(el,args);}
return this;},item:function(index){if(!this.elements[index]){return null;}
this.el.dom=this.elements[index];return this.el;},addListener:function(eventName,handler,scope,opt){var els=this.elements;for(var i=0,len=els.length;i<len;i++){L5.EventManager.on(els[i],eventName,handler,scope||els[i],opt);}
return this;},each:function(fn,scope){var els=this.elements;var el=this.el;for(var i=0,len=els.length;i<len;i++){el.dom=els[i];if(fn.call(scope||el,el,this,i)===false){break;}}
return this;},indexOf:function(el){return this.elements.indexOf(L5.getDom(el));},replaceElement:function(el,replacement,domReplace){var index=typeof el=='number'?el:this.indexOf(el);if(index!==-1){replacement=L5.getDom(replacement);if(domReplace){var d=this.elements[index];d.parentNode.insertBefore(replacement,d);L5.removeNode(d);}
this.elements.splice(index,1,replacement);}
return this;}});L5.CompositeElementLite.prototype.on=L5.CompositeElementLite.prototype.addListener;if(L5.DomQuery){L5.Element.selectorFunction=L5.DomQuery.select;}
L5.Element.select=function(selector,unique,root){var els;if(typeof selector=="string"){els=L5.Element.selectorFunction(selector,root);}else if(selector.length!==undefined){els=selector;}else{throw"Invalid selector";}
if(unique===true){return new L5.CompositeElement(els);}else{return new L5.CompositeElementLite(els);}};L5.select=L5.Element.select;

L5.model.Connection=function(config){L5.apply(this,config);this.addEvents("beforerequest","requestcomplete","requestexception");L5.model.Connection.superclass.constructor.call(this);};L5.extend(L5.model.Connection,L5.util.Observable,{timeout:30000,autoAbort:false,disableCaching:true,disableCachingParam:'_dc',request:function(o){if(this.fireEvent("beforerequest",this,o)!==false){var p=o.params;if(typeof p=="function"){p=p.call(o.scope||window,o);}
if(typeof p=="object"){p=L5.urlEncode(p);}
if(this.extraParams){var extras=L5.urlEncode(this.extraParams);p=p?(p+'&'+extras):extras;}
var url=o.url||this.url;if(typeof url=='function'){url=url.call(o.scope||window,o);}
if(o.form){var form=L5.getDom(o.form);url=url||form.action;var enctype=form.getAttribute("enctype");if(o.isUpload||(enctype&&enctype.toLowerCase()=='multipart/form-data')){return this.doFormUpload(o,p,url);}
var f=L5.lib.Ajax.serializeForm(form);p=p?(p+'&'+f):f;}
var hs=o.headers;if(this.defaultHeaders){hs=L5.apply(hs||{},this.defaultHeaders);if(!o.headers){o.headers=hs;}}
var cb={success:this.handleResponse,failure:this.handleFailure,scope:this,argument:{options:o},timeout:o.timeout||this.timeout};var method=o.method||this.method||((p||o.xmlData||o.jsonData)?"POST":"GET");if(method=='GET'&&(this.disableCaching&&o.disableCaching!==false)||o.disableCaching===true){var dcp=o.disableCachingParam||this.disableCachingParam;url+=(url.indexOf('?')!=-1?'&':'?')+dcp+'='+(new Date().getTime());}
if(typeof o.autoAbort=='boolean'){if(o.autoAbort){this.abort();}}else if(this.autoAbort!==false){this.abort();}
if((method=='GET'||o.xmlData||o.jsonData)&&p){url+=(url.indexOf('?')!=-1?'&':'?')+p;p='';}
this.transId=L5.lib.Ajax.request(method,url,cb,p,o);return this.transId;}else{L5.callback(o.callback,o.scope,[o,null,null]);return null;}},isLoading:function(transId){if(transId){return L5.lib.Ajax.isCallInProgress(transId);}else{return this.transId?true:false;}},abort:function(transId){if(transId||this.isLoading()){L5.lib.Ajax.abort(transId||this.transId);}},handleResponse:function(response){this.transId=false;var options=response.argument.options;response.argument=options?options.argument:null;this.fireEvent("requestcomplete",this,response,options);L5.callback(options.success,options.scope,[response,options]);L5.callback(options.callback,options.scope,[options,true,response]);},handleFailure:function(response,e){this.transId=false;var options=response.argument.options;response.argument=options?options.argument:null;this.fireEvent("requestexception",this,response,options,e);L5.callback(options.failure,options.scope,[response,options]);L5.callback(options.callback,options.scope,[options,false,response]);},doFormUpload:function(o,ps,url){var id=L5.id();var frame=document.createElement('iframe');frame.id=id;frame.name=id;frame.className='l-hidden';if(L5.isIE){frame.src=L5.SSL_SECURE_URL;}
document.body.appendChild(frame);if(L5.isIE){document.frames[id].name=id;}
var form=L5.getDom(o.form);form.target=id;form.method='POST';form.enctype=form.encoding='multipart/form-data';if(url){form.action=url;}
var hiddens,hd;if(ps||o.jsonData){hiddens=[];ps=L5.urlDecode(ps,false);for(var k in ps){if(ps.hasOwnProperty(k)){hd=document.createElement('input');hd.type='hidden';hd.name=k;hd.value=ps[k];form.appendChild(hd);hiddens.push(hd);}}
hd=document.createElement('input');hd.type='hidden';hd.name='jsonData';hd.value=o.jsonData;form.appendChild(hd);hiddens.push(hd);}
function cb(){var r={responseText:'',responseXML:null};r.argument=o?o.argument:null;try{var doc;if(L5.isIE){doc=frame.contentWindow.document;}else{doc=(frame.contentDocument||window.frames[id].document);}
if(doc&&doc.body){if(doc.body.textContent)
r.responseText=doc.body.textContent;if(doc.body.innerText)
r.responseText=doc.body.innerText;}
if(doc&&doc.XMLDocument){r.responseXML=doc.XMLDocument;}else{r.responseXML=doc;}}
catch(e){}
L5.EventManager.removeListener(frame,'load',cb,this);this.fireEvent("requestcomplete",this,r,o);L5.callback(o.success,o.scope,[r,o]);L5.callback(o.callback,o.scope,[o,true,r]);setTimeout(function(){L5.removeNode(frame);},100);}
L5.EventManager.on(frame,'load',cb,this);form.submit();if(hiddens){for(var i=0,len=hiddens.length;i<len;i++){L5.removeNode(hiddens[i]);}}}});L5.Ajax=new L5.model.Connection({autoAbort:false,serializeForm:function(form){return L5.lib.Ajax.serializeForm(form);}});

(function(){L5.lib.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};L5.lib.Region.prototype={contains:function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);},getArea:function(){return((this.bottom-this.top)*(this.right-this.left));},intersect:function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new L5.lib.Region(t,r,b,l);}else{return null;}},union:function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new L5.lib.Region(t,r,b,l);},constrainTo:function(r){this.top=this.top.constrain(r.top,r.bottom);this.bottom=this.bottom.constrain(r.top,r.bottom);this.left=this.left.constrain(r.left,r.right);this.right=this.right.constrain(r.left,r.right);return this;},adjust:function(t,l,b,r){this.top+=t;this.left+=l;this.right+=r;this.bottom+=b;return this;}};L5.lib.Region.getRegion=function(el){var p=L5.lib.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new L5.lib.Region(t,r,b,l);};L5.lib.Point=function(x,y){if(L5.isArray(x)){y=x[1];x=x[0];}
this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};L5.lib.Point.prototype=new L5.lib.Region();})();

L5.Updater=L5.extend(L5.util.Observable,{constructor:function(el,forceNew){el=L5.get(el);if(!forceNew&&el.updateManager){return el.updateManager;}
this.el=el;this.defaultUrl=null;this.addEvents("beforeupdate","update","failure");var d=L5.Updater.defaults;this.sslBlankUrl=d.sslBlankUrl;this.disableCaching=d.disableCaching;this.indicatorText=d.indicatorText;this.showLoadIndicator=d.showLoadIndicator;this.timeout=d.timeout;this.loadScripts=d.loadScripts;this.transaction=null;this.refreshDelegate=this.refresh.createDelegate(this);this.updateDelegate=this.update.createDelegate(this);this.formUpdateDelegate=this.formUpdate.createDelegate(this);if(!this.renderer){this.renderer=this.getDefaultRenderer();}
L5.Updater.superclass.constructor.call(this);},getDefaultRenderer:function(){return new L5.Updater.BasicRenderer();},getEl:function(){return this.el;},update:function(url,params,callback,discardUrl){if(this.fireEvent("beforeupdate",this.el,url,params)!==false){var cfg,callerScope;if(typeof url=="object"){cfg=url;url=cfg.url;params=params||cfg.params;callback=callback||cfg.callback;discardUrl=discardUrl||cfg.discardUrl;callerScope=cfg.scope;if(typeof cfg.nocache!="undefined"){this.disableCaching=cfg.nocache;};if(typeof cfg.text!="undefined"){this.indicatorText='<div class="loading-indicator">'+cfg.text+"</div>";};if(typeof cfg.scripts!="undefined"){this.loadScripts=cfg.scripts;};if(typeof cfg.timeout!="undefined"){this.timeout=cfg.timeout;};}
this.showLoading();if(!discardUrl){this.defaultUrl=url;}
if(typeof url=="function"){url=url.call(this);}
var o=L5.apply({},{url:url,params:(typeof params=="function"&&callerScope)?params.createDelegate(callerScope):params,success:this.processSuccess,failure:this.processFailure,scope:this,callback:undefined,timeout:(this.timeout*1000),disableCaching:this.disableCaching,argument:{"options":cfg,"url":url,"form":null,"callback":callback,"scope":callerScope||window,"params":params}},cfg);this.transaction=L5.Ajax.request(o);}},formUpdate:function(form,url,reset,callback){if(this.fireEvent("beforeupdate",this.el,form,url)!==false){if(typeof url=="function"){url=url.call(this);}
form=L5.getDom(form)
this.transaction=L5.Ajax.request({form:form,url:url,success:this.processSuccess,failure:this.processFailure,scope:this,timeout:(this.timeout*1000),argument:{"url":url,"form":form,"callback":callback,"reset":reset}});this.showLoading.defer(1,this);}},refresh:function(callback){if(this.defaultUrl==null){return;}
this.update(this.defaultUrl,null,callback,true);},startAutoRefresh:function(interval,url,params,callback,refreshNow){if(refreshNow){this.update(url||this.defaultUrl,params,callback,true);}
if(this.autoRefreshProcId){clearInterval(this.autoRefreshProcId);}
this.autoRefreshProcId=setInterval(this.update.createDelegate(this,[url||this.defaultUrl,params,callback,true]),interval*1000);},stopAutoRefresh:function(){if(this.autoRefreshProcId){clearInterval(this.autoRefreshProcId);delete this.autoRefreshProcId;}},isAutoRefreshing:function(){return this.autoRefreshProcId?true:false;},showLoading:function(){if(this.showLoadIndicator){this.el.update(this.indicatorText);}},processSuccess:function(response){this.transaction=null;if(response.argument.form&&response.argument.reset){try{response.argument.form.reset();}catch(e){}}
if(this.loadScripts){this.renderer.render(this.el,response,this,this.updateComplete.createDelegate(this,[response]));}else{this.renderer.render(this.el,response,this);this.updateComplete(response);}},updateComplete:function(response){this.fireEvent("update",this.el,response);if(typeof response.argument.callback=="function"){response.argument.callback.call(response.argument.scope,this.el,true,response,response.argument.options);}},processFailure:function(response){this.transaction=null;this.fireEvent("failure",this.el,response);if(typeof response.argument.callback=="function"){response.argument.callback.call(response.argument.scope,this.el,false,response,response.argument.options);}},setRenderer:function(renderer){this.renderer=renderer;},getRenderer:function(){return this.renderer;},setDefaultUrl:function(defaultUrl){this.defaultUrl=defaultUrl;},abort:function(){if(this.transaction){L5.Ajax.abort(this.transaction);}},isUpdating:function(){if(this.transaction){return L5.Ajax.isLoading(this.transaction);}
return false;}});L5.Updater.defaults={timeout:30,loadScripts:false,sslBlankUrl:(L5.SSL_SECURE_URL||"javascript:false"),disableCaching:false,showLoadIndicator:true,indicatorText:'<div class="loading-indicator">Loading...</div>'};L5.Updater.updateElement=function(el,url,params,options){var um=L5.get(el).getUpdater();L5.apply(um,options);um.update(url,params,options?options.callback:null);};L5.Updater.BasicRenderer=function(){};L5.Updater.BasicRenderer.prototype={render:function(el,response,updateManager,callback){el.update(response.responseText,updateManager.loadScripts,callback);}};L5.UpdateManager=L5.Updater;

L5.Template=function(html){var a=arguments;if(L5.isArray(html)){html=html.join("");}else if(a.length>1){var buf=[];for(var i=0,len=a.length;i<len;i++){if(typeof a[i]=='object'){L5.apply(this,a[i]);}else{buf[buf.length]=a[i];}}
html=buf.join('');}
this.html=html;if(this.compiled){this.compile();}};L5.Template.prototype={applyTemplate:function(values){if(this.compiled){return this.compiled(values);}
var useF=this.disableFormats!==true;var fm=L5.util.Format,tpl=this;var fn=function(m,name,format,args){if(format&&useF){if(format.substr(0,5)=="this."){return tpl.call(format.substr(5),values[name],values);}else{if(args){var re=/^\s*['"](.*)["']\s*$/;args=args.split(',');for(var i=0,len=args.length;i<len;i++){args[i]=args[i].replace(re,"$1");}
args=[values[name]].concat(args);}else{args=[values[name]];}
return fm[format].apply(fm,args);}}else{return values[name]!==undefined?values[name]:"";}};return this.html.replace(this.re,fn);},set:function(html,compile){this.html=html;this.compiled=null;if(compile){this.compile();}
return this;},disableFormats:false,re:/\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,compile:function(){var fm=L5.util.Format;var useF=this.disableFormats!==true;var sep=L5.isGecko?"+":",";var fn=function(m,name,format,args){if(format&&useF){args=args?','+args:"";if(format.substr(0,5)!="this."){format="fm."+format+'(';}else{format='this.call("'+format.substr(5)+'", ';args=", values";}}else{args='';format="(values['"+name+"'] == undefined ? '' : ";}
return"'"+sep+format+"values['"+name+"']"+args+")"
+sep+"'";};var body;if(L5.isGecko){body="this.compiled = function(values){ return '"
+this.html.replace(/\\/g,'\\\\').replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn)
+"';};";}else{body=["this.compiled = function(values){ return ['"];body.push(this.html.replace(/\\/g,'\\\\').replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn));body.push("'].join('');};");body=body.join('');}
eval(body);return this;},call:function(fnName,value,allValues){return this[fnName](value,allValues);},insertFirst:function(el,values,returnElement){return this.doInsert('afterBegin',el,values,returnElement);},insertBefore:function(el,values,returnElement){return this.doInsert('beforeBegin',el,values,returnElement);},insertAfter:function(el,values,returnElement){return this.doInsert('afterEnd',el,values,returnElement);},append:function(el,values,returnElement){return this.doInsert('beforeEnd',el,values,returnElement);},doInsert:function(where,el,values,returnEl){el=L5.getDom(el);var newNode=L5.DomHelper.insertHtml(where,el,this.applyTemplate(values));return returnEl?L5.get(newNode,true):newNode;},overwrite:function(el,values,returnElement){el=L5.getDom(el);el.innerHTML=this.applyTemplate(values);return returnElement?L5.get(el.firstChild,true):el.firstChild;}};L5.Template.prototype.apply=L5.Template.prototype.applyTemplate;L5.Template.from=function(el,config){el=L5.getDom(el);return new L5.Template(el.value||el.innerHTML,config||'');};L5.DomHelper.Template=L5.Template;

L5.util.DelayedTask=function(fn,scope,args){var id=null;var t;var d;var call=function(){var now=new Date().getTime();if(now-t>=d){clearInterval(id);id=null;fn.apply(scope,args||[]);}};this.delay=function(delay,newFn,newScope,newArgs){if(id&&delay!=d){this.cancel();}
d=delay;t=new Date().getTime();fn=newFn||fn;scope=newScope||scope;args=newArgs||args;if(!id){id=setInterval(call,d);}};this.cancel=function(){if(id){clearInterval(id);id=null;}};};

L5.util.MixedCollection=function(allowFunctions,keyFn){this.items=[];this.map={};this.keys=[];this.length=0;this.addEvents("clear","add","replace","remove","sort");this.allowFunctions=allowFunctions===true;if(keyFn){this.getKey=keyFn;}
L5.util.MixedCollection.superclass.constructor.call(this);};L5.extend(L5.util.MixedCollection,L5.util.Observable,{allowFunctions:false,add:function(key,o){if(arguments.length==1){o=arguments[0];key=this.getKey(o);}
if(typeof key=="undefined"||key===null){this.length++;this.items.push(o);this.keys.push(null);}else{var old=this.map[key];if(old){return this.replace(key,o);}
this.length++;this.items.push(o);this.map[key]=o;this.keys.push(key);}
this.fireEvent("add",this.length-1,o,key);return o;},getKey:function(o){return o.id;},replace:function(key,o){if(arguments.length==1){o=arguments[0];key=this.getKey(o);}
var old=this.item(key);if(typeof key=="undefined"||key===null||typeof old=="undefined"){return this.add(key,o);}
var index=this.indexOfKey(key);this.items[index]=o;this.map[key]=o;this.fireEvent("replace",key,old,o);return o;},addAll:function(objs){if(arguments.length>1||L5.isArray(objs)){var args=arguments.length>1?arguments:objs;for(var i=0,len=args.length;i<len;i++){this.add(args[i]);}}else{for(var key in objs){if(this.allowFunctions||typeof objs[key]!="function"){this.add(key,objs[key]);}}}},each:function(fn,scope){var items=[].concat(this.items);for(var i=0,len=items.length;i<len;i++){if(fn.call(scope||items[i],items[i],i,len)===false){break;}}},eachKey:function(fn,scope){for(var i=0,len=this.keys.length;i<len;i++){fn.call(scope||window,this.keys[i],this.items[i],i,len);}},find:function(fn,scope){for(var i=0,len=this.items.length;i<len;i++){if(fn.call(scope||window,this.items[i],this.keys[i])){return this.items[i];}}
return null;},insert:function(index,key,o){if(arguments.length==2){o=arguments[1];key=this.getKey(o);}
if(index>=this.length){return this.add(key,o);}
this.length++;this.items.splice(index,0,o);if(typeof key!="undefined"&&key!=null){this.map[key]=o;}
this.keys.splice(index,0,key);this.fireEvent("add",index,o,key);return o;},remove:function(o){return this.removeAt(this.indexOf(o));},removeAt:function(index){if(index<this.length&&index>=0){this.length--;var o=this.items[index];this.items.splice(index,1);var key=this.keys[index];if(typeof key!="undefined"){delete this.map[key];}
this.keys.splice(index,1);this.fireEvent("remove",o,key);return o;}
return false;},removeKey:function(key){return this.removeAt(this.indexOfKey(key));},getCount:function(){return this.length;},indexOf:function(o){return this.items.indexOf(o);},indexOfKey:function(key){return this.keys.indexOf(key);},item:function(key){var item=typeof this.map[key]!="undefined"?this.map[key]:this.items[key];return typeof item!='function'||this.allowFunctions?item:null;},itemAt:function(index){return this.items[index];},key:function(key){return this.map[key];},contains:function(o){return this.indexOf(o)!=-1;},containsKey:function(key){return typeof this.map[key]!="undefined";},clear:function(){this.length=0;this.items=[];this.keys=[];this.map={};this.fireEvent("clear");},first:function(){return this.items[0];},last:function(){return this.items[this.length-1];},_sort:function(property,dir,fn){var dsc=String(dir).toUpperCase()=="DESC"?-1:1;fn=fn||function(a,b){return a-b;};var c=[],k=this.keys,items=this.items;for(var i=0,len=items.length;i<len;i++){c[c.length]={key:k[i],value:items[i],index:i};}
c.sort(function(a,b){var v=fn(a[property],b[property])*dsc;if(v==0){v=(a.index<b.index?-1:1);}
return v;});for(var i=0,len=c.length;i<len;i++){items[i]=c[i].value;k[i]=c[i].key;}
this.fireEvent("sort",this);},sort:function(dir,fn){this._sort("value",dir,fn);},keySort:function(dir,fn){this._sort("key",dir,fn||function(a,b){var v1=String(a).toUpperCase(),v2=String(b).toUpperCase();return v1>v2?1:(v1<v2?-1:0);});},getRange:function(start,end){var items=this.items;if(items.length<1){return[];}
start=start||0;end=Math.min(typeof end=="undefined"?this.length-1:end,this.length-1);var r=[];if(start<=end){for(var i=start;i<=end;i++){r[r.length]=items[i];}}else{for(var i=start;i>=end;i--){r[r.length]=items[i];}}
return r;},filter:function(property,value,anyMatch,caseSensitive){if(L5.isEmpty(value,false)){return this.clone();}
value=this.createValueMatcher(value,anyMatch,caseSensitive);return this.filterBy(function(o){return o&&value.test(o[property]);});},filterBy:function(fn,scope){var r=new L5.util.MixedCollection();r.getKey=this.getKey;var k=this.keys,it=this.items;for(var i=0,len=it.length;i<len;i++){if(fn.call(scope||this,it[i],k[i])){r.add(k[i],it[i]);}}
return r;},findIndex:function(property,value,start,anyMatch,caseSensitive){if(L5.isEmpty(value,false)){return-1;}
value=this.createValueMatcher(value,anyMatch,caseSensitive);return this.findIndexBy(function(o){return o&&value.test(o[property]);},null,start);},findIndexBy:function(fn,scope,start){var k=this.keys,it=this.items;for(var i=(start||0),len=it.length;i<len;i++){if(fn.call(scope||this,it[i],k[i])){return i;}}
if(typeof start=='number'&&start>0){for(var i=0;i<start;i++){if(fn.call(scope||this,it[i],k[i])){return i;}}}
return-1;},createValueMatcher:function(value,anyMatch,caseSensitive){if(!value.exec){value=String(value);value=new RegExp((anyMatch===true?'':'^')+L5.escapeRe(value),caseSensitive?'':'i');}
return value;},clone:function(){var r=new L5.util.MixedCollection();var k=this.keys,it=this.items;for(var i=0,len=it.length;i<len;i++){r.add(k[i],it[i]);}
r.getKey=this.getKey;return r;}});L5.util.MixedCollection.prototype.get=L5.util.MixedCollection.prototype.item;

L5.util.JSON=new(function(){var useHasOwn=!!{}.hasOwnProperty;var pad=function(n){return n<10?"0"+n:n;};var m={"\b":'\\b',"\t":'\\t',"\n":'\\n',"\f":'\\f',"\r":'\\r','"':'\\"',"\\":'\\\\'};var encodeString=function(s){if(/["\\\x00-\x1f]/.test(s)){return'"'+s.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return"\\u00"+
Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"';}
return'"'+s+'"';};var encodeArray=function(o){var a=["["],b,i,l=o.length,v;for(i=0;i<l;i+=1){v=o[i];switch(typeof v){case"undefined":case"function":case"unknown":break;default:if(b){a.push(',');}
a.push(v===null?"null":L5.util.JSON.encode(v));b=true;}}
a.push("]");return a.join("");};this.encodeDate=function(o){return'"'+o.getFullYear()+"-"+
pad(o.getMonth()+1)+"-"+
pad(o.getDate())+"T"+
pad(o.getHours())+":"+
pad(o.getMinutes())+":"+
pad(o.getSeconds())+'"';};this.encode=function(o){if(typeof o=="undefined"||o===null){return"null";}else if(o.toJsonString){return o.toJsonString();}else if(L5.isArray(o)){return encodeArray(o);}else if(L5.isDate(o)){return L5.util.JSON.encodeDate(o);}else if(typeof o=="string"){return encodeString(o);}else if(typeof o=="number"){return isFinite(o)?String(o):"null";}else if(typeof o=="boolean"){return String(o);}else{var a=["{"],b,i,v;for(i in o){if(!useHasOwn||o.hasOwnProperty(i)){v=o[i];switch(typeof v){case"undefined":case"function":case"unknown":break;default:if(b){a.push(',');}
a.push(this.encode(i),":",v===null?"null":this.encode(v));b=true;}}}
a.push("}");return a.join("");}};this.decode=function(json){try{return eval("("+json+')');}catch(e){throw new L5.Exception(550,L5.parseReturnError?L5.parseReturnError:"Error parse return value.");}};})();L5.encode=L5.util.JSON.encode;L5.decode=L5.util.JSON.decode;

L5.util.Format=function(){var trimRe=/^\s+|\s+$/g;return{ellipsis:function(value,len,word){if(value&&value.length>len){if(word){var vs=value.substr(0,len-2);var index=Math.max(vs.lastIndexOf(' '),vs.lastIndexOf('.'),vs.lastIndexOf('!'),vs.lastIndexOf('?'));if(index==-1||index<(len-15)){return value.substr(0,len-3)+"...";}else{return vs.substr(0,index)+"...";}}else{return value.substr(0,len-3)+"...";}}
return value;},undef:function(value){return value!==undefined?value:"";},htmlEncode:function(value){return!value?value:String(value).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;");},htmlDecode:function(value){return!value?value:String(value).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&");},call:function(value,fn){if(arguments.length>2){var args=Array.prototype.slice.call(arguments,2);args.unshift(value);return eval(fn).apply(window,args);}else{return eval(fn).call(window,value);}},stripTagsRE:/<\/?[^>]+>/gi,stripTags:function(v){return!v?v:String(v).replace(this.stripTagsRE,"");},stripScriptsRe:/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,stripScripts:function(v){return!v?v:String(v).replace(this.stripScriptsRe,"");},math:function(){var fns={};return function(v,a){if(!fns[a]){fns[a]=new Function('v','return v '+a+';');}
return fns[a](v);}}(),plural:function(v,s,p){return v+' '+(v==1?s:(p?p:s+'s'));}}}();L5.util.Format.usMoney=function(v){v=(Math.round((v-0)*100))/100;v=(v==Math.floor(v))?v+".00":((v*10==Math.floor(v*10))?v
+"0":v);v=String(v);var ps=v.split('.');var whole=ps[0];var sub=ps[1]?'.'+ps[1]:'.00';var r=/(\d+)(\d{3})/;while(r.test(whole)){whole=whole.replace(r,'$1'+','+'$2');}
v=whole+sub;if(v.charAt(0)=='-'){return'-$'+v.substr(1);}
return"$"+v;};L5.util.Format.substr=function(value,start,length){return String(value).substr(start,length);};L5.util.Format.trim=function(value){return String(value).replace(trimRe,"");};L5.util.Format.fileSize=function(size){if(size<1024){return size+" bytes";}else if(size<1048576){return(Math.round(((size*10)/1024))/10)+" KB";}else{return(Math.round(((size*10)/1048576))/10)+" MB";}};L5.util.Format.lowercase=function(value){return String(value).toLowerCase();};L5.util.Format.uppercase=function(value){return String(value).toUpperCase();};L5.util.Format.capitalize=function(value){return!value?value:value.charAt(0).toUpperCase()
+value.substr(1).toLowerCase();};L5.util.Format.defaultValue=function(value,defaultValue){return value!==undefined&&value!==''?value:defaultValue;};L5.util.Format.date=function(v,format){if(!v){return"";}
if(!L5.isDate(v)){v=new Date(Date.parse(v));}
return v.dateFormat(format||"m/d/Y");};L5.util.Format.dateRenderer=function(format){return function(v){return L5.util.Format.date(v,format);};};L5.util.Format.number=function(v,format){if(!format){return v;}
v=L5.num(v,NaN);if(isNaN(v)){return'';}
var comma=',',dec='.',i18n=false,neg=v<0;v=Math.abs(v);if(format.substr(format.length-2)=='/i'){format=format.substr(0,format.length-2);i18n=true;comma='.';dec=',';}
var hasComma=format.indexOf(comma)!=-1,psplit=(i18n?format.replace(/[^\d\,]/g,''):format.replace(/[^\d\.]/g,'')).split(dec);if(1<psplit.length){v=v.toFixed(psplit[1].length);}else if(2<psplit.length){throw('NumberFormatException: invalid format, formats should have no more than 1 period: '+format);}else{v=v.toFixed(0);}
var fnum=v.toString();if(hasComma){psplit=fnum.split('.');var cnum=psplit[0],parr=[],j=cnum.length,m=Math.floor(j/3),n=cnum.length%3||3;for(var i=0;i<j;i+=n){if(i!=0){n=3;}
parr[parr.length]=cnum.substr(i,n);m-=1;}
fnum=parr.join(comma);if(psplit[1]){fnum+=dec+psplit[1];}}
return(neg?'-':'')+format.replace(/[\d,?\.?]+/,fnum);};L5.util.Format.numberRenderer=function(format){return function(v){return L5.util.Format.number(v,format);};};L5.util.Format.nl2br=function(v){return v===undefined||v===null?'':v.replace(/\n/g,'<br/>');};L5.util.Format.round=function(value,precision){var result=Number(value);if(typeof precision=='number'){precision=Math.pow(10,precision);result=Math.round(value*precision)/precision;}
return result;};

L5.XTemplate=function(){L5.XTemplate.superclass.constructor.apply(this,arguments);var s=this.html;s=['<tpl>',s,'</tpl>'].join('');var re=/<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/;var nameRe=/^<tpl\b[^>]*?for="(.*?)"/;var ifRe=/^<tpl\b[^>]*?if="(.*?)"/;var execRe=/^<tpl\b[^>]*?exec="(.*?)"/;var m,id=0;var tpls=[];while(m=s.match(re)){var m2=m[0].match(nameRe);var m3=m[0].match(ifRe);var m4=m[0].match(execRe);var exp=null,fn=null,exec=null;var name=m2&&m2[1]?m2[1]:'';if(m3){exp=m3&&m3[1]?m3[1]:null;if(exp){fn=new Function('values','parent','xindex','xcount','with(values){ return '+(L5.util.Format.htmlDecode(exp))+'; }');}}
if(m4){exp=m4&&m4[1]?m4[1]:null;if(exp){exec=new Function('values','parent','xindex','xcount','with(values){ '+(L5.util.Format.htmlDecode(exp))+'; }');}}
if(name){switch(name){case'.':name=new Function('values','parent','with(values){ return values; }');break;case'..':name=new Function('values','parent','with(values){ return parent; }');break;default:name=new Function('values','parent','with(values){ return '+name+'; }');}}
tpls.push({id:id,target:name,exec:exec,test:fn,body:m[1]||''});s=s.replace(m[0],'{xtpl'+id+'}');++id;}
for(var i=tpls.length-1;i>=0;--i){this.compileTpl(tpls[i]);}
this.master=tpls[tpls.length-1];this.tpls=tpls;};L5.extend(L5.XTemplate,L5.Template,{re:/\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,codeRe:/\{\[((?:\\\]|.|\n)*?)\]\}/g,applySubTemplate:function(id,values,parent,xindex,xcount){var t=this.tpls[id];if(t.test&&!t.test.call(this,values,parent,xindex,xcount)){return'';}
if(t.exec&&t.exec.call(this,values,parent,xindex,xcount)){return'';}
var vs=t.target?t.target.call(this,values,parent):values;parent=t.target?values:parent;if(t.target&&L5.isArray(vs)){var buf=[];for(var i=0,len=vs.length;i<len;i++){buf[buf.length]=t.compiled.call(this,vs[i],parent,i+1,len);}
return buf.join('');}
return t.compiled.call(this,vs,parent,xindex,xcount);},compileTpl:function(tpl){var fm=L5.util.Format;var useF=this.disableFormats!==true;var sep=L5.isGecko?"+":",";var fn=function(m,name,format,args,math){if(name.substr(0,4)=='xtpl'){return"'"+sep+'this.applySubTemplate('+name.substr(4)+', values, parent, xindex, xcount)'+sep+"'";}
var v;if(name==='.'){v='values';}else if(name==='#'){v='xindex';}else if(name.indexOf('.')!=-1){v=name;}else{v="values['"+name+"']";}
if(math){v='('+v+math+')';}
if(format&&useF){args=args?','+args:"";if(format.substr(0,5)!="this."){format="fm."+format+'(';}else{format='this.call("'+format.substr(5)+'", ';args=", values";}}else{args='';format="("+v+" === undefined ? '' : ";}
return"'"+sep+format+v+args+")"+sep+"'";};var codeFn=function(m,code){return"'"+sep+'('+code+')'+sep+"'";};var body;if(L5.isGecko){body="tpl.compiled = function(values, parent, xindex, xcount){ return '"+
tpl.body.replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn).replace(this.codeRe,codeFn)+"';};";}else{body=["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];body.push(tpl.body.replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn).replace(this.codeRe,codeFn));body.push("'].join('');};");body=body.join('');}
eval(body);return this;},applyTemplate:function(values){return this.master.compiled.call(this,values,{},1,1);},compile:function(){return this;}});L5.XTemplate.prototype.apply=L5.XTemplate.prototype.applyTemplate;L5.XTemplate.from=function(el){el=L5.getDom(el);return new L5.XTemplate(el.value||el.innerHTML);};

L5.util.ClickRepeater=function(el,config)
{this.el=L5.get(el);this.el.unselectable();L5.apply(this,config);this.addEvents("mousedown","click","mouseup");this.el.on("mousedown",this.handleMouseDown,this);if(this.preventDefault||this.stopDefault){this.el.on("click",function(e){if(this.preventDefault){e.preventDefault();}
if(this.stopDefault){e.stopEvent();}},this);}
if(this.handler){this.on("click",this.handler,this.scope||this);}
L5.util.ClickRepeater.superclass.constructor.call(this);};L5.extend(L5.util.ClickRepeater,L5.util.Observable,{interval:20,delay:250,preventDefault:true,stopDefault:false,timer:0,destroy:function(){L5.destroy(this.el);this.purgeListeners();},handleMouseDown:function(){clearTimeout(this.timer);this.el.blur();if(this.pressClass){this.el.addClass(this.pressClass);}
this.mousedownTime=new Date();L5.getDoc().on("mouseup",this.handleMouseUp,this);this.el.on("mouseout",this.handleMouseOut,this);this.fireEvent("mousedown",this);this.fireEvent("click",this);if(this.accelerate){this.delay=400;}
this.timer=this.click.defer(this.delay||this.interval,this);},click:function(){this.fireEvent("click",this);this.timer=this.click.defer(this.accelerate?this.easeOutExpo(this.mousedownTime.getElapsed(),400,-390,12000):this.interval,this);},easeOutExpo:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},handleMouseOut:function(){clearTimeout(this.timer);if(this.pressClass){this.el.removeClass(this.pressClass);}
this.el.on("mouseover",this.handleMouseReturn,this);},handleMouseReturn:function(){this.el.un("mouseover",this.handleMouseReturn,this);if(this.pressClass){this.el.addClass(this.pressClass);}
this.click();},handleMouseUp:function(){clearTimeout(this.timer);this.el.un("mouseover",this.handleMouseReturn,this);this.el.un("mouseout",this.handleMouseOut,this);L5.getDoc().un("mouseup",this.handleMouseUp,this);this.el.removeClass(this.pressClass);this.fireEvent("mouseup",this);}});

L5.KeyNav=function(el,config){this.el=L5.get(el);L5.apply(this,config);if(!this.disabled){this.disabled=true;this.enable();}};L5.KeyNav.prototype={disabled:false,defaultEventAction:"stopEvent",forceKeyDown:false,prepareEvent:function(e){var k=e.getKey();var h=this.keyToHandler[k];if(L5.isSafari2&&h&&k>=37&&k<=40){e.stopEvent();}},relay:function(e){var k=e.getKey();var h=this.keyToHandler[k];if(h&&this[h]){if(this.doRelay(e,this[h],h)!==true){e[this.defaultEventAction]();}}},doRelay:function(e,h,hname){return h.call(this.scope||this,e);},enter:false,left:false,right:false,up:false,down:false,tab:false,esc:false,pageUp:false,pageDown:false,del:false,home:false,end:false,keyToHandler:{37:"left",39:"right",38:"up",40:"down",33:"pageUp",34:"pageDown",46:"del",36:"home",35:"end",13:"enter",27:"esc",9:"tab"},enable:function(){if(this.disabled){if(this.forceKeyDown||L5.isIE||L5.isSafari3||L5.isAir){this.el.on("keydown",this.relay,this);}else{this.el.on("keydown",this.prepareEvent,this);this.el.on("keypress",this.relay,this);}
this.disabled=false;}},disable:function(){if(!this.disabled){if(this.forceKeyDown||L5.isIE||L5.isSafari3||L5.isAir){this.el.un("keydown",this.relay,this);}else{this.el.un("keydown",this.prepareEvent,this);this.el.un("keypress",this.relay,this);}
this.disabled=true;}}};

L5.KeyMap=function(el,config,eventName){this.el=L5.get(el);this.eventName=eventName||"keydown";this.bindings=[];if(config){this.addBinding(config);}
this.enable();};L5.KeyMap.prototype={stopEvent:false,addBinding:function(config){if(L5.isArray(config)){for(var i=0,len=config.length;i<len;i++){this.addBinding(config[i]);}
return;}
var keyCode=config.key,shift=config.shift,ctrl=config.ctrl,alt=config.alt,fn=config.fn||config.handler,scope=config.scope;if(config.stopEvent){this.stopEvent=config.stopEvent;}
if(typeof keyCode=="string"){var ks=[];var keyString=keyCode.toUpperCase();for(var j=0,len=keyString.length;j<len;j++){ks.push(keyString.charCodeAt(j));}
keyCode=ks;}
var keyArray=L5.isArray(keyCode);var handler=function(e){if((!shift||e.shiftKey)&&(!ctrl||e.ctrlKey)&&(!alt||e.altKey)){var k=e.getKey();if(keyArray){for(var i=0,len=keyCode.length;i<len;i++){if(keyCode[i]==k){if(this.stopEvent){e.stopEvent();}
fn.call(scope||window,k,e);return;}}}else{if(k==keyCode){if(this.stopEvent){e.stopEvent();}
fn.call(scope||window,k,e);}}}};this.bindings.push(handler);},on:function(key,fn,scope){var keyCode,shift,ctrl,alt;if(typeof key=="object"&&!L5.isArray(key)){keyCode=key.key;shift=key.shift;ctrl=key.ctrl;alt=key.alt;}else{keyCode=key;}
this.addBinding({key:keyCode,shift:shift,ctrl:ctrl,alt:alt,fn:fn,scope:scope})},handleKeyDown:function(e){if(this.enabled){var b=this.bindings;for(var i=0,len=b.length;i<len;i++){b[i].call(this,e);}}},isEnabled:function(){return this.enabled;},enable:function(){if(!this.enabled){this.el.on(this.eventName,this.handleKeyDown,this);this.enabled=true;}},disable:function(){if(this.enabled){this.el.removeListener(this.eventName,this.handleKeyDown,this);this.enabled=false;}}};

L5.util.TextMetrics=function(){var shared;return{measure:function(el,text,fixedWidth){if(!shared){shared=L5.util.TextMetrics.Instance(el,fixedWidth);}
shared.bind(el);shared.setFixedWidth(fixedWidth||'auto');return shared.getSize(text);},createInstance:function(el,fixedWidth){return L5.util.TextMetrics.Instance(el,fixedWidth);}};}();L5.util.TextMetrics.Instance=function(bindTo,fixedWidth){var ml=new L5.Element(document.createElement('div'));document.body.appendChild(ml.dom);ml.position('absolute');ml.setLeftTop(-1000,-1000);ml.hide();if(fixedWidth){ml.setWidth(fixedWidth);}
var instance={getSize:function(text){ml.update(text);var s=ml.getSize();ml.update('');return s;},bind:function(el){ml.setStyle(L5.fly(el).getStyles('font-size','font-style','font-weight','font-family','line-height','text-transform','letter-spacing'));},setFixedWidth:function(width){ml.setWidth(width);},getWidth:function(text){ml.dom.style.width='auto';return this.getSize(text).width;},getHeight:function(text){return this.getSize(text).height;}};instance.bind(bindTo);return instance;};L5.Element.measureText=L5.util.TextMetrics.measure;

L5.DataBean=function(classname){this.javaClass=classname;};L5.UploadFile=function(filename){this.javaClass="org.loushang.next.upload.UploadFile";this.filename=filename;};L5.UploadFile.prototype.toJsonString=function(){var obj=new Object();obj.javaClass=this.javaClass;obj.filename=this.filename;return L5.encode(obj);};L5.Map=function(classname,data){this.javaClass=classname?classname:"HashMap";this.map=data?data:new Object();this.length=this.size();};L5.Map.prototype={length:null,put:function(key,value){this.map[key]=value;this.length++;},get:function(key){var val=this.map[key];return L5.serializer.unmarshall(val);},remove:function(key){var ret=this.map[key];this.map[key]=null;this.length--;return ret;},size:function(){if(this.length!==null)
return this.length;this.length=0;for(var i in this.map){this.length++;}
return this.length;},toString:function(){var ret="{";var j=0;for(var i in this.map){ret+=i.toString()+":"+this.get(i).toString();if(j++<this.size()-1)
ret+=",";}
ret+="}";return ret;}};L5.List=function(classname,data){this.javaClass=classname?classname:"ArrayList";this.list=data?data:new Array();};L5.List.prototype={add:function(obj){this.list.push(obj);},get:function(index){var val=this.list[index];return L5.serializer.unmarshall(val);},size:function(){return this.list.length},toString:function(){var ret="[";for(var i=0;i<this.size();i++){ret+=this.get(i).toString();if(i<this.size()-1)
ret+=",";}
ret+="]";return ret;}};L5.serializer={};L5.serializer.converters={};L5.serializer.shortnames={"Date":"java.sql.Date","HashMap":"java.util.HashMap","ArrayList":"java.util.ArrayList","Record":"org.loushang.next.data.Record","ParameterSet":"org.loushang.next.data.ParameterSet"};L5.serializer.unmarshall=function(val){if(!val){return val;}
if(!val.javaClass){return val;}
var fullname=L5.serializer.shortnames[val.javaClass];if(fullname){val.javaClass=fullname;}
var converter=L5.serializer.converters[val.javaClass];if(converter){return converter(val);}
return val;};(function(){function list_convert(o){return new L5.List(o.javaClass,o.list);}
L5.serializer.converters["java.util.ArrayList"]=list_convert;L5.serializer.converters["java.util.LinkedList"]=list_convert;L5.serializer.converters["java.util.Vector"]=list_convert;function date_convert(o){return new Date(o.time);}
L5.serializer.converters["java.util.Date"]=date_convert;L5.serializer.converters["java.sql.Date"]=date_convert;function map_convert(o){return new L5.Map(o.javaClass,o.map);}
L5.serializer.converters["java.util.HashMap"]=map_convert;L5.serializer.converters["java.util.TreeMap"]=map_convert;L5.serializer.converters["java.util.LinkedHashMap"]=map_convert;L5.serializer.converters["java.util.WeakHashMap"]=map_convert;L5.serializer.converters["org.loushang.next.data.ParameterSet"]=map_convert;})();

L5.History=(function(){var iframe,hiddenField;var ready=false;var currentToken;function getHash(){var href=top.location.href,i=href.indexOf("#");return i>=0?href.substr(i+1):null;}
function doSave(){hiddenField.value=currentToken;}
function handleStateChange(token){currentToken=token;L5.History.fireEvent('change',token);}
function updateIFrame(token){var html=['<html><body><div id="state">',token,'</div></body></html>'].join('');try{var doc=iframe.contentWindow.document;doc.open();doc.write(html);doc.close();return true;}catch(e){return false;}}
function checkIFrame(){if(!iframe.contentWindow||!iframe.contentWindow.document){setTimeout(checkIFrame,10);return;}
var doc=iframe.contentWindow.document;var elem=doc.getElementById("state");var token=elem?elem.innerText:null;var hash=getHash();setInterval(function(){doc=iframe.contentWindow.document;elem=doc.getElementById("state");var newtoken=elem?elem.innerText:null;var newHash=getHash();if(newtoken!==token){token=newtoken;handleStateChange(token);top.location.hash=token;hash=token;doSave();}else if(newHash!==hash){hash=newHash;updateIFrame(newHash);}},50);ready=true;L5.History.fireEvent('ready',L5.History);}
function startUp(){currentToken=hiddenField.value?hiddenField.value:getHash();if(L5.isIE){checkIFrame();}else{var hash=getHash();setInterval(function(){var newHash=getHash();if(newHash!==hash){hash=newHash;handleStateChange(hash);doSave();}},50);ready=true;L5.History.fireEvent('ready',L5.History);}}
return{fieldId:'x-history-field',iframeId:'x-history-frame',events:{},init:function(onReady,scope){if(ready){L5.callback(onReady,scope,[this]);return;}
if(!L5.isReady){L5.onReady(function(){L5.History.init(onReady,scope);});return;}
hiddenField=L5.getDom(L5.History.fieldId);if(L5.isIE){iframe=L5.getDom(L5.History.iframeId);}
this.addEvents('ready','change');if(onReady){this.on('ready',onReady,scope,{single:true});}
startUp();},add:function(token,preventDup){if(preventDup!==false){if(this.getToken()==token){return true;}}
if(L5.isIE){return updateIFrame(token);}else{top.location.hash=token;return true;}},back:function(){history.go(-1);},forward:function(){history.go(1);},getToken:function(){return ready?currentToken:getHash();}};})();L5.apply(L5.History,new L5.util.Observable());

L5.util.Base64={encodeURIParameter:function(value){var t1=L5.util.Base64.encode(value);var t2=encodeURIComponent(t1);return t2;},_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=L5.util.Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+
this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+
this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}
return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}
output=L5.util.Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}
else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}
else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}}

L5.util.CSS=function(){var rules=null;var doc=document;var camelRe=/(-[a-z])/gi;var camelFn=function(m,a){return a.charAt(1).toUpperCase();};return{createStyleSheet:function(cssText,id){var ss;var head=doc.getElementsByTagName("head")[0];var rules=doc.createElement("style");rules.setAttribute("type","text/css");if(id){rules.setAttribute("id",id);}
if(L5.isIE){head.appendChild(rules);ss=rules.styleSheet;ss.cssText=cssText;}else{try{rules.appendChild(doc.createTextNode(cssText));}catch(e){rules.cssText=cssText;}
head.appendChild(rules);ss=rules.styleSheet?rules.styleSheet:(rules.sheet||doc.styleSheets[doc.styleSheets.length-1]);}
this.cacheStyleSheet(ss);return ss;},removeStyleSheet:function(id){var existing=doc.getElementById(id);if(existing){existing.parentNode.removeChild(existing);}},swapStyleSheet:function(id,url){this.removeStyleSheet(id);var ss=doc.createElement("link");ss.setAttribute("rel","stylesheet");ss.setAttribute("type","text/css");ss.setAttribute("id",id);ss.setAttribute("href",url);doc.getElementsByTagName("head")[0].appendChild(ss);},refreshCache:function(){return this.getRules(true);},cacheStyleSheet:function(ss){if(!rules){rules={};}
try{var ssRules=ss.cssRules||ss.rules;for(var j=ssRules.length-1;j>=0;--j){rules[ssRules[j].selectorText]=ssRules[j];}}catch(e){}},getRules:function(refreshCache){if(rules==null||refreshCache){rules={};var ds=doc.styleSheets;for(var i=0,len=ds.length;i<len;i++){try{this.cacheStyleSheet(ds[i]);}catch(e){}}}
return rules;},getRule:function(selector,refreshCache){var rs=this.getRules(refreshCache);if(!L5.isArray(selector)){return rs[selector];}
for(var i=0;i<selector.length;i++){if(rs[selector[i]]){return rs[selector[i]];}}
return null;},updateRule:function(selector,property,value){if(!L5.isArray(selector)){var rule=this.getRule(selector);if(rule){rule.style[property.replace(camelRe,camelFn)]=value;return true;}}else{for(var i=0;i<selector.length;i++){if(this.updateRule(selector[i],property,value)){return true;}}}
return false;}};}();

L5.util.TaskRunner=function(interval){interval=interval||10;var tasks=[],removeQueue=[];var id=0;var running=false;var stopThread=function(){running=false;clearInterval(id);id=0;};var startThread=function(){if(!running){running=true;id=setInterval(runTasks,interval);}};var removeTask=function(t){removeQueue.push(t);if(t.onStop){t.onStop.apply(t.scope||t);}};var runTasks=function(){if(removeQueue.length>0){for(var i=0,len=removeQueue.length;i<len;i++){tasks.remove(removeQueue[i]);}
removeQueue=[];if(tasks.length<1){stopThread();return;}}
var now=new Date().getTime();for(var i=0,len=tasks.length;i<len;++i){var t=tasks[i];var itime=now-t.taskRunTime;if(t.interval<=itime){var rt=t.run.apply(t.scope||t,t.args||[++t.taskRunCount]);t.taskRunTime=now;if(rt===false||t.taskRunCount===t.repeat){removeTask(t);return;}}
if(t.duration&&t.duration<=(now-t.taskStartTime)){removeTask(t);}}};this.start=function(task){tasks.push(task);task.taskStartTime=new Date().getTime();task.taskRunTime=0;task.taskRunCount=0;startThread();return task;};this.stop=function(task){removeTask(task);return task;};this.stopAll=function(){stopThread();for(var i=0,len=tasks.length;i<len;i++){if(tasks[i].onStop){tasks[i].onStop();}}
tasks=[];removeQueue=[];};};L5.TaskMgr=new L5.util.TaskRunner();

L5.util.BillPrint=function(){};L5.util.BillPrint.savePosition=function(){var command=new L5.Command("org.loushang.next.web.cmd.billprint.BillPrintCmd");if(!window.billpos){return;}
command.setParameter("template",window.printjsp);command.setParameter("positions",window.billpos);command.execute("savePosition");if(!command.error){alert(L5.saveSuccess?L5.saveSuccess:"Saved successfully.");}else{alert(command.error);}};L5.util.BillPrint.loadPosition=function(){var command=new L5.Command("org.loushang.next.web.cmd.billprint.BillPrintCmd");command.setParameter("template",window.printjsp);command.execute("loadPosition");window.billpos=command.getReturn("positions");for(name in window.billpos.map){var pos=window.billpos.map[name].split(',');var ele=document.getElementById(name);if(ele){ele.style.top=pos[0];ele.style.left=pos[1];}}};L5.util.BillPrint.afterDrag=function(){var ele=this.getEl();if(!window.billpos){window.billpos=new L5.Map();}
if(ele.offsetTop>0){window.billpos.map[ele.id]=""+ele.style.top+","+ele.style.left;}else{window.billpos.map[ele.id]=undefined;}};L5.billprint=L5.util.BillPrint;

(function(){var sameDomain=true;try{top.location.host}catch(e){sameDomain=false;}
L5.forward=function(url,caption,params){var str="?";if(params){for(var p in params.map){str+=p+"="+params.get(p)+"&";}}
str=str.substring(0,str.lastIndexOf("&"));url=url.trim();if(url.indexOf("http:")==0||url.indexOf("https:")==0){window.location.href=url+str;}else if(url.indexOf("/")==0){window.location.href=L5.webPath+url+str;}else{window.location.href=L5.webPath+"/"+url+str;}};L5.grid2excel=function(dataset,gridObj,fileName,classNamePath){var frame=document.getElementById("L5_excel_frame");if(!frame){frame=document.createElement('iframe');frame.id="L5_excel_frame";frame.name="L5_excel_frame";frame.className='l-hidden';if(L5.isIE){frame.src=L5.SSL_SECURE_URL;}
document.body.appendChild(frame);if(L5.isIE){document.frames["L5_excel_frame"].name="L5_excel_frame";}}
var form=document.getElementById("L5_excel_form");if(!form){form=document.createElement('form');form.id="L5_excel_form";form.name="L5_excel_form";form.display="none";form.target="L5_excel_frame";form.method='POST';if(classNamePath!=null){form.action=L5.webPath
+"/command/dispatcher/"+classNamePath;}else{form.action=L5.webPath
+"/command/dispatcher/org.loushang.next.web.cmd.ExcelCSVCommand";}
document.body.appendChild(form);var hd1=document.createElement('input');hd1.type='hidden';hd1.name="params";hd1.id="params";form.appendChild(hd1);var hd2=document.createElement('input');hd2.type='hidden';hd2.name="command_clazz";hd2.id="command_clazz";form.appendChild(hd2);var hd3=document.createElement('input');hd3.type='hidden';hd3.name="command_method";hd3.id="command_method";form.appendChild(hd3);var headerInfo=document.createElement('input');headerInfo.type='hidden';headerInfo.name="headerInfo";headerInfo.id="headerInfo";form.appendChild(headerInfo);if(fileName!=null&&fileName!=undefined){var fileNameInfo=document.createElement('input');fileNameInfo.type='hidden';fileNameInfo.name='fileName';fileNameInfo.id='fileName';form.appendChild(fileNameInfo);form.fileName.value=encodeURI(fileName);}}
var map=new L5.Map("ParameterSet");var params=L5.apply(dataset.lastOptions.params||{},dataset.baseParams);for(name in params){if(name=="start"||name=="limit"){continue;}
map.put(name,params[name]);}
form.params.value=L5.encode(map);if(dataset.proxy.clazz){form.command_clazz.value=dataset.proxy.clazz;}else{form.command_clazz.value="no class";}
if(dataset.proxy.method){form.command_method.value=dataset.proxy.method;}else{form.command_method.value="execute";}
var colModel=gridObj.getColumnModel();var colCount=colModel.getColumnCount();var headerMap=new L5.Map();var headers=new Array();var field;for(var j=0;j<colCount;j++){var columnId=colModel.getColumnId(j);if(columnId=="numberer"||columnId=="checker")
field=columnId;else
field=colModel.getColumnById(columnId).field;headerMap.put(field,colModel.getColumnHeader(j));headers[j]=field;}
headerMap.put("headers",headers);form.headerInfo.value=encodeURI(L5.encode(headerMap));form.submit();}
L5.dataset2excel=function(dataset,layout){var frame=document.getElementById("L5_excel_frame");if(!frame){frame=document.createElement('iframe');frame.id="L5_excel_frame";frame.name="L5_excel_frame";frame.className='l-hidden';if(L5.isIE){frame.src=L5.SSL_SECURE_URL;}
document.body.appendChild(frame);if(L5.isIE){document.frames["L5_excel_frame"].name="L5_excel_frame";}}
var form=document.getElementById("L5_excel_form");if(!form){form=document.createElement('form');form.id="L5_excel_form";form.name="L5_excel_form";form.display="none";form.target="L5_excel_frame";form.method='POST';form.action=L5.webPath
+"/command/dispatcher/org.loushang.next.web.cmd.Dataset2ExcelCommand";document.body.appendChild(form);var hd1=document.createElement('input');hd1.type='hidden';hd1.name="params";hd1.id="params";form.appendChild(hd1);var hd2=document.createElement('input');hd2.type='hidden';hd2.name="command_clazz";hd2.id="command_clazz";form.appendChild(hd2);var hd3=document.createElement('input');hd3.type='hidden';hd3.name="command_method";hd3.id="command_method";hd3.value="execute";form.appendChild(hd3);var hd4=document.createElement('input');hd4.type='hidden';hd4.name="excel_layout_jsp";hd4.id="excel_layout_jsp";form.appendChild(hd4);}
var map=new L5.Map("ParameterSet");var params=L5.apply(dataset.lastOptions.params||{},dataset.baseParams);for(name in params){if(name=="start"||name=="limit"){continue;}
map.put(name,params[name]);}
form.params.value=L5.encode(map);if(dataset.proxy.clazz){form.command_clazz.value=dataset.proxy.clazz;}else{form.command_clazz.value="no class";}
if(dataset.proxy.method){form.command_method.value=dataset.proxy.method;}else{form.command_method.value="execute";}
if(layout){form.excel_layout_jsp.value=layout;}
form.submit();}
L5.session={};L5.session.getUserInfo=function(){if(sameDomain&&top.userInfo!=null)
return top.userInfo;var command=new L5.Command("org.loushang.session.SessionCmd");command.execute("getUserInfo");if(!command.error){var info=command.getReturn("userInfo");if(sameDomain){top.userInfo=info;}
return info;}else{var msg=L5.unlogged?L5.unlogged:"User is not logged."
alert(msg);}}
L5.server={executeSysCmd:function(method){var command=new L5.Command("org.loushang.next.common.cmd.SystemInfoCmd");command.execute(method);if(!command.error){return command;}else{var msg=L5.cmdFailed?L5.cmdFailed:"Failed to access the server.";alert(msg);return null;}}};L5.server.getSysDate=function(){var command=this.executeSysCmd("getSysDate");if(command!=null)
return command.getReturn("date");else
return null;}
L5.gridPrint=function(id,title){if(!id){return;}
if(!title){title="";}
var path=encodeURI(encodeURI(L5.webPath
+'/jsp/public/gridPrint.jsp?id='+id+'&title='+title));window.open(path,'print','toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');}
L5.setDebug=function(symbol){var command=new L5.Command("org.loushang.next.web.cmd.LoadjsCommand");if(symbol){command.execute("openDebug");}else{command.execute("closeDebug");}}
L5.getDebug=function(){var command=new L5.Command("org.loushang.next.web.cmd.LoadjsCommand");command.execute("getDebug");return command.getReturn("DEBUG_MODE");}})();
