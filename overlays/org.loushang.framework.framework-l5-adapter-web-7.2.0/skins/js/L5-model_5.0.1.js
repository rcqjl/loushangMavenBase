
L5.model.SortTypes={none:function(s){return s;},stripTagsRE:/<\/?[^>]+>/gi,asText:function(s){return String(s).replace(this.stripTagsRE,"");},asUCText:function(s){return String(s).toUpperCase().replace(this.stripTagsRE,"");},asUCString:function(s){return String(s).toUpperCase();},asDate:function(s){if(!s){return 0;}
if(L5.isDate(s)){return s.getTime();}
return Date.parse(String(s));},asFloat:function(s){var val=parseFloat(String(s).replace(/,/g,""));if(isNaN(val))val=0;return val;},asInt:function(s){var val=parseInt(String(s).replace(/,/g,""));if(isNaN(val))val=0;return val;}};

L5.model.Record=function(data,id){this.id=(id||id===0)?id:++L5.model.Record.AUTO_ID;this.data=data;this.state=L5.model.Record.NONE;if(this.data==null)
this.data={};for(var i=0;i<this.fields.items.length;i++){var item=this.fields.items[i];if(this.data[item.name]||this.data[item.name]===0)
continue;var dv=item.defaultValue;if(!dv)
dv="";var val=item.convert(dv);this.data[item.name]=val;}
this.validate={};this.msg={};this.msgLable={};this.msgIndex={};};L5.model.Record.create=function(o){var f=L5.extend(L5.model.Record,{});var p=f.prototype;p.fields=new L5.util.MixedCollection(false,function(field){return field.name;});for(var i=0,len=o.length;i<len;i++){p.fields.add(new L5.model.Field(o[i]));}
f.getField=function(name){return p.fields.get(name);};return f;};L5.model.Record.AUTO_ID=1000;L5.model.Record.EDIT='edit';L5.model.Record.REJECT='reject';L5.model.Record.COMMIT='commit';L5.model.Record.NONE=0;L5.model.Record.STATE_NEW=1;L5.model.Record.STATE_MODIFIED=3;L5.model.Record.STATE_DELETED=2;L5.model.Record.prototype={dirty:false,editing:false,error:null,modified:null,validate:null,msg:null,msgLable:null,join:function(ds){this.dataset=ds;},toBean:function(clazz){var bean=new L5.DataBean(clazz);var data=this.data;for(name in data){if(data[name]=="")
bean[name]=undefined;else
bean[name]=data[name];}
bean.state=this.state;return bean;},toJsonString:function(){var obj=new Object();obj.javaClass="Record";obj.id=this.id;obj.state=this.state;obj.data=this.data;return L5.encode(obj);},set:function(name,value,srcElement){var result=true;var field=this.fields.get(name);if(field==null){L5.Msg.alert(L5.alertText?L5.alertText:"Note",name+L5.undefineInModel?L5.undefineInModel:" is undefine in model");return;}
if(String(this.data[name])==String(value)){for(var i=0;i<this.fields.items.length;i++){if(this.fields.items[i].rule!=null){return L5.Validator.validate(this,name,value);}}
return true;}else{value=field.convert(value);this.dirty=true;if(!this.modified){this.modified={};}
if(typeof this.modified[name]=='undefined'){this.modified[name]=this.data[name];}
this.data[name]=value;if(!this.editing&&this.dataset){this.dataset.afterEdit(this,srcElement,name);}}
for(var i=0;i<this.fields.items.length;i++){if(this.fields.items[i].rule!=null){result=L5.Validator.validate(this,name,value);break;}}
return result;},get:function(name){return this.data[name];},beginEdit:function(){this.editing=true;this.modified={};},cancelEdit:function(){this.editing=false;delete this.modified;},endEdit:function(){this.editing=false;if(this.dirty&&this.dataset){this.dataset.afterEdit(this);}},reject:function(silent){var m=this.modified;for(var n in m){if(typeof m[n]!="function"){this.data[n]=m[n];}}
this.dirty=false;delete this.modified;this.editing=false;if(this.dataset&&silent!==true){this.dataset.afterReject(this);}},commit:function(silent){this.dirty=false;delete this.modified;this.editing=false;if(this.dataset&&silent!==true){this.dataset.afterCommit(this);}},getChanges:function(){var m=this.modified,cs={};for(var n in m){if(m.hasOwnProperty(n)){cs[n]=this.data[n];}}
return cs;},hasError:function(){return this.error!=null;},clearError:function(){this.error=null;},copy:function(id){return new this.constructor(L5.apply({},this.data),id||this.id+'copy');},isModified:function(name){return!!(this.modified&&this.modified.hasOwnProperty(name));},validateRecord:function(ifdes,ifall){var hasRule=false;for(var i=0;i<this.fields.items.length;i++){if(this.fields.items[i].rule!=null){hasRule=true;break;}}
if(hasRule===true){for(var i=0;i<this.fields.items.length;i++){var name=this.fields.items[i].name;var value=this.get(name);L5.Validator.validate(this,name,value);}}
var str=this.getErrMsg(ifdes,ifall);if(str){return str;}else{return true;}},getErrMsg:function(ifdes,ifall){if(ifdes==undefined){ifdes=true;}
var allmsgs="";if(this.msgIndex==undefined){this.msgIndex={};}
if(this.msgLable==undefined){this.msgLable={};}
if(this.msg==undefined){this.msg={};}
var msgIndexCount=this.msgIndex["msg_index_"]==undefined?0:this.msgIndex["msg_index_"]+1;var lastItems=new Array();if(msgIndexCount<=this.fields.items.length){for(var i=0;i<this.fields.items.length;i++){var field=this.fields.items[i].name;var has=false;for(var k=0;k<msgIndexCount;k++){if(this.msgIndex[k]==field){has=true;break;}}
if(!has){lastItems[lastItems.length]=field;}}}
var validMsg=L5.validMsg?L5.validMsg:"[{0}] {1}";var tempMsg="";if(ifall){for(var i=0;i<this.fields.items.length;i++){var v=this.msgIndex[i]?this.msgIndex[i]:lastItems.pop();if(this.validate[v]===false){if(this.msgLable[v]==null){this.msgLable[v]=v;}
if(ifdes){if(this.cellLable&&this.cellLable[v]){tempMsg=String.format(validMsg,this.cellLable[v],this.msg[v]);allmsgs+=tempMsg+"\n";}
else{tempMsg=String.format(validMsg,this.msgLable[v],this.msg[v]);allmsgs+=tempMsg+"\n";}}
else{tempMsg=String.format(validMsg,this.msgLable[v],this.msg[v]);allmsgs+=tempMsg+"\n";}}}}else{for(var i=0;i<this.fields.items.length;i++){var v=this.msgIndex[i]?this.msgIndex[i]:lastItems.pop();if(this.validate[v]===false){if(this.msgLable[v]==null){this.msgLable[v]=v;}
if(ifdes){if(this.cellLable&&this.cellLable[v]){tempMsg=String.format(validMsg,this.cellLable[v],this.msg[v]);return tempMsg;}
else{tempMsg=String.format(validMsg,this.msgLable[v],this.msg[v]);return tempMsg;}}
else{tempMsg=String.format(validMsg,this.msgLable[v],this.msg[v]);return tempMsg;}}}}
return allmsgs;}};

L5.DatasetMgr=L5.apply(new L5.util.MixedCollection(),{register:function(){for(var i=0,s;s=arguments[i];i++){this.add(s);s.on("loadexception",function(){var n=arguments.length;var e=arguments[n-1];if(e.statusText!=null)
e=e.statusText;L5.Msg.alert(e.title?e.title:(L5.loadDateError?L5.loadDateError:"Error loadding date: "),e);});}},unregister:function(){for(var i=0,s;s=arguments[i];i++){this.remove(this.lookup(s));}},lookup:function(id){var dataset=typeof id=="object"?id:this.get(id);if(dataset==null){alert(L5.notfind+id);}
return dataset;},getKey:function(o){return o.ds||o.id;}});

