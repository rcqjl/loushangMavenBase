
L5={version:'5.0',DataType:{Bean:"bean",Record:"record",BeanList:""}};(function(){var paths=document.location.pathname.split("/");if(paths[0]==''){L5.webPath="/"+paths[1];}else{L5.webPath="/"+paths[0];}})();var ua=navigator.userAgent.toLowerCase();var isStrict=document.compatMode=="CSS1Compat",isOpera=ua.indexOf("opera")>-1,isChrome=ua.indexOf("chrome")>-1,isSafari=!isChrome&&(/webkit|khtml/).test(ua),isSafari3=isSafari&&ua.indexOf('webkit/5')!=-1,isIE=!isOpera&&ua.indexOf("msie")>-1,isIE7=!isOpera&&ua.indexOf("msie 7")>-1,isIE8=!isOpera&&ua.indexOf("msie 8")>-1,isGecko=!isSafari&&!isChrome&&ua.indexOf("gecko")>-1,isGecko3=isGecko&&ua.indexOf("rv:1.9")>-1,isBorderBox=isIE&&!isStrict,isWindows=(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1),isMac=(ua.indexOf("macintosh")!=-1||ua.indexOf("mac os x")!=-1),isAir=(ua.indexOf("adobeair")!=-1),isLinux=(ua.indexOf("linux")!=-1),isSecure=window.location.href.toLowerCase().indexOf("https")===0;L5.isIE=isIE;L5.SSL_SECURE_URL="javascript:false";L5.apply=function(o,c,defaults){if(defaults){L5.apply(o,defaults);}
if(o&&c&&typeof c=='object'){for(var p in c){o[p]=c[p];}}
return o;};L5.applyIf=function(o,c){if(o&&c){for(var p in c){if(typeof o[p]=="undefined"){o[p]=c[p];}}}
return o;};L5.Exception=function(code,message,javaStack){this.code=code;this.message=message;var name;if(javaStack){this.javaStack=javaStack;}};L5.Exception.prototype=new Error();L5.Exception.prototype.toString=function(){return this.message;};L5.ns=L5.namespace=function(){var a=arguments,o=null,i,j,d,rt;for(i=0;i<a.length;++i){d=a[i].split(".");rt=d[0];eval('if (typeof '+rt+' == "undefined"){'+rt+' = {};} o = '
+rt+';');for(j=1;j<d.length;++j){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}};L5.escapeRe=function(s){return s.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1");};L5.callback=function(cb,scope,args,delay){if(typeof cb=="function"){if(delay){cb.defer(delay,scope,args||[]);}else{cb.apply(scope,args||[]);}}};L5.num=function(v,defaultValue){if(typeof v!='number'||isNaN(v)){return defaultValue;}
return v;};L5.destroy=function(){for(var i=0,a=arguments,len=a.length;i<len;i++){var as=a[i];if(as){if(typeof as.destroy=='function'){as.destroy();}else if(as.dom){as.removeAllListeners();as.remove();}}}};L5.removeNode=isIE?function(){var d;return function(n){if(n&&n.tagName!='BODY'){d=d||document.createElement('div');d.appendChild(n);d.innerHTML='';}}}():function(n){if(n&&n.parentNode&&n.tagName!='BODY'){n.parentNode.removeChild(n);}};L5.type=function(o){if(o===undefined||o===null){return false;}
if(o.htmlElement){return'element';}
var t=typeof o;if(t=='object'&&o.nodeName){switch(o.nodeType){case 1:return'element';case 3:return(/\S/).test(o.nodeValue)?'textnode':'whitespace';}}
if(t=='object'||t=='function'){switch(o.constructor){case Array:return'array';case RegExp:return'regexp';case Date:return'date';}
if(typeof o.length=='number'&&typeof o.item=='function'){return'nodelist';}}
return t;};L5.isArray=function(v){return v&&typeof v.length=='number'&&typeof v.splice=='function';};L5.isDate=function(v){return v&&v.javaClass=='L5.DateNew';};L5.ns("L5","L5.util","L5.model","L5.form");L5.Ajax={request:$.ajax};L5.UploadFile=function(filename){this.javaClass="org.loushang.next.upload.UploadFile";this.filename=filename;};L5.UploadFile.prototype.toJsonString=function(){var obj=new Object();obj.javaClass=this.javaClass;obj.filename=this.filename;return L5.encode(obj);};L5.Map=function(classname,data){this.javaClass=classname?classname:"HashMap";this.map=data?data:new Object();this.length=this.size();};L5.Map.prototype={length:null,put:function(key,value){this.map[key]=value;this.length++;},get:function(key){var val=this.map[key];return L5.serializer.unmarshall(val);},remove:function(key){var ret=this.map[key];this.map[key]=null;this.length--;return ret;},size:function(){if(this.length!==null)
return this.length;this.length=0;for(var i in this.map){this.length++;}
return this.length;},toString:function(){var ret="{";var j=0;for(var i in this.map){ret+=i.toString()+":"+this.get(i).toString();if(j++<this.size()-1)
ret+=",";}
ret+="}";return ret;}};L5.DateNew=function(classname,date){this.javaClass=classname?classname:"L5.DateNew";this.dateStr=date?date:"";this.time=date?date:"";};L5.List=function(classname,data){this.javaClass=classname?classname:"ArrayList";this.list=data?data:new Array();};L5.List.prototype={add:function(obj){this.list.push(obj);},get:function(index){var val=this.list[index];return L5.serializer.unmarshall(val);},size:function(){return this.list.length},toString:function(){var ret="[";for(var i=0;i<this.size();i++){ret+=this.get(i).toString();if(i<this.size()-1)
ret+=",";}
ret+="]";return ret;}};L5.serializer={};L5.serializer.converters={};L5.serializer.shortnames={"Date":"L5.DateNew","HashMap":"java.util.HashMap","ArrayList":"java.util.ArrayList","Record":"org.loushang.next.data.Record","ParameterSet":"org.loushang.next.data.ParameterSet"};L5.serializer.unmarshall=function(val){if(!val){return val;}
if(!val.javaClass){return val;}
var fullname=L5.serializer.shortnames[val.javaClass];if(fullname){val.javaClass=fullname;}
var converter=L5.serializer.converters[val.javaClass];if(converter){return converter(val);}
return val;};(function(){function list_convert(o){return new L5.List(o.javaClass,o.list);}
L5.serializer.converters["java.util.ArrayList"]=list_convert;L5.serializer.converters["java.util.LinkedList"]=list_convert;L5.serializer.converters["java.util.Vector"]=list_convert;function date_convert(o){return new Date(o.time);}
function date_convert_new(o){return new L5.DateNew(o.javaClass,o.dateStr);}
L5.serializer.converters["java.util.Date"]=date_convert;L5.serializer.converters["java.sql.Date"]=date_convert;L5.serializer.converters["Date"]=date_convert_new;function map_convert(o){return new L5.Map(o.javaClass,o.map);}
L5.serializer.converters["java.util.HashMap"]=map_convert;L5.serializer.converters["java.util.TreeMap"]=map_convert;L5.serializer.converters["java.util.LinkedHashMap"]=map_convert;L5.serializer.converters["java.util.WeakHashMap"]=map_convert;L5.serializer.converters["org.loushang.next.data.ParameterSet"]=map_convert;})();L5.util.JSON=new(function(){var useHasOwn=!!{}.hasOwnProperty;var pad=function(n){return n<10?"0"+n:n;};var m={"\b":'\\b',"\t":'\\t',"\n":'\\n',"\f":'\\f',"\r":'\\r','"':'\\"',"\\":'\\\\'};var encodeString=function(s){if(/["\\\x00-\x1f]/.test(s)){return'"'+s.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return"\\u00"+
Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"';}
return'"'+s+'"';};var encodeArray=function(o){var a=['['],b,i,l=o.length,v;for(i=0;i<l;i+=1){v=o[i];switch(typeof v){case"undefined":case"function":case"unknown":break;default:if(b){a.push(',');}
a.push(v===null?"null":L5.util.JSON.encode(v));b=true;}}
a.push("]");return a.join("");};this.encodeDate=function(o){var d=new Date(o.dateStr.replace(/-/g,"/"));var obj=new Object();obj.javaClass="Date";obj.time=d.getTime();return L5.encode(obj);};this.encode=function(o){if(typeof o=="undefined"||o===null){return"null";}else if(o.toJsonString){return o.toJsonString();}else if(L5.isArray(o)){return encodeArray(o);}else if(L5.isDate(o)){return L5.util.JSON.encodeDate(o);}else if(typeof o=="string"){return encodeString(o);}else if(typeof o=="number"){return isFinite(o)?String(o):"null";}else if(typeof o=="boolean"){return String(o);}else{var a=["{"],b,i,v;for(i in o){if(!useHasOwn||o.hasOwnProperty(i)){v=o[i];switch(typeof v){case"undefined":case"function":case"unknown":break;default:if(b){a.push(',');}
a.push(this.encode(i),":",v===null?"null":this.encode(v));b=true;}}}
a.push("}");return a.join("");}};this.decode=function(json){try{return eval("("+json+')');}catch(e){throw new L5.Exception(550,L5.parseReturnError?L5.parseReturnError:"Error parse return value.");}};})();L5.encode=L5.util.JSON.encode;L5.decode=L5.util.JSON.decode;(function(){L5.server={executeSysCmd:function(method){var command=new L5.Command("org.loushang.next.common.cmd.SystemInfoCmd");command.execute(method);if(!command.error){return command;}else{var msg=L5.cmdFailed?L5.cmdFailed:"Failed to access the server.";alert(msg);return null;}}};L5.server.getSysDate=function(){var command=this.executeSysCmd("getSysDate");if(command!=null)
return command.getReturn("date");else
return null;}})();L5.Command=function(id){this.id=id;this.data="";this.customDatas="";this.params=new L5.Map("ParameterSet");this.returns=new L5.Map("ParameterSet");};L5.Command.context=new L5.Map();L5.Command.setContextParameter=function(name,value){L5.Command.context.put(name,value);}
L5.setCP=L5.setContextParameter=L5.Command.setContextParameter;L5.Command.getContextParameter=function(name){return L5.Command.context.get(name);}
L5.getCP=L5.getContextParameter=L5.Command.getContextParameter;L5.Command.prototype={setForm:function(dom){this.form=dom;},setParameter:function(name,value){this.params.put(name,value);},getReturn:function(name){return this.returns.get(name);},execute:function(method,sync,o){if(sync==false||sync=="false"){sync=false;}else{sync=true;}
var url=L5.webPath+"/command/ajax/"+this.id;if(method){url=url+"/"+method;}
var data={"params":this.params,"context":L5.Command.context};var json=L5.encode(data);var conf={url:url,type:"POST",headers:{"Content-Type":"application/json"},async:!sync,data:json,timeout:30000,success:$.proxy(this.handleSuccess,this,o),error:$.proxy(this.handleFailure,this)};if(this.form){var form=this.form;url=url||form.action;conf=L5.apply({callback:this.handleSuccess,scope:this,ps:this.params,url:url},conf);return this.doFormUpload(conf);};try{L5.Ajax.request(conf);}catch(e){this.error=e;}},doFormUpload:function(o){var ps=o.params;var url=o.url;var id="L5-gen"+this.form.id;var frame=document.createElement('iframe');frame.id=id;frame.name=id;frame.hidden='true';if(L5.isIE){frame.src=L5.SSL_SECURE_URL;}
document.body.appendChild(frame);if(L5.isIE){document.frames[id].name=id;}
var form=this.form;form.target=id;form.method='POST';form.enctype=form.encoding='multipart/form-data';if(url){form.action=url;}
var hiddens,hd;if(ps||o.data){hiddens=[];for(var k in ps){if(ps.hasOwnProperty(k)){hd=document.createElement('input');hd.type='hidden';hd.name=k;hd.value=ps[k];form.appendChild(hd);hiddens.push(hd);}}
hd=document.createElement('input');hd.type='hidden';hd.name='jsonData';hd.value=o.data;form.appendChild(hd);hiddens.push(hd);}
var fn=function(){var r={responseText:'',responseXML:null};r.argument=o?o.argument:null;try{var doc;if(L5.isIE){doc=frame.contentWindow.document;}else{doc=(frame.contentDocument||window.frames[id].document);}
if(doc&&doc.body){if(doc.body.textContent)
r.responseText=doc.body.textContent;if(doc.body.innerText)
r.responseText=doc.body.innerText;}
if(doc&&doc.XMLDocument){r.responseXML=doc.XMLDocument;}else{r.responseXML=doc;}}
catch(e){}
L5.callback(o.callback,o.scope,[null,r.responseText]);setTimeout(function(){L5.removeNode(frame);},100);}
if(frame.attachEvent){frame.attachEvent("onload",fn);}else{frame.addEventListener("load",fn,false);}
form.submit();if(hiddens){for(var i=0,len=hiddens.length;i<len;i++){L5.removeNode(hiddens[i]);}}},dispatcher:function(method,sync){if(sync==false||sync=="false"){sync=false;}else{sync=true;}
var url=L5.webPath+"/command/dispatcher/"+this.id;if(method){url=url+"/"+method;}
try{L5.Ajax.request({url:url,type:"POST",headers:{"Content-Type":"application/json"},async:!sync,data:{},timeout:30000,success:$.proxy(this.handleSuccess,this),error:$.proxy(this.handleFailure,this)});}catch(e){this.error=e;}},reset:function(){this.params=new L5.Map("ParameterSet");this.returns=new L5.Map("ParameterSet");this.error=null;},handleSuccess:function(o,data,textStatus,jqXHR){if(!o){this.loadResponse(data);}else{var result;try{result=this.loadResponse(data,o.reader);}catch(e){o.callback(null,o.arg,false,o.scope);return;}
o.callback(result,o.arg,true,o.scope);}
if(this.afterExecute)
this.afterExecute();},loadResponse:function(data,reader){var obj=L5.decode(data);if(obj.error){this.error=obj.error;var exception=new L5.Exception(obj.error.code,obj.error.msg,obj.error.trace)
if(obj.error.title){exception.title=obj.error.title;}}
if(obj.customDatas){this.customDatas=L5.serializer.unmarshall(obj.customDatas.map);}
this.returns=L5.serializer.unmarshall(obj);if(obj&&obj.javaClass&&obj.javaClass=="DataSet"){var length=obj.rows.length;var pageSize=this.params.get("limit");this.dataInfo={total:obj.rows.length};var length=obj.rows.length;var original;this.data=[];for(var i=0;i<obj.rows.length;i++){original=obj.rows[i];this.data[i]={};for(var item in original){this.data[i][item]=L5.serializer.unmarshall(original[item]);}}}
if(obj&&obj.javaClass&&(obj.javaClass=="ParameterSet"||obj.javaClass=="org.loushang.next.data.ParameterSet")){this.data=obj.map;}
var records=[];if(reader!=null&&reader!=undefined){for(var i=0;i<this.data.length;i++){var singleData=this.data[i];var values={};var fields=reader.prototype.fields;for(var j=0;j<fields.size();j++){var field=fields.get(j);var fName=field.name
values[fName]=field.convert((singleData[fName]!==undefined)?singleData[fName]:field.defaultValue,singleData);}
var record=new reader(values);record.json=singleData;records[i]=record;}}
return{data:this.data,customDatas:this.customDatas,records:records};},handleFailure:function(jqXHR,textStatus,errorThrown){alert(errorThrown);},getData:function(model_descriptor){if(!model_descriptor){this.flatData=this.data;return this.flatData;}
if(!this.flatData){this.flatData=[];for(i=0;i<this.data.length;i++){this.flatData[i]={};for(name in this.data[i]){if(name in model_descriptor){var type=typeof model_descriptor[name]=="object"?model_descriptor[name].type:model_descriptor[name];switch(type){case"date":if(this.data[i][name]){var dateFormat=model_descriptor[name].format;this.flatData[i][name]=L5.Date.dateFormat(this.data[i][name],dateFormat);}else{this.flatData[i][name]="";}
break;default:this.flatData[i][name]=this.data[i][name];}}else{this.flatData[i][name]=this.data[i][name];}}}}
return this.flatData;},getSingleData:function(model_descriptor){return this.getData(model_descriptor)[0];},getDataInfo:function(){return this.dataInfo;},getOriginalData:function(){return this.data;},getCustomData:function(key){if(!key){return this.customDatas;}
if(this.customDatas){var obj=this.customDatas[key];if(obj.javaClass=="DataSet")
return obj;else
return L5.serializer.unmarshall(obj);}else{return undefined;}}};L5.DataConvert=function(orgData){var jsObj=eval(orgData);var data=[];for(var i=0;i<jsObj.length;i++){var obj=new Object();obj.javaClass="Record";obj.id=i;if(jsObj[i].state==1){obj.state=1;}else{obj.state=3;}
obj.data=jsObj[i];data[i]=obj;}
return data;};

L5.extend=function(){var io=function(o){for(var m in o){this[m]=o[m];}};var oc=Object.prototype.constructor;return function(sb,sp,overrides){if(typeof sp=='object'){overrides=sp;sp=sb;sb=overrides.constructor!=oc?overrides.constructor:function(){sp.apply(this,arguments);};}
var spp=sp.prototype;var F=function(){};F.prototype=spp;var sbp=sb.prototype=new F();sbp.constructor=sb;sb.superclass=spp;if(spp.constructor==oc){spp.constructor=sp;}
L5.override(sb,overrides);sb.override=function(o){L5.override(sb,o);};sbp.override=io;return sb;};}();L5.override=function(origclass,overrides){if(overrides){var p=origclass.prototype;for(var method in overrides){p[method]=overrides[method];}
if(L5.isIE&&overrides.toString!=origclass.toString){p.toString=overrides.toString;}}};

L5.Dataset=function(config){this.data=new L5.List();this.data.getKey=function(o){return o.id;};this.id;this.cmd;this.method;this.customDatas;if(config.recordType){this.recordType=config.recordType;this.fields=this.recordType.prototype.fields;this.currentRecod=new this.recordType();}
this.baseParams={};this.loadParams={};if(config&&config.data){this.inlineData=config.data;delete config.data;}
L5.apply(this,config);this.modified=[];this.deleted=[];this.validated={};};L5.Dataset.prototype={pruneModifiedRecords:true,setParameter:function(name,value){if(!this.sortInfo)
this.sortInfo={};if(name=="sort"){this.sortInfo.field=value;}else if(name=="dir"){this.sortInfo.direction=value;}else{this.loadParams[name]=value;}},getCurrent:function(){this.currentRecod.getModelData();return this.currentRecod;},load:function(options){if(options===true){options={sync:true};}
options=options||{};options.params=L5.apply(options.params||{},this.loadParams);this.loadParams={};var p=L5.apply(options.params||{},this.baseParams);if(options.sync){p.sync=true;}
this.loadData(p,{reader:this.recordType,callback:this.loadRecords,scope:this,arg:options});},loadData:function(params,o){var callback=o.callback;var arg=o.arg;var scope=o.scope;var paramset=new L5.Map("org.loushang.next.data.ParameterSet");var sync=false;var cmd=new L5.Command(this.cmd);if(params){for(name in params){if(name!='sync'){cmd.setParameter(name,params[name]);}else
sync=params.sync;}}
cmd.execute(this.method,sync,o);},loadCustomDatas:function(o){if(o.customDatas){this.customDatas=o.customDatas;}else{return;}},getCustomData:function(key){if(this.customDatas){var obj=this.customDatas[key];if(obj.javaClass=="DataSet")
return obj;else
return L5.serializer.unmarshall(obj);}else{return undefined;}},loadRecords:function(o,options,success,scope){if(!o||success===false){alert("读取record对象失败！");return;}
scope.loadCustomDatas(o);scope.data=o.data;var r=o.records,t=r.length;if(!options||options.add!==true){for(var i=0,len=r.length;i<len;i++){r[i].join(this);}
this.totalLength=t;}else{this.totalLength=this.data.length+t;}
if(options.callback){options.callback.call(options.scope||this,r,options,true);}
L5.apply(scope.currentRecod,r[0]);var model=scope.currentRecod.generateModel();ko.applyBindings(model);},readData:function(o){this.data=o;var records=[];if(this.recordType!=null&&this.recordType!=undefined){for(var i=0;i<this.data.length;i++){var singleData=this.data[i];var values={};var fields=this.recordType.prototype.fields;for(var j=0;j<fields.size();j++){var field=fields.get(j);var fName=field.name
values[fName]=field.convert((singleData[fName]!==undefined)?singleData[fName]:field.defaultValue,singleData);}
var record=new this.recordType(values);record.json=singleData;records[i]=record;}}
L5.apply(this.currentRecod,records[0]);var model=this.currentRecod.generateModel();ko.applyBindings(model);},newRecord:function(obj){if(this.recordType==null){return;}
var record;if(obj==null){record=new this.recordType();}else{record=new(this.recordType)(obj);}
record.state=L5.Record.STATE_NEW;var model=record.generateModel();ko.applyBindings(model);L5.apply(this.currentRecod,record);return record;}};

L5.Record=function(data,id){this.id=(id||id===0)?id:++L5.Record.AUTO_ID;this.data=data;this.state=L5.Record.NONE;this.model=null;if(this.data==null)
this.data={};for(var i=0;i<this.fields.size();i++){var item=this.fields.get(i);if(this.data[item.name]||this.data[item.name]===0)
continue;var dv=item.defaultValue;if(!dv)
dv="";var val=item.convert(dv);this.data[item.name]=val;}
this.validate={};this.msg={};this.msgLable={};this.msgIndex={};};L5.Record.create=function(o){var f=L5.extend(L5.Record,{});var p=f.prototype;p.fields=new L5.List();for(var i=0,len=o.length;i<len;i++){p.fields.add(new L5.Field(o[i]));}
f.getField=function(name){return p.fields.get(name);};return f;};L5.Record.AUTO_ID=1000;L5.Record.EDIT='edit';L5.Record.REJECT='reject';L5.Record.COMMIT='commit';L5.Record.NONE=0;L5.Record.STATE_NEW=1;L5.Record.STATE_MODIFIED=3;L5.Record.STATE_DELETED=2;L5.Record.prototype={join:function(ds){this.dataset=ds;},toBean:function(clazz){var bean=new L5.DataBean(clazz);var data=this.data;for(name in data){if(data[name]=="")
bean[name]=undefined;else
bean[name]=data[name];}
bean.state=this.state;return bean;},toJsonString:function(){var obj=new Object();obj.javaClass="Record";obj.id=this.id;obj.state=this.state;obj.data=this.data;return L5.encode(obj);},set:function(name,value){var field=null;for(var i=0;i<this.fields.size();++i){if(this.fields.get(i).name==name){field=this.fields.get(i);}}
if(field==null){alert("field "+name+" is undefine in model");return false;}
if(String(this.data[name])!=String(value)){value=field.convert(value);this.data[name]=value;}
return true;},get:function(name){return this.data[name];},copy:function(id){return new this.constructor(L5.apply({},this.data),id||this.id+'copy');},isModified:function(name){return!!(this.modified&&this.modified.hasOwnProperty(name));},validateRecord:function(ifdes,ifall){},generateModel:function(){var obj=this.data;if(!obj){return;}
if(this.model){return this.model;}else{var model={};for(name in obj){model[name]=ko.observable(obj[name]);}
this.model=model;return model;}},getModelData:function(){var jsObj=ko.toJS(this.model);for(name in jsObj){if(this.state!=L5.Record.STATE_NEW&&this.data[name]!=jsObj[name]){this.state=L5.Record.STATE_MODIFIED;}
this.data[name]=jsObj[name];}}};

L5.Field=function(config){if(typeof config=="string"){config={name:config};}
L5.apply(this,config);if(!this.type){this.type="auto";}
var st=L5.model.SortTypes;var stripRe=/[\$,%]/g;var decimalPrecision=2;if(!this.convert){var cv,dateFormat=this.dateFormat;switch(this.type){case"":case"auto":case undefined:cv=function(v){return v;};break;case"string":cv=function(v){return(v===undefined||v===null)?'':String(v);};break;case"int":cv=function(v){return v!==undefined&&v!==null&&v!==''?parseInt(String(v).replace(stripRe,""),10):'';};break;case"file":cv=function(v){return v!==undefined&&v!==null&&v!==''?new L5.UploadFile(v):new L5.UploadFile(this.name);};break;case"float":cv=function(v){return v!==undefined&&v!==null&&v!==''?parseFloat(String(v).replace(stripRe,""),10).toFixed(decimalPrecision):'';};break;case"bool":case"boolean":cv=function(v){return v===true||v==="true"||v==1;};break;case"date":cv=function(v){if(!v){return'';}
if(L5.isDate(v)){if(dateFormat&&(!v.formatstr))v.formatstr=dateFormat;return v;}
if(v.javaClass&&v.dateStr){var index=v.dateStr.indexOf(".");if(index!=-1){v.dateStr=v.dateStr.substring(0,index);}
v.dateStr=v.dateStr.replace(/-/g,"/");var o=new Date(v.dateStr);if(dateFormat)o.formatstr=dateFormat;return o}
if(dateFormat){if(dateFormat=="timestamp"){var o=new Date(v*1000);if(dateFormat)o.formatstr=dateFormat;return o;}
if(dateFormat=="time"){var o=new Date(parseInt(v,10));if(dateFormat)o.formatstr=dateFormat;return o;}
return Date.parseDate(v,dateFormat);}
var parsed=Date.parse(v);return parsed?new Date(parsed):null;};break;}
this.convert=cv;}};L5.Field.prototype={dateFormat:null,defaultValue:"",mapping:null,sortType:null,sortDir:"ASC"};
