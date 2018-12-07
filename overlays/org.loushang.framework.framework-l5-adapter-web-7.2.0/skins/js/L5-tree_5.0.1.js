
L5.model.Tree=function(root){this.nodeHash={};this.root=null;if(root){this.setRootNode(root);}
this.addEvents("append","remove","move","insert","beforeappend","beforeremove","beforemove","beforeinsert");L5.model.Tree.superclass.constructor.call(this);};L5.extend(L5.model.Tree,L5.util.Observable,{pathSeparator:"/",proxyNodeEvent:function(){return this.fireEvent.apply(this,arguments);},getRootNode:function(){return this.root;},setRootNode:function(node){this.root=node;node.ownerTree=this;node.isRoot=true;this.registerNode(node);return node;},getNodeById:function(id){return this.nodeHash[id];},registerNode:function(node){this.nodeHash[node.id]=node;},unregisterNode:function(node){delete this.nodeHash[node.id];},toString:function(){return"[Tree"+(this.id?" "+this.id:"")+"]";}});L5.model.Node=function(attributes){this.attributes=attributes||{};this.leaf=this.attributes.leaf;this.id=this.attributes.id;if(!this.id){this.id=L5.id(null,"ynode-");this.attributes.id=this.id;}
this.childNodes=[];if(!this.childNodes.indexOf){this.childNodes.indexOf=function(o){for(var i=0,len=this.length;i<len;i++){if(this[i]==o)
return i;}
return-1;};}
this.parentNode=null;this.firstChild=null;this.lastChild=null;this.previousSibling=null;this.nextSibling=null;this.addEvents({"append":true,"remove":true,"move":true,"insert":true,"beforeappend":true,"beforeremove":true,"beforemove":true,"beforeinsert":true});this.listeners=this.attributes.listeners;L5.model.Node.superclass.constructor.call(this);};L5.extend(L5.model.Node,L5.util.Observable,{fireEvent:function(evtName){if(L5.model.Node.superclass.fireEvent.apply(this,arguments)===false){return false;}
var ot=this.getOwnerTree();if(ot){if(ot.proxyNodeEvent.apply(ot,arguments)===false){return false;}}
return true;},isLeaf:function(){return this.leaf===true;},setFirstChild:function(node){this.firstChild=node;},setLastChild:function(node){this.lastChild=node;},isLast:function(){return(!this.parentNode?true:this.parentNode.lastChild==this);},isFirst:function(){return(!this.parentNode?true:this.parentNode.firstChild==this);},hasChildNodes:function(){return!this.isLeaf()&&this.childNodes.length>0;},isExpandable:function(){return this.attributes.expandable||this.hasChildNodes();},appendChild:function(node){var multi=false;if(L5.isArray(node)){multi=node;}else if(arguments.length>1){multi=arguments;}
if(multi){for(var i=0,len=multi.length;i<len;i++){this.appendChild(multi[i]);}}else{if(this.fireEvent("beforeappend",this.ownerTree,this,node)===false){return false;}
var index=this.childNodes.length;var oldParent=node.parentNode;if(oldParent){if(node.fireEvent("beforemove",node.getOwnerTree(),node,oldParent,this,index)===false){return false;}
oldParent.removeChild(node);}
index=this.childNodes.length;if(index==0){this.setFirstChild(node);}
this.childNodes.push(node);node.parentNode=this;var ps=this.childNodes[index-1];if(ps){node.previousSibling=ps;ps.nextSibling=node;}else{node.previousSibling=null;}
node.nextSibling=null;this.setLastChild(node);node.setOwnerTree(this.getOwnerTree());this.fireEvent("append",this.ownerTree,this,node,index);if(oldParent){node.fireEvent("move",this.ownerTree,node,oldParent,this,index);}
return node;}},removeChild:function(node){var index=this.childNodes.indexOf(node);if(index==-1){return false;}
if(this.fireEvent("beforeremove",this.ownerTree,this,node)===false){return false;}
this.childNodes.splice(index,1);if(node.previousSibling){node.previousSibling.nextSibling=node.nextSibling;}
if(node.nextSibling){node.nextSibling.previousSibling=node.previousSibling;}
if(this.firstChild==node){this.setFirstChild(node.nextSibling);}
if(this.lastChild==node){this.setLastChild(node.previousSibling);}
node.setOwnerTree(null);node.parentNode=null;node.previousSibling=null;node.nextSibling=null;this.fireEvent("remove",this.ownerTree,this,node);return node;},insertBefore:function(node,refNode){if(!refNode){return this.appendChild(node);}
if(node==refNode){return false;}
if(this.fireEvent("beforeinsert",this.ownerTree,this,node,refNode)===false){return false;}
var index=this.childNodes.indexOf(refNode);var oldParent=node.parentNode;var refIndex=index;if(oldParent==this&&this.childNodes.indexOf(node)<index){refIndex--;}
if(oldParent){if(node.fireEvent("beforemove",node.getOwnerTree(),node,oldParent,this,index,refNode)===false){return false;}
oldParent.removeChild(node);}
if(refIndex==0){this.setFirstChild(node);}
this.childNodes.splice(refIndex,0,node);node.parentNode=this;var ps=this.childNodes[refIndex-1];if(ps){node.previousSibling=ps;ps.nextSibling=node;}else{node.previousSibling=null;}
node.nextSibling=refNode;refNode.previousSibling=node;node.setOwnerTree(this.getOwnerTree());this.fireEvent("insert",this.ownerTree,this,node,refNode);if(oldParent){node.fireEvent("move",this.ownerTree,node,oldParent,this,refIndex,refNode);}
return node;},remove:function(){this.parentNode.removeChild(this);return this;},item:function(index){return this.childNodes[index];},replaceChild:function(newChild,oldChild){var s=oldChild?oldChild.nextSibling:null;this.removeChild(oldChild);this.insertBefore(newChild,s);return oldChild;},indexOf:function(child){return this.childNodes.indexOf(child);},getOwnerTree:function(){if(!this.ownerTree){var p=this;while(p){if(p.ownerTree){this.ownerTree=p.ownerTree;break;}
p=p.parentNode;}}
return this.ownerTree;},getDepth:function(){var depth=0;var p=this;while(p.parentNode){++depth;p=p.parentNode;}
return depth;},setOwnerTree:function(tree){if(tree!=this.ownerTree){if(this.ownerTree){this.ownerTree.unregisterNode(this);}
this.ownerTree=tree;var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){cs[i].setOwnerTree(tree);}
if(tree){tree.registerNode(this);}}},getPath:function(attr){attr=attr||"id";var p=this.parentNode;var b=[this.attributes[attr]];while(p){b.unshift(p.attributes[attr]);p=p.parentNode;}
var sep=this.getOwnerTree().pathSeparator;return sep+b.join(sep);},bubble:function(fn,scope,args){var p=this;while(p){if(fn.apply(scope||p,args||[p])===false){break;}
p=p.parentNode;}},cascade:function(fn,scope,args){if(fn.apply(scope||this,args||[this])!==false){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){cs[i].cascade(fn,scope,args);}}},eachChild:function(fn,scope,args){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){if(fn.apply(scope||this,args||[cs[i]])===false){break;}}},findChild:function(attribute,value){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){if(cs[i].attributes[attribute]==value){return cs[i];}}
return null;},findChildBy:function(fn,scope){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){if(fn.call(scope||cs[i],cs[i])===true){return cs[i];}}
return null;},sort:function(fn,scope){var cs=this.childNodes;var len=cs.length;if(len>0){var sortFn=scope?function(){fn.apply(scope,arguments);}:fn;cs.sort(sortFn);for(var i=0;i<len;i++){var n=cs[i];n.previousSibling=cs[i-1];n.nextSibling=cs[i+1];if(i==0){this.setFirstChild(n);}
if(i==len-1){this.setLastChild(n);}}}},contains:function(node){return node.isAncestor(this);},isAncestor:function(node){var p=this.parentNode;while(p){if(p==node){return true;}
p=p.parentNode;}
return false;},toString:function(){return"[Node"+(this.id?" "+this.id:"")+"]";}});

L5.tree.IntervalCollection=function(){this.intervals=new L5.util.MixedCollection(false,function(o){return o["id"];});};L5.tree.IntervalCollection.prototype={create:function(index,key){if(arguments.length==1){key=index;index=this.getCount();}
if(this.intervals.containsKey(key)){return-1;}
var obj={id:key,interval:[0,-1]};this.intervals.insert(index,obj);return index;},remove:function(key){var index=this.indexOf(key);this.removeAt(index);},removeAt:function(index){var interval=this.intervals.removeAt(index);if(!interval){return;}
var start=interval.interval[0];var end=interval.interval[1];if(start>end){return;}
var size=end-start+1;this.forwardChild(index,size);},get:function(key){return this.intervals.key(key);},contains:function(key){return this.intervals.containsKey(key);},getCount:function(){return this.intervals.getCount();},indexOf:function(key){return this.intervals.indexOfKey(key);},getKeys:function(){return this.intervals.keys;},getAt:function(index){return this.intervals.itemAt(index);},createByPostion:function(postion,key){if(this.intervals.containsKey(key)){return;}
var preinter=this.indexOfByPostion(postion);if(preinter==-1){preinter=this.getCount();}
var obj={id:key,interval:[0,-1]};this.intervals.insert(preinter,obj);return preinter;},getByPostion:function(postion){var index=this.indexOfByPostion(postion);if(index==-1){return false;}
return this.getAt(index);},indexOfByPostion:function(postion){var len=this.getCount();if(len==0){return-1;}
if(postion<0){return-1;}
var start=0;for(var i=0;i<len;i++){var curin=this.getAt(i);var start=curin.interval[0];var end=curin.interval[1];if(start>end){continue;}
if(postion>=start&&postion<=end){return i;}}
return-1;},refresh:function(key,start,end){var index=this.indexOf(key);if(index==-1){return;}
this.refreshByIndex(index,start,end);},refreshByIndex:function(index,start,end){var cur=this.getAt(index);var oldstart=cur.interval[0];var oldend=cur.interval[1];cur.interval[0]=start;cur.interval[1]=end;if(oldstart>oldend){if(start>end){return;}else{var len=end-start+1;this.backChild(index+1,len);}}else{if(start>end){var len=oldend-oldstart+1;this.forwardChild(index+1,len);}else{if(oldend>end){var len=oldend-end;this.forwardChild(index+1,len);}else{var len=end-oldend;this.backChild(index+1,len);}}}},forwardChild:function(index,size){if(size==0){return;}
var len=this.getCount();for(var i=index;i<len;i++){var cur=this.getAt(i);var curstart=cur.interval[0];var curend=cur.interval[1];if(curstart>curend){continue;}
cur.interval[0]-=size;cur.interval[1]-=size;}},backChild:function(index,size){if(size==0){return;}
var len=this.getCount();for(var i=index;i<len;i++){var cur=this.getAt(i);var curstart=cur.interval[0];var curend=cur.interval[1];if(curstart>curend){continue;}
cur.interval[0]+=size;cur.interval[1]+=size;}},validBefore:function(index){for(var i=index-1;i>=0;i--){var interval=this.getAt(i);var curstart=interval.interval[0];var curend=interval.interval[1];if(curstart<=curend){return i;}}
return-1;},clear:function(){this.intervals.clear();}}