L5.model.Dataset=function(config){this.data=new L5.util.MixedCollection(false);this.data.getKey=function(o){return o.id;};this.pos=0;this.pageInfo={"pageSize":-1,"pageIndex":1,"startCursor":0,"needTotal":true};this.oldPageIndex=1;this.oldStartCursor=0;this.useOldCondition=false;this.paramsInSession={};if(config&&config.pageSize&&config.pageSize>0){this.pageInfo.pageSize=config.pageSize;delete config.pageSize;}
if(config&&(config.needTotal!=null)){this.pageInfo.needTotal=config.needTotal;delete config.needTotal;}
this.method;this.baseParams={};this.loadParams={};this.paramNames={"start":"start","limit":"limit","defaultSort":"defaultSort","sort":"sort","dir":"dir","needTotal":"needTotal"};this.defaultSortInfo=new L5.List();if(config.reader){var meta=config.reader.meta;if(meta){var fields=meta.fields;if(fields&&fields.length>0){for(var i=0;i<fields.length;i++){var sortDir=fields[i].sortDir;if(sortDir){var sortObj=new L5.Map();sortObj.put("field",fields[i].name);sortObj.put("dir",sortDir);this.defaultSortInfo.add(sortObj);}}}}}
if(config&&config.data){this.inlineData=config.data;delete config.data;}
L5.apply(this,config);if(this.url&&!this.proxy){this.proxy=new L5.model.HttpProxy({url:this.url});}
if(this.reader){if(!this.recordType){this.recordType=this.reader.recordType;}
if(this.reader.onMetaChange){this.reader.onMetaChange=this.onMetaChange.createDelegate(this);}}
if(this.recordType){this.fields=this.recordType.prototype.fields;}
this.modified=[];this.deleted=[];this.validated={};this.addEvents('datachanged','metachange','add','remove','update','clear','beforeload','load','loadexception','move','turnPage','validateFailed');if(this.proxy){this.relayEvents(this.proxy,["loadexception"]);}
this.sortToggle={};if(this.sortInfo){this.setDefaultSort(this.sortInfo.field,this.sortInfo.direction);}
L5.model.Dataset.superclass.constructor.call(this);if(this.ds||this.id){L5.DatasetMgr.register(this);}
if(this.inlineData){this.loadData(this.inlineData);delete this.inlineData;}else if(this.autoLoad){this.load.defer(10,this,[typeof this.autoLoad=='object'?this.autoLoad:undefined]);}};L5.extend(L5.model.Dataset,L5.util.Observable,{remoteSort:true,pruneModifiedRecords:true,lastOptions:null,setParameter:function(name,value){if(!this.sortInfo)
this.sortInfo={};if(name=="sort"){this.sortInfo.field=value;}else if(name=="dir"){this.sortInfo.direction=value;}else{this.loadParams[name]=value;}},isValidate:function(ifgrid,ifall){for(var i=0;i<this.getCount();i++){var record=this.getAt(i);for(var j=0;j<this.fields.items.length;j++){if(this.fields.items[j].rule!=null){var name=this.fields.items[j].name;L5.Validator.validate(record,name,record.get(name));}}}
for(var v in this.validated){if(this.validated[v]!=null){var record=this.getById(v);var recordErrMsg=record.getErrMsg(ifgrid,ifall);this.fireEvent("validateFailed",this,record,recordErrMsg);return recordErrMsg;}}
return true;},moveFirst:function(){this.pos=0;this.fireEvent("move",this,this.pos);},moveNext:function(){if(this.pos>=this.getCount()-1)
return false;this.pos++;this.fireEvent("move",this,this.pos);return true;},movePrev:function(){if(this.pos==0)
return false;this.pos--;this.fireEvent("move",this,this.pos);return true;},moveTo:function($_npos){if($_npos>this.getCount()-1||$_npos<0||this.pos==$_npos){return;}
this.pos=$_npos;this.fireEvent("move",this,this.pos);},moveTo2:function($_npos){if($_npos>this.data.length-1||$_npos<0){return;}
this.pos=$_npos;},moveLast:function(){var npos=this.getCount()-1;if(this.pos==npos)return;this.pos=npos
this.fireEvent("move",this,this.pos);},getCurrent:function(){return this.getAt(this.pos);},get:function(name){return this.getCurrent().get(name);},set:function(name,value){return this.getCurrent().set(name,value);},isFirst:function(){if(this.pos==0)
return true;else
return false;},isLast:function(){if(this.pos==this.getCount()-1)
return true;else
return false;},destroy:function(){if(this.ds||this.id){L5.DatasetMgr.unregister(this);}
this.data=null;this.purgeListeners();},add:function(records){records=[].concat(records);if(records.length<1){return;}
var has=[];for(var i=0,len=records.length;i<len;i++){if(this.deleted.indexOf(records[i])!=-1){records[i].state=L5.model.Record.NONE;this.deleted.remove(records[i]);}else if(this.data.indexOf(records[i])!=-1){has[has.length]=i;continue;}else{if(this.modified.indexOf(records[i])==-1){records[i].state=L5.model.Record.STATE_NEW;this.modified.push(records[i]);}}
records[i].join(this);}
if(has.length!=0){for(var h=has.length-1;h>=0;h--){records.remove(records[has[h]]);}}
if(records.length==0)
return;var l=this.data.length;this.data.addAll(records);if(this.snapshot){this.snapshot.addAll(records);}
this.fireEvent("add",this,records,l);},addSorted:function(record){var i=this.findInsertIndex(record);this.insert(i,record);},remove:function(record){var rid=record.id;var i=this.data.indexOf(record);this.data.removeAt(i);if(this.pruneModifiedRecords){this.modified.remove(record);this.deleted.remove(record);}
if(this.validated){delete this.validated[rid];}
if(this.snapshot){this.snapshot.remove(record);}
if(this.deleted.indexOf(record)==-1){if(record.state==L5.model.Record.STATE_NEW){this.modified.remove(record);}else if(record.state==L5.model.Record.STATE_MODIFIED){record.reject(true);this.modified.remove(record);record.state=L5.model.Record.STATE_DELETED;this.deleted.push(record);}else if(record.state==L5.model.Record.NONE){record.state=L5.model.Record.STATE_DELETED;this.deleted.push(record);}}
this.fireEvent("remove",this,record,i);},removeAt:function(index){this.remove(this.getAt(index));},removeAll:function(){this.data.clear();if(this.snapshot){this.snapshot.clear();}
if(this.pruneModifiedRecords){this.modified=[];this.deleted=[];}
this.validated={};this.fireEvent("clear",this);},insert:function(index,records){records=[].concat(records);for(var i=0,len=records.length;i<len;i++){if(this.deleted.indexOf(records[i])!=-1){records[i].state=L5.model.Record.NONE;this.deleted.remove(records[i]);}else{if(this.modified.indexOf(records[i])==-1){records[i].state=L5.model.Record.STATE_NEW;this.modified.push(records[i]);}}
this.data.insert(index,records[i]);records[i].join(this);}
this.fireEvent("add",this,records,index);},indexOf:function(record){return this.data.indexOf(record);},indexOfId:function(id){return this.data.indexOfKey(id);},getById:function(id){return this.data.key(id);},getAt:function(index){return this.data.itemAt(index);},getRange:function(start,end){return this.data.getRange(start,end);},storeOptions:function(o){o=L5.apply({},o);delete o.callback;delete o.scope;this.lastOptions=o;},setLastOptions:function(){this.lastOptions=this.lastOptions||{};this.lastOptions.params=this.lastOptions.params||{};this.lastOptions.params=L5.apply(this.lastOptions.params,this.paramsInSession);delete this.lastOptions.params.useOldCondition;},load:function(options){if(this.useOldCondition){this.pageInfo.pageIndex=this.oldPageIndex;this.pageInfo.startCursor=this.oldStartCursor;this.setParameter("useOldCondition","true");}else if(options&&options.params&&!options.params.sort){this.pageInfo.pageIndex=1;this.pageInfo.startCursor=0;}
if(options===true){options={sync:true};}
options=options||{};options.params=L5.apply(options.params||{},this.loadParams);this.loadParams={};this.loadPage(options);if(this.useOldCondition){this.setLastOptions();this.useOldCondition=false;}},loadPage:function(options){this.pos=0;var pn=this.paramNames;options=options||{};if(this.fireEvent("beforeload",this,options)!==false){var p=L5.apply(options.params||{},this.baseParams);this.storeOptions(options);if(this.pageInfo.pageSize>0){if(!p[pn["start"]]){p[pn["start"]]=0;p[pn["limit"]]=this.pageInfo.pageSize;}}
if(this.defaultSortInfo){p[pn["defaultSort"]]=this.defaultSortInfo;}
if(this.sortInfo&&this.remoteSort){p[pn["sort"]]=this.sortInfo.field;p[pn["dir"]]=this.sortInfo.direction;}
if(options.sync){p.sync=true;}
p[pn["needTotal"]]=this.pageInfo.needTotal;this.proxy.load(p,this.reader,this.loadRecords,this,options);return true;}else{return false;}},reload:function(options){this.loadPage(L5.applyIf(options||{},this.lastOptions));},getCustomData:function(key){if(this.customDatas){var obj=this.customDatas[key];if(obj.javaClass=="DataSet")
return obj;else
return L5.serializer.unmarshall(obj);}
else{return undefined;}},loadCustomDatas:function(o){if(o.customDatas){this.customDatas=L5.serializer.unmarshall(o.customDatas.map);}else{return;}},loadRecords:function(o,options,success){if(!o||success===false){if(success!==false){this.fireEvent("load",this,[],options);}
if(options.callback){options.callback.call(options.scope||this,[],options,false);}
return;}
var r=o.records,t=o.totalRecords||r.length;this.loadCustomDatas(o);if(!options||options.add!==true){if(this.pruneModifiedRecords){this.modified=[];this.deleted=[];this.validated={};}
for(var i=0,len=r.length;i<len;i++){r[i].join(this);}
if(this.snapshot){this.data=this.snapshot;delete this.snapshot;}
this.data.clear();this.data.addAll(r);this.totalLength=t;this.applySort();this.fireEvent("datachanged",this);}else{this.totalLength=Math.max(t,this.data.length+r.length);this.add(r);}
this.fireEvent("load",this,r,options);if(options.callback){options.callback.call(options.scope||this,r,options,true);}},loadData:function(o,append){if(o.error){var e=new L5.Exception(o.error.code,o.error.msg,o.error.trace);if(o.error.title){e.title=o.error.title;}
this.fireEvent("loadexception",e);return;}
this.lastOptions={};var r=this.reader.readRecords(o);this.loadRecords(r,{add:append},true);if(this.useOldCondition){this.setLastOptions();this.useOldCondition=false;}},getCount:function(){return this.data.length||0;},getTotalCount:function(){return this.totalLength||0;},turnPage:function(pageIndex){var pageTotal=this.getTotalPage();if(pageIndex<1){L5.Msg.alert(L5.alertText?L5.alertText:"Note",L5.turnPageFirst?L5.turnPageFirst:"Page num is too small.");return false;}
if(pageIndex>pageTotal){L5.Msg.alert(L5.alertText?L5.alertText:"Note",L5.turnPageLast?L5.turnPageLast:"Page num too large.");return false;}
this.pageInfo.pageIndex=pageIndex;this.pageInfo.startCursor=this.pageInfo.pageSize*(this.pageInfo.pageIndex-1);var p={},pn=this.paramNames;p[pn.start]=this.pageInfo.startCursor;p[pn.limit]=this.pageInfo.pageSize;if(this.lastOptions&&this.lastOptions.params){p=L5.applyIf(p,this.lastOptions.params);}
if(this.lastOptions){var options=L5.applyIf({params:p},this.lastOptions);}
this.loadPage(options);this.fireEvent("turnPage");},turnCount:function(pageSize){this.pageInfo.pageIndex=1;this.pageInfo.startCursor=this.pageInfo.pageSize*(this.pageInfo.pageIndex-1);var p={},pn=this.paramNames;p[pn.start]=this.pageInfo.startCursor;p[pn.limit]=this.pageInfo.pageSize=pageSize;if(this.lastOptions&&this.lastOptions.params){p=L5.applyIf(p,this.lastOptions.params);}
if(this.lastOptions){var options=L5.applyIf({params:p},this.lastOptions);}
this.loadPage(options);this.fireEvent("turnCount");},turnNext:function(){this.turnPage(this.pageInfo.pageIndex+1);},turnLast:function(){var total=this.getTotalCount();var pageTotal=Math.ceil(total/this.pageInfo.pageSize);this.turnPage(pageTotal);},turnPrev:function(){this.turnPage(this.pageInfo.pageIndex-1);},turnFirst:function(){this.turnPage(1);},getPageIndex:function(){return this.pageInfo.pageIndex;},getPageSize:function(){return this.pageInfo.pageSize;},setPageSize:function(pageSize){if(isNaN(pageSize)){alert("显示记录数应为整型数据！");return;}
this.pageInfo.pageSize=parseInt(pageSize);},getStartCursor:function(){return this.pageInfo.startCursor;},getTotalPage:function(){if(this.pageInfo.pageSize<=0){return 1;}
return Math.ceil(this.getTotalCount()/this.pageInfo.pageSize);},isLastPage:function(){return this.getPageIndex()>=this.getTotalPage();},isFirstPage:function(){return this.getPageIndex()==1;},getSortState:function(){return this.sortInfo;},applySort:function(){if(this.sortInfo&&!this.remoteSort){var s=this.sortInfo,f=s.field;this.sortData(f,s.direction);}},sortData:function(f,direction){direction=direction||'ASC';var st=this.fields.get(f).sortType;var fn=function(r1,r2){var v1=st(r1.data[f]),v2=st(r2.data[f]);return v1>v2?1:(v1<v2?-1:0);};this.data.sort(direction,fn);if(this.snapshot&&this.snapshot!=this.data){this.snapshot.sort(direction,fn);}},setDefaultSort:function(field,dir){dir=dir?dir.toUpperCase():"ASC";this.sortInfo={field:field,direction:dir};this.sortToggle[field]=dir;},sort:function(fieldName,dir){var f=this.fields.get(fieldName);if(!f){return false;}
if(!dir){dir=(this.sortToggle[f.name]||"ASC").toggle("ASC","DESC");}
var st=(this.sortToggle)?this.sortToggle[f.name]:null;this.sortToggle[f.name]=dir;this.sortInfo={field:f.name,direction:dir};var si=(this.sortInfo)?this.sortInfo:null;if(!this.remoteSort){this.applySort();this.fireEvent("datachanged",this);}else{this.lastOptions.params.sort=true;if(!this.load(this.lastOptions)){if(si){this.sortInfo=si;}}}},each:function(fn,scope){this.data.each(fn,scope);},getModifiedRecords:function(){return this.modified;},getDeletedRecords:function(){return this.deleted;},getAllChangedRecords:function(){return this.modified.concat(this.deleted);},getAllRecords:function(){return this.data.items;},createFilterFn:function(property,value,anyMatch,caseSensitive){if(L5.isEmpty(value,false)){return false;}
value=this.data.createValueMatcher(value,anyMatch,caseSensitive);return function(r){return value.test(r.data[property]);};},sum:function(property,start,end){var rs=this.data.items,v=0;start=start||0;end=(end||end===0)?end:rs.length-1;for(var i=start;i<=end;i++){v+=(rs[i].data[property]||0);}
return v;},filter:function(property,value,anyMatch,caseSensitive){var fn=this.createFilterFn(property,value,anyMatch,caseSensitive);return fn?this.filterBy(fn):this.clearFilter();},filterBy:function(fn,scope){this.snapshot=this.snapshot||this.data;this.data=this.queryBy(fn,scope||this);this.fireEvent("datachanged",this);},query:function(property,value,anyMatch,caseSensitive){var fn=this.createFilterFn(property,value,anyMatch,caseSensitive);return fn?this.queryBy(fn):this.data.clone();},queryBy:function(fn,scope){var d=this.snapshot||this.data;return d.filterBy(fn,scope||this);},find:function(property,value,start,anyMatch,caseSensitive){var fn=this.createFilterFn(property,value,anyMatch,caseSensitive);return fn?this.data.findIndexBy(fn,null,start):-1;},findBy:function(fn,scope,start){return this.data.findIndexBy(fn,scope,start);},collect:function(dataIndex,allowNull,bypassFilter){var d=(bypassFilter===true&&this.snapshot)?this.snapshot.items:this.data.items;var v,sv,r=[],l={};for(var i=0,len=d.length;i<len;i++){v=d[i].data[dataIndex];sv=String(v);if((allowNull||!L5.isEmpty(v))&&!l[sv]){l[sv]=true;r[r.length]=v;}}
return r;},clearFilter:function(suppressEvent){if(this.isFiltered()){this.data=this.snapshot;delete this.snapshot;if(suppressEvent!==true){this.fireEvent("datachanged",this);}}},isFiltered:function(){return this.snapshot&&this.snapshot!=this.data;},afterEdit:function(record,srcElement,field){if(this.modified.indexOf(record)==-1){if(record.state!=L5.model.Record.STATE_NEW){record.state=L5.model.Record.STATE_MODIFIED;}
this.modified.push(record);}
this.fireEvent("update",this,record,L5.model.Record.EDIT,srcElement,field);},afterReject:function(record){record.state=L5.model.Record.NONE;this.modified.remove(record);var i=this.indexOf(record);if(i>=0)
this.fireEvent("update",this,record,L5.model.Record.REJECT);},afterCommit:function(record){record.state=L5.model.Record.NONE;this.modified.remove(record);var i=this.indexOf(record);if(i>=0)
this.fireEvent("update",this,record,L5.model.Record.COMMIT);},commitChanges:function(){var m=this.modified.slice(0);this.modified=[];this.deleted=[];for(var i=0,len=m.length;i<len;i++){m[i].commit();}},rejectChanges:function(){for(var i=0,len=this.deleted.length;i<len;i++){this.deleted[i].state=L5.model.Record.NONE;}
this.data.addAll(this.deleted);this.deleted=[];var m=this.modified.slice(0);this.modified=[];for(var i=0,len=m.length;i<len;i++){if(m[i].state==L5.model.Record.STATE_NEW){var index=this.data.indexOf(m[i]);this.data.removeAt(index);}else{m[i].reject();}}
this.validated={};this.fireEvent("datachanged",this);},onMetaChange:function(meta,rtype,o){this.recordType=rtype;this.fields=rtype.prototype.fields;delete this.snapshot;this.sortInfo=meta.sortInfo;this.modified=[];this.fireEvent('metachange',this,this.reader.meta);},findInsertIndex:function(record){this.suspendEvents();var data=this.data.clone();this.data.add(record);this.applySort();var i=this.data.indexOf(record);this.data=data;this.resumeEvents();return i;},print:function(){var count=this.data.items.length;var jsonStr="{totalCount:"+count+",result:[";this.each(function(record,index){jsonStr+="{state :"+record.state+",";L5.each(record.fields.items,function(item,index){if(index!=record.fields.items.length-1)
jsonStr+=item.name+":"
+record.get(item.name)+",";else
jsonStr+=item.name+":"
+record.get(item.name);});if(index!=count-1)
jsonStr+="},";else
jsonStr+="}";});jsonStr+="]}";return jsonStr;},addRule:function(name,rules,cover){var field=this.fields.get(name);field.rule=cover==true?rules:(field.rule?field.rule+"|"+rules:rules);},newRecord:function(obj){if(this.recordType==null){return;}
var record;if(obj==null){record=new this.recordType();this.add([record]);}else{record=new(this.recordType)(obj);this.add([record]);}
var name=null;for(var i=0;i<record.fields.items.length;i++){if(record.fields.items[i].rule!=null){name=record.fields.items[i].name;result=L5.Validator.validate(record,name,record.get(name));}}
this.pos=this.getCount()-1;this.fireEvent("move",this,this.pos);return record;}});L5.model.LocalPageDataset=function(c){L5.model.LocalPageDataset.superclass.constructor.call(this,c);this.localPage=true;};L5.extend(L5.model.LocalPageDataset,L5.model.Dataset,{add:function(records){records=[].concat(records);if(records.length<1){return;}
for(var i=0,len=records.length;i<len;i++){if(this.modified.indexOf(records[i])==-1){records[i].state=L5.model.Record.STATE_NEW;this.modified.push(records[i]);}
records[i].join(this);}
var i=this.data.length;this.data.addAll(records);if(this.snapshot){this.snapshot.addAll(records);}
this.fireEvent("add",this,records,(i-this.pageInfo.startCursor));},insert:function(index,records){index=index+this.pageInfo.startCursor;records=[].concat(records);for(var i=0,len=records.length;i<len;i++){if(this.modified.indexOf(records[i])==-1){records[i].state=L5.model.Record.STATE_NEW;this.modified.push(records[i]);}
this.data.insert(index,records[i]);records[i].join(this);}
this.fireEvent("add",this,records,(index-this.pageInfo.startCursor));},remove:function(record){var index=this.data.indexOf(record);this.data.removeAt(index);if(this.pruneModifiedRecords){this.modified.remove(record);this.deleted.remove(record);}
if(this.snapshot){this.snapshot.remove(record);}
if(this.deleted.indexOf(record)==-1){if(record.state==L5.model.Record.STATE_NEW){this.modified.remove(record);}else if(record.state==L5.model.Record.STATE_MODIFIED){record.reject(true);this.modified.remove(record);record.state=L5.model.Record.STATE_DELETED;this.deleted.push(record);}else if(record.state==L5.model.Record.NONE){record.state=L5.model.Record.STATE_DELETED;this.deleted.push(record);}}
this.fireEvent("datachanged",this);},rejectChanges:function(){for(var i=0,len=this.deleted.length;i<len;i++){this.deleted[i].state=L5.model.Record.NONE;}
this.data.addAll(this.deleted);this.deleted=[];var m=this.modified.slice(0);this.modified=[];for(var i=0,len=m.length;i<len;i++){if(m[i].state==L5.model.Record.STATE_NEW){var index=this.data.indexOf(m[i]);this.data.removeAt(index);}else{m[i].reject();}}
this.applySort();this.fireEvent("datachanged",this);},indexOf:function(record){return this.data.indexOf(record)-this.pageInfo.startCursor;},indexOfId:function(id){return this.data.indexOfKey(id)-this.pageInfo.startCursor;},getAt:function(index){index=this.pageInfo.startCursor+index;return this.data.itemAt(index);},getRange:function(start,end){start=this.pageInfo.startCursor+start;end=this.pageInfo.startCursor+end;return this.data.getRange(start,end);},loadPage:function(options){this.pos=0;var pn=this.paramNames;options=options||{};if(this.fireEvent("beforeload",this,options)!==false){this.storeOptions(options);var p=L5.apply(options.params||{},this.baseParams);if(this.sortInfo&&this.remoteSort){p[pn["sort"]]=this.sortInfo.field;p[pn["dir"]]=this.sortInfo.direction;}
this.proxy.load(p,this.reader,this.loadRecords,this,options);return true;}else{return false;}},getCount:function(){return Math.min(this.getTotalCount()-this.pageInfo.startCursor,this.pageInfo.pageSize);},getTotalCount:function(){return this.data.length;},turnPage:function(pageIndex){if(pageIndex<1){L5.Msg.alert(L5.alertText?L5.alertText:"Note",L5.turnPageFirst?L5.turnPageFirst:"Page num is too small.");return false;}
if(pageIndex>this.getTotalPage()){L5.Msg.alert(L5.alertText?L5.alertText:"Note",L5.turnPageLast?L5.turnPageLast:"Page num too large.");return false;}
this.pageInfo.pageIndex=pageIndex;this.pageInfo.startCursor=this.pageInfo.pageSize*(this.pageInfo.pageIndex-1);this.fireEvent("datachanged",this);this.fireEvent("turnPage");},findInsertIndex:function(record){this.suspendEvents();var data=this.data.clone();this.data.add(record);this.applySort();var i=this.data.indexOf(record);this.data=data;this.resumeEvents();i=i-this.pageInfo.startCursor;return i;}});

