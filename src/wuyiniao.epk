ExView.Plugins({
	info: {
    name: "无翼鸟漫画",
    version: "2.1",
    db: "wuyiniao",
	icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA2FBMVEUAAAACAwMAAAAAAAAAAAAAAABDTkcvODIAAAAaHxwAAAAAAAAAAAD///8AAAD5+v/Cx+Tl6f3y9P7q7f7Dy/paXn7i5v24v+T29/7b4PzP1fv29vmwuvbt7fOyueOstOPAwti7vNKlqs2orMV9g65la4xeYG7u8f7e4/3W3PzL0vueqvff4e+8weWyu+HGyOCyt9yrsducpNq1utWpr9SVnNF7hciRlsSKkMOfprmXmbmCh7ianrWLj7KTl612hKhydqRrbn5UV3VQU19DRU82Nz8tMD4YHBkoOqvEAAAADXRSTlMA58eXt9fLj1jnp4d4zmHGjQAAALJJREFUGNNFz1UOwzAQRVEHyp3Y4XKwKTMzt/vfUSexotw/H+lZGkIUrEiylK3N2EeoZmBrlPZX75yUAqMAULOClyhzcBAwzTpHcgGh+DVU4KQebiiSudnVgadOSzjpzDwdUokqCHzR8NoAlCk4MdQewKi1v7cTIGVzMdeMVsNaHjmQnHlqBr4OTReoHYPYrdfcSfKxHookkfXAGFKA8VUgSbLwuIQO859CPj1RUrBf/PwD0MARxEnQkL8AAAAASUVORK5CYII=',
	apihost:"http://m.hooxx.net/",
	pagetitle:["<br>","收藏","列表","类型","下载"],
	lazyload:true,
	download:true,		
	setting:true,
	theme:"orange",	
	cdn:""//"http://127.0.0.1/proxy.php?"
	},
	set: function(args) {
		args = args || {};
		ExView.modules.commentpage.toolbar = '';
		ExView.modules.commentpage.buttons='<a href="#" class="link" onclick="ExView.modules.commentpage.openpage(ExView.modules.commentpage.tmp.openpageflag);"><i class="icon icon-comment-white"></i></a><a href="#" class="link" onclick="ExView.workers.comment.loader(ExView.modules.commentpage.tmp.flag);"><i class="icon icon-refresh"></i></a>';
	},
	unset: function(args) {
		args = args || {};
		ExView.modules.commentpage.toolbar = '';
		ExView.modules.commentpage.buttons = '';
	},
	init: function() {
		ExView.workers.fav.listloader({
			callback: function() {
				ExView.workers.index.loader();
				ExView.workers.type.loader();
			}
		})
	},
	flags: {
		indexflag: {
			loader: function(args) {
				if (!args.front && !args.page) setnowlistname("首页", "", pluginfo(args.plugin).icon);
				/*if (!args.front && !args.page) {
					//addcardlist('<div align="center" class="list-block threat"><img src="img/logo.png"/><br>正在加载首页...<div class="progress"></span></div>', 2);
					//addtypelist('<div align="center" class="list-block"><img src="img/logo.png"/><br>正在加载类型...<div class="progress"></span></div>', 2)
				}*/
				return {
					url: pluginfo(args.plugin).apihost+ "dfcomiclist_"+(args.page||1)+".htm",
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						ExView.workers.index.countfinder(obj_contact(args, {
							result: result,
							header: header
						}));
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					},
					errorfn: function() {
						if (!args.page) {
							setnowlistname("首页", "", pluginfo(args.plugin).icon);
						}
						ExView.fw.hidePreloader();
						mySession.isloading = 0;
						ExView.fw.alert("网络错误！", "ExView")
					},
					canclefn: function() {
						if (!args.page) {
							setnowlistname("首页", "", pluginfo(args.plugin).icon);
						}
					},
					showinfo: {
						text: '正在加载...' + ((args.page > 1) ? '<br>第' + args.page + '页' : ''),
						title: mySession.nowlistname,
						name:'首页',
						img: mySession.nowlistimg
					}
				}
			},
			finder: function(args) {
				return {
					reg: plugfns(args.plugin).pagerule,
					str: args.result,
					find: plugfns(args.plugin).pagefind,
					//"$1" + "|" + "$2" + "|" + "$3" + "|" + "$4",
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							plugfns(args.plugin).pagedeal(rr,args)
						} else {
							addcardlist('<div align="center" class="list-block"><img src="img/logo.png"/><br>没有内容</div>', 2)
						}
					},
					errorfn: function() {
						if (!args.page) {
							setnowlistname("首页", "", pluginfo(args.plugin).icon)
						}
						ExView.fw.hidePreloader();
						mySession.isloading = 0;
						ExView.fw.alert("网络错误！", "ExView")
					}
				}
			},
			countloader: function(args) {
				return false
			},
			countfinder: function(args) {
				return {
					successfn: function() {
						mySession.nowlistpages = "0" + "|" + "首页" + "|" + "index";
						mySession.nowlistpage = 1;
						console.log(mySession.nowlistpages);
						return true
					}
				}
			}
		},
		typeflag: {
			loader: function(args) {
				addtypelist('<div align="center" class="list-block"><img src="img/logo.png"/><br>正在加载类型...<div class="progress"></span></div>', 2);
				return {
					url: pluginfo(args.plugin).apihost+ "comicsearch/",
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					}
				}
			},
			finder: function(args) {
				
				addtypelist({
					tid: '',
					listfn: 'ExView.workers.index.loader({turnpage:1,front:1})',
					title: '首页',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "daohang",
						title: "导航"
					},
					content: '首页'
				});
				return {
					reg: /lists\/(\d+)"\s*title="((?!\").*?)"/g,
					str: args.result,
					find: "$1" + "{{separator}}" + "$2",
					successfn: function(rr, arr, i, result) {
						
						if (array_count(result)) {
							result.forEach(function(item){
								item = item.split("{{separator}}");
								addtypelist({
									tid: "lists/"+item[0],
									title: item[1],
									img: pluginfo(args.plugin).icon,
									group: {
										name: "fenlei",
										title: "分类"
									},
									content: item[1]
								})								
							});
							return true;
						} else {
							addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2)
						}
					},
		beforefn:function(){
			addtypelist({tid:'a',title:"今日最热",img:pluginfo(args.plugin).icon,listflag:"top",group:{name:"daohang",title:"导航"},content:"今日最热"});
			addtypelist({tid:'b',title:"最多人看",img:pluginfo(args.plugin).icon,listflag:"top",group:{name:"daohang",title:"导航"},content:"最多人看"});
			addtypelist({tid:'c',title:"最受好评",img:pluginfo(args.plugin).icon,listflag:"top",group:{name:"daohang",title:"导航"},content:"最受好评"});
		},
		afterfn:function(){
			var biaoqians=["io9","io10"];
			var duzhequns=["io11","io12","io13","io18"];
			ExView.modules.rulefind({
				reg:/href='\/lianwan\/(\d+)' class='nav_item_\w[-\w.+]*' title='((?!\').*?)'/g,
				str:args.result,
				find:"$1{{separator}}$2",
				successfn:function(rr,arr,i){
					if(rr){
						rr = rr.split("{{separator}}");
						addtypelist({tid:'lianwan/'+rr[0],title:rr[1],img:pluginfo(args.plugin).apihost+'css/image/'+biaoqians[i]+'.png',listflag:"lianwan",group:{name:"biaoqian",title:"标签"},content:rr[1]});
					};
				}
			});
			ExView.modules.rulefind({
				reg:/href='\/(duzhequn|lists)\/(\d+)(\/|)' class='nav_item_\w[-\w.+]*' title='((?!\').*?)'/g,
				str:args.result,
				find:"$1{{separator}}$2{{separator}}$3{{separator}}$4",
				successfn:function(rr,arr,i){
					if(rr){
						rr = rr.split("{{separator}}");
						addtypelist({tid:rr[0]+'/'+rr[1],title:rr[3],img:pluginfo(args.plugin).apihost+'css/image/'+duzhequns[i]+'.png',listflag:"duzhequn",group:{name:"duzhequn",title:"读者群"},content:rr[3]});
					}
				}
			});			
		} 
				}
			},
		},
		listflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + ((mySession.nowlistflag=="top")?("top/"+args.keyword+"-"+(args.page || 1)+".htm"):(args.keyword+"/"+(args.page || 1)+"/")),
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						if (result) {
							ExView.workers.list.countfinder(obj_contact(args, {
								result: result,
								header: header
							}));
							args.successfn && args.successfn({
								result: result,
								header: header
							})
						} else {
							ExView.fw.hidePreloader();
							mySession.isloading = 0;
							ExView.fw.alert('【' + mySession.nowlistname + '】<br>获取失败！', "ExView")
						}
					},
					showinfo: {
						text: '正在加载...' + ((args.page > 1) ? '<br>第' + args.page + '页' : ''),
						title: mySession.nowlistname,
						name:'【' + mySession.nowlistname + '】',
						img: mySession.nowlistimg
					}
				}
			},
			finder: function(args) {

				return {
					reg: (mySession.nowlistflag!="top"?plugfns(args.plugin).pagerule:/<li\s*class='clearfix section1'>(.*?)<\/a>/g),
					str: args.result,
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						if (rr) {
							plugfns(args.plugin).pagedeal(rr)
						} else {
							addcardlist('<div align="center" class="list-block"><img src="img/logo.png"/><br>没有内容</div>', 1)
						}
					}
				}
			},
			countloader: function(args) {
				return false
			},
			countfinder: function(args) {
				return {
					successfn: function() {
						mySession.nowlistpages = "0" + "|" + args.keyword + "|" + "list";
						mySession.nowlistpage = 1;
						console.log(mySession.nowlistpages);
						return true
					}
				}
			}
		},
		searchflag: {
			loader: function(args) {
				if(parseInt(args.page)>1){
					args.multsearch&&args.multsearch();
					return false;
				} 				
				return {
					url: pluginfo(args.plugin).apihost + "comicsearch/s.aspx?s=" + (encodeURIComponent(args.keyword)),
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						if (result) {
							if (!args.multsearch) {
								ExView.workers.search.countfinder(obj_contact(args, {
									result: result,
									header: header
								}));
								setnowlistname("搜索【" + args.keyword + "】")
							}
							args.successfn && args.successfn({
								result: result,
								header: header
							})
						} else {
							if (!args.multsearch) {
								ExView.fw.hidePreloader();
								mySession.isloading = 0;
								ExView.fw.alert('【' + args.keyword + '】<br>获取搜索结果失败！', "ExView")
							} else {
								args.multsearch();
							}
						}
					},
					showinfo: {
						text: '正在搜索...' + ((args.page > 1) ? '<br>第' + args.page + '页' : ''),
						name:'【' + args.keyword + '】',
						title: "搜索"
					}
				}
			},
			finder: function(args) {

				return {
					reg: plugfns(args.plugin).pagerule,
					str: args.result,
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr, arr, i) {
						console.log(rr);
						if (rr) {
							plugfns(args.plugin).pagedeal(rr, args)
						} else {
							if (!args.multsearch) {
								/*mySession.nowlistpages = "-1" + "|" + args.keyword + "|" + "search";
								mySession.nowlistpage = 1;
								console.log(mySession.nowlistpages);*/
								addcardlist('<div align="center" class="list-block"><img src="img/logo.png"/><br>没有内容</div>', 1)
							} else {
								args.multsearch();
							}
						}
					}
				}
			},
			countloader: function(args) {
				return false
			},
			countfinder: function(args) {
				return {
					successfn: function(rr) {
						mySession.nowlistpages = "-1" + "|" + args.keyword + "|" + "search";
						mySession.nowlistpage = 1;
						console.log(mySession.nowlistpages)
					}
				}
			}
		},
		contentflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "mh/" + args.pid + "/",
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
/*mySession.contentinfo = {
							pid: args.pid
						};*/
						if (result) {
							args.successfn && args.successfn({
								result: result,
								header: header
							})
						} else {
							if (!args.checkupdate) {
								ExView.fw.hidePreloader();
								mySession.isloading = 0;
								ExView.fw.alert("内容页获取失败！", "ExView");
							}
						}
					},
					showinfo: {
						text: '正在加载内容页...',
						title: "内容页",
						name:getlistname(args.pid),
						img: getlistimg(args.pid)
					}
				}
			},
			finder: function(args) {
				return {
					reg: /vols\/([\_\d]+)\/'>((?!<).*?)<\/a>/g,
					str: args.result,
					find: {
						pid: args.pid,
						cid: "$1",
						title: "$2"
					},
					//"$1" + "|" + "$2" + "|" + "$3",
					successfn: function(rr, arr, i, result) {
						console.log(typeof(rr));
						if (array_count(rr)) {
if(!args.checkupdate){								
							additemlist({
								id: (arr.length - i - 1),
								newest: (args.newest && i == 0),
								pid: rr.pid,
								cid: rr.cid,
								title: rr.title,
								count: arr.length,
								reverse: 1
							})
}else{
	return {pid:rr.pid,cid:rr.cid,title:rr.title};
}							
						} else {
							if (!args.checkupdate) {
								ExView.fw.hidePreloader();
								mySession.isloading = 0;
								ExView.fw.alert("内容页获取失败！", "ExView")
							}
						}
					},
					afterfn: function() {
						if (!args.checkupdate) {
							ExView.workers.content.infofinder(args)
						}
					}
				}
			},
			infoloader: function(args) {
				return false
			},
			infofinder: function(args) {
				console.log((args));
				return {
					reg: /<div\s*class="pic">((?:.|[\r\n])*?)<\/div>/g,
					str: args.result,
					find: "$1",
					successfn: function(rr, arr, i, result) {
						rr = rr.split("{{separator}}");
						console.log(JSON.stringify(rr));
						try{
							var img=getstr(/<img\s*src='((?!\').*?)'/,rr[0]);
							var title=getstr(/<h3>((?!<).*?)<\/h3>/,rr[0]);
							var status=getstr(/<p>状态：((?!<).*?)(\d+)?<\/p>/,rr[0]);
							var update=getstr(/<p>更新日期：((?!<).*?)<\/p>/,rr[0]);
							var author=getstr(/<p>作者：((?!<).*?)<\/p>/,rr[0]);
							var type=getstr(/'>((?!<).*?)<\/a><\/p>/,rr[0]);
							var score=getstr(/<p>人气：(\d+)<\/li><\/p>/,rr[0]);
							var description=getstr(/<div\s*class="ilist">((?:.|[\r\n])*?)<\/div>/,args.result);
							if(description) description=description.replace('<h3>漫画介绍：</h3>','').replace(/<p>/g,'').replace(/<\/p>/g,'');
							var tag=gettag(type);
						}catch(e){
							
						}
						setlistpic({
							name: title,
							img: img,
							added: args.data,
							description: "<p>"+"【作者】"+author+"<br>"+"【类型】"+type+"<br>"+"【"+status+"】"+update+"<br>"+"【人气】"+score+"<br>【简介】"+description+"</p>",
							comment: 1,
							preview: 0,
							tags: gettag(title)+gettag(status)+tag+gettag(author)
						});
						return true
					}
				}
			}
		},
		parseflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "vols/" + args.cid + "/" ,
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					},
					showinfo: {
						text: '正在加载图片信息...',
						title: "图片",
						name:getlistname(args.pid),
						img: getlistimg(args.pid)
					}
				}
			},
			finder: function(args) {
var unsuan=function(s){

    var x = s.substring(s.length-1);
    var xi="abcdefghijklmnopqrstuvwxyz".indexOf(x)+1;
    var sk = s.substring(s.length-xi-12,s.length-xi-1);
    s=s.substring(0,s.length-xi-12);    
	var k=sk.substring(0,sk.length-1);
	var f=sk.substring(sk.length-1);
	for(i=0;i<k.length;i++) {
		s=s.replace(new RegExp(k.substring(i,i+1),"gi"),i);
	    //eval("s=s.replace(/"+ k.substring(i,i+1) +"/g,'"+ i +"')");
	}
    var ss = s.split(f);
	s="";
	for(i=0;i<ss.length;i++) {
	    s+=String.fromCharCode(ss[i]);
    }
    return s;
}

var getDomain=function(sPath){
	var sDS = "http://28.cao.website/dm01/|http://163.cao.website/dm14/|http://image.mlonet.com/|http://28.cao.website/dm04/|http://28.cao.website/dm05/|http://28.cao.website/dm06/|http://28.cao.website/dm07/|http://28.cao.website/dm08/|http://28.cao.website/dm09/|http://28.cao.website/dm10/|http://28.cao.website/dm11/|http://28.cao.website/dm12/|http://28.cao.website/dm13/|http://28.cao.website/dm14/|http://image.mlonet.com/|http://image.mlonet.com/";
    arrDS = sDS.split('|');
    var u = "";
    for(i=0;i<arrDS.length;i++)
    {
        if(sPath == (i+1))
        {
            u = arrDS[i];
            break;
        }
    }
    return u;
}	
				return {
					reg: /var\s*sFiles="(\w[-\w.+]*)";var\s*sPath="(\d+)";/g,
					str: args.result,
					find: "$1{{separator}}$2",
					successfn: function(rr) {
						if (rr) {
							rr=rr.split("{{separator}}");
			try{
var sFiles=rr[0];
sFiles=unsuan(sFiles);
			
var arrFiles = sFiles.split("|");
var sDomain = getDomain(rr[1]);
var source=[];
for(i=0;i<arrFiles.length;i++)
{
	source.push((sDomain + arrFiles[i]).replace(/\//g,'/'));

}
console.log(source);				
				
}catch(e){
				console.log(e);
			}	

							console.log(source);
							if (args.download) {
								chapterpredownload({
									source: source,
									download: args.download,
									plugin: args.plugin
								});
								//chapterpredownload(pagesjson, args.download,args.plugin);
							} else {
								chapterviewer({
									source: source,
									type: "image",
									startindex: (args.startindex || 0),
									lazyload: pluginfo(args.plugin).lazyload,
									zoom: true,
									title: args.title
								});
								//ExView.views.picviewer(pagesjson, (args.startindex ? args.startindex : 0), ((pluginfo(args.plugin).lazyload == true || pluginfo(args.plugin).lazyload == 'on') ? true : false), 'light', 'standalone', true, args.title)
							}
						} else {
							if(!args.download){
								ExView.fw.hidePreloader();
								mySession.isloading = 0;
								ExView.fw.alert("图片信息获取失败！","ExView");						
							}else{
									chapterpredownload({
										error: "解析错误！",
										download: args.download,
										plugin: args.plugin
									});					
							}
						}
						return true
					}
				}
			}
		},
		commentflag: {
			loader: function(args) {
				ExView.modules.commentpage.tmp.flag = args;
				ExView.modules.commentpage.tmp.openpageflag = {
					url: pluginfo(args.plugin).apihost + "mh/" + args.pid + "/",
					title: args.title + " - 无翼鸟漫画评论"
				};
				$$("#commentpage-title").html("评论 - " + args.title);
				return {
					url: "http://changyan.sohu.com/api/2/topic/load?client_id=cyqVh5aXL&topic_url="+encodeURIComponent(pluginfo(args.plugin).apihost+"mh/"+args.pid+"/")+"&page_size=30&hot_size=0&topic_source_id="+args.pid.substring(2),
					timeout: 120,
					successfn: function(result, header) {
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					},
					errorfn: function() {
						ExView.fw.hidePreloader();
						mySession.isloading = 0
					},
					showinfo: {
						text: '正在加载评论...',
						title: '评论',
						name:getlistname(args.pid),
						img: getlistimg(args.pid)
					}
				}
			},
			finder: function(args) {

	var res=JSON.parse(args.result);
	
	ExView.modules.commentpage.tmp.sid=res.topic_id;
	
	ExView.modules.commentpage.tmp.page=1;
	var comments=res.comments;
	
	ExView.modules.commentpage.tmp.pid=args.pid;
	ExView.modules.commentpage.tmp.more=res.total_page_no;
	console.log(res);
	//alert(JSON.stringify(flag));
	//comments=comments.data;
	for(var key in comments){
		ExView.modules.myMessages.prependMessage({text:comments[key].content,name:comments[key].passport.nickname,avatar:("'"+comments[key].passport.img_url+"'),url('img/logo.png'"),type:"received",label:(new Date(parseInt(comments[key].create_time)).toLocaleString().replace(/:\d{1,2}$/,' ')),day:"",time:""}, true);	
	}
	ExView.fw.hidePreloader();
	mySession.isloading = 0;
$$("#commentpage")[0].onscroll=function(){
	console.log($$(this).offset().top);
	if($$(this).offset().top===0){
		(ExView.modules.commentpage.tmp.more>ExView.modules.commentpage.tmp.page&&ExView.modules.commentpage.tmp.sid)&&ExView.modules.curl({
			url: "http://changyan.sohu.com/api/2/topic/comments?client_id=cyqVh5aXL&page_size=30&topic_id="+ExView.modules.commentpage.tmp.sid+"&page_no="+(ExView.modules.commentpage.tmp.page+1),
			timeout: 120,
			successfn: function(result, header) {
				try{
					if(result){
						var comments=JSON.parse(result);
						comments=comments.comments;
						//commentpage.tmp.more=comments.length;
						//comments=comments.data;
						for(var key in comments){
							ExView.modules.myMessages.prependMessage({text:comments[key].content,name:comments[key].passport.nickname,avatar:(comments[key].passport.img_url||"img/logo.png"),type:"received",label:(new Date(parseInt(comments[key].create_time)).toLocaleString().replace(/:\d{1,2}$/,' ')),day:"",time:""}, true);	
						}				
						//alert(JSON.stringify(comments));
						ExView.fw.hidePreloader();
						mySession.isloading = 0;
					
						if(ExView.modules.commentpage.tmp.more>ExView.modules.commentpage.tmp.page) ExView.modules.commentpage.tmp.page++;					
					}else{
						ExView.fw.hidePreloader();
						mySession.isloading = 0;	
						ExView.fw.alert("加载评论失败！","ExView");					
					}
				}catch(e){
					ExView.fw.hidePreloader();
					mySession.isloading = 0;	
					ExView.fw.alert("加载评论失败！","ExView");					
				}
			},
			errorfn:function(){
				ExView.fw.hidePreloader();
				mySession.isloading = 0;	
				ExView.fw.alert("加载评论失败！","ExView");
			},
			showinfo:{text:'正在加载评论...',title:'评论',name:getlistname(args.pid),img:getlistimg(args.pid)}
		});
	}
	
}
if(!$$(".messages").html()){
	$$(".messages").html('<div align="center" class="list-block">没有内容</div>');
}		
return false;
}
		},
		previewflag: {
			loader: false,
			finder: false,
			more: false
		},
		pageimgflag: {
			parser: false,
		},
		updateflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost+ "dfcomiclist_"+(args.page||1)+".htm",
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					}
				}
			},
			finder: function(args) {

				return {
					reg: plugfns(args.plugin).pagerule,
					str: args.result,
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							plugfns(args.plugin).pagedeal(rr, args)
						}
					}
				}
			}
		},
		hotflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "top/a-"+(args.page || 1)+".htm",
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					}
				}
			},
			finder: function(args) {

				return {
					reg: /<li\s*class='clearfix section1'>(.*?)<\/a>/g,
					str: args.result,
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							plugfns(args.plugin).pagedeal(rr, args)
						}
					}
				}
			}
		}
	},
	fns: {
		pagerule: /<li\s*class='clearfix section1'>(.*?)<\/li>/g,
		pagefind: "$1",
		pagedeal: function(rr, args) {
			args = args || {};
			rr = rr.split("{{separator}}");
			try{			
			var pid=getstr(/mh\/(\d+)'/,rr[0]);
			var img=getstr(/src='((?!\').*?)'/,rr[0]);
			var title=getstr(/>((?!<).*?)<\/h3><p>/,rr[0]);
			var author=getstr(/<\/h3><p>((?!<).*?)<\/p>/,rr[0]);
			var type=getstr(/<\/p><p>((?!<).*?)<\/p>/,rr[0]);
			var updatetime=getstr(/'color_red'>((?!<).*?)<\/span>/,rr[0]);
			var stitle=updatetime;
			var lastchapter=getstr(/class='h'>\[((?!<).*?)\]<\/span>/,rr[0]);
			//alert(lastchapter);
			var name=(lastchapter?("【"+author+"】"+title):"");
			var content=(lastchapter?("【"+type+"】"+"更新至"+lastchapter+"话"):author);
			}catch(e){}
			if (args.multupdate) {
				args.multupdate(obj_contact(args, {
					pid: pid,
					img: img,
					title: title,
					content: content
				}));
				return false;
			}
			if (args.multhot) {
				args.multhot(obj_contact(args, {
					pid: pid,
					img: img,
					title: title,
					content: content
				}));
				return false;
			}
			if (args.multsearch) {
				args.multsearch(obj_contact(args, {
					pid: pid,
					img: img,
					title: title,
					content: content
				}));
				return false;
			}
			addcardlist({
				pid: pid,
				title: title,
				name: name,
				img: img,
				content: content,
				stitle: stitle,
				comment: 1,
				preview: 0,
				extrabutton: ''
			});
		}
	}
})