L5.tree.BaseRecord=function(data,id){this.srcid=(id||id===0)?id:++L5.model.Record.AUTO_ID;this.id=this.wrapId(this.srcid,this.recordType);this.data=data;this.state=L5.model.Record.NONE;if(this.data==null)
this.data={};for(var i=0;i<this.fields.items.length;i++){var item=this.fields.items[i];if(this.data[item.name]!=undefined)
continue;var dv=item.defaultValue;if(dv!=undefined){var val=item.convert(dv);this.data[item.name]=val;}}
this.validate={};this.msg={};this.msgIndex={};this.msgLable={};this.msgTitle={};this.dirty=false;this.editing=false;this.error=null;this.parentRecord=false;this.dataset=false;this.children=new L5.util.MixedCollection(false,function(o){return o["id"];});this.interval=new L5.tree.IntervalCollection();};L5.tree.BaseRecord.prototype={set:function(name,value){var result=true;value=this.fields.get(name).convert(value);if(!this.getDataSet()){this.data[name]=value;return result;}
this.dirty=true;if(!this.modified){this.modified={};}
if(typeof this.modified[name]=='undefined'){this.modified[name]=this.data[name];}
this.data[name]=value;if(!this.editing){this.getDataSet().afterEdit(this);}
var modf={};modf[name]=value;this.fireEvent('update',this,modf,L5.model.Record.EDIT);for(var i=0;i<this.fields.items.length;i++){if(this.fields.items[i].rule!=null){result=L5.Validator.validate(this,name,value);break;}}
return result;},get:function(name){return this.data[name];},getAt:function(index){return this.children.itemAt(index);},getById:function(id,recordType){var curid=this.wrapId(id,recordType);return this.children.item(curid);},getRange:function(start,end){return this.children.getRange(start,end);},indexOf:function(record){return this.children.indexOf(record);},containsById:function(id,recordType){var curid=this.wrapId(id,recordType);return this.children.containsKey(curid);},indexOfId:function(id,recordType){var rec=this.getById(id,recordType);return this.indexOf(rec);},wrapId:function(id,recordType){return recordType?(recordType+"_"+id):id;},getParent:function(){return this['parentRecord'];},getDepth:function(parent){if(!parent){var ds=this.getDataSet();if(ds){parent=ds.getRoot();}
if(!parent){return-1;}}
var i=0;var cur=this;while(cur){if(cur==parent){return i;}
i++;cur=cur.parentRecord;}
return-1;},each:function(func,cascade,scope){cascade=cascade||false;if(cascade){return this.eachInner(func,scope);}else{var count=this.getCount();for(var i=0;i<count;i++){var chrec=this.getAt(i);if(func.call(scope||chrec,chrec)===true){return true;}}}
return false;},eachInner:function(func,scope){var count=this.getCount();for(var i=0;i<count;i++){var chrec=this.getAt(i);if(func.call(scope||chrec,chrec)===true||chrec.eachInner(func,scope)===true){return true;}}
return false;},query:function(property,value,cascade,anyMatch,caseSensitive){var fn=this.createChooseFn(property,value,anyMatch,caseSensitive);if(!fn){fn=function(rec){return true;}}
return this.queryBy(fn,cascade);},queryBy:function(func,cascade,scope){var result=[];var queryfunc=function(rec){if(func.call(scope||rec,rec)===true){result.push(rec);}
return false;}
this.each(queryfunc,cascade,scope);return result;},find:function(property,value,cascade,anyMatch,caseSensitive){var fn=this.createChooseFn(property,value,anyMatch,caseSensitive);return fn?this.findBy(fn,cascade):null;},findBy:function(func,cascade,scope){var result=[];var queryfunc=function(record){if(func.call(scope||record,record)===true){result.push(record);return true;}
return false;};if(this.each(queryfunc,cascade,scope)){return result[0];}
return null;},sort:function(sortinfo,cascade,intervalkey){var fdname=sortinfo["field"];var direc=sortinfo["direction"]||'ASC';cascade=cascade||false;var dsc=String(direc).toUpperCase()=="DESC"?-1:1;if(this.children.getCount()==0){return;}
var start;if(intervalkey){var interval=this.interval.get(intervalkey);if(!interval){return;}
start=interval.interval[0];}else{start=0;}
var chrec=this.getAt(start);var field=chrec.fields.get(fdname);if(!field){return false;}
var st=field.sortType;var wrapfn=function(r1,r2){var v1=st(r1.data[fdname]),v2=st(r2.data[fdname]);var v=(v1>v2?1:(v1<v2?-1:0))*dsc;if(v==0){v=-1;}
return v;};intervalkey=intervalkey||chrec.recordType;this.sortInfo={base:sortinfo,valueConvert:st,direct:dsc};if(intervalkey){this.sortInfo.intervalkey=intervalkey;}
return this.sortBy(wrapfn,cascade,intervalkey);},sortBy:function(func,cascade,intervalkey){var start;var end;var interval=this.interval.get(intervalkey);if(!interval){start=0;end=this.children.getCount()-1;}else{start=interval.interval[0];end=interval.interval[1];}
if(start>end){return;}
var startrec=this.getAt(start);intervalkey=intervalkey||startrec.recordType;if(start==end){if(cascade){startrec.sortBy(func,cascade,intervalkey);}
return false;}
var recarr=this.getRange(start,end);this.fireEvent('beforeSort',this,recarr,start);recarr.sort(func);for(var i=start,j=0;i<=end;i++){var rec=recarr[j];this.children.items[i]=rec;j++;}
this.fireEvent('sort',this,recarr,start);if(cascade){for(var i=start;i<=end;i++){var rec=this.getAt(i);rec.sortBy(func,cascade,intervalkey);}}
return true;},getSortState:function(){return this.sortInfo?this.sortInfo.base:null;},getIndexBySortInfo:function(rec,interindex){var sortinfo=this.sortInfo;var base=sortinfo.base;var fdname=base.field;var direct=sortinfo.direct;var st=sortinfo.valueConvert;var interval=this.interval.getAt(interindex);var start=interval.interval[0];var end=interval.interval[1];if(start>end){var preindex=this.interval.validBefore(interindex);if(preindex==-1){return 0;}
return preindex.interval[1]+1;}
var v1=st(rec.data[fdname]);var mid;while(start<=end){mid=parseInt((start+end)/2);var midrec=this.getAt(mid);var v2=st(midrec.data[fdname]);var v=(v1>v2?1:(v1<v2?-1:0))*direct;if(v==1){start=mid+1;}else if(v==0){return mid+1;}else{end=mid-1;}}
if(start>mid){return start;}else{return mid;}},getChildren:function(interkey){if(interkey){var iter=this.interval.get(interkey);if(iter){var start=iter.interval[0];var end=iter.interval[1];if(start<=end){return this.getRange(start,end);}else{return[];}}}
return this.children.items;},getCount:function(interkey){if(interkey){var iter=this.interval.get(interkey);if(iter){var start=iter.interval[0];var end=iter.interval[1];if(start<=end){return end-start+1;}else{return 0;}}}
return this.children.getCount();},wrapRecs:function(recs){if(!recs){return false;}
if(!L5.isArray(recs)){recs=[recs];}else if(recs.length==0){return false;}
return recs;},insert:function(recs,interkey){recs=this.wrapRecs(recs);if(!recs){return;}
interkey=interkey||recs[0].recordType;var index=this.interval.indexOf(interkey);var addpos=this.children.getCount();if(index==-1){index=this.interval.create(interkey);}
this.insertToInterval(index,this.getAddIndex(index,addpos),recs);},insertAt:function(index,recs,interkey){recs=this.wrapRecs(recs);if(!recs){return;}
interkey=interkey||recs[0].recordType;var interindex;if(!this.interval.contains(interkey)){interindex=this.interval.createByPostion(index,interkey);}else{interindex=this.interval.indexOf(interkey);}
this.insertToInterval(interindex,this.getAddIndex(interindex,index),recs);},getAddIndex:function(interindex,recindex){var curinter=this.interval.getAt(interindex);var curstart=curinter.interval[0];var curend=curinter.interval[1];var curindex=recindex;if(curstart>curend){var validbeforeindex=this.interval.validBefore(interindex);if(validbeforeindex==-1){curindex=0;}else{var beforeinte=this.interval.getAt(validbeforeindex);curindex=beforeinte.interval[1]+1;}}else{if(curindex>curend){curindex=curend+1;}else if(curindex<curstart){curindex=curstart;}}
return curindex;},insertSort:function(recs,interkey){if(!this.sortInfo){this.insert(recs,interkey);return;}
recs=this.wrapRecs(recs);if(!recs){return;}
interkey=interkey||recs[0].recordType;var oldkey=this.sortInfo.intervalkey;if(interkey!=oldkey){this.insert(recs,interkey);return;}
var interindex;if(!this.interval.contains(interkey)){interindex=this.interval.getCount();this.interval.create(interkey);}else{interindex=this.interval.indexOf(interkey);}
for(var i=0,len=recs.length;i<len;i++){var index=this.getIndexBySortInfo(recs[i],interindex);this.insertToInterval(interindex,index,[recs[i]]);}},insertToInterval:function(interindex,recindex,recs){var inter=this.interval.getAt(interindex);var start=inter.interval[0];var end=inter.interval[1];if(start>end){start=recindex;end=recindex-1;}else if(recindex==-1){recindex=end+1;}
var len=recs.length;var add=[];for(var i=0;i<len;i++){var rec=recs[i];if(rec&&!this.children.containsKey(rec.id)){var oldparent=rec.parentRecord;if(oldparent){oldparent.remove(rec);}
this.children.insert(recindex+i,rec);add.push(rec);rec.parentRecord=this;rec.state=L5.model.Record.STATE_DELETED;var ds=this.getDataSet();rec.setDataSet(ds);}}
var addlen=add.length;if(addlen==0){return;}
this.interval.refreshByIndex(interindex,start,end+addlen);this.fireEvent('add',this,add,recindex,addlen);},remove:function(recs,interkey){recs=this.wrapRecs(recs);if(!recs){return;}
var len=recs.length;var removes=[];for(var i=0;i<len;i++){if(this.children.remove(recs[i])!=false){recs[i].parentRecord=false;recs[i].setDataSet(false);recs[i].state=L5.model.Record.STATE_DELETED;removes.push(recs[i]);}}
var removelen=removes.length;if(removelen==0){return;}
interkey=interkey||removes[0].recordType;var interval=this.interval.get(interkey);var start=interval.interval[0];var end=interval.interval[1];if(start<=end){end-=removelen;this.interval.refresh(interkey,start,end);}
this.fireEvent('remove',this,removes,removelen);},removeAt:function(index,interkey){var rec=this.getAt(index);if(this.children.removeAt(index)!=false){rec.parentRecord=false;rec.setDataSet(false);rec.state=L5.model.Record.STATE_DELETED;interkey=interkey||rec.recordType;var interval=this.interval.get(interkey);var start=interval.interval[0];var end=interval.interval[1];if(start<=end){end-=1;this.interval.refresh(interkey,start,end);}
this.fireEvent('remove',this,[rec],1);}},removeAll:function(interkey){if(interkey){var start=0;var end=-1;var iter=this.interval.get(interkey);if(iter){start=iter.interval[0];end=iter.interval[1];this.interval.refresh(interkey,0,-1);var removes=[];for(var i=end;i>=start;i--){var rec=this.children.removeAt(i);rec.parentRecord=false;rec.setDataSet(false);rec.state=L5.model.Record.STATE_DELETED;removes.push(rec);}
var removelen=removes.length;if(removelen==0){return;}
this.fireEvent('remove',this,removes,removelen);}}else{var removes=this.children.items;var removelen=removes.length;if(removelen==0){return;}
this.interval.clear();this.children.clear();for(var i=0;i<removelen;i++){var rec=removes[i];rec.parentRecord=false;rec.setDataSet(false);rec.state=L5.model.Record.STATE_DELETED;}
this.fireEvent('remove',this,removes,removelen);}},beginEdit:function(){if(this.editing){return;}
this.editing=true;this.dirty=false;this.modified={};},cancelEdit:function(){if(this.editing){this.editing=false;this.dirty=false;delete this.modified;}},endEdit:function(){if(this.editing){this.editing=false;if(this.dirty){if(this.getDataSet())
this.getDataSet().afterEdit(this);var modf={};L5.apply(modf,this.modified);this.fireEvent('update',this,modf,L5.model.Record.EDIT);}}},reject:function(silent){if(!this.dirty){return;}
var m=this.modified;for(var n in m){if(typeof m[n]!="function"){this.data[n]=m[n];}}
this.dirty=false;delete this.modified;this.editing=false;if(this.getDataSet()){if(silent!==true){this.getDataSet().afterReject(this);}}
this.fireEvent('update',this,m,L5.model.Record.REJECT);},commit:function(silent){if(!this.dirty){return;}
this.dirty=false;var m=this.modified;delete this.modified;this.editing=false;if(this.getDataSet()){if(silent!==true){this.getDataSet().afterCommit(this);}}
this.fireEvent('update',this,m,L5.model.Record.COMMIT);},getChanges:function(){var m=this.modified,cs={};for(var n in m){if(m.hasOwnProperty(n)){cs[n]=this.data[n];}}
return cs;},hasError:function(){return this.error!=null;},clearError:function(){this.error=null;},copy:function(newId){return new this.constructor(L5.apply({},this.data),newId||this.srcid);},isModified:function(fieldName){return!!(this.modified&&this.modified.hasOwnProperty(fieldName));},join:function(dataset){},validateRecord:function(){var hasRule=false;for(var i=0;i<this.fields.items.length;i++){if(this.fields.items[i].rule!=null){hasRule=true;break;}}
if(hasRule===true){for(var i=0;i<this.fields.items.length;i++){var name=this.fields.items[i].name;var value=this.get(name);L5.Validator.validate(this,name,value);}}},getErrMsg:function(){for(var v in this.validate){if(this.validate[v]===false){for(var i=0;i<this.fields.items.length;i++){if(this.fields.items[i].name==v){if(this.msgTitle[v]==null){this.msgTitle[v]=v;}
return this.msgTitle[v]+this.msg[v];}}}}
return null;},fireEvent:function(evtName){var ds=this.getDataSet();if(ds){if(ds.fireEvent.apply(ds,arguments)===false){return false;}}
return true;},getDataSet:function(){if(!this.dataset){var p=this.parentRecord;while(p){if(p.dataset){this.dataset=p.dataset;break;}
p=p.parentRecord;}}
return this.dataset;},setDataSet:function(ds){if(ds==this.dataset){return;}
if(this.dataset){this.dataset.unregisterRecord(this);}
this.dataset=ds;if(ds){ds.registRecord(this);}
var cs=this.children;for(var i=0,len=cs.getCount();i<len;i++){cs.itemAt(i).setDataSet(ds);}},equals:function(rec){if(!rec){return false;}
if(rec===this){return true;}
if(this.constructor!==rec.constructor){return false;}
if(this.id!=rec.id){return false;}
var fields=this.fields;var items=fields.items;for(var i=0,len=items.length;i<len;i++){var item=items[i];var name=item.name;if(this.data[name]!=rec.data[name]){return false;}}
return true;},createChooseFn:function(property,value,anyMatch,caseSensitive){if(L5.isEmpty(value,false)){return false;}
if(!value.exec){value=String(value);value=new RegExp((anyMatch===true?'':'^')+L5.escapeRe(value),caseSensitive?'':'i');}
return function(r){var vl=r.data[property];return value.test(r.data[property]);};},toBean:function(clazz){var bean=new L5.DataBean(clazz);var data=this.data;for(name in data){if(data[name]=="")
bean[name]=undefined;else
bean[name]=data[name];}
bean.state=this.state;return bean;},toJsonString:function(){var obj=new Object();obj.javaClass="org.loushang.next.data.Record";obj.id=this.id;obj.state=this.state;obj.data=this.data;return L5.encode(obj);}};

L5.tree.TreeRecord=function(data,id){this.initRecord();L5.tree.TreeRecord.superclass.constructor.apply(this,arguments);}
L5.extend(L5.tree.TreeRecord,L5.tree.BaseRecord,{initRecord:function(){this.loading=false;this.loader=false;this.childLoadInfo={loaders:false};this.loaderMaps={};this.lastParam={};},doPreload:function(){var chdata=this.data.children;delete this.data.children;if(!chdata){return false;}
if(chdata.rows){chdata=chdata.rows;}
var len=chdata.length;if(len==0){return true;}
var ch=[];for(var i=0;i<len;i++){ch.push(L5.tree.TreeRecord.createRecord(this.recordType,chdata[i]));}
this.insert(ch,ch[0].recordType);return true;},load:function(options){if(this.loading){var timer;var f=function(){if(!this.loading){clearInterval(timer);this.load(options);}}.createDelegate(this);timer=setInterval(f,200);return;}
this.loading=true;options=options||{};var loadComplete=this.loadComplete.createDelegate(this,[options]);if(this.doPreload()){loadComplete();return;}
var dataset=this.getDataSet();dataset.proxyLoader.load(this,options,loadComplete);},loadComplete:function(o){this.loading=false;this.lastParam=o.params||{};var callback=o.callback;if(callback){callback();}},loadCascaded:function(options){options=options||{};var loadstack=[];loadstack.push(this);var loadChildren=function(){var rec=loadstack.pop();var count=rec.getCount();for(var i=count-1;i>=0;i--){loadstack.push(rec.getAt(i));}
brotherload();}
var oldcallback=options.callback;options.callback=loadChildren;var loadComplete=this.loadComplete.createDelegate(this,[options]);var brotherload=function(){var len=loadstack.length;if(len>0){var rec=loadstack[len-1];rec.load(options);}else{options.callback=oldcallback;loadComplete();}}
brotherload();},reload:function(options,cascaded){options=options||{};this.lastParam=options.params||{};this.removeAll();this.clearLoaderMap();if(!cascaded){this.load(options);}else{this.loadCascaded(options);}},getChildLoaders:function(){return this.childLoadInfo.loaders;},setChildLoaders:function(loaders){if(loaders){this.childLoadInfo={};this.childLoadInfo.loaders=loaders;var len=loaders.length;for(var i=0;i<len;i++){var curid=loaders[i];this.childLoadInfo[curid]={index:i};this.createLoaderMap(curid);}}},getChildLoaderOrder:function(loaderid){if(this.childLoadInfo[loaderid]){return this.childLoadInfo[loaderid].index;}
return-1;},clearChildLoaders:function(){delete this.isNeedSyn;var loaders=this.getChildLoaders();if(!loaders){return;}
this.childLoadInfo={loaders:false};this.clearLoaderMap();},createLoaderMap:function(loaderid){if(!this.loaderMaps[loaderid]){this.loaderMaps[loaderid]={};}
return this.loaderMaps[loaderid];},getLoaderMap:function(loaderid){return this.loaderMaps[loaderid];},removeLoaderMap:function(loaderid){var old=this.loaderMaps[loaderid];delete this.loaderMaps[loaderid];return old;},clearLoaderMap:function(){this.loaderMaps={};},setLoaderProperty:function(loaderid,key,value){var ladermap=this.loaderMaps[loaderid];if(!ladermap){ladermap=this.loaderMaps[loaderid]={};}
var old=ladermap[key];ladermap[key]=value;return old;},getLoaderProperty:function(loaderid,key){var ladermap=this.loaderMaps[loaderid];if(!ladermap){return false;}
var val=ladermap[key];if(typeof(val)=="undefined"){return false;}
return val;},removeLoaderProperty:function(loaderid,key){var ladermap=this.loaderMaps[loaderid];if(!ladermap){return false;}
var val=ladermap[key];delete ladermap[key];return val;},hasSynData:function(){if(typeof this.isNeedSyn!="undefined"){return this.isNeedSyn;}
if(this.data.children){return true;}
var ds=this.getDataSet();if(ds){var loaders=this.getChildLoaders();var loaderlength=ds.loaderMgr.getLoaderCount();if(!loaders&&loaderlength!=0){return true;}else{var mgr=ds.loaderMgr;for(var i=0,len=loaders.length;i<len;i++){var loadid=loaders[i];var load=mgr.getLoaderById(loadid);if(load.isNeedSyn(this)){return true;}}}}
this.isNeedSyn=false;return false;},isLeaf:function(){var hasdata=this.hasSynData();if(hasdata){return false;}
if(this.getCount()==0){return true;}
return false;}});L5.tree.TreeRecord.recordTypes={};L5.tree.TreeRecord.create=function(meta){var recordtype=meta.name;var id=meta.idField;var o=meta.fields||[];var f=L5.extend(L5.tree.TreeRecord,{});var p=f.prototype;p.fields=new L5.util.MixedCollection(false,function(field){return field.name;});for(var i=0,len=o.length;i<len;i++){p.fields.add(new L5.model.Field(o[i]));}
f.getField=function(name){return p.fields.get(name);};f.prototype.recordType=recordtype||"";f.recordType=f.prototype.recordType;f.getType=f.prototype.getType=function(){return f.recordType;};f.idField=f.prototype.idField=id;f.getIdField=f.prototype.getIdField=function(){return id;}
L5.tree.TreeRecord.recordTypes[recordtype]=f;return f;};L5.tree.TreeRecord.createRecord=function(recordType,o){if(o.recordType){recordType=o.recordType;delete o.recordType;}
recordType=recordType||L5.tree.SimpleTreeRecord;if(typeof recordType=='string'){recordType=L5.tree.TreeRecord.recordTypes[recordType];}
var primarykey=recordType.idField;var record=new recordType(o,o[primarykey]);return record;};L5.tree.SimpleTreeRecord=L5.tree.TreeRecord.create({idField:'id',name:'L5_tree_SimpleTreeRecord',fields:[{name:'id'},{name:'text'},{name:'leaf',type:'boolean'},{name:'expanded',type:'boolean'},{name:'allowDrag',type:'boolean'},{name:'allowDrop',type:'boolean'},{name:'disabled',type:'boolean'},{name:'icon'},{name:'cls'},{name:'iconCls'},{name:'href'},{name:'hrefTarget'},{name:'qtip'},{name:'expandable',type:'boolean'},{name:'qtipCfg'},{name:'singleClickExpand',type:'boolean',defaultValue:true},{name:'uiProvider'},{name:'checked',defaultValue:undefined},{name:'draggable',type:'boolean'},{name:'isTarget',type:'boolean'},{name:'allowChildren',type:'boolean'},{name:'showType',defaultValue:'text'},{name:'cascadeChecked',defaultValue:true}]});