L5.model.SimpleDataset=function(config){L5.model.SimpleDataset.superclass.constructor.call(this,L5.apply(config,{reader:new L5.model.ArrayReader({id:config.id},L5.model.Record.create(config.fields))}));};L5.extend(L5.model.SimpleDataset,L5.model.Dataset,{loadData:function(data,append){if(this.expandData===true){var r=[];for(var i=0,len=data.length;i<len;i++){r[r.length]=[data[i]];}
data=r;}
L5.model.SimpleDataset.superclass.loadData.call(this,data,append);}});

L5.model.JsonDataset=function(c){L5.model.JsonDataset.superclass.constructor.call(this,L5.apply(c,{proxy:c.proxy||(!c.data?new L5.model.HttpProxy({url:c.url}):undefined),reader:new L5.model.JsonReader(c,c.fields)}));};L5.extend(L5.model.JsonDataset,L5.model.Dataset);

L5.model.Field=function(config){if(typeof config=="string"){config={name:config};}
L5.apply(this,config);if(!this.type){this.type="auto";}
var st=L5.model.SortTypes;if(typeof this.sortType=="string"){this.sortType=st[this.sortType];}
if(!this.sortType){switch(this.type){case"string":this.sortType=st.asUCString;break;case"date":this.sortType=st.asDate;break;default:this.sortType=st.none;}}
var stripRe=/[\$,%]/g;var decimalPrecision=2;if(!this.convert){var cv,dateFormat=this.dateFormat;switch(this.type){case"":case"auto":case undefined:cv=function(v){return v;};break;case"string":cv=function(v){return(v===undefined||v===null)?'':String(v);};break;case"int":cv=function(v){return v!==undefined&&v!==null&&v!==''?parseInt(String(v).replace(stripRe,""),10):'';};break;case"file":cv=function(v){return v!==undefined&&v!==null&&v!==''?new L5.UploadFile(v):new L5.UploadFile(this.name);};break;case"float":cv=function(v){return v!==undefined&&v!==null&&v!==''?parseFloat(String(v).replace(stripRe,""),10).toFixed(decimalPrecision):'';};break;case"bool":case"boolean":cv=function(v){return v===true||v==="true"||v==1;};break;case"date":cv=function(v){if(!v){return'';}
if(L5.isDate(v)){if(dateFormat&&(!v.formatstr))v.formatstr=dateFormat;return v;}
if(v.javaClass&&v.dateStr){var index=v.dateStr.indexOf(".");if(index!=-1){v.dateStr=v.dateStr.substring(0,index);}
v.dateStr=v.dateStr.replace(/-/g,"/");var o=new Date(v.dateStr);if(dateFormat)o.formatstr=dateFormat;return o}
if(dateFormat){if(dateFormat=="timestamp"){var o=new Date(v*1000);if(dateFormat)o.formatstr=dateFormat;return o;}
if(dateFormat=="time"){var o=new Date(parseInt(v,10));if(dateFormat)o.formatstr=dateFormat;return o;}
return Date.parseDate(v,dateFormat);}
var parsed=Date.parse(v);return parsed?new Date(parsed):null;};break;}
this.convert=cv;}};L5.model.Field.prototype={dateFormat:null,defaultValue:"",mapping:null,sortType:null,sortDir:"ASC"};

L5.model.DataReader=function(meta,recordType){this.meta=meta;this.recordType=L5.isArray(recordType)?L5.model.Record.create(recordType):recordType;};L5.model.DataReader.prototype={};

L5.model.DataProxy=function(){this.addEvents('beforeload','load');L5.model.DataProxy.superclass.constructor.call(this);};L5.extend(L5.model.DataProxy,L5.util.Observable);

L5.model.MemoryProxy=function(data){L5.model.MemoryProxy.superclass.constructor.call(this);this.data=data;};L5.extend(L5.model.MemoryProxy,L5.model.DataProxy,{load:function(params,reader,callback,scope,arg){params=params||{};var result;try{result=reader.readRecords(this.data);}catch(e){this.fireEvent("loadexception",this,arg,null,e);callback.call(scope,null,arg,false);return;}
callback.call(scope,result,arg,true);},update:function(params,records){}});

L5.model.HttpProxy=function(conn){L5.model.HttpProxy.superclass.constructor.call(this);this.conn=conn;this.useAjax=!conn||!conn.events;};L5.extend(L5.model.HttpProxy,L5.model.DataProxy,{getConnection:function(){return this.useAjax?L5.Ajax:this.conn;},load:function(params,reader,callback,scope,arg){if(this.fireEvent("beforeload",this,params)!==false){var o={params:params||{},request:{callback:callback,scope:scope,arg:arg},reader:reader,callback:this.loadResponse,scope:this};if(params.sync){o.sync=true;}
if(this.useAjax){L5.applyIf(o,this.conn);if(this.activeRequest){L5.Ajax.abort(this.activeRequest);}
this.activeRequest=L5.Ajax.request(o);}else{this.conn.request(o);}}else{callback.call(scope||this,null,arg,false);}},loadResponse:function(o,success,response){delete this.activeRequest;if(!success){this.fireEvent("loadexception",this,o,response);o.request.callback.call(o.request.scope,null,o.request.arg,false);return;}
var result;try{result=o.reader.read(response);}catch(e){this.fireEvent("loadexception",this,o,response,e);o.request.callback.call(o.request.scope,null,o.request.arg,false);return;}
this.fireEvent("load",this,o,o.request.arg);o.request.callback.call(o.request.scope,result,o.request.arg,true);},update:function(dataSet){},updateResponse:function(dataSet){}});

