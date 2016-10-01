# 2.2框架指南起草中

# ExView 插件开发指南  
##前言  
ExView插件本地安装文件为epk格式，需用ExView自带文件管理器打开，按右上角安装按钮来进行安装;开发需要在全局设置那里打开调试模式  
##一.基本架构  
	ExView插件  
	|---info(配置) //使用pluginfo函数可调用此区域，如：pluginfo(args.plugin).name  
	|		|-name  
	|		|-version  
	|		|-icon  
	|		|-db  
	|		|-author  
	|		|-apihost  
	|		|-cdn  
	|		|-type //image|text  
	|		|-typeName //漫画|条漫|轻小说  
	|		|-description //插件简介  
	|		|-theme //主题色："blue","red","pink","purple","deeppurple","indigo","lightblue","cyan","teal","green","lightgreen","lime","yellow","amber","orange","deeporange","brown","gray","bluegray","black"  
	|		|-pagetitle:["<br>","收藏","首页","类型","下载"]  
	|		|-download:true //是否开启下载功能  
	|		|-setting:true //是否开启设置功能  
	|		|-lazyload:true //图片延迟加载  
	|		|-nativeres:true //本地请求，对于要改UA，Referer的要开  
	|		|-vphotomode:true //图片连续浏览模式  
	|		|-watermode:true //瀑布流模式  
	|		|-gallerymode:true //图库模式  
	|		|-typelistmode:true //类型列表界面  
	|		|-landscapemode //横屏模式  
	|		|-animation //开启动画效果  
	|		|-nightmode //暗夜模式  
	|		|-listallmode //连续列表模式  
	|		|-slidemode //拖动模式  
	|		|-autoturnpage //总是跳转首页  
	|		|-elegancemode //优雅界面  
	|		|-smallpicmode //小图界面  
	|		|-nopicmode //无图界面  
	|		|-cardleftpicmode //通用界面  
	|		|-bottombar //底栏界面  
	|		|-...  
	|  
	|---set(预设)  
	|		|-function(args) //此处为插件进入时预设区域
	|  
	|---unset(清理)  
	|		|-function(args) //此处为插件退出时清理区域  
	|  
	|---init(初始化)  
	|		|-function(args) 
	|  
	|---flags(规则)  
	|		|-indexflag(首页规则)  
	|		|		|-loader //发起请求  
	|		|		|-finder //处理数据  
	|		|		|-countloader //页数  
	|		|		|-countfinder //页数 
	|		|-typeflag(类型规则)  
	|		|		|-loader(args)  
	|		|		|-finder(args)  
	|		|-listflag(类型内页规则)  
	|		|		|-loader(args)  
	|		|		|-finder(args)  
	|		|		|-countloader(args)  
	|		|		|-countfinder(args)  
	|		|-searchflag(搜索规则)  
	|		|		|-loader(args)  
	|		|		|-finder(args)
	|		|		|-countloader(args)  
	|		|		|-countfinder(args)  
	|		|-contentflag(内容页规则)  
	|		|		|-loader(args) //目录  
	|		|		|-finder(args) //目录  
	|		|		|-infoloader(args) //简介信息  
	|		|		|-infofinder(args) //简介信息  
	|		|-parseflag(解析规则)  
	|		|		|-loader(args)  
	|		|		|-finder(args) 
	|		|-commentflag(评论页规则)  
	|		|		|-loader(args)  
	|		|		|-finder(args) 
	|		|-previewflag(预览页规则)  
	|		|		|-loader(args)  
	|		|		|-finder(args)  
	|		|-pageimgflag(图片页解析规则)  
	|		|		|-parser(args) 
	|		|-updateflag(最新更新规则)  
	|		|		|-loader(args)  
	|		|		|-finder(args) 
	|		|-hotflag(热门推荐规则)  
	|				|-loader(args)  
	|				|-finder(args) 
	|  
	|---fns(寄存) //寄存插件变量和函数的区域，可用plugfns调用此区域，如：plugfns(args.plugin).pagedeal()  

##二.请求处理模块  
###1.请求模块ExView.modules.curl  
	ExView.modules.curl({  
		url:""  
		...  
	})  
###2.数据处理模块ExView.modules.rulefind  
####2.1 正则处理  
	ExView.modules.rulefind({  
		reg:/<div class="(.*)">(.*)<\/div>/g,  
		str:result,  
		find:"$1|$2",//"$1|$2"或{class:"$1",value:"$2"}  
		successfn:function(rr, arr, i, result){  
			//rr为匹配到当前指针的项  
			//i为当前指针  
			//arr为匹配到的所有全项		  
			//result为匹配到的所有项  
		},  
		...  
	});  