L5.tree.JsonReader=function(meta,recordType,filt,responseKey){meta=meta||{root:'rows',totalProperty:'total',successProperty:'success',id:'id'};recordType=recordType||meta.recordType;if(typeof recordType=='string'){recordType=L5.tree.TreeRecord.recordTypes[recordType];}
recordType=recordType.getField?recordType:L5.tree.TreeRecord.create(recordType);this.idKey=recordType.idField;this.filter=this.getFilterFun(filt||L5.emptyFn);this.responseKey=false;if(responseKey){this.responseKey=responseKey;}
L5.tree.JsonReader.superclass.constructor.call(this,meta,recordType);};L5.extend(L5.tree.JsonReader,L5.model.DataReader,{read:function(response,recordcallback,scope,opt){var json=response.responseText;var o=eval("("+json+")");if(!o){throw{message:"JsonReader.read: Json object not found"};}
if(o.error){var e=new L5.Exception(o.error.code,o.error.msg,o.error.trace);if(o.error.title){e.title=o.error.title;}
throw e;}
if(this.responseKey){o=o.map[this.responseKey];}
return this.readRecords(o,recordcallback,scope,opt);},onMetaChange:function(meta,recordType,o){},getFilterFun:function(filt){filt=filt||L5.emptyFn;if(typeof filt=='string'){var filtKey=filt.split(':');filt=function(record){var key=this.filtKey[0];var vls=this.filtKey[1];if(vls){if(record.get(key)==vls){return true;}}else{if(record.get(key)){return true;}}
return false;}}
return filt;},simpleAccess:function(obj,subsc){return obj[subsc];},getJsonAccessor:function(){var re=/[\[\.]/;return function(expr){try{return(re.test(expr))?new Function("obj","return obj."+expr):function(obj){return obj[expr];};}catch(e){}
return L5.emptyFn;};}(),readRecords:function(o,recordcallback,scope,opt){this.jsonData=o;if(o.metaData){delete this.ef;this.meta=o.metaData;if(this.recordType==null&&o.metaData.fields){this.recordType=L5.tree.TreeRecord.create(o.metaData.name,o.metaData.fields);this.onMetaChange(this.meta,this.recordType,o);}}
var s=this.meta,Record=this.recordType,f=Record.prototype.fields,fi=f.items,fl=f.length;if(!this.ef){if(s.totalProperty){this.getTotal=this.getJsonAccessor(s.totalProperty);}
if(s.successProperty){this.getSuccess=this.getJsonAccessor(s.successProperty);}
this.getRoot=s.root?this.getJsonAccessor(s.root):function(p){return p;};if(s.id){var g=this.getJsonAccessor(s.id);this.getId=function(rec){if(this.idKey){return rec[this.idKey];}
var r=g(rec);return(r===undefined||r==="")?null:r;};}else{this.getId=function(rec){if(this.idKey){return rec[this.idKey];}
return null;};}
this.ef=[];for(var i=0;i<fl;i++){f=fi[i];var map=(f.mapping!==undefined&&f.mapping!==null)?f.mapping:f.name;this.ef[i]=this.getJsonAccessor(map);}}
var root=this.getRoot(o),c=root.length,totalRecords=c,success=true;if(s.totalProperty){var v=parseInt(this.getTotal(o),10);if(!isNaN(v)){totalRecords=v;}}
if(s.successProperty){var v=this.getSuccess(o);if(v===false||v==='false'){success=false;}}
var ignore=0;var records=[];for(var i=0;i<c;i++){var n=root[i];var values={};var id=this.getId(n);for(var j=0;j<fl;j++){f=fi[j];var v=this.ef[j](n);values[f.name]=f.convert((v!==undefined)?v:f.defaultValue,n);}
var record=new Record(values,id);if(this.filter(record)===true){ignore++;continue;}
records[i]=record;if(recordcallback){if(scope){recordcallback.call(scope,record,n,s,opt);}else{recordcallback(record,n,s,opt);}}}
return{success:success,records:records,totalRecords:totalRecords,filterNum:ignore};},parseRecords:function(collection,recordcallback,scope,opt){var Record=this.recordType,f=Record.prototype.fields,fi=f.items,fl=f.length;var root=collection,c=root.getCount(),totalRecords=c,success=true;var records=[];for(var i=0;i<c;i++){var n=root.get(i);var values={};var id=this.idKey?n.get(this.idKey):undefinded;for(var j=0;j<fl;j++){f=fi[j];var map=(f.mapping!==undefined&&f.mapping!==null)?f.mapping:f.name;var v=n.get(map);values[f.name]=f.convert((v!==undefined)?v:f.defaultValue,n);}
var record=new Record(values,id);records[i]=record;if(recordcallback){if(scope){recordcallback.call(scope,record,n,this.meta,opt);}else{recordcallback(record,n,this.meta,opt);}}}
return{success:success,records:records,totalRecords:totalRecords,filterNum:0};}});

L5.tree.TreeLoaderMgr=function(config){this.loaderIdSort=[];this.loaderMap={};var loaders;if(L5.isArray(config)){loaders=config;}else{loaders=config.loaders||[];}
for(var i=0,len=loaders.length;i<len;i++){var cfg=loaders[i];if(!cfg.loadRecords){var loader=this.createLoader(cfg);this.regist(loader);}else{this.regist(cfg);}}};(function(){var mgr=L5.tree.TreeLoaderMgr.prototype;mgr.getLoaderById=function(id){return this.loaderMap[id];};mgr.createLoader=function(config,id){var type=config.type||'loader';id=id||config.id;var lder=L5.tree.TreeLoaderMgr.loaderType[type];return new lder(config,id);};mgr.regist=function(loader){var id=loader.id;this.loaderIdSort.push(id);this.loaderMap[id]=loader;};mgr.getRecordLoaders=function(record){var cacheinfo=this.getCacheLoader(record);if(cacheinfo){return cacheinfo;}
var fdloader=[];var idfdloader=[];var idsorts=this.loaderIdSort;for(var i=0,len=idsorts.length;i<len;i++){var cuId=idsorts[i];var curLoad=this.getLoaderById(cuId);if(curLoad.trigger(record)){fdloader.push(curLoad);idfdloader.push(cuId);}}
record.setChildLoaders(idfdloader);return fdloader;};mgr.getCacheLoader=function(record){var ldindexs=record.getChildLoaders();if(ldindexs){var indlen=ldindexs.length;var fdloader=[];for(var i=0;i<indlen;i++){fdloader.push(this.getLoaderById(ldindexs[i]));}
return fdloader;}
return false;};mgr.getLoaderCount=function(){return this.loaderIdSort.length;}
mgr.getLoadersMap=function(){return this.loaderMap;};})();L5.tree.TreeLoaderMgr.loaderType={};

L5.tree.LsTreeLoader=function(config,id){this.id=(id||id===0)?id:++L5.tree.LsTreeLoader.AUTO_ID;this.jsonModel=false;this.init(config);this.addEvents('beforeload','load','loadexception');L5.tree.LsTreeLoader.superclass.constructor.call(this);};L5.tree.LsTreeLoader.AUTO_ID=1000;(function(){L5.extend(L5.tree.LsTreeLoader,L5.util.Observable,{init:function(config){this.initReader(config);if(config.cmd){this.cmd=config.cmd;this.url=L5.webPath+"/command/ajax";if(!this.jsonModel){this.url+="/"+this.cmd;}}else{this.url=config.url;}
if(config.data){this.data=config.data;}
this.baseParams=config.baseParams||{};if(this.cmd&&config.method){this.url+="/"+config.method;}
if(config.pageSize){this.pageSize=config.pageSize;var scope=this;this.baseParams["start"]=this.baseParams["start"]||function(rec){return scope.getPageStart(rec);};this.baseParams["limit"]=this.baseParams["limit"]||function(rec){return scope.getPageSize(rec);};}
this.requestMethod=config.requestMethod||'POST';var trigger=config.trigger;if(typeof trigger=='string'){this.triggerCheckKey=trigger.split("#");this.trigger=this.triggerCheckWithString;}else if(typeof trigger=='function'){this.trigger=trigger;}
if(config.isNeedSyn){this.isNeedSyn=config.isNeedSyn;}
this.pageRemain=config.pageRemain||10;this.intervalKey=config.intervalKey||this.reader.recordType.recordType;},initReader:function(config){if(!this.reader){if(config.reader){this.reader=config.reader;}else{var meta=config.meta||{root:'rows',totalProperty:'total',successProperty:'success'};var filt=config.filter||L5.emptyFn;this.reader=new L5.tree.JsonReader(meta,config.recordType||L5.tree.SimpleTreeRecord,filt,config.responseKey);}}
if(config.responseKey){this.reader.responseKey=config.responseKey;this.responseKey=config.responseKey;}
if(this.reader.recordType){this.recordType=this.reader.recordType;}},getParams:function(record,params,queryall){if(this.paramHandler){return this.paramHandler(this,record,params,queryall);}
var parammap=this.getParamValue(record,params,queryall);if(!this.cmd){var buf=[];for(var key in parammap){buf.push(encodeURIComponent(key),"=",encodeURIComponent(parammap[key]),"&");}
buf.pop();return buf.join("");}
var paramset=new L5.Map("org.loushang.next.data.ParameterSet");for(var key in parammap){paramset.put(key,parammap[key]);}
var data={params:paramset};if(this.jsonModel){data["id"]=this.cmd;}
var json=L5.encode(data);return'jsonData='+encodeURIComponent(json);},getParamValue:function(record,params,queryall){params=params||{};queryall=queryall||false;var buf={},bp=this.baseParams;for(var key in bp){var vl=bp[key];if(typeof vl=="function"){vl=vl(record);}
if(vl==undefined){continue;}
buf[key]=vl;}
for(var key in params){var vl=params[key];if(typeof vl=="function"){vl=vl(record);}
if(vl==undefined){continue;}
buf[key]=vl;}
if(queryall&&this.pageSize){var firstquery=true;var curLoadDataSize=record.getLoaderProperty(this.id,'curLoadDataSize');if(curLoadDataSize){firstquery=false;}
if(firstquery){delete buf['start'];delete buf['limit'];}else{var pgsize=buf['limit'];var totalnum=record.getLoaderProperty(this.id,'total')||0;buf['limit']=totalnum+this.pageRemain;}}
return buf;},getJsonData:function(record,params,queryall){var para=this.getParamValue(record,params,queryall);if(this.cmd){var paramset=new L5.Map("org.loushang.next.data.ParameterSet");for(var key in para){paramset.put(key,para[key]);}
var data={"params":paramset};if(this.jsonModel){data["id"]=this.cmd;}
var json=L5.encode(data);return json;}
return L5.encode(para);},getRequestOption:function(record,params,queryall,callback){var url=this.url;var obj={method:this.requestMethod,url:url,success:this.handleResponse,failure:this.handleFailure,scope:this,argument:{record:record,callback:callback}};if(this.requestMethod=='POST'){obj["jsonData"]=this.getJsonData(record,params,queryall);}else{obj["params"]=this.getParams(record,params,queryall);}
return obj;},doPreLoad:function(record){var childrendata=record.getLoaderProperty(this.id,"children");if(!childrendata){return false;}
record.removeLoaderProperty(this.id,'children');var result=this.reader.readRecords(childrendata,this.parseChildRecord,this);var children=result.records;var len=children.length;if(len!=0){this.loadRecords(record,children,result.totalRecords);}
return true;},hasPreData:function(record){var data=record.getLoaderProperty(this.id,'children');if(!data){return false;}
return true;},load:function(record,options,callback){options=options||{};var params=options.params;var queryall=options.queryall;if(this.doPreLoad(record)===true||!this.isNeedSyn(record)){if(callback){callback();}
return;}
if(!this.data){if(this.url&&this.fireEvent("beforeload",this,record)!==false){this.transId=L5.Ajax.request(this.getRequestOption(record,params,queryall,callback));return;}}else{if(this.data.constructor==L5.model.Dataset)
this.processDataSet(record,this.data);else if(typeof this.data=='string'){this.processDataSet(record,L5.DatasetMgr.lookup(this.data));}else
this.processJson(record,this.data);}
if(callback){callback();}},handleResponse:function(response){this.transId=false;var a=response["argument"];var rec=a.record;var callback=a.callback;try{var rtn=this.processResponse(rec,response);if(callback){callback();}
return rtn;}catch(e){this.fireEvent("loadexception",this,rec,response,e);if(callback){callback();}}},handleFailure:function(response){this.transId=false;var a=response.argument;var rec=a.record;var callback=a.callback;this.fireEvent("loadexception",this,rec,response);if(callback){callback();}},processResponse:function(record,response){var result=this.reader.read(response,this.parseChildRecord,this);var suc=result.success;if(suc){var children=result.records;this.loadRecords(record,children,result.totalRecords);this.fireEvent("load",this,record,response);}else{this.fireEvent("loadexception",this,record,response);}
return suc;},processJson:function(record,json){var result=this.reader.readRecords(json,this.parseChildRecord,this);var suc=result.success;if(suc){var children=result.records;this.loadRecords(record,children,result.totalRecords);this.fireEvent("load",this,record,json);}else{this.fireEvent("loadexception",this,record,json);}
return suc;},processDataSet:function(record,dataset){var nameAndValue=this.parseBaseParams(this.baseParams);var collection=dataset.query(nameAndValue[0],nameAndValue[1](record));var result=this.reader.parseRecords(collection,this.parseChildRecord,this);var suc=result.success;if(suc){var children=result.records;this.loadRecords(record,children,result.totalRecords);this.fireEvent("load",this,record,dataset);}else{this.fireEvent("loadexception",this,record,dataset);}
return suc;},parseBaseParams:function(params){var name=null;var value=null;for(var param in params){var names=param.split('@');name=names[0];value=params[param];}
return[name,value];},loadRecords:function(record,children,totalnums){this.initLoaderData(record,totalnums||children.length,children.length);record.insert(children,this.intervalKey);},initLoaderData:function(record,totalnum,loadsize){if(this.pageSize){var oldps=record.getLoaderProperty(this.id,'pageSize');if(!oldps){record.setLoaderProperty(this.id,'pageSize',this.pageSize);}}
record.setLoaderProperty(this.id,'total',totalnum);var olddatasize=record.getLoaderProperty(this.id,'curLoadDataSize');if(olddatasize){olddatasize+=loadsize;}else{olddatasize=loadsize;}
record.setLoaderProperty(this.id,'curLoadDataSize',olddatasize);},isNeedSyn:function(record){var curload=record.getLoaderProperty(this.id,'curLoadDataSize');var toatl=record.getLoaderProperty(this.id,'total');if(curload===false){return true;}
if(curload>=toatl){return false;}
return true;},isLoading:function(){return!!this.transId;},abort:function(){if(this.isLoading()){L5.Ajax.abort(this.transId);}},parseChildRecord:function(record,json,meta,opt){record.loader=this.id;var children=json.children;delete json.children;if(children){json.meta=meta;record.setLoaderProperty(this.id,'children',children);}else{if(this.data!=null){record.loaderLeaf=true;}}},getPageStart:function(record){var pagestart=record.getLoaderProperty(this.id,'curLoadDataSize');return pagestart||0;},getPageSize:function(record){var pageSize=record.getLoaderProperty(this.id,'pageSize');return pageSize||this.pageSize;},getRecordNumber:function(record){var curNum=record.getLoaderProperty(this.id,'curNum');return curNum||0;},trigger:function(record){if(this.recordType){return record.recordType===this.recordType.recordType;}
return true;},triggerCheckWithString:function(record){var key=this.triggerCheckKey[0];var vls=this.triggerCheckKey[1];if(vls){if(record.get(key)==vls){return true;}}else{if(record.get(key)){return true;}}
return false;}});})();L5.tree.TreeLoaderMgr.loaderType.loader=L5.tree.LsTreeLoader;

L5.tree.TreeLoaderProxy=function(cfg){this.loaderMgr=false;L5.apply(this,cfg);var loadermap=this.loaderMgr.getLoadersMap();for(var key in loadermap){var loader=loadermap[key];loader.on("beforeload",this.onBeforeload,this);loader.on("load",this.onLoad,this);loader.on("loadexception",this.onLoadexception,this);}};L5.tree.TreeLoaderProxy.prototype={load:function(record,options,callback){var loaders;if(options.loaderId){var curloader=this.loaderMgr.getLoaderById(options.loaderId);loaders=[curloader];}else{loaders=this.loaderMgr.getRecordLoaders(record);}
var i=0;var len=loaders.length;var loadercallback=function(){if(i>=len){callback();return;}
var curloader=loaders[i];i++;curloader.load(record,options,loadercallback);}
loadercallback();},getLoaderMgr:function(){return this.loaderMgr;},onBeforeload:function(){if(this.dataset){var arg=['beforeload'];var len=arguments.length;for(var i=0;i<len;i++){arg.push(arguments[i]);}
return this.dataset.fireEvent.apply(this.dataset,arg);}
return true;},onLoad:function(){if(this.dataset){var arg=['load'];var len=arguments.length;for(var i=0;i<len;i++){arg.push(arguments[i]);}
return this.dataset.fireEvent.apply(this.dataset,arg);}
return true;},onLoadexception:function(){if(this.dataset){var arg=['loadexception'];var len=arguments.length;for(var i=0;i<len;i++){arg.push(arguments[i]);}
return this.dataset.fireEvent.apply(this.dataset,arg);}
return true;}};

L5.tree.TreeDataSet=function(config){config=config||{};this.pathSeparator='/';this.root=false;this.loaders=[];this.batchLoad=false;this.eventDispacher={};L5.apply(this,config);this.addEvents('rootchange','add','update','remove',"sort",'beforebatchload','batchload','batchloadexception','beforeload','load','loadexception');L5.tree.TreeDataSet.superclass.constructor.call(this);this.initDataSet();}
L5.extend(L5.tree.TreeDataSet,L5.util.Observable,{initDataSet:function(){this.modified={};this.deleted={};this.validated={};this.recordHash={};this.loaderMgr=new L5.tree.TreeLoaderMgr(this.loaders);delete this.loaders;this.initProxyLoader(this.loaderMgr);var root=this.root;if(L5.type(root)=="function"){root=root();}
if(root){this.setRoot(root);}
if(this.id){L5.DatasetMgr.register(this);}},initProxyLoader:function(loadermgr){var proxyloader=this.proxyLoader;if(!proxyloader){if(this.batchLoad){var cfg={};if(this.batchUrl){cfg.batchUrl=this.batchUrl;}
if(this.getBatchJsonData){cfg.getBatchJsonData=this.getBatchJsonData;}
if(this.isSupportBatchLoad){cfg.isSupportBatchLoad=this.isSupportBatchLoad;}
cfg.loaderMgr=loadermgr;proxyloader=new L5.tree.BatchTreeLoaderProxy(cfg);}else{proxyloader=new L5.tree.TreeLoaderProxy({loaderMgr:loadermgr});}
delete this.batchLoad;delete this.batchUrl;delete this.getBatchJsonData;delete this.isSupportBatchLoad;}
this.setProxyLoader(proxyloader);},setProxyLoader:function(proxyloader){var old=this.proxyLoader;if(proxyloader==old){proxyloader.dataset=this;}else{this.proxyLoader=proxyloader;this.loaderMgr=proxyloader.getLoaderMgr();proxyloader.dataset=this;if(old){old.dataset=false;}}},setRoot:function(root){if(!root){return;}
var rootrecord=root;if(!root.load){rootrecord=L5.tree.TreeRecord.createRecord(root.recordType,root);}
var old=this.root;if(rootrecord.equals(old)){if(!this.getById(rootrecord.id)){rootrecord.isRoot=true;rootrecord.setDataSet(this);this.fireEvent('rootchange',false,rootrecord);}
return;}
if(old&&old.load){old.isRoot=false;old.setDataSet(false);}
this.recordHash={};rootrecord.isRoot=true;rootrecord.setDataSet(this);this.root=rootrecord;this.fireEvent('rootchange',old,rootrecord);},registRecord:function(record){if(record.dirty){if(record.state!=L5.model.Record.STATE_NEW){record.state=L5.model.Record.STATE_MODIFIED;}
this.modified[record.id]=record;}
this.recordHash[record.id]=record;},unregisterRecord:function(record){var id=record.id;if(record.dirty){delete this.modified[id];}
delete this.recordHash[id];},getById:function(id,recordType){if(!this.root){return false;}
var newid=this.root.wrapId(id,recordType);return this.recordHash[newid];},getByPath:function(path,sep){var patharray=path;if(typeof path=='string'){var separator=sep||this.pathSeparator;patharray=path.split(separator);}
var rec=this.getRoot();for(var i=0,len=patharray.length;i<len;i++){var ph=patharray[i];rec=rec.getAt(ph);if(!rec){return;}}
return rec;},getRoot:function(){return this.root;},registDispacher:function(id,dispacher){this.eventDispacher[id]=dispacher;},removeDispacher:function(dis){var id=this.getDispacherId(dis);this.removeDispacherById(id);},removeDispacherById:function(id){if(id)
delete this.eventDispacher[id];},getDispacherId:function(dispacher){var id=false;for(var key in this.eventDispacher){var dis=this.eventDispacher[key];if(dis==dispacher){id=key;}}
return id;},getDispacherById:function(id){return this.eventDispacher[id];},dispacherEvent:function(evtName){var dels=[];for(var key in this.eventDispacher){var dis=this.eventDispacher[key];if(dis.closed){dels.push(key);continue;}
dis.fireEvent.apply(dis,arguments);}
for(var i=0,len=dels.length;i<len;i++){this.removeDispacherById(dels[i]);}},sort:function(sortinfo,intervalkey){var record=this.getRoot();return record.sort(sortinfo,true,intervalkey);},sortBy:function(func,intervalkey){var record=this.getRoot();return record.sortBy(func,true,intervalkey);},each:function(func,scope){var rec=this.getRoot();var rtn=func.call(scope||this,root);if(rtn===true){return true;}
return rec.each(func,true,scope);},query:function(property,value,anyMatch,caseSensitive){var root=this.getRoot();var fn=root.createChooseFn(property,value,anyMatch,caseSensitive);if(!fn){fn=function(rec){return true;}}
return this.queryBy(fn);},queryBy:function(func,scope){var root=this.getRoot();var result=root.queryBy(func,true,scope);var rtn=func.call(scope||this,root);if(rtn===true){result=[root].concat(result);}
return result;},find:function(property,value,anyMatch,caseSensitive){var root=this.getRoot();var fn=root.createChooseFn(property,value,anyMatch,caseSensitive);return fn?this.findBy(fn):null;},findBy:function(func,scope){var root=this.getRoot();var rtn=func.call(scope||this,root);if(rtn===true){return root;}
return root.findBy(func,true,scope);},commit:function(){for(var key in this.modified){var record=this.modified[key];record.commit(true);record.state=L5.model.Record.NONE;}
this.modified={};},reject:function(){for(var key in this.modified){var record=this.modified[key];record.reject(true);record.state=L5.model.Record.NONE;}
this.modified={};},afterEdit:function(record){var id=record.id;if(this.modified[id]){if(record.state!=L5.model.Record.STATE_NEW){record.state=L5.model.Record.STATE_MODIFIED;}}else{this.modified[id]=record;}},afterReject:function(record){record.state=L5.model.Record.NONE;delete this.modified[record.id];},afterCommit:function(record){record.state=L5.model.Record.NONE;delete this.modified[record.id];},destroy:function(){if(this.id){L5.DatasetMgr.unregister(this);}
this.root=null;this.loaderMgr=null;this.purgeListeners();this.eventDispacher={};},fireEvent:function(evtName){this.dispacherEvent.apply(this,arguments);L5.tree.TreeDataSet.superclass.fireEvent.apply(this,arguments);},getCount:function(){return 0;}});

L5.tree.L5TreePanel=L5.extend(L5.Panel,{rootVisible:true,animate:L5.enableFx,lines:true,enableDD:false,hlDrop:L5.enableFx,pathSeparator:"/",initComponent:function(){L5.tree.L5TreePanel.superclass.initComponent.call(this);if(!this.eventModel){this.eventModel=new L5.tree.TreeEventModel(this);}
this.nodeHash={};this.radioboxChecked=null;this.initTree();this.addEvents("append","remove","movenode","insert","beforeappend","beforeremove","beforemovenode","beforeinsert","beforeload","load","textchange","beforeexpandnode","beforecollapsenode","expandnode","disabledchange","collapsenode","beforeclick","click","checkchange","dblclick","contextmenu","beforechildrenrendered","startdrag","enddrag","dragdrop","beforenodedrop","nodedrop","nodedragover");if(this.singleExpand){this.on("beforeexpandnode",this.restrictExpand,this);}},initTree:function(){this.initNodeBuilder();this.initDataSet();var dataset=this.dataset;var builder=this.nodeBuilder;var rootrec=dataset.getRoot();if(rootrec){var node=builder.createNode(rootrec);this.setRootNode(node);}},initNodeBuilder:function(){this.nodeBuilder=new L5.tree.TreeNodeBuilder(this.getId(),this.nodeModels);delete this.nodeModels;},initDataSet:function(){var dataset=this.dataset;if(dataset){if(typeof dataset=='object'&&!dataset.registRecord){dataset=new L5.tree.TreeDataSet(dataset);}else if(typeof dataset=='string'){dataset=L5.DatasetMgr.lookup(dataset);}
this.dataset=dataset;}},setDataSet:function(ds){if(ds!=this.dataset){this.dataset.removeDispacherById(this.getId());}
this.dataset=ds;var obser=new L5.tree.DataSetEventObserver(this);ds.registDispacher(this.getId(),obser);},getNodeByRecord:function(rec){return this.getNodeByRecordId(rec.id);},getNodeByRecordId:function(recid,recType){var newrecid=recType?(recType+"_"+recid):recid;var nodeid=this.nodeBuilder.getNodeIdByRecId(newrecid);return this.getNodeById(nodeid);},proxyNodeEvent:function(ename,a1,a2,a3,a4,a5,a6){if(ename=='collapse'||ename=='expand'||ename=='beforecollapse'||ename=='beforeexpand'||ename=='move'||ename=='beforemove'){ename=ename+'node';}
return this.fireEvent(ename,a1,a2,a3,a4,a5,a6);},getRootNode:function(){return this.root;},setRootNode:function(node,amin){if(!node.render){node=this.nodeBuilder.createNode(node);}
var rootrec=node.record;if(!rootrec){return;}
var dataset=rootrec.getDataSet();this.setDataSet(dataset);if(this.rootVisible===false){if(this.rootExpanded==undefined){node.expanded=true;}else{node.expanded=this.rootExpanded;}}else{node.expanded=this.rootExpanded;}
if(this.root){this.root.destroy();this.nodeHash={};}
this.curNode=false;this.root=node;node.ownerTree=this;node.isRoot=true;this.registerNode(node);if(!this.rootVisible){var uiP=node.attributes.uiProvider;node.ui=uiP?new uiP(node):new L5.tree.RootTreeNodeUI(node);}
if(this.rendered){node.render(true,amin||false);if(node.attributes.showType==='checkbox')
node.ui.onCheckChange(true);}
return node;},getNodeById:function(id){return this.nodeHash[id];},registerNode:function(node){this.nodeHash[node.id]=node;},unregisterNode:function(node){delete this.nodeHash[node.id];},toString:function(){return"[Tree"+(this.id?" "+this.id:"")+"]";},restrictExpand:function(node){var p=node.parentNode;if(p){if(p.expandedChild&&p.expandedChild.parentNode==p){p.expandedChild.collapse();}
p.expandedChild=node;}},getChecked:function(a,startNode){startNode=startNode||this.root;var r=[];var f=function(){if(this.attributes.checked==true){var val=!a?(this.record?this.record.id:this.id):(this.record?this.record.get(a):this.attributes[a]);if(val!=undefined){r.push(val);}}}
startNode.cascade(f);return r;},getEl:function(){return this.el;},getDataSet:function(){return this.dataset;},getNodeBuilder:function(){return this.nodeBuilder;},getCurrentNode:function(){return this.curNode;},getCurrentRecord:function(){return this.curNode?this.curNode.record:null;},expandAll:function(){this.root.expand(true);},collapseAll:function(){this.root.collapse(true);},getSelectionModel:function(){if(!this.selModel){this.selModel=new L5.tree.DefaultSelectionModel();}
return this.selModel;},expandPath:function(path,attr,callback){attr=attr||"id";var keys=path.split(this.pathSeparator);var curNode=this.root;if(curNode.attributes[attr]!=keys[1]){if(callback){callback(false,null);}
return;}
var index=1;var f=function(){if(++index==keys.length){if(callback){callback(true,curNode);}
return;}
var c=curNode.findChild(attr,keys[index]);if(!c){if(callback){callback(false,curNode);}
return;}
curNode=c;c.expand(false,false,f);};curNode.expand(false,false,f);},selectPath:function(path,attr,callback){attr=attr||"id";var keys=path.split(this.pathSeparator);var v=keys.pop();if(keys.length>0){var f=function(success,node){if(success&&node){var n=node.findChild(attr,v);if(n){n.select();if(callback){callback(true,n);}}else if(callback){callback(false,n);}}else{if(callback){callback(false,n);}}};this.expandPath(keys.join(this.pathSeparator),attr,f);}else{this.root.select();if(callback){callback(true,this.root);}}},getTreeEl:function(){return this.body;},onRender:function(ct,position){L5.tree.L5TreePanel.superclass.onRender.call(this,ct,position);this.el.addClass('l-tree');this.innerCt=this.body.createChild({tag:"ul",cls:"l-tree-root-ct "+
(this.useArrows?'l-tree-arrows':this.lines?"l-tree-lines":"l-tree-no-lines")});},initEvents:function(){L5.tree.L5TreePanel.superclass.initEvents.call(this);if(this.containerScroll){L5.dd.ScrollManager.register(this.body);}
if((this.enableDD||this.enableDrop)&&!this.dropZone){this.dropZone=new L5.tree.TreeDropZone(this,this.dropConfig||{ddGroup:this.ddGroup||"TreeDD",appendOnly:this.ddAppendOnly===true});}
if((this.enableDD||this.enableDrag)&&!this.dragZone){this.dragZone=new L5.tree.TreeDragZone(this,this.dragConfig||{ddGroup:this.ddGroup||"TreeDD",scroll:this.ddScroll});}
this.getSelectionModel().init(this);},afterRender:function(){L5.tree.L5TreePanel.superclass.afterRender.call(this);this.root.render();if(this.root.attributes.showType==='checkbox')
this.root.ui.onCheckChange(true);if(!this.rootVisible){this.root.renderChildren();}},getDataSetEventDispacher:function(){return this.dataset.getDispacherById(this.getId());},onDestroy:function(){if(this.rendered){this.body.removeAllListeners();L5.dd.ScrollManager.unregister(this.body);if(this.dropZone){this.dropZone.unreg();}
if(this.dragZone){this.dragZone.unreg();}}
this.root.destroy();this.nodeHash=null;if(this.dataset){this.dataset.removeDispacherById(this.getId());}
this.dataset=null;this.nodeBuilder.destroy();this.nodeBuilder=null;L5.tree.L5TreePanel.superclass.onDestroy.call(this);}});L5.tree.L5TreePanel.nodeTypes={};L5.reg('lstreepanel',L5.tree.L5TreePanel);

if(L5.dd.DragZone){L5.tree.TreeDragZone=function(tree,config){L5.tree.TreeDragZone.superclass.constructor.call(this,tree.getTreeEl(),config);this.tree=tree;};L5.extend(L5.tree.TreeDragZone,L5.dd.DragZone,{ddGroup:"TreeDD",onBeforeDrag:function(data,e){var n=data.node;return n&&n.draggable&&!n.disabled;},onInitDrag:function(e){var data=this.dragData;this.tree.getSelectionModel().select(data.node);this.tree.eventModel.disable();this.proxy.update("");data.node.ui.appendDDGhost(this.proxy.ghost.dom);this.tree.fireEvent("startdrag",this.tree,data.node,e);},getRepairXY:function(e,data){return data.node.ui.getDDRepairXY();},onEndDrag:function(data,e){this.tree.eventModel.enable.defer(100,this.tree.eventModel);this.tree.fireEvent("enddrag",this.tree,data.node,e);},onValidDrop:function(dd,e,id){this.tree.fireEvent("dragdrop",this.tree,this.dragData.node,dd,e);this.hideProxy();},beforeInvalidDrop:function(e,id){var sm=this.tree.getSelectionModel();sm.clearSelections();sm.select(this.dragData.node);},afterRepair:function(){if(L5.enableFx&&this.tree.hlDrop){L5.Element.fly(this.dragData.ddel).highlight(this.hlColor||"c3daf9");}
this.dragging=false;}});}

if(L5.dd.DropZone){L5.tree.TreeDropZone=function(tree,config){this.allowParentInsert=false;this.allowContainerDrop=false;this.appendOnly=false;L5.tree.TreeDropZone.superclass.constructor.call(this,tree.innerCt,config);this.tree=tree;this.dragOverData={};this.lastInsertClass="l-tree-no-status";};L5.extend(L5.tree.TreeDropZone,L5.dd.DropZone,{ddGroup:"TreeDD",expandDelay:1000,expandNode:function(node){if(node.hasChildNodes()&&!node.isExpanded()){node.expand(false,null,this.triggerCacheRefresh.createDelegate(this));}},queueExpand:function(node){this.expandProcId=this.expandNode.defer(this.expandDelay,this,[node]);},cancelExpand:function(){if(this.expandProcId){clearTimeout(this.expandProcId);this.expandProcId=false;}},isValidDropPoint:function(n,pt,dd,e,data){if(!n||!data){return false;}
var targetNode=n.node;var dropNode=data.node;if(!(targetNode&&targetNode.isTarget&&pt)){return false;}
if(pt=="append"&&targetNode.allowChildren===false){return false;}
if((pt=="above"||pt=="below")&&(targetNode.parentNode&&targetNode.parentNode.allowChildren===false)){return false;}
if(dropNode&&(targetNode==dropNode||dropNode.contains(targetNode))){return false;}
var overEvent=this.dragOverData;overEvent.tree=this.tree;overEvent.target=targetNode;overEvent.data=data;overEvent.point=pt;overEvent.source=dd;overEvent.rawEvent=e;overEvent.dropNode=dropNode;overEvent.cancel=false;var result=this.tree.fireEvent("nodedragover",overEvent);return overEvent.cancel===false&&result!==false;},getDropPoint:function(e,n,dd){var tn=n.node;if(tn.isRoot){return tn.allowChildren!==false?"append":false;}
var dragEl=n.ddel;var t=L5.lib.Dom.getY(dragEl),b=t+dragEl.offsetHeight;var y=L5.lib.Event.getPageY(e);var noAppend=tn.allowChildren===false||tn.isLeaf();if(this.appendOnly||tn.parentNode.allowChildren===false){return noAppend?false:"append";}
var noBelow=false;if(!this.allowParentInsert){noBelow=tn.hasChildNodes()&&tn.isExpanded();}
var q=(b-t)/(noAppend?2:3);if(y>=t&&y<(t+q)){return"above";}else if(!noBelow&&(noAppend||y>=b-q&&y<=b)){return"below";}else{return"append";}},onNodeEnter:function(n,dd,e,data){this.cancelExpand();},onNodeOver:function(n,dd,e,data){var pt=this.getDropPoint(e,n,dd);var node=n.node;if(!this.expandProcId&&pt=="append"&&node.hasChildNodes()&&!n.node.isExpanded()){this.queueExpand(node);}else if(pt!="append"){this.cancelExpand();}
var returnCls=this.dropNotAllowed;if(this.isValidDropPoint(n,pt,dd,e,data)){if(pt){var el=n.ddel;var cls;if(pt=="above"){returnCls=n.node.isFirst()?"l-tree-drop-ok-above":"l-tree-drop-ok-between";cls="l-tree-drag-insert-above";}else if(pt=="below"){returnCls=n.node.isLast()?"l-tree-drop-ok-below":"l-tree-drop-ok-between";cls="l-tree-drag-insert-below";}else{returnCls="l-tree-drop-ok-append";cls="l-tree-drag-append";}
if(this.lastInsertClass!=cls){L5.fly(el).replaceClass(this.lastInsertClass,cls);this.lastInsertClass=cls;}}}
return returnCls;},onNodeOut:function(n,dd,e,data){this.cancelExpand();this.removeDropIndicators(n);},onNodeDrop:function(n,dd,e,data){var point=this.getDropPoint(e,n,dd);var targetNode=n.node;targetNode.ui.startDrop();if(!this.isValidDropPoint(n,point,dd,e,data)){targetNode.ui.endDrop();return false;}
var dropNode=data.node||(dd.getTreeNode?dd.getTreeNode(data,targetNode,point,e):null);var dropEvent={tree:this.tree,target:targetNode,data:data,point:point,source:dd,rawEvent:e,dropNode:dropNode,cancel:!dropNode,dropStatus:false};var retval=this.tree.fireEvent("beforenodedrop",dropEvent);if(retval===false||dropEvent.cancel===true||!dropEvent.dropNode){targetNode.ui.endDrop();return dropEvent.dropStatus;}
targetNode=dropEvent.target;if(point=="append"&&!targetNode.isExpanded()){targetNode.expand(false,null,function(){this.completeDrop(dropEvent);}.createDelegate(this));}else{this.completeDrop(dropEvent);}
return true;},completeDrop:function(de){var ns=de.dropNode,p=de.point,t=de.target;if(!L5.isArray(ns)){ns=[ns];}
var n;for(var i=0,len=ns.length;i<len;i++){n=ns[i];if(p=="above"){t.parentNode.insertBefore(n,t);}else if(p=="below"){t.parentNode.insertBefore(n,t.nextSibling);}else{t.appendChild(n);}}
n.ui.focus();if(L5.enableFx&&this.tree.hlDrop){n.ui.highlight();}
t.ui.endDrop();this.tree.fireEvent("nodedrop",de);},afterNodeMoved:function(dd,data,e,targetNode,dropNode){if(L5.enableFx&&this.tree.hlDrop){dropNode.ui.focus();dropNode.ui.highlight();}
this.tree.fireEvent("nodedrop",this.tree,targetNode,data,dd,e);},getTree:function(){return this.tree;},removeDropIndicators:function(n){if(n&&n.ddel){var el=n.ddel;L5.fly(el).removeClass(["l-tree-drag-insert-above","l-tree-drag-insert-below","l-tree-drag-append"]);this.lastInsertClass="_noclass";}},beforeDragDrop:function(target,e,id){this.cancelExpand();return true;},afterRepair:function(data){if(data&&L5.enableFx){data.node.ui.highlight();}
this.hideProxy();}});}

L5.tree.TreeNodeUI=function(node){this.node=node;this.rendered=false;this.animating=false;this.wasLeaf=true;this.ecc='l-tree-ec-icon l-tree-elbow';this.emptyIcon=L5.BLANK_IMAGE_URL;};L5.tree.TreeNodeUI.prototype={removeChild:function(node){if(this.rendered){this.ctNode.removeChild(node.ui.getEl());}},beforeLoad:function(){this.addClass("l-tree-node-loading");},afterLoad:function(){this.removeClass("l-tree-node-loading");},onTextChange:function(node,text,oldText){if(this.rendered){this.textNode.innerHTML=text;}},onDisableChange:function(node,state){this.disabled=state;if(this.checkbox){this.checkbox.disabled=state;}
if(state){this.addClass("l-tree-node-disabled");}else{this.removeClass("l-tree-node-disabled");}},onSelectedChange:function(state){if(state){if(L5.fly(this.anchor))
L5.fly(this.anchor).addClass("l-tree-selected");}else{if(L5.fly(this.anchor))
L5.fly(this.anchor).removeClass("l-tree-selected");}},onMove:function(tree,node,oldParent,newParent,index,refNode){this.childIndent=null;if(this.rendered){var targetNode=newParent.ui.getContainer();if(!targetNode){this.holder=document.createElement("div");this.holder.appendChild(this.wrap);return;}
var insertBefore=refNode?refNode.ui.getEl():null;if(insertBefore){targetNode.insertBefore(this.wrap,insertBefore);}else{targetNode.appendChild(this.wrap);}
this.node.renderIndent(true);}},addClass:function(cls){if(this.elNode){L5.fly(this.elNode).addClass(cls);}},removeClass:function(cls){if(this.elNode){L5.fly(this.elNode).removeClass(cls);}},remove:function(){if(this.rendered){this.holder=document.createElement("div");this.holder.appendChild(this.wrap);}},fireEvent:function(){return this.node.fireEvent.apply(this.node,arguments);},initEvents:function(){this.node.on("move",this.onMove,this);if(this.node.disabled){this.addClass("l-tree-node-disabled");if(this.checkbox){this.checkbox.disabled=true;}}
if(this.node.hidden){this.hide();}
var ot=this.node.getOwnerTree();var dd=ot.enableDD||ot.enableDrag||ot.enableDrop;if(dd&&(!this.node.isRoot||ot.rootVisible)){L5.dd.Registry.register(this.elNode,{node:this.node,handles:this.getDDHandles(),isHandle:false});}},getDDHandles:function(){return[this.iconNode,this.textNode,this.elNode];},hide:function(){this.node.hidden=true;if(this.wrap){this.wrap.style.display="none";}},show:function(){this.node.hidden=false;if(this.wrap){this.wrap.style.display="";}},onContextMenu:function(e){if(this.node.hasListener("contextmenu")||this.node.getOwnerTree().hasListener("contextmenu")){e.preventDefault();this.focus();this.fireEvent("contextmenu",this.node,e);}},onClick:function(e){if(this.dropping){e.stopEvent();return;}
if(this.fireEvent("beforeclick",this.node,e)!==false){var a=e.getTarget('a');var href=this.node.attributes.href;if(!this.disabled&&href&&href!='#'&&a){this.fireEvent("click",this.node,e);return;}else if(a&&e.ctrlKey){e.stopEvent();}
e.preventDefault();if(this.disabled){return;}
if(this.node.attributes.singleClickExpand&&!this.animating&&this.node.isExpandable()){this.node.toggle();}
this.fireEvent("click",this.node,e);}else{e.stopEvent();}},onDblClick:function(e){e.preventDefault();if(this.disabled){return;}
if(this.checkedOnDblClick&&this.checkbox){this.toggleCheck();}
if(!this.animating&&this.node.isExpandable()){this.node.toggle();}
this.fireEvent("dblclick",this.node,e);},onOver:function(e){this.addClass('l-tree-node-over');},onOut:function(e){this.removeClass('l-tree-node-over');},changeParentNode:function(node,checked,init){var cb=node.ui.checkbox;var cn=node.childNodes;var hasChecked=false;var checkedAll=true;var nodeState=node.ui.checkbox.checked;if(checked){for(var i=0;i<cn.length;i++){if(!checkedAll)
break;if(checkedAll)
checkedAll=cn[i].ui.checkbox?cn[i].ui.checkbox.checked:false;}
if(checkedAll){if(cb!=null&&cb!=undefined){cb.indeterminate=false;cb.checked=true;cb.defaultChecked=true;node.attributes.checked=true;}}else{if(cb!=null&&cb!=undefined){cb.checked=false;cb.defaultChecked=false;node.attributes.checked=false;cb.indeterminate=true;}}
if(init!=true&&(nodeState!=node.ui.checkbox.checked)){this.fireEvent('checkchange',node,checked);}
if(!node.isRoot&&node.changeParent&&node.ui.showType==='checkbox'&&node.parentNode.ui.checkbox!=null&&node.parentNode.ui.checkbox!=undefined)
this.changeParentNode(node.parentNode,checked,init);}else{for(var i=0;i<cn.length;i++){if(hasChecked)
break;if(!hasChecked)
hasChecked=cn[i].ui.checkbox?(cn[i].ui.checkbox.checked||cn[i].ui.checkbox.indeterminate):false;}
if(hasChecked){if(cb!=null&&cb!=undefined){cb.checked=false;cb.defaultChecked=false;node.attributes.checked=false;cb.indeterminate=true;}}else{if(cb!=null&&cb!=undefined){cb.checked=false;cb.defaultChecked=false;node.attributes.checked=false;cb.indeterminate=false;}}
if(init!=true&&(nodeState!=node.ui.checkbox.checked)){this.fireEvent('checkchange',node,checked);}
if(!node.isRoot&&node.changeParent&&node.ui.showType==='checkbox'&&node.parentNode.ui.checkbox!=null&&node.parentNode.ui.checkbox!=undefined)
this.changeParentNode(node.parentNode,checked,init);}},onCheckChange:function(init){var checked=this.checkbox.checked;if(this.node.changeParent&&this.showType==='checkbox'&&!this.node.isRoot&&this.node.parentNode.ui.checkbox!=null&&this.node.parentNode.ui.checkbox!=undefined)
this.changeParentNode(this.node.parentNode,checked,init);if(this.showType==='checkbox'){this.checkbox.defaultChecked=checked;this.checkbox.checked=checked;this.node.attributes.checked=checked;}
if(this.showType==='radiobox'){if(checked){var oldnode=this.node.ownerTree.radioboxChecked;if(oldnode==null&&oldnode==undefined){this.node.ownerTree.radioboxChecked=this.node;}else{oldnode=this.node.ownerTree.getNodeById(oldnode.id);if(oldnode.ui&&oldnode.ui.checkbox){oldnode.ui.checkbox.checked=false;oldnode.ui.checkbox.defaultChecked=false;}
if(oldnode.attributes){oldnode.attributes.checked=false;}
this.node.ownerTree.radioboxChecked=this.node;}
this.checkbox.checked=true;this.checkbox.defaultChecked=true;this.node.attributes.checked=true;}}
if(init!=true){this.fireEvent('checkchange',this.node,checked);}
if(this.showType==='radiobox'||this.cascadeChecked===false){return;}
this.node.eachChild(function(child){var allowCheck=child.ownerTree.allowCheck;var nodemodel=child.nodeModel;var pnodemodel=child.parentNode.nodeModel;if(L5.type(allowCheck)=="function")
allowCheck=allowCheck(child,child.parentNode);if(allowCheck===undefined){allowCheck=(nodemodel==pnodemodel);}
if(!allowCheck){return}
child.ui.toggleCheck(checked);});},ecClick:function(e){if(!this.animating&&this.node.isExpandable()){this.node.toggle();}},startDrop:function(){this.dropping=true;},endDrop:function(){setTimeout(function(){this.dropping=false;}.createDelegate(this),50);},expand:function(){this.updateExpandIcon();this.ctNode.style.display="";},focus:function(){if(!this.node.preventHScroll){try{this.anchor.focus();}catch(e){}}else{try{var noscroll=this.node.getOwnerTree().getTreeEl().dom;var l=noscroll.scrollLeft;this.anchor.focus();noscroll.scrollLeft=l;}catch(e){}}},toggleCheck:function(value,init){var cb=this.checkbox;if(cb){cb.checked=(value===undefined?!cb.checked:value);this.onCheckChange(init);}},blur:function(){try{this.anchor.blur();}catch(e){}},animExpand:function(callback){var ct=L5.get(this.ctNode);ct.stopFx();if(!this.node.isExpandable()){this.updateExpandIcon();this.ctNode.style.display="";L5.callback(callback);return;}
this.animating=true;this.updateExpandIcon();ct.slideIn('t',{callback:function(){this.animating=false;L5.callback(callback);},scope:this,duration:this.node.ownerTree.duration||.25});},highlight:function(){var tree=this.node.getOwnerTree();L5.fly(this.wrap).highlight(tree.hlColor||"C3DAF9",{endColor:tree.hlBaseColor});},collapse:function(){this.updateExpandIcon();this.ctNode.style.display="none";},animCollapse:function(callback){var ct=L5.get(this.ctNode);ct.enableDisplayMode('block');ct.stopFx();this.animating=true;this.updateExpandIcon();ct.slideOut('t',{callback:function(){this.animating=false;L5.callback(callback);},scope:this,duration:this.node.ownerTree.duration||.25});},getContainer:function(){return this.ctNode;},getEl:function(){return this.wrap;},appendDDGhost:function(ghostNode){ghostNode.appendChild(this.elNode.cloneNode(true));},getDDRepairXY:function(){return L5.lib.Dom.getXY(this.iconNode);},onRender:function(){this.render();},render:function(bulkRender){var n=this.node,a=n.attributes;var targetNode=n.parentNode?n.parentNode.ui.getContainer():n.ownerTree.innerCt.dom;if(!this.rendered){this.rendered=true;this.renderElements(n,a,targetNode,bulkRender);if(a.qtip){if(this.textNode.setAttributeNS){this.textNode.setAttributeNS("L5","qtip",a.qtip);if(a.qtipTitle){this.textNode.setAttributeNS("L5","qtitle",a.qtipTitle);}}else{this.textNode.setAttribute("L5:qtip",a.qtip);if(a.qtipTitle){this.textNode.setAttribute("L5:qtitle",a.qtipTitle);}}}else if(a.qtipCfg){a.qtipCfg.target=L5.id(this.textNode);L5.QuickTips.register(a.qtipCfg);}
this.initEvents();if(!this.node.expanded){this.updateExpandIcon(true);}}else{if(bulkRender===true){targetNode.appendChild(this.wrap);}}},renderElements:function(n,a,targetNode,bulkRender){this.indentMarkup=n.parentNode?n.parentNode.ui.getChildIndent():'';var shtype=a.showType;var cb=typeof a.checked=='boolean';if(cb){shtype=shtype||'checkbox';}
var showHtml="";if(shtype==='checkbox'){cb=true;this.cascadeChecked=a.cascadeChecked;if(this.cascadeChecked==undefined){this.cascadeChecked=true;}
showHtml='<input class="l-tree-node-cb" type="checkbox" name="'+n.ownerTree.id+'_checkbox"'+(a.checked?'checked="checked" />':'/>');}else if(shtype==="radiobox"){cb=true;showHtml='<input class="l-tree-node-cb" type="radio"  name="'+n.ownerTree.id+'_radiobox"'+(a.checked?'checked="checked" />':'/>');}else{showHtml="";}
this.showType=shtype;this.checkedOnDblClick=a.checkedOnDblClick||false;var href=a.href?a.href:L5.isGecko?"":"#";var htmlValue=/\<|\>/;if(L5.preventScriptInjection==true&&htmlValue.test(n.text)){n.text=L5.util.Format.htmlEncode(n.text);}
var buf=['<li class="l-tree-node"><div L5:tree-node-id="',n.id,'" class="l-tree-node-el l-tree-node-leaf l-unselectable ',a.cls,'" unselectable="on">','<span class="l-tree-node-indent">',this.indentMarkup,"</span>",'<img src="',this.emptyIcon,'" class="l-tree-ec-icon l-tree-elbow" />','<img src="',a.icon||this.emptyIcon,'" class="l-tree-node-icon',(a.icon?" l-tree-node-inline-icon":""),(a.iconCls?" "+a.iconCls:""),'" unselectable="on" />',showHtml,'<a hidefocus="on" class="l-tree-node-anchor" href="',href,'" tabIndex="1" ',a.hrefTarget?' target="'+a.hrefTarget+'"':"",'><span unselectable="on">',n.text,"</span></a></div>",'<ul class="l-tree-node-ct" style="display:none;"></ul>',"</li>"].join('');var nel;if(bulkRender!==true&&n.nextSibling&&(nel=n.nextSibling.ui.getEl())){this.wrap=L5.DomHelper.insertHtml("beforeBegin",nel,buf);}else{this.wrap=L5.DomHelper.insertHtml("beforeEnd",targetNode,buf);}
this.elNode=this.wrap.childNodes[0];this.ctNode=this.wrap.childNodes[1];var cs=this.elNode.childNodes;this.indentNode=cs[0];this.ecNode=cs[1];this.iconNode=cs[2];var index=3;if(cb){this.checkbox=cs[3];var checkedValue=a.checked;if(checkedValue===true||checkedValue===false){this.toggleCheck(this.checkbox.checked,true);}else if(checkedValue==='-1'){this.node.attributes.checked=false;this.toggleCheck(false,true);}else if(checkedValue==='0'&&!this.node.isLeaf()){this.checkbox.indeterminate=true;this.node.attributes.checked=false;this.toggleCheck(false,true);}else if(checkedValue==='0'&&this.node.isLeaf()){this.node.attributes.checked=false;this.toggleCheck(false,true);}else if(checkedValue==='1'){this.node.attributes.checked=true;this.toggleCheck(true,true);}
index++;}
this.anchor=cs[index];this.textNode=cs[index].firstChild;},getAnchor:function(){return this.anchor;},getTextEl:function(){return this.textNode;},getIconEl:function(){return this.iconNode;},isChecked:function(){return this.checkbox?this.checkbox.checked:false;},updateExpandIcon:function(){if(this.rendered){var n=this.node,c1,c2;var cls=n.isLast()?"l-tree-elbow-end":"l-tree-elbow";if(n.isExpandable()){if(n.expanded){cls+="-minus";c1="l-tree-node-collapsed";c2="l-tree-node-expanded";}else{cls+="-plus";c1="l-tree-node-expanded";c2="l-tree-node-collapsed";}
if(!this.wasLeaf||!n.leaf){this.removeClass("l-tree-node-leaf");this.wasLeaf=false;}
if(this.c1!=c1||this.c2!=c2){L5.fly(this.elNode).replaceClass(c1,c2);this.c1=c1;this.c2=c2;}}else{if(!this.wasLeaf){L5.fly(this.elNode).replaceClass("l-tree-node-expanded","l-tree-node-leaf");delete this.c1;delete this.c2;this.wasLeaf=true;}}
var ecc="l-tree-ec-icon "+cls;if(this.ecc!=ecc){this.ecNode.className=ecc;this.ecc=ecc;}}},getChildIndent:function(){if(!this.childIndent){var buf=[];var p=this.node;while(p){if(!p.isRoot||(p.isRoot&&p.ownerTree.rootVisible)){if(!p.isLast()){buf.unshift('<img src="'+this.emptyIcon+'" class="l-tree-elbow-line" />');}else{buf.unshift('<img src="'+this.emptyIcon+'" class="l-tree-icon" />');}}
p=p.parentNode;}
this.childIndent=buf.join("");}
return this.childIndent;},renderIndent:function(){if(this.rendered){var indent="";var p=this.node.parentNode;if(p){indent=p.ui.getChildIndent();}
if(this.indentMarkup!=indent){this.indentNode.innerHTML=indent;this.indentMarkup=indent;}
this.updateExpandIcon();}},destroy:function(){if(this.elNode){L5.dd.Registry.unregister(this.elNode.id);}
delete this.elNode;delete this.ctNode;delete this.indentNode;delete this.ecNode;delete this.iconNode;delete this.checkbox;delete this.anchor;delete this.textNode;if(this.holder){delete this.wrap;L5.removeNode(this.holder);delete this.holder;}else{L5.removeNode(this.wrap);delete this.wrap;}}};L5.tree.RootTreeNodeUI=L5.extend(L5.tree.TreeNodeUI,{render:function(){if(!this.rendered){var targetNode=this.node.ownerTree.innerCt.dom;this.node.expanded=true;targetNode.innerHTML='<div class="l-tree-root-node"></div>';this.wrap=this.ctNode=targetNode.firstChild;}},collapse:L5.emptyFn,expand:L5.emptyFn});

L5.tree.TreeNode=function(attributes){attributes=attributes||{};if(typeof attributes=="string"){attributes={text:attributes};}
if(attributes.singleClickExpand=="false"){attributes.singleClickExpand=false;}
if(attributes.singleClickExpand!=false&&!attributes.singleClickExpand){attributes.singleClickExpand=true;}
this.childrenRendered=false;this.rendered=false;L5.tree.TreeNode.superclass.constructor.call(this,attributes);this.expanded=attributes.expanded===true;this.isTarget=attributes.isTarget!==false;this.draggable=attributes.draggable!==false&&attributes.allowDrag!==false;this.allowChildren=attributes.allowChildren!==false&&attributes.allowDrop!==false;this.text=attributes.text;this.disabled=attributes.disabled===true;this.changeParent=true;if(attributes.changeParent!=undefined){if((typeof attributes.changeParent)=='string'){this.changeParent=attributes.changeParent==='true';}else if((typeof attributes.changeParent)=='boolean'){this.changeParent=attributes.changeParent===true;}}
this.addEvents("textchange","beforeexpand","beforecollapse","expand","disabledchange","collapse","beforeclick","click","checkchange","dblclick","contextmenu","beforechildrenrendered");var uiClass=this.attributes.uiProvider||this.defaultUI||L5.tree.TreeNodeUI;this.ui=new uiClass(this);};L5.extend(L5.tree.TreeNode,L5.model.Node,{preventHScroll:true,isExpanded:function(){return this.expanded;},getUI:function(){return this.ui;},setFirstChild:function(node){var of=this.firstChild;L5.tree.TreeNode.superclass.setFirstChild.call(this,node);if(this.childrenRendered&&of&&node!=of){of.renderIndent(true,true);}
if(this.rendered){this.renderIndent(true,true);}},setLastChild:function(node){var ol=this.lastChild;L5.tree.TreeNode.superclass.setLastChild.call(this,node);if(this.childrenRendered&&ol&&node!=ol){ol.renderIndent(true,true);}
if(this.rendered){this.renderIndent(true,true);}},appendChild:function(n){var node=L5.tree.TreeNode.superclass.appendChild.call(this,n);if(node&&this.childrenRendered){node.render();}
this.ui.updateExpandIcon();return node;},removeChild:function(node){this.ownerTree.getSelectionModel().unselect(node);L5.tree.TreeNode.superclass.removeChild.apply(this,arguments);if(this.childrenRendered){node.ui.remove();}
if(this.childNodes.length<1){this.collapse(false,false);}else{this.ui.updateExpandIcon();}
if(!this.firstChild&&!this.isHiddenRoot()){this.childrenRendered=false;}
return node;},insertBefore:function(node,refNode){var newNode=L5.tree.TreeNode.superclass.insertBefore.apply(this,arguments);if(newNode&&refNode&&this.childrenRendered){node.render();}
this.ui.updateExpandIcon();return newNode;},setText:function(text){var oldText=this.text;this.text=text;this.attributes.text=text;if(this.rendered){this.ui.onTextChange(this,text,oldText);}
this.fireEvent("textchange",this,text,oldText);},select:function(){this.getOwnerTree().getSelectionModel().select(this);},unselect:function(){this.getOwnerTree().getSelectionModel().unselect(this);},isSelected:function(){return this.getOwnerTree().getSelectionModel().isSelected(this);},expand:function(deep,anim,callback){if(!this.expanded){if(this.fireEvent("beforeexpand",this,deep,anim)===false){return;}
if(!this.childrenRendered){this.renderChildren();}
this.expanded=true;if(!this.isHiddenRoot()&&(this.getOwnerTree().animate&&anim!==false)||anim){this.ui.animExpand(function(){this.fireEvent("expand",this);if(typeof callback=="function"){callback(this);}
if(deep===true){this.expandChildNodes(true);}}.createDelegate(this));return;}else{this.ui.expand();this.fireEvent("expand",this);if(typeof callback=="function"){callback(this);}}}else{if(typeof callback=="function"){callback(this);}}
if(deep===true){this.expandChildNodes(true);}},isHiddenRoot:function(){return this.isRoot&&!this.getOwnerTree().rootVisible;},collapse:function(deep,anim){if(this.expanded&&!this.isHiddenRoot()){if(this.fireEvent("beforecollapse",this,deep,anim)===false){return;}
this.expanded=false;if((this.getOwnerTree().animate&&anim!==false)||anim){this.ui.animCollapse(function(){this.fireEvent("collapse",this);if(deep===true){this.collapseChildNodes(true);}}.createDelegate(this));return;}else{this.ui.collapse();this.fireEvent("collapse",this);}}
if(deep===true){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){cs[i].collapse(true,false);}}},delayedExpand:function(delay){if(!this.expandProcId){this.expandProcId=this.expand.defer(delay,this);}},cancelExpand:function(){if(this.expandProcId){clearTimeout(this.expandProcId);}
this.expandProcId=false;},toggle:function(){if(this.expanded){this.collapse();}else{this.expand();}},ensureVisible:function(callback){var tree=this.getOwnerTree();tree.expandPath(this.parentNode?this.parentNode.getPath():this.getPath(),false,function(){var node=tree.getNodeById(this.id);tree.getTreeEl().scrollChildIntoView(node.ui.anchor);L5.callback(callback);}.createDelegate(this));},expandChildNodes:function(deep){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){cs[i].expand(deep);}},collapseChildNodes:function(deep){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){cs[i].collapse(deep);}},disable:function(){this.disabled=true;this.unselect();if(this.rendered&&this.ui.onDisableChange){this.ui.onDisableChange(this,true);}
this.fireEvent("disabledchange",this,true);},enable:function(){this.disabled=false;if(this.rendered&&this.ui.onDisableChange){this.ui.onDisableChange(this,false);}
this.fireEvent("disabledchange",this,false);},renderChildren:function(suppressEvent){if(suppressEvent!==false){this.fireEvent("beforechildrenrendered",this);}
var cs=this.childNodes;var parentChecked=this.attributes.checked;for(var i=0,len=cs.length;i<len;i++){cs[i].render(true);var allowCheck=this.getOwnerTree().allowCheck;if(L5.type(allowCheck)=="function")
allowCheck=allowCheck(cs[i],cs[i].parentNode);if(allowCheck===undefined){var nodemodel=cs[i].nodeModel;var pnodemodel=cs[i].parentNode?cs[i].parentNode.nodeModel:cs[i].nodeModel;allowCheck=(nodemodel==pnodemodel);}
if(parentChecked==true&&allowCheck&&cs[i].attributes.showType==='checkbox')
cs[i].ui.toggleCheck(true,true);}
this.childrenRendered=true;},sort:function(fn,scope){L5.tree.TreeNode.superclass.sort.apply(this,arguments);if(this.childrenRendered){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){cs[i].render(true);}}},render:function(bulkRender,amin){this.ui.render(bulkRender);if(!this.rendered){this.getOwnerTree().registerNode(this);this.rendered=true;if(this.expanded){this.expanded=false;this.expand(false,amin||false);}}},renderIndent:function(deep,refresh){if(refresh){this.ui.childIndent=null;}
this.ui.renderIndent();if(deep===true&&this.childrenRendered){var cs=this.childNodes;for(var i=0,len=cs.length;i<len;i++){cs[i].renderIndent(true,refresh);}}},beginUpdate:function(){this.childrenRendered=false;},endUpdate:function(){if(this.expanded&&this.rendered){this.renderChildren();}},destroy:function(){if(this.childNodes){for(var i=0,l=this.childNodes.length;i<l;i++){this.childNodes[i].destroy();}
this.childNodes=null;}
if(this.ui.destroy){this.ui.destroy();}}});L5.tree.L5TreePanel.nodeTypes.node=L5.tree.TreeNode;