L5.model.JsonReader=function(meta,recordType){meta=meta||{};L5.model.JsonReader.superclass.constructor.call(this,meta,recordType||meta.fields);};L5.extend(L5.model.JsonReader,L5.model.DataReader,{read:function(response){var json=response.responseText;var o=eval("("+json+")");if(!o){throw{message:"JsonReader.read: Json object not found"};}
if(o.error){var e=new L5.Exception(o.error.code,o.error.msg,o.error.trace);if(o.error.title){e.title=o.error.title;}
throw e;}
return this.readRecords(o);},onMetaChange:function(meta,recordType,o){},simpleAccess:function(obj,subsc){return obj[subsc];},getJsonAccessor:function(){var re=/[\[\.]/;return function(expr){try{return(re.test(expr))?new Function("obj","return obj."
+expr):function(obj){return obj[expr];};}catch(e){}
return L5.emptyFn;};}(),readRecords:function(o){this.jsonData=o;if(o.metaData){delete this.ef;this.meta=o.metaData;if(this.recordType==null&&o.metaData.fields){this.recordType=L5.model.Record.create(o.metaData.fields);this.onMetaChange(this.meta,this.recordType,o);}else if(this.recordType!=null&&o.metaData.fields){var f1=L5.model.Record.create(o.metaData.fields).prototype.fields;var f2=this.recordType.prototype.fields;f1.addAll(f2.items);this.recordType.prototype.fields=f1;this.onMetaChange(this.meta,this.recordType,o);}}
if(!this.recordType){return{success:true,records:[],totalRecords:0};}
var s=this.meta,Record=this.recordType,f=Record.prototype.fields,fi=f.items,fl=f.length;if(!this.ef){if(s.totalProperty){this.getTotal=this.getJsonAccessor(s.totalProperty);}
if(s.successProperty){this.getSuccess=this.getJsonAccessor(s.successProperty);}
this.getRoot=s.root?this.getJsonAccessor(s.root):function(p){return p;};if(s.id){var g=this.getJsonAccessor(s.id);this.getId=function(rec){var r=g(rec);return(r===undefined||r==="")?null:r;};}else{this.getId=function(){return null;};}
this.ef=[];for(var i=0;i<fl;i++){f=fi[i];var map=(f.mapping!==undefined&&f.mapping!==null)?f.mapping:f.name;this.ef[i]=this.getJsonAccessor(map);}}
var root=this.getRoot(o),c=root.length,totalRecords=c,success=true;if(s.totalProperty){var v=parseInt(this.getTotal(o),10);if(!isNaN(v)){totalRecords=v;}}
if(s.successProperty){var v=this.getSuccess(o);if(v===false||v==='false'){success=false;}}
var records=[];for(var i=0;i<c;i++){var n=root[i];var values={};var id=this.getId(n);for(var j=0;j<fl;j++){f=fi[j];var v=this.ef[j](n);values[f.name]=f.convert((v!==undefined)?v:f.defaultValue,n);}
var record=new Record(values,id);record.json=n;records[i]=record;}
return{success:success,records:records,totalRecords:totalRecords,customDatas:o.customDatas};}});

L5.model.XmlReader=function(meta,recordType){meta=meta||{};L5.model.XmlReader.superclass.constructor.call(this,meta,recordType||meta.fields);};L5.extend(L5.model.XmlReader,L5.model.DataReader,{read:function(response){var doc=response.responseXML;if(!doc){throw{message:"XmlReader.read: XML Document not available"};}
return this.readRecords(doc);},readRecords:function(doc){this.xmlData=doc;var root=doc.documentElement||doc;var q=L5.DomQuery;var recordType=this.recordType,fields=recordType.prototype.fields;var sid=this.meta.id;var totalRecords=0,success=true;if(this.meta.totalRecords){totalRecords=q.selectNumber(this.meta.totalRecords,root,0);}
if(this.meta.success){var sv=q.selectValue(this.meta.success,root,true);success=sv!==false&&sv!=='false';}
var records=[];var ns=q.select(this.meta.record,root);for(var i=0,len=ns.length;i<len;i++){var n=ns[i];var values={};var id=sid?q.selectValue(sid,n):undefined;for(var j=0,jlen=fields.length;j<jlen;j++){var f=fields.items[j];var v=q.selectValue(f.mapping||f.name,n,f.defaultValue);v=f.convert(v,n);values[f.name]=v;}
var record=new recordType(values,id);record.node=n;records[records.length]=record;}
return{success:success,records:records,totalRecords:totalRecords||records.length};}});

L5.model.ArrayReader=L5.extend(L5.model.JsonReader,{readRecords:function(o){var sid=this.meta?this.meta.id:null;var recordType=this.recordType,fields=recordType.prototype.fields;var records=[];var root=o;for(var i=0;i<root.length;i++){var n=root[i];var values={};var id=((sid||sid===0)&&n[sid]!==undefined&&n[sid]!==""?n[sid]:null);for(var j=0,jlen=fields.length;j<jlen;j++){var f=fields.items[j];var k=f.mapping!==undefined&&f.mapping!==null?f.mapping:j;var v=n[k]!==undefined?n[k]:f.defaultValue;v=f.convert(v,n);values[f.name]=v;}
var record=new recordType(values,id);record.json=n;records[records.length]=record;}
return{records:records,totalRecords:records.length};}});

L5.bindingdata=function(root){if(!root)
root=document.body;var optionList=L5.DomQuery.select("option[@dataset]",root);for(var i=0;i<optionList.length;i++){var selectNode=L5.get(optionList[i]).findParent("select");if(selectNode==null){return;}
var id=optionList[i].getAttribute("dataset");var ds=L5.DatasetMgr.lookup(id);if(selectNode.L5_Binded!=true){var options=new L5.databind.Options(selectNode);options.bind(ds);}}
var radio_checkboxList=L5.DomQuery.select("input[@dataset]",root);for(var i=0;i<radio_checkboxList.length;i++){if(radio_checkboxList[i].L5_Binded!=true){var type=radio_checkboxList[i].getAttribute("type");if(!type||(type!="radio"&&type!="checkbox")){continue;}
var id=radio_checkboxList[i].getAttribute("dataset");var ds=L5.DatasetMgr.lookup(id);var radio_checkbox=new L5.databind.Radio_Checkbox(radio_checkboxList[i]);radio_checkbox.bind(ds);}}
var formList=L5.DomQuery.select("*[@dataset]",root);for(var i=0;i<formList.length;i++){var simpleTable=true;var id=formList[i].getAttribute("dataset");var ds=L5.DatasetMgr.lookup(id);if(formList[i].nodeName.toLowerCase()=="option"){continue;}else if(formList[i].nodeName.toLowerCase()=="input"){var type=formList[i].getAttribute("type");if(type&&(type=="radio"||type=="checkbox")){continue;}}else if(formList[i].nodeName.toLowerCase()=="label"){var parent=L5.get(formList[i]).findParentNode("[@dataset]");var property=formList[i].getAttribute("field");var dataset=L5.DatasetMgr.lookup(parent.getAttribute("dataset"));if(dataset.getCount()>0){var val=dataset.getCurrent().get(property);L5.databind.setValueOfLabelElement(formList[i],val);}}else if(formList[i].nodeName.toLowerCase()=="table"){if(L5.DomQuery.select("*[@repeat]",formList[i]).length>0){simpleTable=false;}}
if(formList[i].L5_Binded!=true){if(simpleTable){if(formList[i].nodeName.toLowerCase()=="label")
continue;var form=new L5.databind.Form(formList[i]);form.bind(ds);}else{var table=new L5.databind.Table(formList[i]);table.bind(ds);}}}
var valueTipList=L5.DomQuery.select("*[@valueTip]",root);for(var i=0;i<valueTipList.length;i++){var ele=valueTipList[i];var valtip=ele.getAttribute("valueTip");if(valtip=="qtip"){ele.setAttribute("L5:qtip",L5.databind.getShowTextOfElement(ele));L5.get(ele).on("change",function(){ele.setAttribute("L5:qtip",L5.databind.getShowTextOfElement(ele));});}else if(valtip==true||valtip=="true"||valtip=="TRUE"){ele.setAttribute("title",L5.databind.getShowTextOfElement(ele));L5.get(ele).on("change",function(){ele.setAttribute("title",L5.databind.getShowTextOfElement(ele));});}}}
L5.databind=function(){}
L5.databind.Options=function(ele){this.ele=ele;this.ele.L5_Binded=true;this.ele.setAttribute("optionload",false);this.build=function(dataset){this.ele.options.length=0;if(dataset.getCount()>0){var noPlease=this.ele.getAttribute("noPlease");if(!noPlease)
this.ele.options.add(new Option(L5.pleaseSelect?L5.pleaseSelect:"Please select……",""));}
for(var i=0;i<dataset.getCount();i++){var record=dataset.getAt(i);var text=record.get("text");var value=record.get("value");this.ele.options.add(new Option(text,value));}
this.ele.setAttribute("optionload",true);var val=this.ele.getAttribute("value1");var saveVal=this.ele.getAttribute("saveVal");var onchange1=ele.getAttribute("onchange1");if(saveVal&&saveVal!=""){L5.databind.selectOptions(this.ele,saveVal);if(onchange1!=null){L5.databind.change1(ele,"change1");}else{L5.fireEvent(ele,"change");}}else if(val&&val!=""){L5.databind.selectOptions(this.ele,val);if(saveVal!=null){if(onchange1!=null){L5.databind.change1(ele,"change1");}else{L5.fireEvent(ele,"change");}}}else{if(this.ele.options.length>0){this.ele.options[0].selected=true;if(this.ele.options[0].value!=""){if(saveVal!=null){if(onchange1!=null){L5.databind.change1(ele,"change1");}else{L5.fireEvent(ele,"change");}}}}}};this.bind=function(dataset){dataset.on("datachanged",this.build,this);dataset.on("load",this.build,this);this.build(dataset);};}
L5.databind.Radio_Checkbox=function(ele){this.ele=ele;this.ele.style.display="none";this.ele.L5_Binded=true;this.build=function(dataset){var parent=this.ele.parentNode;var removeList=new Array();var childList=parent.childNodes;for(i=0;i<childList.length;i++){var node=childList[i];if(node.L5_Created==true){removeList.push(node);}}
for(i=0;i<removeList.length;i++){parent.removeChild(removeList[i]);}
var str=this.ele.id;if(str=="")
str=this.ele.name;var checkObj;for(var i=0;i<dataset.getCount();i++){var record=dataset.getAt(i);var newRadio_Checkbox=this.ele.cloneNode(true);newRadio_Checkbox.id+=str+"_"+i;newRadio_Checkbox.L5_Created=true;newRadio_Checkbox.removeAttribute("dataset");newRadio_Checkbox.setAttribute("value",record.get("value"));newRadio_Checkbox.style.display="";parent.appendChild(newRadio_Checkbox);if(this.ele.getAttribute("checked")=="checked"||this.ele.getAttribute("checked")=="true"||this.ele.getAttribute("checked")==true){if(i==0){checkObj=newRadio_Checkbox;}
if(this.ele.value===record.get("value")){checkObj=newRadio_Checkbox;}else{newRadio_Checkbox.checked=false;}}else{newRadio_Checkbox.checked=false;}
var spanNode=document.createElement("span");spanNode.L5_Created=true;var textNode=document.createTextNode(record.get("text"));spanNode.appendChild(textNode);parent.appendChild(spanNode);}
if(checkObj){checkObj.checked=true;}};this.bind=function(dataset){dataset.on("datachanged",this.build,this);dataset.on("update",this.build,this);this.build(dataset);};}
L5.databind.Form=function(ele){this.ele=ele;this.ele.L5_Binded=true;this.onbind;this.setValue=function(dataset,record,edit,srcElement,field){if(srcElement&&srcElement==this.ele){return;}
var fieldList=L5.DomQuery.select("*[@field]",this.ele);if(this.ele.getAttribute("field")!=null){fieldList.push(ele);}
if(dataset.getCount()<=0){ele.style.visibility="hidden";return;}
ele.style.visibility="";var record=null;var param=this.ele.getAttribute("filter");if(param!=null&&param!=""){var params=param.split("=");var i=dataset.find(params[0],params[1]);if(i!=-1){record=dataset.getAt(i);}else{ele.style.visibility="hidden";return;}}else{record=dataset.getCurrent();}
for(var j=0;j<fieldList.length;j++){if(!record){break;}
L5.databind.setupElementAccordtoRecord(fieldList[j],record,field);}
if(this.onbind){this.onbind();}};this.addEventListenerOnElement=function(ele){var fieldList=L5.DomQuery.select("*[@field]",ele);if(ele.getAttribute("field")!=null){var type=ele.getAttribute("type");if(type&&type!="radio"&&type!="checkbox"){fieldList.push(ele);}}
for(var j=0;j<fieldList.length;j++){L5.databind.addEventListenerOnElement(fieldList[j],this.ele);}}
this.bind=function(dataset){var str=this.ele.getAttribute("onbind");if(str!=null&&str!=""){this.onbind=window[str];}
this.addEventListenerOnElement(this.ele);dataset.on("datachanged",this.setValue,this);dataset.on("move",this.setValue,this);dataset.on("add",this.setValue,this);dataset.on("remove",this.setValue,this);dataset.on("update",this.setValue,this);dataset.on("validateFailed",this.uniteFalseStyle,this);this.setValue(dataset);};this.uniteFalseStyle=function(){L5.databind.uniteFalseStyle();};}
L5.databind.Table=function(ele){this.ele=ele;this.ele.L5_Binded=true;this.setvalue=function(dataset,rec,edit,srcElement,field){if(srcElement||srcElement==this.ele){return;}
this.bindingTableForm(this.ele,dataset,rec,edit,srcElement,field);};this.bind=function(dataset){dataset.on("datachanged",this.setvalue,this);dataset.on("move",this.setvalue,this);dataset.on("add",this.setvalue,this);dataset.on("remove",this.setvalue,this);dataset.on("update",this.setvalue,this);dataset.on("validateFailed",this.uniteFalseStyle,this);if(dataset.getCount()>0){this.setvalue(dataset);}};this.uniteFalseStyle=function(){L5.databind.uniteFalseStyle();};this.bindingTableForm=function(ele,dataset,rec,edit,srcElement,field){if(ele==null||dataset==null){return;}
var eTBody=ele.getElementsByTagName("tbody");var trRepeats=L5.DomQuery.select("*[@repeat]",eTBody[0]);var colLine=dataset.getCount();var repeatCount=trRepeats.length;for(var i=0;i<trRepeats.length;i++){trRepeats[i].style.display="none";}
var docFragment=document.createDocumentFragment();var trRecords=L5.DomQuery.select("*[record]",eTBody[0]);var repeatNow=trRecords.length/repeatCount;for(var i=colLine*repeatCount;i<trRecords.length;i++){var fieldList=L5.DomQuery.select("*[@field]",trRecords[i]);for(var j=0;j<fieldList.length;j++){L5.EventManager.un(fieldList[j],"blur",L5.databind.element_value_change);L5.EventManager.un(fieldList[j],"change",L5.databind.element_value_change);}
eTBody[0].removeChild(trRecords[i]);L5.get(trRecords[i]).remove();}
for(var i=repeatNow;i<colLine;i++){for(var j=0;j<trRepeats.length;j++){var newTr=trRepeats[j].cloneNode(true);newTr.setAttribute("record",i);newTr.removeAttribute("repeat");newTr.style.display="none";var fieldList=L5.DomQuery.select("*[@id]",newTr);for(var k=0;k<fieldList.length;k++){var id=fieldList[k].getAttribute("id").concat(i);fieldList[k].setAttribute("id",id);}
docFragment.appendChild(newTr);}}
eTBody[0].appendChild(docFragment);var trs=L5.DomQuery.select("tr[record]",eTBody[0]);for(var i=0;i<trs.length;i++){var record=trs[i].getAttribute("record");var recordNode=dataset.getAt(record);if(rec&&field&&recordNode&&rec.id!=recordNode.id){continue;}
trs[i].style.display="";var fieldList=L5.DomQuery.select("*[@field]",trs[i]);for(var j=0;j<fieldList.length;j++){L5.databind.setupElementAccordtoRecord(fieldList[j],recordNode,field);L5.databind.addEventListenerOnElement(fieldList[j],ele);}}}}
L5.databind.setupElementAccordtoRecord=function(ele,record,field){var property=ele.getAttribute("field");if(record&&record.msgIndex[property]==undefined){record.msgIndex["msg_index_"]=record.msgIndex["msg_index_"]!=undefined?record.msgIndex["msg_index_"]+1:0;record.msgIndex[property]=record.msgIndex["msg_index_"];record.msgIndex[record.msgIndex["msg_index_"]]=property;}
var name=ele.getAttribute("label")||ele.getAttribute("title")||ele.getAttribute("name");if(record&&record.msgLable){record.msgLable[property]=name?name:property;}
if(record==null){L5.databind.setValueOfElement(ele,"");}else{if(field){if(property==field){L5.databind.setValueOfElement(ele,record.get(property));L5.Validator.validate(record,property,record.get(property));L5.databind.setValidateInfoOnElement(ele,record,true);}}else{var htmlValue=/\<|\>/;var dataValue=record.get(property);if(L5.preventScriptInjection==true&&htmlValue.test(dataValue)){dataValue=L5.util.Format.htmlEncode(dataValue);}
L5.databind.setValueOfElement(ele,dataValue);L5.Validator.validate(record,property,record.get(property));L5.databind.setValidateInfoOnElement(ele,record,true);}}}
L5.databind.addEventListenerOnElement=function(ele,table){var type=ele.nodeName.toLowerCase();if(type=="select"||ele.getAttribute("systype")=="itemselector"){L5.get(ele).un("change",L5.databind.element_value_change,table);L5.get(ele).on("change",L5.databind.element_value_change,table);return;}
L5.get(ele).un("blur",L5.databind.element_value_change,table);L5.get(ele).on("blur",L5.databind.element_value_change,table);}
L5.databind.getRecord=function(ele,form){var dataset;if(ele.getAttribute("dataset")!=null){dataset=L5.DatasetMgr.lookup(ele.getAttribute("dataset"));}else{if(form!=null){dataset=L5.DatasetMgr.lookup(form.getAttribute("dataset"));}else{var eDataset=L5.get(ele).findParent("[@dataset]");dataset=L5.DatasetMgr.lookup(eDataset.getAttribute("dataset"));}}
var tRow=L5.get(ele).findParent("tr");var record;var param=form.getAttribute("filter");if(tRow!=null&&tRow.getAttribute("repeat")!=null){return null;}else if(tRow!=null&&tRow.getAttribute("record")!=null){record=dataset.getAt(tRow.getAttribute("record"));}else if(form&&param!=null&&param!=""){var params=param.split("=");var i=dataset.find(params[0],params[1]);var record=null;if(i!=-1){record=dataset.getAt(i);}}else{record=dataset.getCurrent();}
return record;}
L5.databind.element_value_change=function(e){var ele=e.getTarget();var property=ele.getAttribute("field");if(!property){return;}
var record;try{record=L5.databind.getRecord(ele,this);}catch(exp){return;}
if(!record)
return;var val=L5.databind.getValueOfElement(ele);var result=record.set(property,val,this);L5.databind.setValidateInfoOnElement(ele,record);L5.HtmlExt.isValidateElement(ele);if(ele.getAttribute("renderer")){var renEl=ele.previousSibling;L5.databind.setValidateInfoOnElement(renEl,record,false,property);}
if(result instanceof Array){for(var i=0;i<result.length;i++){L5.databind.reflect_element(ele,result[i],record);}}}
L5.databind.reflect_element=function(ele,field,record){var eDataset=L5.get(ele).findParent("[@dataset="+record.dataset.ds
+"]");var tRow=L5.get(ele).findParent("tr");var e;if(tRow!=null&&tRow.getAttribute("record")!=null){e=L5.DomQuery.select("*[@field="+field+"]",tRow);}else{e=L5.DomQuery.select("*[@field="+field+"]",eDataset);}
for(var i=0;i<e.length;i++){L5.databind.setValidateInfoOnElement(e[i],record);}}
L5.databind.setValidateInfoOnElement=function(ele,record,nored,fieldp){var extEle=L5.get(ele);var msg="";var property=fieldp?fieldp:ele.getAttribute("field");if(record.validate[property]!=null){if(ele.getAttribute("msg")!=null){msg=ele.getAttribute("msg");}else{var name=ele.getAttribute("label")||ele.getAttribute("title")||ele.getAttribute("name");if(record.msg[property]!=null){if(name){record.msgLable[property]=name;}else{record.msgLable[property]=property;}
msg=record.msgLable[property]+record.msg[property];}}
if(ele.nodeName.toLowerCase()=="input"){if(ele.type=="radio"||ele.type=="checkbox"){ele=ele.parentNode;extEle=L5.get(ele);}}
if(nored){extEle.setStyle("border-color","");}else{extEle.setStyle("border-color","#FA8072");ele.setAttribute("L5:qtitle",L5.valError?L5.valError:"Validate error.");ele.setAttribute("L5:qtip",msg);}}else{if(ele.nodeName.toLowerCase()=="input"){if(ele.type=="radio"||ele.type=="checkbox"){ele=ele.parentNode;extEle=L5.get(ele);}}
extEle.setStyle("border-color","");ele.removeAttribute("L5:qtitle");ele.removeAttribute("L5:qtip");}}
L5.databind.dealWidthRender=function(ele,val,render){var eleCopy=ele.cloneNode(true);ele.parentNode.insertBefore(eleCopy,ele);ele.value=val;ele.style.display="none";eleCopy.removeAttribute("field");eleCopy.removeAttribute("renderer");eleCopy.removeAttribute("name");ele.setAttribute("rendererDealed",true);eleCopy.id=ele.id+"_copy";L5.get(eleCopy).on("focus",function(){eleCopy.style.display="none";ele.style.display="";L5.get(ele).focus();});L5.get(ele).on("blur",function(){ele.style.display="none";eleCopy.style.display="";L5.databind.dealWidthRender.changeCopyEl(eleCopy,ele,render);});L5.get(ele).on("change",L5.databind.dealWidthRender.changeCopyEl.createCallback(eleCopy,ele,render));eleCopy.style.display="";L5.databind.dealWidthRender.changeCopyEl(eleCopy,ele,render);}
L5.databind.dealWidthRender.changeCopyEl=function(eleCopy,ele,render){var renVal="";var eleValue=L5.databind.getValueOfElement(ele);if(typeof render=="function"){renVal=render(eleValue,eleCopy);}else{renVal=window[render]?window[render](eleValue,eleCopy):eleValue;}
L5.databind.setValueOfElement(eleCopy,renVal);}
L5.databind.setValueOfElement=function(ele,val){var render=ele.getAttribute("renderer");if(render&&!ele.getAttribute("rendererDealed")){L5.databind.dealWidthRender(ele,val,render);}
if(ele==null){return;}
if(val==null){val="";}
if(ele.nodeName.toLowerCase()=="select"){L5.databind.setValueOfSelectElement(ele,val);ele.setAttribute("saveVal",val);return;}
if(ele.nodeName.toLowerCase()=="input"){if(ele.type=="radio"||ele.type=="checkbox"){L5.databind.setValueOfChkRadElement(ele,val);return;}else if(ele.getAttribute("systype")=="itemselector"){var cmp=L5.getCmp(ele.getAttribute("id"));if(cmp){cmp.setSelectedValues(val);}}else{ele.value=val;}
try{L5.databind.change1(ele,"change1");}catch(e){}
return;}
if(ele.nodeName.toLowerCase()=="label"&&ele.getAttribute("dataset")!=null){L5.databind.setValueOfLabelElement(ele,val);try{if(render){L5.databind.dealWidthRender.changeCopyEl(ele.previousSibling,ele,render);}}catch(e){}
return;}
if(ele.nodeName.toLowerCase()=="textarea"){ele.value=val;try{L5.databind.change1(ele,"change1");}catch(e){}
return;}
if(ele.textContent){ele.textContent=val;}else if(ele.innerText){ele.innerText=val;}else{ele.innerHTML=val;}
try{if(render){L5.databind.dealWidthRender.changeCopyEl(ele.previousSibling,ele,render);}}catch(e){}}
L5.databind.setValueOfLabelElement=function(ele,val){if(val===""){ele.value="";}else{var ds=L5.DatasetMgr.lookup(ele.getAttribute("dataset"));ele.innerHTML=val;for(var i=0;i<ds.getCount();i++){var record=ds.getAt(i);var labelKey=ele.getAttribute("labelKey");if(!labelKey)
labelKey="value";var labelValue=ele.getAttribute("labelValue");if(!labelValue)
labelValue="text";var key=record.get(labelKey);if(key==val){ele.innerHTML=record.get(labelValue);break;}else
continue;}}}
L5.databind.setValueOfSelectElement=function(ele,val){var onchange1=ele.getAttribute("onchange1");if(ele.optionload===false)
return;if(val===""){if(ele.value1&&ele.value1!=""&&ele.options.length>0){L5.databind.selectOptions(ele,ele.value1);try{if(onchange1!=null){L5.databind.change1(ele,"change1");}else{L5.fireEvent(ele,"change");}}catch(e){}}else if(ele.options.length>0){ele.options[0].selected=true;if(ele.options[0].value!==""){try{if(onchange1!=null){L5.databind.change1(ele,"change1");}else{L5.fireEvent(ele,"change");}}catch(e){}}}}else{var flag=L5.databind.selectOptions(ele,val);try{if(onchange1!=null){L5.databind.change1(ele,"change1");}else{L5.fireEvent(ele,"change");}}catch(e){}}}
L5.databind.selectOptions=function(ele,val){var flag=false;if(!L5.isArray(val))
val=[val];var i;var j;for(i=0;i<ele.options.length;i++){ele.options[i].selected=false;for(j=0;j<val.length;j++){var sss=""+val[j];if(ele.options[i].value==sss){ele.options[i].selected=true;flag=true;}}}
return flag;}
L5.databind.setValueOfChkRadElement=function(ele,val){var valArray;if(typeof val=='string')
valArray=val.split(",");else
valArray=[val];if(ele.value==""){ele.value=val;L5.databind.change1(ele,"change1");return;}
for(var j=0;j<valArray.length;j++){var sss=""+valArray[j];if(sss==ele.value){ele.checked=true;L5.databind.change1(ele,"change1");return;}else{ele.checked=false;}}
ele.checked=false;}
L5.databind.getValueOfElement=function(ele){if(ele==null){return"";}
if(ele.nodeName.toLowerCase()=="select"){return L5.databind.getValueOfSelectElement(ele);}
if(ele.nodeName.toLowerCase()=="input"){if(ele.type=="radio"||ele.type=="checkbox"){return L5.databind.getValueOfChkRadElement(ele);}
return ele.value;}
if(ele.nodeName.toLowerCase()=="textarea"){return ele.value;}
if(ele.textContent)
return ele.textContent;else if(ele.innerText)
return ele.innerText;else
return ele.innerHTML;}
L5.databind.getShowTextOfElement=function(ele){if(ele==null){return"";}
if(ele.nodeName.toLowerCase()=="select"){var ret=null;if(ele.type=="select-multiple"){ret="";for(var i=0;i<ele.options.length;i++){var item=ele.options[i];if(item.selected){ret=ret+item.text+" ";}}}else{var sel=ele.selectedIndex;if(sel!=-1){var item=ele.options[sel];var valueAttr=item.getAttributeNode("value");ret=item.text;}else{ret="";}}
return ret;}
if(ele.nodeName.toLowerCase()=="input"){if(ele.type=="radio"||ele.type=="checkbox"){return L5.databind.getValueOfChkRadElement(ele);}
return ele.value;}
if(ele.nodeName.toLowerCase()=="textarea"){return ele.value;}
if(ele.textContent)
return ele.textContent;else if(ele.innerText)
return ele.innerText;else
return ele.innerHTML;}
L5.databind.getValueOfSelectElement=function(ele){var ret=null;if(ele.type=="select-multiple"){ret=new Array();for(var i=0;i<ele.options.length;i++){var item=ele.options[i];if(item.selected){var valueAttr=item.getAttributeNode("value");if(valueAttr&&valueAttr.specified){ret.push(item.value);}else{ret.push(item.text);}}}}else{var sel=ele.selectedIndex;if(sel!=-1){var item=ele.options[sel];var valueAttr=item.getAttributeNode("value");if(valueAttr&&valueAttr.specified){ret=item.value;}else{ret=item.text;}}else{ret="";}}
ele.setAttribute("saveVal",ret);return ret;}
L5.databind.getValueOfChkRadElement=function(ele){if(ele.type=="radio"){if(ele.checked)
return ele.value;return ele.checked;}
if(ele.type=="checkbox"){var property=ele.getAttribute("field");var selector="input[@field="+property+"]";var parent=ele.parentNode;var nodes=L5.DomQuery.select(selector,parent);if(nodes&&nodes.length>=1){var reply="";for(var i=0;i<nodes.length;i++){var node=nodes[i];var type=ele.getAttribute("type");if(type!="checkbox")
continue;if(node.checked){if(reply!=null&&reply!="")
reply=reply+","+node.value;else
reply=reply+node.value;}}
return reply;}
return ele.checked;}}
L5.databind.uniteFalseStyle=function(root){if(!root){root=document.body;}
var recObj=new Object();var formList=L5.DomQuery.select("*[@dataset]",root);for(var p=0;p<formList.length;p++){var dsId=formList[p].getAttribute("dataset");var dataset=L5.DatasetMgr.lookup(dsId);var param=formList[p].getAttribute("filter");if(param!=null&&param!=""){var params=param.split("=");var i=dataset.find(params[0],params[1]);if(i!=-1){recObj[dsId]=dataset.getAt(i);}}else{recObj[dsId]=dataset.getCurrent();}}
for(var i=0;i<formList.length;i++){var datasetId=formList[i].getAttribute("dataset");var fieldList=L5.DomQuery.select("*[@field]",formList[i]);for(var j=0;j<fieldList.length;j++){var property=fieldList[j].getAttribute("field");if(recObj[datasetId]&&recObj[datasetId].validate[property]==false){L5.get(fieldList[j]).setElFalseStyle(L5.valError?L5.valError:"Validate error.",recObj[datasetId].msgLable[property]
+recObj[datasetId].msg[property]);}}}};L5.databind.getFirstFalseDom=function(root){if(!root){root=document.body;}
var firstFalseEle=null;var formList=L5.DomQuery.select("*[@dataset]",root);for(var i=0;i<formList.length;i++){var datasetId=formList[i].getAttribute("dataset");var dataset=L5.DatasetMgr.lookup(datasetId);var param=formList[i].getAttribute("filter");var record;if(param!=null&&param!=""){var params=param.split("=");var k=dataset.find(params[0],params[1]);if(k!=-1){record=dataset.getAt(k);}}else{record=dataset.getCurrent();}
var fieldList=L5.DomQuery.select("*[@field]",formList[i]);for(var j=0;j<fieldList.length;j++){var property=fieldList[j].getAttribute("field");if(record&&record.validate[property]==false){if(!L5.get(fieldList[j]).isVisible()||fieldList[j].getAttribute("type")=="hidden"){continue;}
firstFalseEle=fieldList[j];return firstFalseEle;}}}
return firstFalseEle;}
L5.databind.getAllErrorMsg=function(root){if(!root){root=document.body;}
var msg="";var recObj=new Object();var formList=L5.DomQuery.select("*[@dataset]",root);for(var p=0;p<formList.length;p++){var dsId=formList[p].getAttribute("dataset");var dataset=L5.DatasetMgr.lookup(dsId);var param=formList[p].getAttribute("filter");if(param!=null&&param!=""){var params=param.split("=");var i=dataset.find(params[0],params[1]);if(i!=-1){recObj[dsId]=dataset.getAt(i);}}else{recObj[dsId]=dataset.getCurrent();}}
var validMsg=L5.validMsg?L5.validMsg:"[{0}] {1}";var tempMsg="";for(var i=0;i<formList.length;i++){var datasetId=formList[i].getAttribute("dataset");var fieldList=L5.DomQuery.select("*[@field]",formList[i]);for(var j=0;j<fieldList.length;j++){if(!L5.get(fieldList[j]).isVisible()||fieldList[j].getAttribute("type")=="hidden"){continue;}
var property=fieldList[j].getAttribute("field");if(recObj[datasetId]&&recObj[datasetId].validate[property]==false&&recObj[datasetId+"~"+property]!=true){tempMsg=String.format(validMsg,recObj[datasetId].msgLable[property],recObj[datasetId].msg[property]);msg+=tempMsg+"\n";recObj[datasetId+"~"+property]=true;}}}
return msg;}
L5.databind.change1=function(ele,eventName){var ele;if(typeof ele=="string"){ele=document.getElementById(ele);}else{ele=ele;}
var onchange1=ele.getAttribute("onchange1");if(onchange1!=null){eval(onchange1);}}

function buildRecordConfig(node){var recordNode=L5.DomQuery.selectNode("record",node);if(recordNode){var recordConfig=new Array();var fieldList=L5.DomQuery.select("field",recordNode);for(var j=0;j<fieldList.length;j++){var fieldConfig=new Object();var fieldName=fieldList[j].getAttribute("name");if(fieldName&&fieldName!=null){fieldConfig.name=fieldName;}
var type=fieldList[j].getAttribute("type");if(type&&type!=null){fieldConfig.type=type;}
var mapping=fieldList[j].getAttribute("mapping");if(mapping&&mapping!=null){fieldConfig.mapping=mapping;}
var convert=fieldList[j].getAttribute("convert");if(convert&&convert!=null){fieldConfig.convert=window[convert];}
var dateFormat=fieldList[j].getAttribute("dateFormat");if(dateFormat&&dateFormat!=null){fieldConfig.dateFormat=dateFormat;}
var defaultValue=fieldList[j].getAttribute("defaultValue");if(defaultValue&&defaultValue!=null){fieldConfig.defaultValue=defaultValue;}
fieldConfig=bulidFieldValidator(fieldList[j],fieldConfig);recordConfig[j]=fieldConfig;}}
return recordConfig;}
function bulidFieldValidator(ele,fieldConfig){var rule=ele.getAttribute("rule");fieldConfig.rule=rule;return fieldConfig;}
function buidSortConfig(cfg,node){var remoteSort=node.getAttribute("remoteSort");if(remoteSort&&remoteSort=="false"){cfg.remoteSort=false;}
var sortNode=L5.DomQuery.selectNode("sort",node);if(sortNode&&sortNode!=null){var sortInfo=new Object();var sortname=sortNode.getAttribute("field");if(sortname&&sortname!=null){sortInfo.field=sortname;}
var sortdir=sortNode.getAttribute("dir");if(sortdir&&sortdir!=null){sortInfo.direction=sortdir;}
cfg.sortInfo=sortInfo;}}
function buildMetaConfig(node){var metaNode=L5.DomQuery.selectNode("metadata",node);var metaConfig=new Object();if(metaNode!=null){var metaId=metaNode.getAttribute("id");if(metaId&&metaId!=null){metaConfig.id=metaId;}
var metaSuccess=metaNode.getAttribute("success");if(metaSuccess&&metaSuccess!=null){metaConfig.success=metaSuccess;}
var metaTotal=metaNode.getAttribute("total");if(metaTotal&&metaTotal!=null){metaConfig.totalRecords=metaTotal;}
var metaRecords=metaNode.getAttribute("record");if(metaRecords&&metaRecords!=null){metaConfig.record=metaRecords;}}
return metaConfig;}
function buildReaderConfig(cfg,node,metaConfig,recordType){var readerType=node.getAttribute("reader");if(!readerType)readerType="json";switch(readerType){case"xml":cfg.reader=new L5.model.XmlReader(metaConfig,recordType);break;case"json":cfg.reader=new L5.model.JsonReader(metaConfig,recordType);break;case"array":cfg.reader=new L5.model.ArrayReader(metaConfig,recordType);break;alert("invalid reader:"+readerType);return false;}
return true;}
function buildProxyConfig(cfg,node){var proxyType=node.getAttribute("proxy");if(!proxyType)proxyType="url";switch(proxyType){case"cmd":var clazz=L5.DomQuery.selectValue("command",node).trim();cfg.proxy=new L5.CommandProxy(clazz);break;case"enum":var enums=L5.DomQuery.selectValue("enum",node);cfg.proxy=new L5.EnumProxy(enums);break;case"rpc":var method=L5.DomQuery.selectValue("method",node);cfg.proxy=new L5.model.DirectProxy();break;case"url":var url=L5.DomQuery.selectValue("url",node);cfg.proxy=new L5.model.HttpProxy({"url":url});break;case"local":var data=L5.DomQuery.selectValue("data",node);cfg.proxy=new L5.model.MemoryProxy(window[data]);break;case"none":cfg.proxy=null;break;alert("invalid proxy:"+proxyType);return false;}
return true;}
L5.XMLParser=function(){this.datasetConfigs=new L5.util.MixedCollection();this.recordConfigs=new L5.util.MixedCollection();this.inited=false;};L5.XMLParser.prototype.init=function(){var dsDiv=document.getElementById("datasetDiv");var dsList=L5.DomQuery.select("dataset",dsDiv);for(var i=0;i<dsList.length;i++){var cfg={};var node=dsList[i];var id=node.getAttribute("id");if(id==null){alert("dataset require attribute[id]");continue;}
cfg.id=id;var autoLoad=node.getAttribute("autoLoad");if(autoLoad){if(autoLoad=="true")
cfg.autoLoad=true;else
cfg.autoLoad=false;}
var src=node.getAttribute("src");if(src!=null){var xmlobject=L5.loadXml(src);node=L5.DomQuery.selectNode("dataset[@id="+id+"]",xmlobject);}
var pageSize=node.getAttribute("pageSize");if(pageSize){cfg.pageSize=parseInt(pageSize);}
var remotePage=node.getAttribute("remotePage");if(remotePage&&remotePage=="false"){cfg.remotePage=false;}else{cfg.remotePage=true;}
var needTotal=node.getAttribute("needTotal");if(needTotal&&needTotal=="false"){cfg.needTotal=false;}else{cfg.needTotal=true;}
var recordConfig=buildRecordConfig.call(this,node);if(recordConfig){var recordType=L5.model.Record.create(recordConfig);}else{var recordType=null;}
var metaConfig=buildMetaConfig.call(this,node);var success;success=buildReaderConfig.call(this,cfg,node,metaConfig,recordType);if(!success){continue;}
success=buildProxyConfig.call(this,cfg,node);if(!success){continue;}
buidSortConfig.call(this,cfg,node);this.datasetConfigs.add(cfg.id,cfg)}
this.inited=true;}
L5.XMLParser.prototype.newDataset=function(para){if(!this.inited){this.init();}
if(typeof para=='string'){var config=this.datasetConfigs.get(para);if(config.remotePage){window[config.id]=new L5.model.Dataset(config);}else{window[config.id]=new L5.model.LocalPageDataset(config);}}else if(typeof para=='object'){for(var i=0;i<para.getCount();i++){var config=para.get(i);if(config.remotePage){window[config.id]=new L5.model.Dataset(config);}else{window[config.id]=new L5.model.LocalPageDataset(config);}}}}
L5.XMLParser.prototype.getRecordConfig=function(para){if(typeof para=='string'){return this.recordConfigs.get(para);}};L5.loadXml=function(url){var ret=null;var o={url:url,sync:true,callback:function(options,success,response){ret=response.responseXML;},scope:this};L5.Ajax.request(o);return ret;}
L5.initObj.datasetbyxml=function(){var xmlparser=new L5.XMLParser();xmlparser.init();xmlparser.newDataset(xmlparser.datasetConfigs);};

var $regexs={require:/.+/,email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,phone:/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,mobile:/^((\(\d{2,3}\))|(\d{3}\-))?0{0,1}1[3|5|6|8][0-9]{9}$/,url:new RegExp("^((https|http|ftp|rtsp|mms)?://)"
+"?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
+"(([0-9]{1,3}.){3}[0-9]{1,3}"
+"|"
+"([0-9a-z_!~*'()-]+.)*"
+"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]."
+"[a-z]{2,6})"
+"(:[0-9]{1,4})?"
+"((/?)|"
+"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"),ip:/^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/,currency:/^(-)?\d+(\.\d+)?$/,number:/^\d+$/,zip:/^[1-9]\d{5}$/,qq:/^[1-9]\d{4,9}$/,english:/^\w+$/,chinese:/^[\u0391-\uFFE5]+$/,username:/^[a-z]\w{3,19}$/i,integer:/^[-\+]?\d+$/,age:/^^([1-9]\d|\d)$/,'double':/^[-\+]?\d+(\.\d+)?$/};L5.isIdCard={vcity:{11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},checkIdCard:function(card){if(card===''){return" 身份证号码不能为空!";}
if(this.isCardNo(card)===false){return" 身份证号码长度或类型错误!";}
if(this.checkProvince(card)===false){return" 身份证号码不正确!";}
if(this.checkBirthday(card)===false){return" 身份证号码不正确!";}
if(this.checkParity(card)===false){return" 身份证号码不正确!";}
return true;},isCardNo:function(id){var reg=/(^\d{15}$)|(^\d{17}(\d|X)$)/;if(reg.test(id)===false){return false;}
return true;},checkProvince:function(card){var province=card.substr(0,2);if(this.vcity[province]==undefined){return false;}
return true;},checkBirthday:function(card){var len=card.length;if(len==15){var re_fifteen=/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;var arr_data=card.match(re_fifteen);var year=arr_data[2];var month=arr_data[3];var day=arr_data[4];var birthday=new Date('19'+year+'/'+month+'/'+day);return this.verifyBirthday('19'+year,month,day,birthday);}
if(len==18){var re_eighteen=/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;var arr_data=card.match(re_eighteen);var year=arr_data[2];var month=arr_data[3];var day=arr_data[4];var birthday=new Date(year+'/'+month+'/'+day);return this.verifyBirthday(year,month,day,birthday);}
return false;},verifyBirthday:function(year,month,day,birthday){var now=new Date();var now_year=now.getFullYear();if(birthday.getFullYear()==year&&(birthday.getMonth()+1)==month&&birthday.getDate()==day){var time=now_year-year;if(time>=3&&time<=100){return true;}
return false;}
return false;},checkParity:function(card){card=this.changeFivteenToEighteen(card);var len=card.length;if(len==18){var arrInt=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);var arrCh=new Array('1','0','X','9','8','7','6','5','4','3','2');var cardTemp=0,i,valnum;for(i=0;i<17;i++){cardTemp+=card.substr(i,1)*arrInt[i];}
valnum=arrCh[cardTemp%11];if(valnum==card.substr(17,1)){return true;}
return false;}
return false;},changeFivteenToEighteen:function(card){if(card.length=='15'){var arrInt=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);var arrCh=new Array('1','0','X','9','8','7','6','5','4','3','2');var cardTemp=0,i;card=card.substr(0,6)+'19'+card.substr(6,card.length-6);for(i=0;i<17;i++){cardTemp+=card.substr(i,1)*arrInt[i];}
card+=arrCh[cardTemp%11];return card;}
return card;}};L5.checkIdCard=function(idCard){return L5.isIdCard.checkIdCard(idCard);};L5.isDateTime=function(format,reObj){format=format||'yyyy-MM-dd';var input=this,o={},d=new Date();if(L5.isDate(input)&&!reObj)
return true;var f1=format.split(/[^a-z]+/gi),f2=input.split(/\D+/g),f3=format.split(/[a-z]+/gi),f4=input.split(/\d+/g);var len=f1.length,len1=f3.length;if(len!=f2.length||len1!=f4.length)
return false;for(var i=0;i<len1;i++)
if(f3[i]!=f4[i])
return false;for(var i=0;i<len;i++)
o[f1[i]]=f2[i];if(!o.Y)
o.Y=o.y;if(o.yyyy!=undefined)
o.yyyy=s(o.yyyy,o.Y,d.getFullYear(),9999,4);else
o.yyyy=9999;if(o.MM!=undefined)
o.MM=s(o.MM,o.m,d.getMonth()+1,12);else
o.MM=1;if(o.dd!=undefined)
o.dd=s(o.dd,o.d,d.getDate(),31);else
o.dd=1;if(o.hh!=undefined)
o.hh=s(o.hh,o.h,d.getHours(),24);else
o.hh=0;if(o.mm!=undefined)
o.mm=s(o.mm,o.m,d.getMinutes());else
o.mm=0;if(o.ss!=undefined)
o.ss=s(o.ss,o.s,d.getSeconds());else
o.ss=0;if(o.ms!=undefined)
o.ms=s(o.ms,o.ms,d.getMilliseconds(),999,3);else
o.ms=0;if(o.yyyy+o.MM+o.dd+o.hh+o.mm+o.ss+o.ms<0)
return false;if(o.yyyy<100)
o.yyyy+=(o.yyyy>30?1900:2000);d=new Date(o.yyyy,o.MM-1,o.dd,o.hh,o.mm,o.ss,o.ms);var reVal=d.getFullYear()==o.yyyy&&d.getMonth()+1==o.MM&&d.getDate()==o.dd&&d.getHours()==o.hh&&d.getMinutes()==o.mm&&d.getSeconds()==o.ss&&d.getMilliseconds()==o.ms;return reVal&&reObj?d:reVal;function s(s1,s2,s3,s4,s5){s4=s4||60,s5=s5||2;var reVal=s3;if(s1!=undefined&&s1!=''||!isNaN(s1)){if(s1.length==1){s1="0"+s1;}
reVal=s1*1;}
if(s2!=undefined&&s2!=''&&!isNaN(s2)){if(s2.length==1){s2="0"+s2;}
reVal=s2*1;}
return(reVal==s1&&s1.length!=s5||reVal>s4)?-10000:reVal;}};L5.Validator={tempErrorMsg:{require:"is required field.",date:"is an invalid date format.",regex:"is an invalid format.",notEqualToValue:"is not equal to {0}.",notEqualToRuleValue:"is not equal to the value of {0}.",mustLess:"must less than {0}.",mustLarger:"must larger than {0}.",uniqueConstraints:"It violates unique constraints.",length_e_c:"must no longer than {0} English letters or {1} character length.",length:"must no longer than {0} letters length."},validate:function(record,name,value){var isValidate=true;var result=new Array();for(var i=0;i<record.fields.items.length;i++){if(record.fields.items[i].name===name&&record.fields.items[i].rule!=null){var rules=record.fields.items[i].rule.split("|");for(var j=0;j<rules.length;j++){var rule=rules[j];var ruleName=rule.substring(0,rule.indexOf("{"));var ruleParm=rule.substring(rule.indexOf("{")+1,rule.lastIndexOf("}"));if(rule.indexOf("{")<0){ruleName=rule;ruleParm="";}
isValidate=L5.Validator.ruleValidate(ruleName,value,record,ruleParm);if(ruleName=="equal"&&record.get(ruleParm)!=null){L5.Validator.reflectValidate(record,ruleParm,record.get(ruleParm));result.push(ruleParm);}else if(rule=="compare"){var parms=ruleParm.split(",");var min,max;for(var i=0;i<parms.length;i++){if(parms[i].indexOf("min")>=0){min=parms[i].substring(parms[i].indexOf(":")
+1);}
if(parms[i].indexOf("max")>=0){max=parms[i].substring(parms[i].indexOf(":")
+1);}}
if(record.get(min)!=null){L5.Validator.reflectValidate(record,min,record.get(min));result.push(min);}
if(record.get(max)!=null){L5.Validator.reflectValidate(record,max,record.get(max));result.push(max);;}}
if(isValidate!==true){record.msg[name]=isValidate;break;}}
L5.Validator.setValidate(name,record,isValidate);break;}}
return result;},reflectValidate:function(record,name,value){var result=true;for(var i=0;i<record.fields.items.length;i++){if(record.fields.items[i].name===name&&record.fields.items[i].rule!=null){var rules=record.fields.items[i].rule.split("|");for(var j=0;j<rules.length;j++){var rule=rules[j];var ruleName=rule.substring(0,rule.indexOf("{"));var ruleParm=rule.substring(rule.indexOf("{")+1,rule.lastIndexOf("}"));if(rule.indexOf("{")<0){ruleName=rule;ruleParm="";}
result=L5.Validator.ruleValidate(ruleName,value,record,ruleParm);if(result!==true){record.msg[name]=result;break;}}
L5.Validator.setValidate(name,record,result);break;}}},ruleValidate:function(ruleName,value,record,ruleParm){var result=true;switch(ruleName){case null:result=L5.Validator["empty"]();break;case"require":result=L5.Validator["require"](value,record);break;case"date":result=L5.Validator["date"](value,record,ruleParm);break;case"equal":result=L5.Validator["equal"](value,record,ruleParm);break;case"regex":result=L5.Validator["regex"](value,record,ruleParm);break;case"compare":result=L5.Validator["compare"](value,record,ruleParm);break;case"unique":result=L5.Validator["unique"](value,record,ruleParm);break;case"length":result=L5.Validator["length"](value,record,ruleParm);break;case"lengthUTF8":result=L5.Validator["lengthUTF8"](value,record,ruleParm);break;case"lengthGBK":result=L5.Validator["lengthGBK"](value,record,ruleParm);break;case"custom":result=L5.Validator["custom"](value,record,ruleParm);break;default:result=L5.Validator["regex"](value,record,ruleName);break;}
return result;},empty:function(){return true;},require:function(value,record){var retMsg;if(value===null||value===""){retMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["require"]:L5.Validator.tempErrorMsg["require"];return retMsg;}
if(typeof value=='string'&&value.trim()===""){retMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["require"]:L5.Validator.tempErrorMsg["require"];return retMsg;}
if(typeof value=='string'&&/^[\s　]+$/.exec(value)){retMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["require"]:L5.Validator.tempErrorMsg["require"];return retMsg;}
return true;},date:function(value,record,dateFormat){if(value===null||value==="")
return true;var isValidate=(value===undefined)?false:L5.isDateTime.call(value,dateFormat);if(isValidate==false){var msg=L5.Validator.errorMsg?L5.Validator.errorMsg["date"]:L5.Validator.tempErrorMsg["date"];if(dateFormat!==null&&dateFormat!=="")
msg=msg+"("+dateFormat+")";return msg;}else{return true;}},regex:function(value,record,regex){if(value===null||value==="")
return true;var pattern=$regexs[regex]||new RegExp(regex);if(pattern===null)
return true;var isValidate=pattern.test(value);if(isValidate==false){var msg=L5.Validator.errorMsg?L5.Validator.errorMsg["regex"]:L5.Validator.tempErrorMsg["regex"];return msg;}else{return true;}},equal:function(value,record,target){if(value===null||value==="")
return true;var targetVal=record.get(target)||target;if(value==targetVal){return true;}else{var msg;var notEqual;if(record.cellLable&&record.cellLable[target]){target=record.cellLable[target];}
if(record.msgLable[target]!=null)
target=record.msgLable[target];if(record.get(target)!==null){notEqual=L5.Validator.errorMsg?L5.Validator.errorMsg["notEqualToRuleValue"]:L5.Validator.tempErrorMsg["notEqualToRuleValue"];}else{notEqual=L5.Validator.errorMsg?L5.Validator.errorMsg["notEqualToValue"]:L5.Validator.tempErrorMsg["notEqualToValue"];}
target='['+target+']';msg=String.format(notEqual,target);return msg;}},compare:function(value,record,ruleParm){if(value===null||value==="")
return true;var parms=ruleParm.split(",");var min,max,type;for(var i=0;i<parms.length;i++){if(parms[i].indexOf("min")>=0){min=parms[i].substring(parms[i].indexOf(":")+1);}
if(parms[i].indexOf("max")>=0){max=parms[i].substring(parms[i].indexOf(":")+1);}
if(parms[i].indexOf("type")>=0){type=parms[i].substring(parms[i].indexOf(":")+1);}else{type="string";}}
var minVal=record.get(min)||min;var maxVal=record.get(max)||max;var result=true;switch(type){case"number":if(minVal!==null){result=result&&(value*1>=minVal*1);}
if(maxVal!==null){result=result&&(value*1<=maxVal*1);}
break;case"string":if(minVal!==null){result=result&&(value.localeCompare(minVal)>=0);}
if(maxVal!==null){result=result&&(value.localeCompare(maxVal)<=0);}
break;default:}
if(result==false){var msg="";if(minVal!==null&&minVal>value){var mustLarger=L5.Validator.errorMsg?L5.Validator.errorMsg["mustLarger"]:L5.Validator.tempErrorMsg["mustLarger"];msg=String.format(mustLarger,minVal).substring(0,String.format(mustLarger,minVal).length-1)+"且小于"+maxVal+"。";}
if(maxVal!==null&&maxVal<value){var mustLess=L5.Validator.errorMsg?L5.Validator.errorMsg["mustLess"]:L5.Validator.tempErrorMsg["mustLess"];msg=String.format(mustLess,maxVal).substring(0,String.format(mustLess,maxVal).length-1)+"且大于"+minVal+"。";}
return msg;}else{return true;}},unique:function(value,record,union){if(value===null||value==="")
return true;var unions=union.split(",");var index=record.dataset.indexOf(record);for(var i=0;i<unions.length;i++){var val=record.get(unions[i]);for(var j=0;j<record.dataset.getCount();j++){if(j==index)
continue;if(val==record.dataset.getAt(j).get(unions[i])){var retMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["uniqueConstraints"]:L5.Validator.tempErrorMsg["uniqueConstraints"];return retMsg;}}}
return true;},length:function(value,record,len){if(value===null||value==="")
return true;var len=len*1;var strVal=value.toString()+"";var curLen=strVal.length;var chiArr=strVal.match(/[\u4E00-\u9FA5\uF900-\uFA2D]|[\uFF00-\uFFFF]/g);if(chiArr!=null)curLen+=chiArr.length;if(curLen<=len){return true;}else{var lengthMsg;var retMsg;if(chiArr!=null){lengthMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["length_e_c"]:L5.Validator.tempErrorMsg["length_e_c"];retMsg=String.format(lengthMsg,len,Math.floor(len/2));return retMsg;}else{lengthMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["length"]:L5.Validator.tempErrorMsg["length"];retMsg=String.format(lengthMsg,len);return retMsg;}}},lengthUTF8:function(value,record,len){if(value===null||value==="")
return true;var len=len*1;var strVal=value.toString()+"";var curLen=strVal.length;var chiArr=strVal.match(/[\u4E00-\u9FA5\uF900-\uFA2D]|[\uFF00-\uFFFF]/g);if(chiArr!=null)curLen+=(chiArr.length*2);if(curLen<=len){return true;}else{var lengthMsg;var retMsg;if(chiArr!=null){lengthMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["length_e_c"]:L5.Validator.tempErrorMsg["length_e_c"];retMsg=String.format(lengthMsg,len,Math.floor(len/3));return retMsg;}else{lengthMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["length"]:L5.Validator.tempErrorMsg["length"];retMsg=String.format(lengthMsg,len);return retMsg;}}},lengthGBK:function(value,record,len){if(value===null||value==="")
return true;var len=len*1;var strVal=value.toString()+"";var curLen=strVal.length;var chiArr=strVal.match(/[\u4E00-\u9FA5\uF900-\uFA2D]|[\uFF00-\uFFFF]/g);if(chiArr!=null)curLen+=chiArr.length;if(curLen<=len){return true;}else{var lengthMsg;var retMsg;if(chiArr!=null){lengthMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["length_e_c"]:L5.Validator.tempErrorMsg["length_e_c"];retMsg=String.format(lengthMsg,len,Math.floor(len/2));return retMsg;}else{lengthMsg=L5.Validator.errorMsg?L5.Validator.errorMsg["length"]:L5.Validator.tempErrorMsg["length"];retMsg=String.format(lengthMsg,len);return retMsg;}}},custom:function(value,record,fn){var parms=fn.split(",");var fnName;var args=new Array();args.push(value);args.push(record);if(parms.length>0){fnName=parms[0].substring(parms[0].indexOf(":")+1);for(var i=1;i<parms.length;i++){argname=parms[i].substring(0,parms[i].indexOf(":"));argvalue=parms[i].substring(parms[i].indexOf(":")+1);args.push(argvalue);}
return(new Function("return "+fnName)())(args);}
return true;},setValidate:function(name,record,result){if(result===true){if(record.validate[name]!=null){delete record.validate[name];var val=true;for(var v in record.validate){if(record.validate[v]===false){val=false;break;}}
if(val===true){delete record.dataset.validated[record.id];}}}else{record.validate[name]=false;if(record.msgLable[name]==null)
record.msgLable[name]=name;record.dataset.validated[record.id]=false;}}};