####2.2 JSON_API处理  
	ExView.modules.rulefind({  
		json:true,  
		str:result,  
		successfn:function(rr, arr, i, result){  
			//rr为匹配到当前指针的项  
			//i为当前指针  
			//arr为匹配到的所有全项		  
			//result为匹配到的所有项  
		},  
		...  
	});  
####2.3 使用选择器处理  
	ExView.modules.rulefind({  
		query:true,  
		str:result,  
		selector:".test li:child(3)",  
		successfn:function(rr, arr, i, result){  
			//rr类型为HTMLObj  
			//rr为匹配到当前指针的项  
			//i为当前指针  
			//arr为匹配到的所有全项		  
			//result为匹配到的所有项  
		},  
		...  
	});    
##三.基本函数  
	plugfns(args.plugin) //调用寄存区的变量和函数
	pluginfo(args.plugin) //返回储存的插件设置
	pluginfo(args.plugin,true) //返回默认的插件设置
	pluginfo(args.plugin,true,key,value) //修改储存的插件设置中的某一个项
	mySession.nowpluginfo //临时设置集合
	mySession.nowplugin //当前插件
	mySession.gobalsettings //全局设置集合
	getresult(str) //返回删除所有行的字符串
	getstr(reg,str,index) //单独正则处理字符，返回一个String值  
	getstrs(str,reg,find) //正则处理字符，返回一个Array值  
	getquery(str,selector) //选择器处理字符，返回一个Array值  
	gettag(keyword) //获取标签值  
	gettags(str,reg,find) //正则处理字符获取标签值  
	getimgload(imgurl,plugin,flag) //转换为exview处理链接，flag{cachename cachepath cacheheader cachedata nativeres(Native Client请求，false则不能设置cacheheader) cache successfn errorfn loadingimg errorimg}  
	getpageload(pageurl,plugin,flag) //同上  
	getcoverload(imgurl,flag) //同上  
	getcommonload(imgurl,flag) //同上  
	getcdnload(img,cdnpath) //获取添加CDN地址后的链接  
	setexviewurl(img,flag,key,value,plugin) //修改exview链接的flag配置,设置flag就可不设置key,value;plugin为设置其他插件  
	slidetopage(int) //跳转页面  
	addcardlist(flag, type) //添加卡片，flag:type=0|Object {pid title stitle name img content comment preview extrabutton};type=1|后加,flag=HTMLString;type=2|覆盖,flag=HTMLString;type=1|前加,flag=HTMLString  
	addtypelist(flag, type) //添加类型，flag:type=0|Object {tid title img content listflag group listfn listbg};type=1|后加,flag=HTMLString;type=2|覆盖,flag=HTMLString;type=1|前加,flag=HTMLString  
	additemlist(flag, type) //添加目录，flag:type=0|Object {id newest pid cid title count reverse group };type=1|后加,flag=HTMLString;type=2|覆盖,flag=HTMLString;type=1|前加,flag=HTMLString  
	setlistpic(args) //设置内容页简介，{pid name img isadded description comment preview tags sourceurl more}  
	obj_contact(obj,objext) //Object混合成一个新Object  
	getlistname(pid,plugin) //获取项目的名称  
	getlistimg(pid,plugin,source) //获取项目的图片路径，source为boolean值，表返回来源值  
	chapterpredownload(args) //设置下载解析回调 {source download plugin}  
	chapterviewer(args,readtype,handle) //设置浏览解析回调 {source type startindex lazyload zoom title}  
	ExView.tools.base64.encode(str) //返回base64值  
	ExView.tools.base64.decode(base64str) //返回string值  
	ExView.tools.md5.hex_md5(str) //返回MD5值  
	ExView.fw.hidePreloader();//隐藏弹窗Model  
	ExView.fw.alert(...);//提示弹窗  
	ExView.fw.confirm(...);//确认弹窗  
	ExView.fw.propmt(...);//输入弹窗
	ExView.fw.modalLogin(...);//登陆弹窗
	ExView.fw.modalPassword(...);//密码弹窗
	ExView.fw.showIndicator();//显示加载指示器
	ExView.fw.hideIndicator();//隐藏加载指示器
	...  
  
##四.后语  
累死啦，相信你也看不明白，去找个插件源码改改不就成啦，蛤蛤蛤蛤蛤蛤~