L5.tree.L5AsyncTreeNode=function(config){this.loaded=config&&config.loaded===true;this.loading=false;L5.tree.L5AsyncTreeNode.superclass.constructor.apply(this,arguments);this.addEvents('beforeload','load');};L5.extend(L5.tree.L5AsyncTreeNode,L5.tree.TreeNode,{expand:function(deep,anim,callback){if(this.loading){var timer;var f=function(){if(!this.loading){clearInterval(timer);this.expand(deep,anim,callback);}}.createDelegate(this);timer=setInterval(f,200);return;}
if(!this.loaded){var record=this.record;if(record.loading==true){var timer;var f=function(){if(!record.loading){clearInterval(timer);this.expand(deep,anim,callback);}}.createDelegate(this);timer=setInterval(f,200);return;}
if(record.hasSynData()){this.loading=true;this.ui.beforeLoad(this);record.load({callback:this.loadComplete.createDelegate(this,[deep,anim,callback])});}else{this.loading=true;this.ui.beforeLoad(this);var count=record.getCount();var chnodesize=this.childNodes.length;if(chnodesize==0&&count!=chnodesize){this.ownerTree.getDataSetEventDispacher().fireEvent('add',record,record.getChildren(),0,count);}
this.loading=false;this.loaded=true;this.ui.afterLoad(this);L5.tree.L5AsyncTreeNode.superclass.expand.call(this,deep,anim,callback);}
return;}
L5.tree.L5AsyncTreeNode.superclass.expand.call(this,deep,anim,callback);},isLoading:function(){return this.loading;},loadComplete:function(deep,anim,callback){this.loading=false;this.loaded=true;this.ui.afterLoad(this);this.expand(deep,anim,callback);},isLoaded:function(){return this.loaded;},hasChildNodes:function(){if(!this.isLeaf()&&!this.loaded){return true;}else{return L5.tree.L5AsyncTreeNode.superclass.hasChildNodes.call(this);}}});L5.tree.L5TreePanel.nodeTypes.async=L5.tree.L5AsyncTreeNode;