L5.model.GroupingDataset=L5.extend(L5.model.Dataset,{remoteGroup:false,groupOnSort:false,clearGrouping:function(){this.groupField=false;if(this.remoteGroup){if(this.baseParams){delete this.baseParams.groupBy;}
this.reload();}else{this.applySort();this.fireEvent('datachanged',this);}},groupBy:function(field,forceRegroup){if(this.groupField==field&&!forceRegroup){return;}
this.groupField=field;if(this.remoteGroup){if(!this.baseParams){this.baseParams={};}
this.baseParams['groupBy']=field;}
if(this.groupOnSort){this.sort(field);return;}
if(this.remoteGroup){this.reload();}else{var si=this.sortInfo||{};if(si.field!=field){this.applySort();}else{this.sortData(field);}
this.fireEvent('datachanged',this);}},applySort:function(){L5.model.GroupingDataset.superclass.applySort.call(this);if(!this.groupOnSort&&!this.remoteGroup){var gs=this.getGroupState();if(gs){if(this.sortInfo&&gs!=this.sortInfo.field){this.sortData(this.groupField);}else if(this.sortInfo==undefined){this.sortData(this.groupField);}}}},applyGrouping:function(alwaysFireChange){if(this.groupField!==false){this.groupBy(this.groupField,true);return true;}else{if(alwaysFireChange===true){this.fireEvent('datachanged',this);}
return false;}},getGroupState:function(){return this.groupOnSort&&this.groupField!==false?(this.sortInfo?this.sortInfo.field:undefined):this.groupField;}});

