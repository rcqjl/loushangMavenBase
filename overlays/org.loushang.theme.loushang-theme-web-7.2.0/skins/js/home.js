	var isLogin = false;//用户是否登录（会话是否超时）
	var topMenu = [];
	var leftMenu = [];
	var favoriteMenu = [];
	//指定初始加载的模块
	var defaultModelName = L.getLocaleMessage("home.Tip2","我的收藏")
	var initModelName=defaultModelName;
	var showPortalFrame = false;
	var favoritesModel = {name:"Welcome",
						  iconPath:assetPath + "/skins/skin/platform/img/collect.png",
						  url:'/jsp/public/introduce.jsp'};
	//用户信息视图
	var userInfoView = {
		//data
    	userName :  ko.observable(L.getLocaleMessage("home.Tip3","系统管理员")),
    	//behaviors
    	userUpdate:function(data) {
    		userName(data.userName);
 		},
	};
    ko.applyBindings(userInfoView,$("#userInfo")[0]);
    //获取用户信息
	$(function getUserInfo(){
		$.ajax({
            url:context+"/service/signin/user",
            data:{},
            type:"post",
            async:false,
            success:function(data){
            	if(data!==""){
            		var userInfo = data;
                	userInfoView.userName(userInfo.userName);
                	isLogin=true;
            	}else{
            		$.dialog({
            	        type: 'alert',
            	        content: L.getLocaleMessage("home.Tip13","用户没有登录！"),
            	        autofocus: true
            	    }).showModal();
            	}
            	
            },
            error:function(){
            	$.dialog({
            		 type: 'alert',
         	        content: L.getLocaleMessage("home.Tip13","用户没有登录！"),
         	       autofocus: true
        	    }).showModal();
            }
        });	
	});
	
	function menuRender() {
    	// beautify scroller
		$('.ue-vmenu').slimScroll({
			height: $('.ue-vmenu').height()
		});
		// initialize menu
		$('.ue-vmenu').vmenu({
			autostart: false
		});
    }
	
	function afterRender(){
		//判断收藏菜单是否被加载，根据收藏菜单对叶子节点收藏图标进行渲染
		if(favoriteMenu.length ==0)
			getMenu(favoritesMenuView,"favoritesMenu"); 
		//获取所有叶子节点	
		var leafItem =$('.fa.fa-star-o.ue-vmenu-icon-r').parent().parent();
		for(var i= 0; i < leafItem.length; ++i){
    		for(var j = 0; j < favoriteMenu.length; ++j){
    			if(leafItem[i].id == favoriteMenu[j].menuId){
    				$(leafItem[i]).find("i:last-child")[0].className = "fa fa-star ue-vmenu-icon-r";
    				$(leafItem[i]).find("i:last-child")[0].title = L.getLocaleMessage("home.Tip４","取消收藏"); 
    			}
    		}
    	}
	}
	//加载工作区页面
	function loadUrl(data) {
		var url = "";
		//点击左侧菜单标题
		if(data.pUrl!=null&&data.pUrl!=undefined){
			data.url = data.pUrl();
			if(data.tmpName()==""){
				data.text =  data.pMenuName();
			}else{
				data.text = data.tmpName();
			}
		}
		//叶子节点
		if(data.url!=null&&data.url!=undefined&&data.url!=""){
			$('.ue-right-top').text(data.text || data.name);
			if((data.url).indexOf("http:")>-1||(data.url).indexOf("https:")>-1)
				url = data.url;
			else
				url = context + data.url;
//	 		var ifram = "{text:'"+$('.ue-right-top').text()+"'"+",url:'"+data.url+"'"+"}";
//	 		setCookie("ifram",ifram);
	 		$('#mainFrame').attr('src', url);
		}
	  }
	//模块菜单视图
    var topMenuView = {
    	//data
    	menuList :  ko.observableArray([]),
    	hideList : ko.observableArray([]),
    	actionUrl : ko.observable("/service/home/topmenu"),
    	viewId :ko.observable("topMenuView"),
    	//behaviors
    	showMore:function() {
   		 		if( $("#topMore").text()==L.getLocaleMessage("home.more","更多")){
	   		 		this.menuList(this.menuList().concat(this.hideList()));
	   		 	    $("#topMore").text(L.getLocaleMessage("home.Tip5","收起"));
   		 		}else if($("#topMore").text()==L.getLocaleMessage("home.Tip5","收起")){
   		 			this.menuList(this.menuList().slice(0,6));
   		 			$("#topMore").text(L.getLocaleMessage("home.more","更多"));
   		 		}
   		    },
		getSubMenu: function (data){
				//显示原始工作区，隐藏门户页面
				if($(".ue-menu-wrap").css('display')=='none'){
					$(".portal-wrap").hide();
		    		$(".ue-menu-wrap").show();
				}
//				setCookie("initModelName",data.text);
			    leftMenuView.menuList().length=0;
				leftMenuView.pMenuName(data.text);
				leftMenuView.pMenuId(data.id);
				var iconPath = topMenuView.topMenuIcon(data);
				leftMenuView.PMenuIcon(iconPath);
				leftMenuView.pUrl(data.url);
				var pData = data;
		       	$.ajax({
		            url:context+"/service/home/menu/submenu/"+data.id,
		            data:{},
		            type:"post",
		            async:false,
		            success:function(data){
		            	//查询出错
		            	if(data == "error"||(eval("("+data+")")&&eval("("+data+")").error)){
		            		$.dialog({
		            	        type: 'alert',
		            	        content: L.getLocaleMessage("home.Tip13","用户没有登录！"),
		            	        autofocus: true
		            	    }).showModal();
		            		
		            		return;
		            	}
		            	
		            	leftMenu = eval(data);
//		            	setCookie("leftMenu",data);
		            	leftMenuView.tmpName("");
		            	//加载应用对应的介绍页面，如果没有，则加载第一个菜单
		            	if(leftMenuView.pUrl()==""||leftMenuView.pUrl()==null){
		            		for(var i=0;i<leftMenu.length;++i){
		            			if(leftMenu[i].isLeaf=="true"){
		            				leftMenuView.pUrl(leftMenu[i].url);
		            				leftMenuView.tmpName(leftMenu[i].text);
		            				loadUrl(leftMenu[i]);
		            				break;
		            			}
		            		}
		            	}else{
		            		loadUrl(pData);
		            	}
		            	leftMenuView.menuList(leftMenu);
		    		    menuRender();
		    		    afterRender();
		    		    
		            }
		        });
		    },
        topMenuIcon: function (menuItem){
        	return menuItem.icon ? assetPath+"/skins/skin/"+menuItem.icon : assetPath + "/skins/skin/platform/img/bsp.png";
        }
	 };
    
	 ko.applyBindings(topMenuView,$("#topMenu")[0]);
	//收藏菜单视图 
    var favoritesMenuView = {
    		//data
    		menuList: ko.observableArray([]),
    		hideList : ko.observableArray([]),
    		actionUrl : ko.observable("/service/home/menu/favourite"),
    		viewId :ko.observable("favoritesMenuView"),
   			//behaviors
 			showMore:function() {
   		 		if( $("#favoritesMore").text()==L.getLocaleMessage("home.more","更多")){
	   		 		this.menuList(this.menuList().concat(this.hideList()));
	   		 	    $("#favoritesMore").text(L.getLocaleMessage("home.Tip5","收起"));
   		 		}else if($("#favoritesMore").text()==L.getLocaleMessage("home.Tip5","收起")){
   		 			this.menuList(this.menuList().slice(0,6));
   		 			$("#favoritesMore").text(L.getLocaleMessage("home.more","更多"));
   		 		}
   		    },
   		    deleteFavorite:function(){
   		    	alert("delete!"); 		    	
   		    }
    }; 
    ko.applyBindings(favoritesMenuView,$("#favoritesMenu")[0]);
   //左边菜单视图
    var leftMenuView = {
    		//data
    		pMenuId : ko.observable(""),
    		pMenuName : ko.observable(initModelName),
    		PMenuIcon : ko.observable(favoritesModel.iconPath),
    		menuList: ko.observableArray([]),
   			actionUrl : ko.observable("/service/home/menu/submenu"),
   			viewId :ko.observable("leftMenuView"),
   			//模块没有配置url时，会使用第一个操作的url
   			pUrl : ko.observable('/jsp/public/introduce.jsp'),
   			//模块没有配置url时，保存第一个操作的名称，用于右边标题展示
   			tmpName: ko.observable("Welcome")
    }; 
    ko.applyBindings(leftMenuView,$("#leftMenu")[0]);
     /**
     * 获取菜单项
     * @param {ModelView} view 视图模型
     * @param {String} domId 展示模型的dom区域id
     */
	function getMenu(view,domId){
    	var self = view;
    	var url = context + view.actionUrl();
    	
    	var moreNode = $("#"+domId).find(".more");
    	if(moreNode.length>1){
    		moreNode = $(moreNode[moreNode.length-1]);
    	}
    	
    	$.ajax({
            url:url,
            data:{},
            type:"post",
            async:false,
            success:function(data){
            	if(data == "error"||(eval("("+data+")")&&eval("("+data+")").error)){
            		moreNode.removeClass("more");
            		moreNode.text(""); 
            		$.dialog({
            	        type: 'alert',
            	        content: L.getLocaleMessage("home.Tip13","用户没有登录！"),
            	        autofocus: true
            	    }).showModal();
            		
            		return;
            	} 
            	var menuItem = eval(data);
            	
            	if(view.viewId()=="topMenuView"){
            		topMenu = menuItem;
            	}else if(view.viewId()=="favoritesMenuView"){
            		favoriteMenu = menuItem;
            		leftMenu = menuItem;
            	}
        		if(menuItem.length == 0){
        			moreNode.removeClass("more");
        			if(view.viewId()=="topMenuView"){
        				moreNode.text(L.getLocaleMessage("home.Tip14","无应用"));
                	}else if(view.viewId()=="favoritesMenuView"){
                		moreNode.css({"text-align":'center',"cursor":'default',"background-color":'#ffffff'});
                		moreNode.text(L.getLocaleMessage("home.Tip15","无收藏"));
                	}
            	}else if(menuItem.length > 6){
            		self.hideList(menuItem.slice(6));
            		menuItem=menuItem.slice(0,6);
            		if(view.viewId()=="favoritesMenuView"){
            			$("#favoritesMore").css({"cursor":'pointer',"background-color":'#eee'});
            		}
            		moreNode.text(L.getLocaleMessage("home.more","更多"));
            	}else{
            		moreNode.removeClass("more");
            		moreNode.text("");
            	}
            	self.menuList(menuItem); 
            
            },
            error:function(data){
            	moreNode.text("");
            	$.dialog({
        	        type: 'alert',
        	        content: L.getLocaleMessage("home.Tip13","用户没有登录！"),
        	        autofocus: true
        	    }).showModal();
            }
        });    	
    }
    //页面初始化操作：事件绑定及数据加载
    $(function() {
    	
    	$('#userInfo').hover(function(){
    		$($(this).children("div")).show(); 		
    	},function() {
    		$($(this).children("div")).hide();		
    	});
    	
    	if(!isLogin)return;    	
    	//新手导航
    	var lastUser = getCookie("lastUser");
    	if(lastUser==null||lastUser!=userInfoView.userName()){
    		setCookie("lastUser",userInfoView.userName());
        	introJs().setOptions({
    		  	'nextLabel':L.getLocaleMessage("home.Tip6","下一步"),
    		  	'skipLabel':L.getLocaleMessage("home.Tip7","跳过"),
    		  	'doneLabel':L.getLocaleMessage("home.Tip8","完成"),
    		  	'showBullets':false,
    		  	'showStepNumbers': false
    		  })
    		  .start();
    	}    	   	
    	$('#favoritesMenu').hover(function(){
    			if(favoriteMenu.length ==0){
    			getMenu(favoritesMenuView,"favoritesMenu");  
    		}
    		$(this).children().show();
    	}, function() {
    		$(this).children().hide();
    		$($(this).children()[0]).show();
    	});
    	$('#topMenu').hover(function(){
    	    if(topMenu.length ==0){
    			getMenu(topMenuView,"topMenu");  
    		}
     	   $(this).children().show();
    	},function() {
    		$(this).children().hide();
    		$($(this).children()[0]).show();
    	});
    	
//    	if(getCookie("initModelName")!=null){
//    		initModelName = getCookie("initModelName");
//    	}
    	//加载指定的初始模块
    	loadData();
    	showPortal(showPortalFrame);
    });
    
    /**
     * 保存对收藏菜单的操作
     * @param index 在leftMenu数组中的下标
     * @param data
     * @param event
     */
    function saveFavorites(index,data,event){
    	var url = context + favoritesMenuView.actionUrl();
    	var menuInfo = "";
    	var optType = "";
    	var msg = "";
    	var continueFlag = true;
    	//不同浏览器下获取当前点击元素
    	var clickSymbol = event.currentTarget;
        if(clickSymbol==null)clickSymbol = event.srcElement;
        if(clickSymbol==null)clickSymbol = event.originalTarget;
    	if(clickSymbol.className.indexOf("fa-star")>0){
    		optType = "cancel";
    		msg = L.getLocaleMessage("home.Tip16","确定取消收藏当前菜单？");
    	}
    	if(clickSymbol.className.indexOf("fa-star-o")>0){
    		optType = "add";
    	}
    	if(clickSymbol.className.indexOf("fa-times")>0){
    		optType = "delete";
    		msg = L.getLocaleMessage("home.Tip17","确定删除当前的收藏菜单？");
    	}
    	if(optType=="add"){
    		url += "/add";
    		menuInfo = {"menuId":data.id, "name":data.text,"parentId":leftMenuView.pMenuId(),"url":data.url};
    	}else{
    		url += "/delete";
    		continueFlag=false;
    		if(optType == "cancel")
    			menuInfo = {"menuId":data.id};
    		else
    			menuInfo = {"menuId":data.menuId};
    	}
    	var arg = {url:url,optType:optType,index:index};
    	if(!continueFlag){
        	$.dialog({
        		type:'confirm',
    		    content: msg,
    		    ok: function () {sendFavorRequest(event,menuInfo,arg);},
    		    cancel:function(){},
    		    autofocus: true
    	    }).showModal();
        	return;
    	}else{
    		sendFavorRequest(event,menuInfo,arg);
    	}
    }
    /**
     * 获取菜单项
     * @param {event} event 
     * @param {String} domId 展示模型的dom区域id
     */
    function sendFavorRequest(event,menuInfo,arg){
    	$.ajax({
            url:arg.url,
            data:menuInfo,
            type:"post",
            async:false,
            success:function(data){
            	if(data=="error") return;
            	//不同浏览器下获取当前点击元素
                var clickSymbol = event.currentTarget;
                if(clickSymbol==null)clickSymbol = event.srcElement;
                if(clickSymbol==null)clickSymbol = event.originalTarget;
                switch(arg.optType){
                case "add":
                	clickSymbol.className = "fa fa-star ue-vmenu-icon-r";
                	clickSymbol.title = L.getLocaleMessage("home.Tip4","取消收藏");
            		var item = eval("(" + data + ")");
                	favoriteMenu.push(item);
                    break;
                case "cancel":
                	clickSymbol.className = "fa fa-star-o ue-vmenu-icon-r";
                	clickSymbol.title = L.getLocaleMessage("home.Tip12","收藏");
            		favoriteMenu.removeByMenuId(menuInfo.menuId);
                    break;
                case "delete":
                	favoriteMenu.removeByMenuId(menuInfo.menuId);
                	if(leftMenuView.pMenuName()==L.getLocaleMessage("home.Tip2","我的收藏")){
                		leftMenu.removeByIndex(arg.index);
                    	leftMenuView.menuList(leftMenu);
                	}else{
                		var leafNodes = $(".leaf").parent().parent();
                		for(var i = 0 ; i < leafNodes.length; i++){
                			if(leafNodes[i].id==menuInfo.menuId){
                				$(leafNodes[i]).find(".fa.fa-star.ue-vmenu-icon-r").removeClass("fa fa-star ue-vmenu-icon-r").addClass("fa fa-star-o ue-vmenu-icon-r");
                				break;
                			}
                		}
                	}
                    break;
                default:
                    break;
               }
                if(!$("#favoritesMore").hasClass("more"))
            		$("#favoritesMore").addClass("more");
                
                if(favoriteMenu.length == 0){
                	favoritesMenuView.menuList(favoriteMenu);
                	$("#favoritesMore").removeClass("more");
                	$("#favoritesMore").css({"text-align":'center',"cursor":'default',"background-color":'#ffffff'});
            		$("#favoritesMore").text(L.getLocaleMessage("home.Tip15","无收藏"));
            	}else if(favoriteMenu.length > 6){
            		favoritesMenuView.hideList(favoriteMenu.slice(6));
            		favoritesMenuView.menuList(favoriteMenu.slice(0,6));
            		$("#favoritesMore").css({"cursor":'pointer',"background-color":'#eee'});
            		$("#favoritesMore").text(L.getLocaleMessage("home.more","更多"));
            	}else{
            		favoritesMenuView.menuList(favoriteMenu);
            		$("#favoritesMore").removeClass("more");
            		$("#favoritesMore").text("");
            	}
            },
            error:function(){
            	$.dialog({
        	        type: 'alert',
        	        content: L.getLocaleMessage("home.Tip18","操作出错！"),
        	        autofocus: true        	        
        	    }).showModal();
              }
        });
    }
    
    function logout(){
    	$.dialog({
			type: 'confirm',
		    content: L.getLocaleMessage("home.Tip19","您确定要退出系统吗？"),
		    ok: function () {
//		    	delCookies("topMenu,favoritesMenu,initModelName,leftMenu,ifram");
		    	document.location.href= context + "/logout";
		    	},
		    cancel: function () {},
		    autofocus: true
	    }).showModal();
    }    
    
	Array.prototype.removeByIndex=function(index){
        if(isNaN(index)||index>=this.length){
            return false;
        }
        for(var i=0,n=0;i<this.length;i++){
            if(this[i]!=this[index]){
                this[n++]=this[i];
            }
        }
        this.length-=1;
    };
    
	Array.prototype.removeByMenuId=function(menuId){
		for(var i = 0 ; i < this.length; i++){
			if(this[i].menuId==menuId){
				this.removeByIndex(i);
				break;
			}
		}
    };
    
    function toggleSide() {
    	if (!$('.ue-menu-left').data('isClose')) {
        	$('.ue-menu-right').css({'border-left':'1px solid #ddd'}).animate({left:'0px'}, "slow");
        	$('.ue-menu-left').css({'z-index':'auto'});
        	$('.ue-menu-left').data('isClose', true);
    	} else {
        	$('.ue-menu-right').css({'border-left':'none'}).animate({left:'260px'}, "slow");
        	$('.ue-menu-left').data('isClose', false);
    	}
    }
    //主页面搜索框中提示信息处理
    $(function(){
	    $("#searchform-input").keyup(function(){
		      //当输入框有按键输入同时输入框不为空时，去掉背景图片；有按键输入同时为空时（删除字符），添加背景图片
		      destyle();
		     });
		$("#searchform-input").keydown(function(){
			//keydown事件可以在按键按下的第一时间去掉背景图片
			$("#searchform-input").removeClass("search_hint");
		});
    });
    //动态添加或移除提示信息
	function destyle(){
	      if($("#searchform-input").val() != ""){
	        $("#searchform-input").removeClass("search_hint");
	      }else{
	        $("#searchform-input").addClass("search_hint");
	      }
	}
    
    function showSearch(searchImg){
    	$("#searchview").show();
 	    //初始状态添加背景图片
 	    $("#searchform-input").addClass("search_hint");
 	    //当输入框为空时，添加背景图片；有值时去掉背景图片
 	    destyle();
    	$("input[name=searchform-input]").focus();
    	$(searchImg).hide();
    }
    
    function searchCancel(){
    	$("#searchform-input").val("");
    	$("#searchview").hide();
    	$("#searchImg").show();
    }
    //查询
    function doQuery(){
    	var menuName = $("#searchform-input").val();
    	//显示原始工作区，隐藏门户页面
		if($(".ue-menu-wrap").css('display')=='none'){
			$(".portal-wrap").hide();
    		$(".ue-menu-wrap").show();
		}
      	$.ajax({
            url:context+"/service/home/menu/query",
            data:{menuName:menuName},
            type:"post",
            async:false,
            success:function(data){
            	leftMenuView.menuList([]);
            	leftMenuView.PMenuIcon(favoritesModel.iconPath),
            	leftMenuView.pMenuName(L.getLocaleMessage("home.Tip20","查询结果"));
            	$('.ue-right-top').text(L.getLocaleMessage("home.Tip20","查询结果"));
            	var menuArray = eval(data);
            	if(menuArray.length!=0){
            		leftMenuView.menuList(menuArray);
                	menuRender();
    	    		afterRender();
            		loadUrl(menuArray[0]);
            	}
            }
        });
    	
    }
    
    function query(e){
   	  var ev= window.event||e;
   	  //回车键
   	  if (ev.keyCode == 13) {
      //执行搜索
      doQuery();
   	  }
    }
    
    function showFavorites(data){
    	//显示原始工作区，隐藏门户页面
		if($(".ue-menu-wrap").css('display')=='none'){
			$(".portal-wrap").hide();
    		$(".ue-menu-wrap").show();
		}
		leftMenuView.pMenuName(L.getLocaleMessage("home.Tip2","我的收藏")); 
		leftMenuView.PMenuIcon(favoritesModel.iconPath);
	  	leftMenuView.menuList(favoriteMenu);
		leftMenuView.pUrl(favoritesModel.url);
		leftMenu = favoriteMenu.slice(0,favoriteMenu.length);
	    menuRender();
	    afterRender();
	    if(data!=undefined&&data.url!=undefined){
	    	loadUrl(data);
	    }else{
	    	loadUrl(favoritesModel);
	    }
    }
    //根据initModelName加载模块
    function loadData(){
    	if(initModelName==""||initModelName==null||initModelName==L.getLocaleMessage("home.Tip2","我的收藏")){
    		getMenu(favoritesMenuView,"favoritesMenu");  
    		showFavorites();
    	}else{
    		getMenu(topMenuView,"topMenu"); 
    		for(var i=0; i < topMenu.length; i++){
    			if(topMenu[i].text==initModelName){
    			    topMenuView.getSubMenu(topMenu[i]);
    				break;
    			}
    		}
    	}
    }
    //根据showPortalFrame加载模块
    function showPortal(showPortalFrame){
    	if(showPortalFrame==null||showPortalFrame==""||showPortalFrame==false){
    		$(".portal-wrap").hide();
    		$(".ue-menu-wrap").show();
    	}else{
    		$(".ue-menu-wrap").hide();
    		$(".portal-wrap").show();
    	}
    }
    //保存菜单到cookie中
    function setCookie(name, value){
    	document.cookie = name + "=" + escape(value);
    }
    //获取cookie中的菜单
    function getCookie(name) {
    	var cookies = document.cookie;
    	var menu_cookies = cookies.split(';');
    	for (var i = 0; i <  menu_cookies.length; i++) {
    		var arr = menu_cookies[i].split("=");
    		if (arr[0] == name||arr[0] ==" "+name){
    			return unescape(arr[1]);
    		}
    	}
    	return null;
    }
    //删除cookie中的菜单
    function delCookies(name){
    	var cookes = name.split(",");
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    for(var i = 0; i != cookes.length; ++i){
	    	var cval=getCookie(cookes[i]);
	   	    if(cval!=null)
	   	    document.cookie= cookes[i] + "="+cval+";expires="+exp.toGMTString();
	    }
    }