L5.tree.TreeEventModel=function(tree){this.tree=tree;this.tree.on('render',this.initEvents,this);}
L5.tree.TreeEventModel.prototype={initEvents:function(){var el=this.tree.getTreeEl();el.on('click',this.delegateClick,this);if(this.tree.trackMouseOver!==false){el.on('mouseover',this.delegateOver,this);el.on('mouseout',this.delegateOut,this);}
el.on('dblclick',this.delegateDblClick,this);el.on('contextmenu',this.delegateContextMenu,this);},getNode:function(e){var t;if(t=e.getTarget('.l-tree-node-el',10)){var id=L5.fly(t,'_treeEvents').getAttributeNS('L5','tree-node-id');if(!id){id=L5.fly(t,'_treeEvents').dom.getAttribute('L5:tree-node-id');}
if(id){return this.tree.getNodeById(id);}}
return null;},getNodeTarget:function(e){var t=e.getTarget('.l-tree-node-icon',1);if(!t){t=e.getTarget('.l-tree-node-el',6);}
return t;},delegateOut:function(e,t){if(!this.beforeEvent(e)){return;}
if(e.getTarget('.l-tree-ec-icon',1)){var n=this.getNode(e);this.onIconOut(e,n);if(n==this.lastEcOver){delete this.lastEcOver;}}
if((t=this.getNodeTarget(e))&&!e.within(t,true)){this.onNodeOut(e,this.getNode(e));}},delegateOver:function(e,t){if(!this.beforeEvent(e)){return;}
if(this.lastEcOver){this.onIconOut(e,this.lastEcOver);delete this.lastEcOver;}
if(e.getTarget('.l-tree-ec-icon',1)){this.lastEcOver=this.getNode(e);this.onIconOver(e,this.lastEcOver);}
if(t=this.getNodeTarget(e)){this.onNodeOver(e,this.getNode(e));}},delegateClick:function(e,t){if(!this.beforeEvent(e)){return;}
if(e.getTarget('input[type=checkbox]',1)){this.onCheckboxClick(e,this.getNode(e));}else if(e.getTarget('input[type=radio]',1)){this.onCheckboxClick(e,this.getNode(e));}else if(e.getTarget('.l-tree-ec-icon',1)){this.onIconClick(e,this.getNode(e));}
else if(this.getNodeTarget(e)){this.onNodeClick(e,this.getNode(e));}},delegateDblClick:function(e,t){if(this.beforeEvent(e)&&this.getNodeTarget(e)){this.onNodeDblClick(e,this.getNode(e));}},delegateContextMenu:function(e,t){if(this.beforeEvent(e)&&this.getNodeTarget(e)){this.onNodeContextMenu(e,this.getNode(e));}},onNodeClick:function(e,node){if(node){if(node.nodeModel){node.nodeModel.onNodeSelected(node);}
node.ui.onClick(e);}},onNodeOver:function(e,node){if(node){node.ui.onOver(e);}},onNodeOut:function(e,node){if(node){node.ui.onOut(e);}},onIconOver:function(e,node){node.ui.addClass('l-tree-ec-over');},onIconOut:function(e,node){node.ui.removeClass('l-tree-ec-over');},onIconClick:function(e,node){node.ui.ecClick(e);},onCheckboxClick:function(e,node){node.ui.onCheckChange(e);},onNodeDblClick:function(e,node){node.ui.onDblClick(e);},onNodeContextMenu:function(e,node){if(node.nodeModel){node.nodeModel.onNodeContextMenu(e,node);}
node.ui.onContextMenu(e);},beforeEvent:function(e){if(this.disabled){e.stopEvent();return false;}
return true;},disable:function(){this.disabled=true;},enable:function(){this.disabled=false;}};