JSONRpcClient=function(url,user,pass){this.url=url;if(!url){this.url=L5.webPath+"/SCAJSON-RPC";}
this.user=user;this.pass=pass;this.invoke=function(method,args,callback){if(!args)
args=[];else if(args.constructor!=Array)
args=[args];var id=L5.Ajax.transactionId;var data={"id":id,"method":method,"params":args};if(callback){var o={url:this.url,cb:callback,jsonData:L5.encode(data),callback:this.loadResponse,scope:this};L5.Ajax.request(o);return id;}else{var result=[];var o={result:result,url:this.url,sync:true,jsonData:L5.encode(data),callback:this.loadResponse,scope:this};L5.Ajax.request(o);return result[0];}};this.loadResponse=function(options,success,response){if(!success)
throw new L5.Exception(response.status,response.statusText);var obj=L5.decode(response.responseText);if(obj.error)
throw new L5.Exception(obj.error.code,obj.error.msg,obj.error.trace);if(options.cb)
options.cb(obj.result);else
options.result[0]=obj.result;}
this.invokeQueue=function(queue){var args=[queue.count];for(var i=0;i<queue.count;i++){args[i]={"method":queue.method[i],"params":queue.params[i]};}
var callback=function(result){if(result==null)
return;for(var j=0;j<queue.count;j++){if(queue.cb[j])
queue.cb[j](result[j]);}};return this.invoke("SYS.QUEUE",args,callback);};};InvokeQueue=function(){this.method=[];this.params=[];this.cb=[];this.count=0;this.add=function(method,args,callback){if(!args)
args=[];else if(args.constructor!=Array)
args=[args];this.method[this.count]=method;this.params[this.count]=args;if(callback)
this.cb[this.count]=callback;this.count++;}};

