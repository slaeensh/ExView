ExView.Plugins({
	info: {
		name: "MyManga漫画",
		version: "2.1",
		icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAsVBMVEUAAAATHW1Nl+IfN4ggJG1RouxRoetNmOJUo+xFhtIkOoNGh9RbpOlCf8onJnFJjdZKlN5IkNtDhtFRoetLlN1OnulGidU/f80lR5pLmOQoS5tOmOIRJX42Z7JGidIXKoBDf8dHjtpBfMZPnuhHj9wcLntYpu0sT5w0Yq9Ii9ZBd8E6bbUbNIY7ZaoZKX05X6cqTppTqPJUp/BTpO5SpvBRoexPnulNmuVKlOBKj9g2bbztXC+4AAAAMXRSTlMADacTBvvu67RvUTgiGQT28vHq4t3Szc3HvLSxsbCfn5mMh4J/fHFgX1hNSEZDOjEldBQS8QAAAJBJREFUGNOdjkcWwjAMRGU7PRB6770XS3YC3P9g2IYHOxb8hd7M12bgPzwG6XK2WJfePeW9uIUoMXIm2zWk9ElaorIRcWAjKXuRGzNAF7UxiIoLmPvSogpFhBjs4dJEZ/KC8tu90gdvqs0fpX7Uu5NVcgY4hUika53hkWWvWWNS1VEi2GfoIWxvTPsitlf4wRPsmxOnb02v1QAAAABJRU5ErkJggg==",
		db: "mymanga",
		apihost: "http://www.mymanga.me/",
		pagetitle: ["<br>", "Favorite", "Index", "Type", "Download"],
		lazyload: true,
		download: true,
		setting: true,
		gallerymode:true,
		typelistmode:true,
		theme:'bluegray',
		cdn: "" //"http://127.0.0.1/proxy.php?"
	},
	set: function(args) {
		args = args || {};
	},
	unset: function(args) {
		args = args || {};
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
				//if (!args.front && !args.page) setnowlistname("Index", "", pluginfo(args.plugin).icon);
				/*if (!args.front && !args.page) {
					//addcardlist('<div align="center" class="list-block threat"><img src="img/logo.png"/><br>正在加载Index...<div class="progress"></span></div>', 2);
					addtypelist('<div align="center" class="list-block"><img src="img/logo.png"/><br>类型<br>正在加载...<div class="progress"></span></div>', 2)
				}*/
				return {
					url: pluginfo(args.plugin).apihost,
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
					}/*,
					errorfn: function() {

						addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2);
						ExView.fw.alert("网络错误！", "ExView")		
					},
					canclefn: function() {
						if (!args.page) {
							setnowlistname("Index", "", pluginfo(args.plugin).icon);
						}
						addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2);
					}*/,
					showinfo: {
						text: '正在加载...' + ((args.page > 1) ? '<br>第' + args.page + '页' : ''),
						name:'Index',
						title: mySession.nowlistname,
						img: mySession.nowlistimg
					}
				}
			},
			finder: function(args) {
				return {
					reg: /class="col-md(.*?)<exview>/g,
					str: getresult(args.result).replace(/<footer/g,"<exview><footer").replace(/class="col-md/g,'<exview>class="col-md'),
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						if (rr) {
							plugfns(args.plugin).pagedeal(rr,args,1)
						} else {
							addcardlist('<div align="center" class="list-block"><img src="img/logo.png"/><br>没有内容</div>', 1)
						}
					}
				}				
				/*return {
					reg: /<div\s*class="col-md(.*?)><\/span>/g,
					str: getresult(args.result),
					find: "$1",
					//"$1" + "|" + "$2" + "|" + "$3" + "|" + "$4",
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							
							var pid=getstr(/\/manga\/((?!\\).*?)\//,rr);
							var title=getstr(/<h3(?!<).*?>\s*((?!<).*?)\s*<\/h3>/,rr);
							var img=getstr(/data-src="((?!\").*?)"/,rr);
							var stitle=getstr(/class="timeago"\s*title="((?!\").*?)"/,rr).split("+")[0].replace("T"," ");
							//alert([pid,title,img,content]);
							//return false;

							addcardlist({
								pid: pid,
								title: title,
								img: img,
								content: "",
								stitle:stitle,
								comment: 0
							})
						} else {
							addcardlist('<div align="center" class="list-block"><img src="img/logo.png"/><br>没有内容</div>', 2)
						}
					},
					errorfn: function() {
						if (!args.page) {
							setnowlistname("Index", "", pluginfo(args.plugin).icon)
						}
						ExView.fw.hidePreloader();
						mySession.isloading = 0;
						ExView.fw.alert("网络错误！", "ExView")
					}
				}*/
			},
			countloader: function(args) {
				return false
			},
			countfinder: function(args) {
				return {
					successfn: function() {
						mySession.nowlistpages = "-1" + "|" + "Index" + "|" + "index";
						mySession.nowlistpage = 1;
						console.log(mySession.nowlistpages);
						return true
					}
				}
			}
		},
		typeflag: {
			loader: function(args) {
				//addtypelist('<div align="center" class="list-block"><img src="img/logo.png"/><br>类型<br>正在加载...<div class="progress"></span></div>', 2);
				return {
					url: pluginfo(args.plugin).apihost+ "manga-directory/",
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
					title: 'Index',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "navigation",
						title: "Navigation"
					},
					content: 'Index'
				});
				addtypelist({
					tid: '',
					title: 'Latest-Release',
					listflag:"latest-release",
					img: pluginfo(args.plugin).icon,
					group: {
						name: "navigation",
						title: "Navigation"
					},
					content: 'Latest-Release'
				});		
				addtypelist({
					tid: '',
					title: 'Hot-Manga',
					listflag:"hot-manga",
					img: pluginfo(args.plugin).icon,
					group: {
						name: "navigation",
						title: "Navigation"
					},
					content: 'Hot-Manga'
				});		
				addtypelist({
					tid: 'all',
					title: 'All',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "manga-directory",
						title: "Manga Directory"
					},
					content: 'All'
				});						
				/*addtypelist({
					tid: '0',
					listflag: 'hot',
					title: '风云榜',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "daohang",
						title: "导航"
					},
					content: '风云榜'
				});*/
				
				return {
					reg: /<option\s*value="(\w+)">([\w,\/]+)<\/option>/g,
					str: args.result,
					find: {"name":"$1","title":"$2"},
					successfn: function(rr) {
						
						if (array_count(rr)) {
							if(rr.name=="views") return false;
							addtypelist({
								tid: rr.name,
								title: rr.title,
								img: pluginfo(args.plugin).icon,
								group: {
									name: "manga-directory",
									title: "Manga Directory"
								},
								content: rr.title
							})
							
						} else {
							addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2)
						}
						
					}
				}
			},
		},
		listflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost +((mySession.nowlistflag=="latest-release"||mySession.nowlistflag=="hot-manga")?(mySession.nowlistflag+"/"+(args.page||1)):("manga-directory/"+args.keyword+"/views")),
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
						name:'【' + mySession.nowlistname + '】',
						title: mySession.nowlistname,
						img: mySession.nowlistimg
					}/*,
		encoding:"gb2312"*/
				}
			},
			finder: function(args) {
				return {
					reg: (mySession.nowlistflag!="latest-release"?plugfns(args.plugin).pagerule:/<div\s*class="col-md(.*?)><\/span>/g),
					str: getresult(args.result),
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						if (rr) {
							plugfns(args.plugin).pagedeal(rr,args,(mySession.nowlistflag=="latest-release"?1:0))
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
					reg:/totalPages:\s*(\d+)\s*,/g,
					str:args.result,
					find:"$1",					
					successfn: function(rr) {
						mySession.nowlistpages = (rr||"0") + "|" + args.keyword + "|" + "list";
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
					url: pluginfo(args.plugin).apihost + "inc/search.php?keyword=" + (args.keyword),
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
					}/*,
		encoding:"gb2312"*/
				}
			},
			finder: function(args) {

				return {
					json:true,
					str: args.result,
					successfn: function(rr, arr, i) {
						console.log(rr);
						if (array_count(rr)) {
							plugfns(args.plugin).pagedeal(rr, args,2)
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
					url: pluginfo(args.plugin).apihost + "manga/" + args.pid,
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
					reg: /<a href="\/manga\/([\w,\d,\_]+)\/(\d+)\/1">\s*(?!<).*?\s*(\d+)\s*<\/a>/g,
					str: getresult(args.result),
					find: {
						pid: "$1",
						cid: "$2",
						title: "Chapter "+"$3"
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
					reg: /<div\s*class="manga-cover">(.*?)<div\s*class="fb-like/g,
					str: getresult(args.result),
					find: "$1" ,
					successfn: function(rr, arr, i, result) {
						//alert(rr);
						console.log(JSON.stringify(rr));
						var img = getstr(/<img(?!<).*?src="((?!\").*?)"/,rr);
						var title=gettext(getstr(/<b>Name:\s*<\/b>((?!<).*?)<br/,rr));	
						var update=gettext(getstr(/<b>Year\s*of\s*Release:\s*<\/b>((?!<).*?)<br/,rr));	
						var author = gettext(getstr(/<b>Author:\s*<\/b>((?!<).*?)<br/,rr));	
						var type = gettext(getstr(/<b>Genre:\s*<\/b>(.*?)<br/,rr).trim().replace(/<\/a>/g,"</a>,"));
						var newest = gettext(getstr(/<b>Status:\s*<\/b>((?!<).*?)<br/,rr));
						var description = (getstr(/<b>Sypnosis:\s*<\/b>(.*?)<a\s*id="btnAddToMangaList/,rr));
						var tag = gettag(type);
						tag=type.split(",").map(function(item){
							return gettag(item.trim());
						}).join("");
						tag+=author.split(",").map(function(item){
							return gettag(item.trim());
						}).join("");
						setlistpic({
							name: title,
							img: img,
							added: args.data,
							description: "<p>" + "【Author】" + author + "<br>" + "【Type】" + type.split(",").join(" ").trim().split(" ").join(",") +  "<br>【Status】" + newest + "<br>" + "【Year of Release】" + update + "<br>" +"【Sypnosis】" + description + "</p>",
							comment: 0,
							preview: 0,
							tags: gettag(title)+gettag(status)+tag,
							sourceurl:pluginfo(args.plugin).apihost + "manga/" + args.pid 
						});
						return true
					}
				}
			}
		},
		parseflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "manga/" + args.pid + "/" + args.cid + "/1",
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
				console.log(args);
				return {
					reg: />(\d+)<\/option>\s*<\/select>/g,
					str: args.result,
					find: "$1",
					successfn: function(rr,arr,i,result) {
						
						if (parseInt(rr)) {
							var pagecont=parseInt(rr);
							//alert(pagecont);
							var source =[];
							for(var i=1;i<pagecont+1;i++){
								source.push(getpageload(pluginfo(args.plugin).apihost+"manga/"+args.pid+"/"+args.cid+"/"+i,(args.plugin||mySession.nowplugin),{cache:false}));
							}
							//var serverUrl = getstr(/var\s*serverUrl\s*=\s*'(.*?)'\s*;/,args.result)||'http://tkpic.um5.cc';

							/*alert(JSON.stringify(source));
						return true;*/
							
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
			loader: false,
			finder: false
		},
		previewflag: {
			loader: false,
			finder: false,
			more: false
		},
		pageimgflag: {
			parser:function(args){//[pagedom,pageurl,url,result,loadimgurl]
				return {
					reg: /class="img-responsive"\s*src="((?!\").*?)"/g,
					str: args.result,
					find: "$1",
					successfn: function(rr) {

						
						args.loadimgurl(rr);
						
						
					}
				}				
			}
		},
		updateflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "latest-release/" + (args.page || 1),
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					}/*,
		encoding:"gb2312"*/
				}
			},
			finder: function(args) {

				return {
					reg: /<div\s*class="col-md(.*?)><\/span>/g,
					str: getresult(args.result),
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							plugfns(args.plugin).pagedeal(rr, args,1)
						}
					}
				}
			}
		},
		hotflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "hot-manga/" + (args.page || 1),
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					}/*,
		encoding:"gb2312"*/
				}
			},
			finder: function(args) {

				return {
					reg: plugfns(args.plugin).pagerule,
					str: getresult(args.result),
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							plugfns(args.plugin).pagedeal(rr, args,0)
						}
					}
				}
			}
		}
	},
	fns: {
		pagerule: /<div\s*class="col-md(.*?)><\/a>/g,
		pagefind: "$1",
		pagedeal: function(rr, args,type) {
			args = args || {};
				/*return {
					reg: /<div\s*class="col-md(.*?)><\/span>/g,
					str: getresult(args.result),
					find: "$1",
					//"$1" + "|" + "$2" + "|" + "$3" + "|" + "$4",
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							
							var pid=getstr(/\/manga\/((?!\\).*?)\//,rr);
							var title=getstr(/<h3(?!<).*?>\s*((?!<).*?)\s*<\/h3>/,rr);
							var img=getstr(/data-src="((?!\").*?)"/,rr);
							var stitle=getstr(/class="timeago"\s*title="((?!\").*?)"/,rr).split("+")[0].replace("T"," ");
							//alert([pid,title,img,content]);
							//return false;

							addcardlist({
								pid: pid,
								title: title,
								img: img,
								content: "",
								stitle:stitle,
								comment: 0
							})
						} else {
							addcardlist('<div align="center" class="list-block"><img src="img/logo.png"/><br>没有内容</div>', 2)
						}
					},
					errorfn: function() {
						if (!args.page) {
							setnowlistname("Index", "", pluginfo(args.plugin).icon)
						}
						ExView.fw.hidePreloader();
						mySession.isloading = 0;
						ExView.fw.alert("网络错误！", "ExView")
					}
				}*/			
			
			//alert(rr);
		
			
			switch(type){
				default:
				case 0:
					var img=getstr(/data-src="((?!\").*?)"/,rr);
					var title=getstr(/class="manga-details(?!\").*?">\s*((?!<).*?)\s*</,rr);					
/*title=title.split(" ");
var content="Chapter "+title.pop();
title=title.join(" ");	*/					
					var pid=getstr(/\/manga\/((?!\").*?)"/,rr);
					var stitle=getstr(/"label">(\d+)\s*views<\/span>/,rr)+" Views";	
					var content=stitle;
					stitle="";
				break;				
				case 1:
			
					var img=getstr(/data-src="((?!\").*?)"/,rr);
					var title=getstr(/class="manga-details\s*hot">\s*((?!<).*?)\s*</,rr);	
					if(title){
						var pid=getstr(/\/manga\/((?!\").*?)"/,rr);
						var stitle=getstr(/"label">(\d+)\s*views<\/span>/,rr)+" Views";	
						var content=gettext(getstr(/class="latest-hot-chapter">(.*?)<\/div>/,rr));
content=content.split(" ");
var content="Chapter "+content.pop();						
					}else{
						
					
					
var title=getstr(/class="manga-details(?!\").*?">\s*((?!<).*?)\s*</,rr);						
title=title.split(" ");
var content="Chapter "+title.pop();
title=title.join(" ");			
					var pid=getstr(/\/manga\/((?!\").*?)[\/,\"]+/,rr);	
					var stitle=getstr(/class="timeago"\s*title="((?!\").*?)"/,rr).split("+")[0].replace("T"," ");		
}		
					
				
				break;
				case 2:
				//alert(rr);
					var pid=rr.permalink;			
					var title=rr.manga;	
					var img="img/nopic.png";
					var stitle="";
					var content="";
				break;

			}
			
			
			//alert([pid,img,status,title,author,type,newest,update]);
			//return false;
//			var content = newest;
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
			/*var imgwidth=document.body.clientWidth*0.33;
			var imgheight=imgwidth/0.75;*/
			/*if(!$$("#card-page").find(".gallerymode").length){
				$$("#card-page").html('<div class="gallerymode" style="width:100%;height:100%;line-height:0;text-align: center;"></div>');
			}
			$$("#card-page").find(".gallerymode").append('<div class="card_'+pid+'" onclick="ExView.workers.content.loader({pid:\''+pid+'\'});" style="float:left;  display: inline-block;width: 33.3%;height:33.3vh;height:calc(33.3vw / 0.75)"><img style="width:100%;height:100%;background-image:url(img/logo.png)" src="'+img+'"/><div style="position: relative;height: 1.2em;background: black;overflow: hidden;margin-top: -1.2em;opacity: 0.8;color: white;display: block;"><div style=" line-height: 1.2;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">'+title+'</div></div></div>');
			return false;*/
			if(!title) alert(rr);
			addcardlist({
				pid: pid,
				title: title,
				name:   title ,
				img: img,
				content: content,
				stitle: stitle,
				comment: 0,
				preview: 0,
				extrabutton: ''
			});
		}
	}
})