(function(){L5.tree.NodeFieldModel=function(name,handler){this.name=name;if(handler){this.handleRecord=handler;}}
L5.tree.NodeFieldModel.prototype={handleRecord:function(record){return record.get(this.name);},handleNode:function(node,value){node.attributes[name]=value;node[name]=value;}}
var baseattrs=[{name:"text"},{name:"expanded"},{name:"allowDrag"},{name:"allowDrop"},{name:"disabled"},{name:"icon"},{name:"cls"},{name:"iconCls"},{name:"href"},{name:"hrefTarget"},{name:"qtip"},{name:"expandable"},{name:"qtipCfg"},{name:"singleClickExpand"},{name:"uiProvider"},{name:"checked"},{name:"draggable"},{name:"isTarget"},{name:"allowChildren"}];L5.tree.NodeModel=function(config){config=config||{};var rec=config.recordType||L5.tree.SimpleTreeRecord;if(typeof rec=='string'){rec=L5.tree.TreeRecord.recordTypes[rec];}
var rectype=rec.recordType;var attrs=config.attrs;if(!attrs){attrs=baseattrs;rec=L5.tree.SimpleTreeRecord;rectype=L5.tree.SimpleTreeRecord.recordType;}
this.record=rec;this.recordType=rectype;this.render=config.render;this.listeners=config.listeners;this.binding=config.binding;this.fieldModels=new L5.util.MixedCollection(false,function(fieldModel){return fieldModel.name;});this.recordMapping={};if(L5.isArray(attrs)){for(var i=0,len=attrs.length;i<len;i++){var cfg=attrs[i];var fdmodel=this.createFieldModel(cfg);if(fdmodel!=null){this.fieldModels.add(fdmodel);}}}else{for(var nodeprop in attrs){var fdname=attrs[nodeprop];if(fdname==undefined||fdname==null||fdname===""){continue;}
var cfg={name:nodeprop,handler:fdname};var fdmodel=this.createFieldModel(cfg);if(fdmodel!=null){this.fieldModels.add(fdmodel);}}}
this.dealFieldModel();this.addEvents('beforeselected','selected','update','contextmenu');L5.tree.NodeModel.superclass.constructor.call(this);if(this.binding){L5.tree.FormBinding(this,this.binding);}};var getFixvalue=function(record){return this.value;};var getFieldValue=function(record){return record.get(this.fdName);};var texthandleNode=function(node,value){node.setText(value);};var disabledhandleNode=function(node,value){node.attributes[name]=value;node[name]=value;if(value){node.disable();}else{node.enable();}};var checkedhandleNode=function(node,value){node.attributes[name]=value;node[name]=value;if(node.rendered){node.ui.toggleCheck(value);}};var handleNodefuncs={text:texthandleNode,disabled:disabledhandleNode,checked:checkedhandleNode};L5.extend(L5.tree.NodeModel,L5.util.Observable,{createFieldModel:function(config){var nodeprop=config.name;if(!nodeprop){return null;}
var fdname=config.mapping;var handler=config.handler;if(handler===undefined){handler=fdname;}
var wrapkey=null;var wrapvalue=null;if(handler!=undefined&&typeof handler!='function'){var fd=this.record.getField(handler);if(fd){fdname=fdname||handler;wrapkey='fdName';wrapvalue=handler;handler=getFieldValue;}else{wrapkey='value';wrapvalue=handler;handler=getFixvalue;}}
fdname=fdname||nodeprop;if(fdname){var fds=fdname.split(',');for(var i=0,len=fds.length;i<len;i++){var fdn=fds[i];var fd=this.record.getField(fdn);if(fd){if(this.recordMapping[fdn]){this.recordMapping[fdn].push(nodeprop);}else{this.recordMapping[fdn]=[nodeprop];}}}}
var fdmodel=new L5.tree.NodeFieldModel(nodeprop,handler);if(wrapkey!=null){fdmodel[wrapkey]=wrapvalue;}
return fdmodel;},dealFieldModel:function(){var nodehandls=handleNodefuncs;for(var key in nodehandls){var func=nodehandls[key];var fdmodel=this.fieldModels.item(key);if(fdmodel){fdmodel.handleNode=func;}}},buildAttribute:function(record){var attr={};var fldmodels=this.fieldModels;for(var i=0,len=fldmodels.getCount();i<len;i++){var fdmdl=fldmodels.itemAt(i);var vl=fdmdl.handleRecord(record);if(vl===""){continue;}
attr[fdmdl.name]=vl;}
return attr;},refreshNodeWithField:function(node,recfdname,record){var recordmappings=this.recordMapping[recfdname];if(!recordmappings){return;}
for(var i=0,len=recordmappings.length;i<len;i++){var nodeprop=recordmappings[i];var fielmodel=this.fieldModels.item(nodeprop);if(!fielmodel){continue;}
var vl=fielmodel.handleRecord(record);fielmodel.handleNode(node,vl);}
this.fireEvent('update',record,recfdname,recordmappings,node);},onNodeSelected:function(node,noevent){var oldnode=node.ownerTree.curNode;var oldrec;var currec=node.record;var ds=currec.getDataSet();if(oldnode){oldrec=oldnode.record;}
if(this.fireEvent('beforeselected',oldrec,currec,oldnode,node)===false){return;};if(oldrec){oldrec.reject(false);}
node.ownerTree.curNode=node;if(!noevent)
this.fireEvent('selected',currec,node);},onNodeContextMenu:function(e,node){if(this.hasListener("contextmenu")){e.preventDefault();node.ui.focus();this.onNodeSelected(node,true);node.select();this.fireEvent("contextmenu",node.record,e,node);}},destroy:function(){this.purgeListeners();if(this.binding){L5.tree.FormUnBinding(this.binding);}}});L5.tree.NodeModelMgr=function(config){this.nodesmap={};var ss=new L5.tree.NodeModel();this.register(ss);if(!config.length)
config=[config];var len=config.length;for(var ind=0;ind<len;ind++){var ndl=new L5.tree.NodeModel(config[ind]);this.register(ndl);}};var modelmgr=L5.tree.NodeModelMgr.prototype;modelmgr.getNodeModelByType=function(recordType){return this.nodesmap[recordType];};modelmgr.getNodeModel=function(record){var recordType=record.getType();return this.getNodeModelByType(recordType);};modelmgr.register=function(nodemodel){this.nodesmap[nodemodel.recordType]=nodemodel;nodemodel.manager=this;};modelmgr.destroy=function(){for(var key in this.nodesmap){var nodemodel=this.nodesmap[key];nodemodel.destroy();}
this.nodesmap=null;};})();