L5.Command=function(id,url){this.id=id;if(url)
this.url=url;else
this.url=L5.webPath+"/command/ajax";this.params=new L5.Map("ParameterSet");this.returns=new L5.Map("ParameterSet");};L5.Command.context=new L5.Map();L5.Command.setContextParameter=function(name,value){L5.Command.context.put(name,value);}
L5.setCP=L5.setContextParameter=L5.Command.setContextParameter;L5.Command.getContextParameter=function(name){return L5.Command.context.get(name);}
L5.getCP=L5.getContextParameter=L5.Command.getContextParameter;L5.Command.prototype={setForm:function(dom){this.form=dom;},setParameter:function(name,value){this.params.put(name,value);},getReturn:function(name){return this.returns.get(name);},loadResponse:function(options,success,response)
{if(this.error)
return;try{if(!success){this.error={"code":response.status,"msg":response.response.status};throw new L5.Exception(response.status,response.statusText);}
var obj=L5.decode(response.responseText);if(obj.error){this.error=obj.error;var exception=new L5.Exception(obj.error.code,obj.error.msg,obj.error.trace)
if(obj.error.title){exception.title=obj.error.title;}
throw exception;}
this.returns=L5.serializer.unmarshall(obj);}catch(e){this.error=e;}
var ret=this.returns.map;for(name in ret){var obj=ret[name];if(obj&&obj.javaClass&&obj.javaClass=="DataSet"){L5.DatasetMgr.lookup(name).loadData(obj);}}
if(this.afterExecute)
this.afterExecute();},execute:function(method,sync){var t_sync=true;var t_method=null;for(i=0;i<arguments.length;i++){if(arguments[i]==true||arguments[i]=="true"){t_sync=true;}else if(arguments[i]==false||arguments[i]=="false"){t_sync=false;}else{t_method=arguments[i];}}
var url=this.url+"/"+this.id;if(t_method!=null){url=url+"/"+t_method;}
var data={"params":this.params,"context":L5.Command.context};var json=L5.encode(data);var obj=this;var o={url:url,jsonData:json,callback:this.loadResponse,scope:this};if(t_sync)
o.sync=true;if(this.form){o.form=this.form;o.isUpload=true;};try{L5.Ajax.request(o);}catch(e){this.error=e;}},reset:function(){this.params=new L5.Map("ParameterSet");this.returns=new L5.Map("ParameterSet");this.error=null;}};