L5.tree.TreeNodeBuilder=function(treeid,config){this.treeid=treeid;config=config||{};if(config.getNodeModelByType){this.nodeModelMgr=config;}else{this.nodeModelMgr=new L5.tree.NodeModelMgr(config);}};(function(){var proto=L5.tree.TreeNodeBuilder.prototype;proto.createNode=function(rec){var nodemoel=this.nodeModelMgr.getNodeModel(rec);var attr=nodemoel.buildAttribute(rec);attr.id=this.getNodeIdByRecId(rec.id);var node=new L5.tree.L5AsyncTreeNode(attr);node.record=rec;node.nodeModel=nodemoel;return node;};proto.getNodeIdByRecId=function(recid){return this.treeid+"_"+recid;};proto.getNodeModel=function(record){return this.nodeModelMgr.getNodeModel(record);};proto.registNodeModel=function(nodemodel){this.nodeModelMgr.register(nodemodel);};proto.destroy=function(){this.nodeModelMgr.destroy();delete this.nodeModelMgr;}})();

L5.tree.DataSetEventObserver=function(tree){this.closed=false;this.tree=tree;this.id=tree.id;this.addEvents('rootchange','loaderinit','beforebatchload','batchload','batchloadexception','add','update','remove','sort','beforeload','load','loadexception');L5.tree.DataSetEventObserver.superclass.constructor.call(this);this.initHandler();};L5.extend(L5.tree.DataSetEventObserver,L5.util.Observable,{fireEvent:function(){if(this.closed){return false;}
var nodeHash=this.tree.nodeHash;if(nodeHash==null){this.closed=true;return false;}
return L5.tree.DataSetEventObserver.superclass.fireEvent.apply(this,arguments);},initHandler:function(){this.on('rootchange',this.OnRootChange,this);this.on('add',this.OnRecordAdd,this);this.on('update',this.OnRecordUpdate,this);this.on('remove',this.OnRecordRemove,this);this.on('sort',this.OnRecordSort,this);this.on('beforeload',this.OnBeforeload,this);this.on('load',this.OnLoad,this);this.on('loadexception',this.OnLoadexception,this);},OnRootChange:function(oldrec,newrec){this.tree.setRootNode(newrec);},OnRecordAdd:function(parent,recs,index,insertnums){var builder=this.tree.getNodeBuilder();var pnode=this.getNodeByRecord(parent);if(!pnode){return;}
pnode.leaf=false;pnode.ui.wasLeaf=false;var before=pnode.item(index);if(!before){before=null;}
pnode.beginUpdate();var len=recs.length;var curnode;var i=0;while(i<len){var rec=recs[i];i++;curnode=this.getNodeByRecord(rec);if(curnode){continue;}
curnode=builder.createNode(rec);pnode.insertBefore(curnode,before);}
pnode.endUpdate();},OnRecordUpdate:function(record,modify,status){if(status==L5.model.Record.COMMIT){return;}
var builder=this.tree.getNodeBuilder();var node=this.getNodeByRecord(record);if(!node){return;}
var nodemodel=builder.getNodeModel(record);for(var key in modify){nodemodel.refreshNodeWithField(node,key,record);}},OnRecordRemove:function(parent,recs,index){var pnode=this.getNodeByRecord(parent);if(!pnode){return;}
var count=pnode.childNodes.length;if(count==recs.length){pnode.collapse(false,false);while(pnode.firstChild){pnode.removeChild(pnode.firstChild).destroy();}
pnode.childrenRendered=false;pnode.loaded=false;if(pnode.isHiddenRoot()){pnode.expanded=false;}}else{for(var i=0,len=recs.length;i<len;i++){var rec=recs[i];var curnode=this.getNodeByRecord(rec);if(curnode){pnode.removeChild(curnode);}}}
var selectnode=this.tree.curNode;if(selectnode!==pnode){pnode.nodeModel.onNodeSelected(pnode);}},OnRecordSort:function(parent,recs,index){var builder=this.tree.getNodeBuilder();var pnode=this.getNodeByRecord(parent);if(!pnode){return;}
var count=parent.getCount();var expand=pnode.expanded||false;pnode.collapse(false,false);pnode.childrenRendered=false;var end=recs.length+index-1;var start=index;for(var i=end;i>=start;i--){pnode.removeChild(pnode.item(i)).destroy();}
var posnode=pnode.item(index);for(var i=0,len=recs.length;i<len;i++){var curnode=builder.createNode(recs[i]);pnode.insertBefore(curnode,posnode);}
if(expand)
pnode.expand(false,false);},OnBeforeload:function(loader,rec){},OnLoad:function(loader,rec,reponse){},OnLoadexception:function(loader,rec,reponse){},OnBeforebatchLoad:function(){},OnBatchLoad:function(){},OnBatchLoadexception:function(){},getNodeByRecord:function(record){var builder=this.tree.getNodeBuilder();var nodeid=builder.getNodeIdByRecId(record.id);var node=this.tree.getNodeById(nodeid);return node;}});

L5.tree.DefaultSelectionModel=function(config){this.selNode=null;this.addEvents("selectionchange","beforeselect");L5.apply(this,config);L5.tree.DefaultSelectionModel.superclass.constructor.call(this);};L5.extend(L5.tree.DefaultSelectionModel,L5.util.Observable,{init:function(tree){this.tree=tree;tree.getTreeEl().on("keydown",this.onKeyDown,this);tree.on("click",this.onNodeClick,this);},onNodeClick:function(node,e){this.select(node);},select:function(node){var last=this.selNode;if(last!=node&&this.fireEvent('beforeselect',this,node,last)!==false){if(last){last.ui.onSelectedChange(false);}
this.selNode=node;node.ui.onSelectedChange(true);this.fireEvent("selectionchange",this,node,last);}
return node;},unselect:function(node){if(this.selNode==node){this.clearSelections();}},clearSelections:function(){var n=this.selNode;if(n){n.ui.onSelectedChange(false);this.selNode=null;this.fireEvent("selectionchange",this,null);}
return n;},getSelectedNode:function(){return this.selNode;},isSelected:function(node){return this.selNode==node;},selectPrevious:function(){var s=this.selNode||this.lastSelNode;if(!s){return null;}
var ps=s.previousSibling;if(ps){if(!ps.isExpanded()||ps.childNodes.length<1){return this.select(ps);}else{var lc=ps.lastChild;while(lc&&lc.isExpanded()&&lc.childNodes.length>0){lc=lc.lastChild;}
return this.select(lc);}}else if(s.parentNode&&(this.tree.rootVisible||!s.parentNode.isRoot)){return this.select(s.parentNode);}
return null;},selectNext:function(){var s=this.selNode||this.lastSelNode;if(!s){return null;}
if(s.firstChild&&s.isExpanded()){return this.select(s.firstChild);}else if(s.nextSibling){return this.select(s.nextSibling);}else if(s.parentNode){var newS=null;s.parentNode.bubble(function(){if(this.nextSibling){newS=this.getOwnerTree().selModel.select(this.nextSibling);return false;}});return newS;}
return null;},onKeyDown:function(e){var s=this.selNode||this.lastSelNode;var sm=this;if(!s){return;}
var k=e.getKey();switch(k){case e.DOWN:e.stopEvent();this.selectNext();break;case e.UP:e.stopEvent();this.selectPrevious();break;case e.RIGHT:e.preventDefault();if(s.hasChildNodes()){if(!s.isExpanded()){s.expand();}else if(s.firstChild){this.select(s.firstChild,e);}}
break;case e.LEFT:e.preventDefault();if(s.hasChildNodes()&&s.isExpanded()){s.collapse();}else if(s.parentNode&&(this.tree.rootVisible||s.parentNode!=this.tree.getRootNode())){this.select(s.parentNode,e);}
break;};}});L5.tree.MultiSelectionModel=function(config){this.selNodes=[];this.selMap={};this.addEvents("selectionchange");L5.apply(this,config);L5.tree.MultiSelectionModel.superclass.constructor.call(this);};L5.extend(L5.tree.MultiSelectionModel,L5.util.Observable,{init:function(tree){this.tree=tree;tree.getTreeEl().on("keydown",this.onKeyDown,this);tree.on("click",this.onNodeClick,this);},onNodeClick:function(node,e){this.select(node,e,e.ctrlKey);},select:function(node,e,keepExisting){if(keepExisting!==true){this.clearSelections(true);}
if(this.isSelected(node)){this.lastSelNode=node;return node;}
this.selNodes.push(node);this.selMap[node.id]=node;this.lastSelNode=node;node.ui.onSelectedChange(true);this.fireEvent("selectionchange",this,this.selNodes);return node;},unselect:function(node){if(this.selMap[node.id]){node.ui.onSelectedChange(false);var sn=this.selNodes;var index=sn.indexOf(node);if(index!=-1){this.selNodes.splice(index,1);}
delete this.selMap[node.id];this.fireEvent("selectionchange",this,this.selNodes);}},clearSelections:function(suppressEvent){var sn=this.selNodes;if(sn.length>0){for(var i=0,len=sn.length;i<len;i++){sn[i].ui.onSelectedChange(false);}
this.selNodes=[];this.selMap={};if(suppressEvent!==true){this.fireEvent("selectionchange",this,this.selNodes);}}},isSelected:function(node){return this.selMap[node.id]?true:false;},getSelectedNodes:function(){return this.selNodes;},onKeyDown:L5.tree.DefaultSelectionModel.prototype.onKeyDown,selectNext:L5.tree.DefaultSelectionModel.prototype.selectNext,selectPrevious:L5.tree.DefaultSelectionModel.prototype.selectPrevious});

L5.tree.RecordForm=function(formid){this.elId=formid;this.record=false;this.initForm=false;};L5.tree.RecordForm.prototype={nodeTypeMap:{"select-one":'singleSelect',"select-multiple":"mulSelect",text:'text',password:'text',hidden:'text',checkbox:'checkbox',radio:'radio'},initListeners:function(){var el=this.getEl();var fieldList=L5.DomQuery.select("*[@field]",el);if(el.getAttribute("field")!=null){fieldList.push(ele);}
for(var j=0;j<fieldList.length;j++){var field=fieldList[j];var type=field.type.toLowerCase();var funcName=this.getFuncBaseNameByType(type);L5.fly(field).on("change",this['on'+funcName+"Blur"],this);L5.fly(field).on("blur",this['on'+funcName+"ValueChange"],this);}},init:function(rec){if(this.record!==rec&&rec);this.refresh(rec);if(!this.initForm){this.initListeners();this.initForm=true;}},refresh:function(rec){this.record=rec;var el=this.getEl();var fieldList=L5.DomQuery.select("*[@field]",el);if(el.getAttribute("field")!=null){fieldList.push(ele);}
for(var j=0;j<fieldList.length;j++){var field=fieldList[j];var type=field.type.toLowerCase();var basefuncName=this.getFuncBaseNameByType(type);var funcname='set'+basefuncName+'Value';var property=field.getAttribute("field");var val=rec.get(property);this[funcname](field,rec.get(property));L5.Validator.validate(rec,property,rec.get(property));var qtipel=field;if(field.type=="radio"||field.type=="checkbox"){qtipel=field.parentNode;}
this.dealQtip(qtipel,field,property);}},update:function(property,value){var el=this.getEl();var selection="*[@field="+property+"]";var fieldList=L5.DomQuery.select(selection,el);if(el.getAttribute("field")==property){fieldList.push(el);}
for(var j=0;j<fieldList.length;j++){var field=fieldList[j];var type=field.type.toLowerCase();var basefuncName=this.getFuncBaseNameByType(type);var funcname='set'+basefuncName+'Value';this[funcname](field,value);L5.Validator.validate(this.record,property,value);var qtipel=field;if(field.type=="radio"||field.type=="checkbox"){qtipel=field.parentNode;}
this.dealQtip(qtipel,field,property);}},getEl:function(){return document.getElementById(this.elId);},getRecord:function(){return this.record;},getFuncBaseNameByType:function(type){if(this.nodeTypeMap[type]){return this.nodeTypeMap[type];}
return'base';},ontextBlur:function(e){var rec=this.record;if(!rec){return;}
var ele=e.getTarget();var val=ele.value;var property=ele.getAttribute("field");this.setRecordValue(property,val,ele,ele);},ontextValueChange:function(e){return;},settextValue:function(field,val){if(val==null){val="";}
field.value=val;},onradioBlur:function(e){this.onradioValueChange(e);},onradioValueChange:function(e){var rec=this.record;if(!rec){return;}
var ele=e.getTarget();var val=ele.checked?ele.value:ele.checked;var property=ele.getAttribute("field");this.setRecordValue(property,val,ele,ele.parentNode);},setradioValue:function(field,val){if(val==null){val="";}
var valArray=val.split(",");for(var j=0;j<valArray.length;j++){var sss=""+valArray[j];if(sss==field.value){field.checked=true;return;}else{field.checked=false;}}
field.checked=false;},oncheckboxBlur:function(e){tihs.oncheckboxValueChange(e);},oncheckboxValueChange:function(e){var rec=this.record;if(!rec){return;}
var ele=e.getTarget();var property=ele.getAttribute("field");var selector="input[@field="+property+"]";var parent=ele.parentNode;var nodes=L5.DomQuery.select(selector,parent);var val="";if(nodes&&nodes.length>=1){for(var i=0;i<nodes.length;i++){var node=nodes[i];var type=ele.getAttribute("type");if(type!="checkbox")
continue;if(node.checked){if(val!=null&&val!="")
val=val+","+node.value;else
val=val+node.value;}}}else{val=ele.checked;}
this.setRecordValue(property,val,ele,ele.parentNode);},setcheckboxValue:function(field,val){this.setradioValue(field,val);},onsingleSelectBlur:function(e){this.onsingleSelectValueChange(e);},onsingleSelectValueChange:function(e){var rec=this.record;if(!rec){return;}
var ele=e.getTarget();var property=ele.getAttribute("field");var val;var sel=ele.selectedIndex;if(sel!=-1){var item=ele.options[sel];var valueAttr=item.getAttributeNode("value");if(valueAttr&&valueAttr.specified){val=item.value;}else{val=item.text;}}
this.setRecordValue(property,val,ele,ele);},setsingleSelectValue:function(field,val){if(val==null){val="";}
for(var i=0;i<field.options.length;i++){if(val==field.options[i].value){field.options[i].selected=true;break;}}
field.setAttribute("loaded","true");field.style.display="";},onmulSelectBlur:function(e){this.onmulSelectValueChange(e);},onmulSelectValueChange:function(e){var rec=this.record;if(!rec){return;}
var ele=e.getTarget();var property=ele.getAttribute("field");var val=new Array();for(var i=0;i<ele.options.length;i++){var item=ele.options[i];if(item.selected){var valueAttr=item.getAttributeNode("value");if(valueAttr&&valueAttr.specified){val.push(item.value);}else{val.push(item.text);}}}
this.setRecordValue(property,val,ele,ele);},setmulSelectValue:function(field,val){if(val==null){val="";}
if(val==""){field.options[0].selected=true;}
if(!L5.isArray(val))
val=[val];for(var i=0;i<field.options.length;i++){field.options[i].selected=false;for(var j=0;j<val.length;j++){var sss=""+val[j];if(field.options[i].value==sss){field.options[i].selected=true;}}}
field.setAttribute("loaded","true");field.style.display="";},onbaseBlur:function(e){var rec=this.record;if(!rec){return;}
var ele=e.getTarget();var property=ele.getAttribute("field");var val;if(ele.textContent)
val=ele.textContent;else if(ele.innerText)
val=ele.innerText;else
val=ele.innerHTML;this.setRecordValue(property,val,ele,ele);},onbaseValueChange:function(e){return;},setbaseValue:function(field,val){if(field.textContent)
field.textContent=val;else if(ele.innerText)
field.innerText=val;else
field.innerHTML=val;},setRecordValue:function(property,val,ele,qtipele){var rec=this.record;if(!rec){return;}
qtipele=qtipele||ele;var rtn=rec.set(property,val);this.dealQtip(qtipele,ele,property);if(L5.isArray(rtn)){for(var i=0;i<rtn.length;i++){this.reflect_element(ele,rtn[i],rec);}}},reflect_element:function(ele,field,record){var ds=L5.get(this.getEl);var tRow=L5.get(ele).findParent("tr");var e;if(tRow!=null&&tRow.getAttribute("record")!=null){e=L5.DomQuery.select("*[@field="+field+"]",tRow);}else{e=L5.DomQuery.select("*[@field="+field+"]",ds);}
for(var i=0;i<e.length;i++){var property=e[i].getAttribute("field");var qtipel=e[i];if(e[i].type=="radio"||e[i].type=="checkbox"){qtipel=e[i].parentNode;}
this.dealQtip(qtipel,e[i],property);}},dealQtip:function(qtipele,ele,property){var rec=this.record;if(rec.validate[property]!=null){this.showQtipMsg(qtipele,this.getQtipMsg(ele,property));}else{this.clearQtipInfo(qtipele);}},getQtipMsg:function(ele,property){var msg="";if(ele.getAttribute("msg")!=null){msg=ele.getAttribute("msg");}else{var name=ele.getAttribute("title")||ele.getAttribute("name");if(this.record.msg[property]!=null){if(name!=null){this.record.msgTitle[property]=name;}
msg=this.record.msgTitle[property]+this.record.msg[property];}}
return msg;},showQtipMsg:function(qtipele,msg){var extEle=L5.get(qtipele);extEle.setStyle("border-color","#DA0000");qtipele.setAttribute("L5:qtitle",L5.valError?L5.valError:"Validate error.");qtipele.setAttribute("L5:qtip",msg);},clearQtipInfo:function(qtipele){var extEle=L5.get(qtipele);extEle.setStyle("border-color","#008000");qtipele.removeAttribute("L5:qtitle");qtipele.removeAttribute("L5:qtip");}};(function(){var formMap={};var onRecordSelect=function(record){this.init(record);};var onRecordUpdate=function(record,property){if(record!==this.record){return;}
if(status==L5.model.Record.COMMIT){return;}
this.update(property,record.get(property));};L5.tree.FormBinding=function(nodemodel,formid){var form;if(formid.showQtipMsg){form=formid;}else{form=new L5.tree.RecordForm(formid);}
formMap[form.elId]=form;nodemodel.on('selected',onRecordSelect,form);nodemodel.on('update',onRecordUpdate,form);};L5.tree.FormUnBinding=function(formid){var form=formMap[formid];if(!form){return;}
nodemodel.un('selected',onRecordSelect,form);nodemodel.un('selected',onRecordUpdate,form);delete formMap[formid];};})();