L5.RpcDataset=function(c){if(!c.proxy)
c.proxy=new L5.RpcProxy(c.path,c.method,c.paramHandler);if(!c.reader)
c.reader=new L5.model.JsonReader(c.meta,c.fields);L5.RpcDataset.superclass.constructor.call(this,c);};L5.extend(L5.RpcDataset,L5.model.Dataset,{setParamHandler:function(handler){if(!handler instanceof Function)
alert("param of setParamHandler is not a Function!");this.proxy.setParamHandler(handler);}});L5.RpcProxy=function(path,method,handler){L5.RpcProxy.superclass.constructor.call(this);this.method=method;this.paramHandler=handler
this.jsonRpc=new JSONRpcClient();this.jsonRpc.url=this.jsonRpc.url+"/"+path};L5.extend(L5.RpcProxy,L5.model.DataProxy,{setParamHandler:function(handler){this.paramHandler=handler;},defaultParamHandler:function(params){var paramset=new L5.Map("org.loushang.next.data.ParameterSet");if(params){for(name in params){paramset.put(name,params[name]);}}
return paramset;},load:function(params,reader,callback,scope,arg){if(this.fireEvent("beforeload",this,params)!==false){if(this.paramHandler==null)
this.paramHandler=this.defaultParamHandler;var args=this.paramHandler(params);if(!args instanceof Array)
args=[args];var delegate=this.loadResponse.createDelegate(this,[reader,callback,scope,arg],1);this.jsonRpc.invoke(this.method,args,delegate);}else{callback.call(scope||this,null,arg,false);}},loadResponse:function(listRange,reader,callback,scope,arg){var result;try{result=reader.readRecords(listRange);}catch(e){this.fireEvent("loadexception",this,null,null,e);callback.call(scope,null,arg,false);return;}
callback.call(scope,result,arg,true);}});

L5.CommandProxy=function(clazz,method,url){this.clazz=clazz;if(method)
this.method=method;if(url)
this.url=url;else
this.url=L5.webPath+"/command/ajax";L5.model.HttpProxy.superclass.constructor.call(this);};L5.extend(L5.CommandProxy,L5.model.DataProxy,{load:function(params,reader,callback,scope,arg){if(this.fireEvent("beforeload",this,params)!==false){var paramset=new L5.Map("org.loushang.next.data.ParameterSet");if(params){for(name in params){if(name!='sync'){paramset.put(name,params[name]);}}}
var data={"params":paramset,"context":L5.Command.context};var json=L5.encode(data);var url=this.url+"/"+this.clazz;if(this.method){url=url+"/"+this.method;}
var o={url:url,jsonData:json,request:{callback:callback,scope:scope,arg:arg},reader:reader,callback:this.loadResponse,scope:this};if(params.sync){o.sync=true;}
try{L5.Ajax.request(o);}catch(e){this.fireEvent("loadexception",this,o,null);o.request.callback.call(o.request.scope,null,o.request.arg,false);return;}}else{callback.call(scope||this,null,arg,false);}},loadResponse:function(o,success,response){delete this.activeRequest;if(!success){this.fireEvent("loadexception",this,o,response);o.request.callback.call(o.request.scope,null,o.request.arg,false);return;}
var result;try{result=o.reader.read(response);}catch(e){this.fireEvent("loadexception",this,o,response,e);o.request.callback.call(o.request.scope,null,o.request.arg,false);return;}
this.fireEvent("load",this,o,o.request.arg);o.request.callback.call(o.request.scope,result,o.request.arg,true);}});L5.CmdDataset=function(c){if(!c.proxy)
c.proxy=new L5.CommandProxy(c.clazz);if(!c.reader)
c.reader=new L5.model.JsonReader(c,c.fields);L5.CmdDataset.superclass.constructor.call(this,c);};L5.extend(L5.CmdDataset,L5.model.Dataset);L5.EnumProxy=function(enumName){this.enumName=enumName;var clazz="org.loushang.next.commons.nenum.EnumQueryCommand";L5.EnumProxy.superclass.constructor.call(this,clazz);}
L5.extend(L5.EnumProxy,L5.CommandProxy,{load:function(params,reader,callback,scope,arg){params["enumName"]=this.enumName;L5.EnumProxy.superclass.load.call(this,params,reader,callback,scope,arg);}});L5.EnumDataset=function(a1,a2){var c;if(a1.enumName){c=a1;}else{c={};c.enumName=a1;if(a2){c.ds=a2;}else{c.ds=a1;}
c.autoLoad=true;}
c.clazz="org.loushang.next.commons.nenum.EnumQueryCommand";L5.EnumDataset.superclass.constructor.call(this,c);this.baseParams["enumName"]=c.enumName;};L5.extend(L5.EnumDataset,L5.CmdDataset);

L5.HtmlExt={tempErrorTip:{require:"is required field.",date:"is an invalid date format.",equal:"is not euqle.",regex:"is an invalid format.",compare:"cannot meet the validation rules.",length:"is an invalid length.",lengthUTF8:"is an invalid length.",lengthGBK:"is an invalid length.",custom:"is an invalid value.",def:"is an invalid format.",notEqualToValue:"is not equal to {0}.",notEqualToRuleValue:"is not equal to the value of {0}.",mustLess:"must less than {0}.",mustLarger:"must larger than {0}."},errorSwitch:function(rule){if(!L5.HtmlExt.errorTip)L5.HtmlExt.errorTip=L5.HtmlExt.tempErrorTip;var result=new Array();var rules=rule.split("|");for(var j=0;j<rules.length;j++){var rule=rules[j];var ruleName=rule.substring(0,rule.indexOf("{"));switch(ruleName){case"require":result[j]=L5.HtmlExt.errorTip["require"];break;case"date":result[j]=L5.HtmlExt.errorTip["date"];break;case"equal":result[j]=L5.HtmlExt.errorTip["equal"];break;case"regex":result[j]=L5.HtmlExt.errorTip["regex"];break;case"compare":result[j]=L5.HtmlExt.errorTip["compare"];break;case"length":result[j]=L5.HtmlExt.errorTip["length"];break;case"lengthUTF8":result[j]=L5.HtmlExt.errorTip["lengthUTF8"];break;case"lengthGBK":result[j]=L5.HtmlExt.errorTip["lengthGBK"];break;case"custom":result[j]=L5.HtmlExt.errorTip["custom"];break;default:result[j]=L5.HtmlExt.errorTip["def"];break;}}
return result;},isValidateElement:function(ele){var root=document.body;var validators=L5.DomQuery.select("*[@validatorform]",root);for(var p=0;p<validators.length;p++){var validator=validators[p];var validatorform=validator.getAttribute("validatorform");}
if(validatorform=="false"){return true;}else{L5.HtmlExt.validateElement(ele);}},validateElement:function(ele){var root=document.body;var fieldList=L5.DomQuery.select("*[@rule]",root);var fieldname=ele.getAttribute("name")||ele.getAttribute("id")||ele.getAttribute("field");for(var p=0;p<fieldList.length;p++){var field=fieldList[p];var fieldname1=field.getAttribute("name")||field.getAttribute("id")||field.getAttribute("field");var rule=field.getAttribute("rule");var value=field.value;var name=field.getAttribute("label")||field.getAttribute("title")||field.getAttribute("name");if(fieldname1==fieldname){var res=new Array();var resfalse=new Array();var errswitch=new Array();res=L5.HtmlExt.validateForm(field,rule,value);for(i=0;i<res.length;i++){if(res[i]!=true){resfalse=res;}}
var sysmsg=resfalse.join();if(sysmsg==null||sysmsg==""){sysmsg=true;}else{var errswitch=new Array();errswitch=L5.HtmlExt.errorSwitch(rule);sysmsg=errswitch.join();}
L5.HtmlExt.setValidateInfoOnElement(field,sysmsg,name);}}
return sysmsg;},isValidateAll:function(){var root=document.body;var res=new Array();var resfalse=new Array();var fieldList=L5.DomQuery.select("*[@rule]",root);for(var p=0;p<fieldList.length;p++){var field=fieldList[p];res[p]=L5.HtmlExt.validateElement(field);}
for(i=0;i<res.length;i++){if(res[i]!=true){resfalse=res;}}
var sysmsg=resfalse.join();if(sysmsg==null||sysmsg==""){sysmsg=true;}
if(sysmsg==true){return true;}else{return false;}},validateForm:function(field,rule,value){var validates=new Array();var result=new Array();if(rule!=null){var rules=rule.split("|");for(var j=0;j<rules.length;j++){var rule=rules[j];var ruleName=rule.substring(0,rule.indexOf("{"));var ruleParm=rule.substring(rule.indexOf("{")+1,rule.lastIndexOf("}"));if(rule.indexOf("{")<0){ruleName=rule;ruleParm="";}
switch(ruleName){case"compare":isValidate=L5.HtmlExt.compareValidator(value,ruleParm);validates[j]=isValidate;break;case"equal":isValidate=L5.HtmlExt.equalValidator(value,ruleParm);validates[j]=isValidate;break;case"custom":isValidate=L5.HtmlExt.customValidator(value,field,ruleParm);validates[j]=isValidate;break;case"regex":isValidate=L5.HtmlExt.regexValidator(value,ruleParm);validates[j]=isValidate;break;default:isValidate=L5.Validator.ruleValidate(ruleName,value,ruleParm);validates[j]=isValidate;break;}}
return validates;}},regexValidator:function(value,ruleParm){if(value===null||value==="")
return true;var pattern=$regexs[ruleParm]||new RegExp(ruleParm);if(pattern===null)
return true;var isValidate=pattern.test(value);if(isValidate==false){if(!L5.HtmlExt.errorTip)L5.HtmlExt.errorTip=L5.HtmlExt.tempErrorTip;var msg=L5.HtmlExt.errorTip["def"];return msg;}else{return true;}},customValidator:function(value,field,ruleParm){var parms=ruleParm.split(",");var fnName;var args=new Array();args.push(value);args.push(field);if(parms.length>0){fnName=parms[0].substring(parms[0].indexOf(":")+1);for(var i=1;i<parms.length;i++){argname=parms[i].substring(0,parms[i].indexOf(":"));argvalue=parms[i].substring(parms[i].indexOf(":")+1);args.push(argvalue);}
return(new Function("return "+fnName)())(args);}
return true;},equalValidator:function(value,ruleParm){if(value===null||value==="")
return true;var eles=document.getElementsByName(ruleParm);if(eles.length==1){var val=eles[0].value;}
else{throw exception();return false;}
if(value==val){return true;}else{if(!L5.HtmlExt.errorTip)L5.HtmlExt.errorTip=L5.HtmlExt.tempErrorTip;var msg;if(val!==null){msg=String.format(L5.HtmlExt.errorTip["notEqualToRuleValue"],ruleParm);}else{msg=String.format(L5.HtmlExt.errorTip["notEqualToValue"],ruleParm);}
return msg;}},compareValidator:function(value,ruleParm){if(value===null||value==="")
return true;var parms=ruleParm.split(",");var min,max,type;for(var i=0;i<parms.length;i++){if(parms[i].indexOf("min")>=0){min=parms[i].substring(parms[i].indexOf(":")+1);}
if(parms[i].indexOf("max")>=0){max=parms[i].substring(parms[i].indexOf(":")+1);}
if(parms[i].indexOf("type")>=0){type=parms[i].substring(parms[i].indexOf(":")+1);}else{type="string";}}
var minVal=min;var maxVal=max;var result1=true;switch(type){case"number":if(minVal!==null){result1=result1&&(value*1>=minVal*1);}
if(maxVal!==null){result1=result1&&(value*1<=maxVal*1);}
break;case"string":if(minVal!==null){result1=result1&&(value.localeCompare(minVal)>=0);}
if(maxVal!==null){result1=result1&&(value.localeCompare(maxVal)<=0);}
break;default:}
if(result1==false){if(!L5.HtmlExt.errorTip)L5.HtmlExt.errorTip=L5.HtmlExt.tempErrorTip;var msg="";if(minVal!==null){msg=String.format(L5.HtmlExt.errorTip["mustLarger"],minVal);}
if(maxVal!==null){msg=String.format(L5.HtmlExt.errorTip["mustLess"],maxVal);}
return msg;}else{return true;}},setValidateInfoOnElement:function(field,sysmsg,name){var root=document.body;var messagevisibles=L5.DomQuery.select("*[@messagevisible]",root);var myDiv=document.createElement("div")
myDiv.id=field.id+"010A";var id=myDiv.id;var div=document.getElementById(id);var mySpan=document.createElement("span")
mySpan.id=field.id+"010A";var id=mySpan.id;var span=document.getElementById(id);for(var p=0;p<messagevisibles.length;p++){var messagevisible=messagevisibles[p];var messagevisiblevalue=messagevisible.getAttribute("messagevisible");}
var extEle=L5.get(field);var msg=field.getAttribute("CustomValidity");if(msg==null||msg==""){msg=name+sysmsg;}
switch(messagevisiblevalue){case"right":if(sysmsg!=true)
{extEle.setStyle("border-color","#FA8072");if(span!=null){span.parentNode.removeChild(span);}
field.parentNode.appendChild(mySpan);mySpan.style.top=200;mySpan.style.left=200;mySpan.style.color='red';mySpan.style.visibility='visible';mySpan.innerHTML=msg;}else{extEle.setStyle("border-color","");if(span!=null){span.parentNode.removeChild(span);}}
break;case"below":if(sysmsg!=true)
{extEle.setStyle("border-color","#FA8072");if(div!=null){div.parentNode.removeChild(div);}
field.parentNode.appendChild(myDiv);myDiv.style.top=200;myDiv.style.left=200;myDiv.style.color='red';myDiv.style.visibility='visible';myDiv.innerHTML=msg;}else{extEle.setStyle("border-color","");if(div!=null){div.parentNode.removeChild(div);}}
break;default:if(sysmsg!=true)
{extEle.setStyle("border-color","#FA8072");field.setAttribute("L5:qtitle",L5.valError?L5.valError:"Validate error.");field.setAttribute("L5:qtip",msg);}else{extEle.setStyle("border-color","");field.removeAttribute("L5:qtitle");field.removeAttribute("L5:qtip");}}}}
