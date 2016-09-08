ExView.Plugins({
	info: {
		name: "妖气漫画",
		version: "2.1",
		icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAJ5SURBVDhPrZJLSFtBFIar+ETxjSj4QkUSNYmaRBQDKiqo2RZEcSmCEAU3IvjYuTI7lxJw56KVLBoSRXRREGxIcqNNck0116aJ1Rh8pEZsieHvmaC9lq5Ke+BymWHON//553+Ff6z/A5iZmcHs7CyMRiOCgoDQ0hI8MhmcaWlwpqbioKoKn8fH4T84gMlkwsLCAiYmJkSAXq+HRCKBjJpaWlrwPjMTh9nZcOfmwp2XB1dODpy0p1QoIJfLIZVKodPpRIDVaoVGo4FKpYKWAJ6CAnwqLYWvogK+ykqclJXhqLgYI9SsVquhIJDZbBYB8XgcI0ND0JKCd3T4pLwcX+rqcNbYiK+0F6QbT6ursUuw1wTpbmtDNBoVAY+xGExFRXBmZSVuZs0Xzc24am/HdUcHwq2tCZhAXjB1lpQUXNvtIuDu+Bi2pCQc0rwGGuNNby8uBwZw19eHaH8/It3d4AYHsT46CjP54iDA+eqqCLgld+3JyfhAgNOeHnD7+3g7NwdbZydutFqs0393cxOhtTVw+fng0tMRWFkRAd+vruAgBS6SzwwT6EXOSUmkqwvfCHhNBvsbGhI+MDMdpCK8sSECWLnIGM/kJHianR1kM4eUSlyS6xdNTQgQ1FtfD/fUFOyFhfhBl7L6BbixWMAxEw0GHM3PgyfjTmpq4KuthZfgPAWNZyOUlECYnn7qegFgdba4CAelzzU8DGFnB0EyN+D1QtjehmdsDByFiydjHx8enjpeAFgW7u/vwVOMHZQ8jkA2arCRKmdGBuy0dtAr3IbDibPP9QfA7/eD29uDa3kZPM3Lvo+kjNvags/nQyQSQYxy81y/jfD3BfwEx7T2MF5j1s4AAAAASUVORK5CYII=",
		db: "yaoqmh",
		apihost:"http://m.yaoqmh.com/",//"http://picaman.picacomic.com/",//"http://cc.xwind.ml/picacomic/picaman_picacomic/"
		pagetitle:["<br>","收藏","首页","类型","下载"],
		download:true,
		lazyload:true,
		cachepath: "ExView/Cache/YAOQMH",
		cacheheader:{"Referer":"http://m.yaoqmh.com/"},
		nativeres: true,
		clearcache: true,
		theme:"red",
		setting:true,
		cdn:""//"http://127.0.0.1/proxy.php?"
	},
	set: function(args) {
		args = args || {};
		ExView.modules.settingpage.extra = '<li><div class="item-content"><div class="item-media"><i class="icon icon-form-toggle"></i></div><div class="item-inner"><div class="item-title label">自动清除页面缓存</div><div class="item-input"><label class="label-switch"><input name="clearcache"  type="checkbox"/><div class="checkbox"></div></label></div></div></div></li>';
	},
	unset: function(args) {
		args = args || {};
		ExView.modules.settingpage.extra = '';
	},
	init: function() {
		ExView.workers.fav.listloader({
			callback: function() {
				ExView.workers.index.loader();
			}
		})
	},
	flags: {
		indexflag: {
			loader: function(args) {
				//if (!args.front && !args.page) setnowlistname("首页", "", pluginfo(args.plugin).icon);
				if (!args.front && !args.page) {
					//setnowlistname("首页", "", pluginfo(args.plugin).icon);
					//addcardlist('<div align="center" class="list-block threat"><img src="img/logo.png"/><br>正在加载首页...<div class="progress"></span></div>', 2);
					addtypelist('<div align="center" class="list-block"><img src="img/logo.png"/><br>类型<br>正在加载...<div class="progress"></span></div>', 2)
				}
				return {
					url: pluginfo(args.plugin).apihost,
					method: "GET",
					timeout: 120,
					successfn: function(result, header) {
						ExView.workers.index.countfinder(obj_contact(args, {
							result: result,
							header: header
						}));
						if (!args.front&& !args.page) {
						ExView.workers.type.finder({
							result: result,
							plugin: args.plugin
						});
						}
						args.successfn && args.successfn({
							result: result,
							header: header
						})
					},
					errorfn: function() {
						if (!args.front &&!args.page) {
							//setnowlistname("首页", "", pluginfo(args.plugin).icon);
						
						addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2);
						}
						//alert(111);
						mySession.customerror();
						
					},
					canclefn: function() {
						if (!args.front &&!args.page) {
							//setnowlistname("首页", "", pluginfo(args.plugin).icon);
					
						addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2);
							}
					},
					showinfo: {
						text: '正在加载...' + ((args.page > 1) ? '<br>第' + args.page + '页' : ''),
						name:'首页',
						title: mySession.nowlistname,
						img: mySession.nowlistimg
					}
				}
			},
			finder: function(args) {
				return {
					reg:/<li\s*>\s*<a\s*href="\/((?!\").*?).html"\s*title="((?!\").*?)"\s*target="_blank"><img(?!\").*?rc="((?!\").*?)"/g,
					str: args.result,
					find:plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							rr = rr.split("{{separator}}");
							plugfns(args.plugin).pagedeal(rr,args);
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
						mySession.nowlistpages = "-1" + "|" + "首页" + "|" + "index";
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
					successfn: function() {
						ExView.workers.index.loader()
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
					reg: /<li><a\s*href="(?!\").*?\/(\w[-\w.+]*)\/">((?!<).*?)<\/a>\s*<\/li>/g,
					str: getstr(/<div\s*id="menu">((?:.|[\r\n])*?)<\/div>/,args.result),
					find: "$1" + "{{separator}}" + "$2",
					successfn: function(rr) {
						rr=rr||"";
						rr = rr.split("{{separator}}");
						if (array_count(rr)) {
							
							
							
				if(rr[0]!="xieejuntuan"){
					addtypelist({tid:rr[0],title:rr[1],img:pluginfo(args.plugin).icon,group:{name:"fenlei",title:"分类"},content:rr[1]});
				}else{
					ExView.modules.curl({
        url: pluginfo(args.plugin).apihost+rr[0]+"/",
        method: "GET",
        timeout: 120,
		successfn: function(result, header) {
			ExView.modules.rulefind({
        reg:/<li\s*>\s*<a\s*href="\/(\w[-\w.+]*)\/"\s*target="_blank"\s*title="((?!\").*?)"\s*><img(?!\").*?src="((?!\").*?)"/g,
        str: result,
		find:"$1{{separator}}$2{{separator}}$3",
        successfn: function(rr) {
			rr=rr||"";
			rr=rr.split("{{separator}}");
			if(array_count(rr)){
				addtypelist({tid:rr[0],title:rr[1],img:getcoverload((rr[2]||"").replace("http://www.yaoqi.cc/",pluginfo(args.plugin).apihost),{cacheheader:{"Referer":"http://m.yaoqmh.com/"},loadingimg:mySession.blankimg}),group:{name:"xieejuntuan",title:"漫画大全",fontsize:"16px"},content:rr[1],listbg:true});
			}
		},showinfo:''			
			});
		}				
					});
					
				}							
							
							
							
							
							
							
							
							
							
							
							
							

						} else {
							//addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2)
						}
					}
				}
			},
		},
		listflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost+args.keyword+"/"+(args.page>1?"list_"+mySession.extralistpage+"_"+args.page+".html":""),
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
					}
				}
			},
			finder: function(args) {

				return {
					reg: plugfns(args.plugin).pagerule,
					str: args.result,
					find: plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						if (rr) {
							rr = rr.split("{{separator}}");
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
					reg:/<a\s*href='list_(\d+)_(\d+).html'>\u672b\u9875<\/a>/g,
					str:args.result,
					find:"$1{{separator}}$2",					
					successfn: function(rr) {
						rr=rr||"";
						rr=rr.split("{{separator}}");
						mySession.nowlistpages = (rr[1]||"-1") + "|" + args.keyword + "|" + "list";
						mySession.nowlistpage = 1;
						mySession.extralistpage = rr[0];	
						console.log(mySession.nowlistpages);
						return true
					}
				}
			}
		},
		searchflag: {
			loader: function(args) {
				return {
					url: "http://zhannei.baidu.com/cse/search?q="+encodeURIComponent(args.keyword)+"&p="+(args.page||1)+"&s=2618091304794420160&entry=1",
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
				var rule=/<a\s*class="result"\s*href="\s*(?!\").*?\/(\w[-\w.+]*)\/(\d+)\.html\n*\s*"\s*target="_self">\s*\r*\n*\r*\s*<div\s*class="result-title">(.*?)_\u5996\u6c14\u6f2b\u753b\u7f51<\/div>/g;
				if(window.navigator.userAgent.toLowerCase().indexOf("windows")!=-1){
					rule=/<a\s*rpos=""\s*cpos="title"\s*href="(?!\").*?\/(\w[-\w.+]*)\/(\d+)\.html"\s*target="_blank">(.*?)_\u5996\u6c14\u6f2b\u753b\u7f51<\/a>/g;
				}
				return {
					reg: rule,
					str: args.result,
					find: "$1{{separator}}$2{{separator}}$3",
					successfn: function(rr, arr, i) {
						if (rr) {
							rr=rr.split("{{separator}}");
							rr=[rr[0]+"_"+rr[1],rr[2],"img/nopic.png"];
							console.log(rr);
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
						mySession.nowlistpages = "0" + "|" + args.keyword + "|" + "search";
						mySession.nowlistpage = 1;
						console.log(mySession.nowlistpages)
					}
				}
			}
		},
		contentflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost+ args.pid.replace(/_/g,"/")+".html",
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
					successfn: function(rr, arr, i, result) {
						console.log(typeof(rr));
						if (array_count(rr)) {
							var arr=1;
if(!args.checkupdate){
						var result=new Array();
						for(var i=0;i<arr;i++){	
							result[i]=additemlist({
								id: i,
								newest: (args.newest && i == 0),
								pid: args.pid,
								cid: (i+1),
								title: "全"+(i+1)+"话",
								count: arr,
								reverse: 1
							})
						}	
						return result;
}else{
	return {pid:args.pid,cid:arr,title:"全"+arr+"话"};
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
					successfn: function(rr, arr, i, result) {
						var title=getstr(/<h1\s*class="ptitle\s*fc1"><strong>(.*?)<\/strong><\/h1>/g,args.result);
						var img=getstr(/<img\s*alt="(?!<).*?"\s*src="((?!<).*?)"\s*\/>/g,args.result);
						setlistpic({
							name: title,
							img: getcoverload(img,{cacheheader:{"Referer":"http://m.yaoqmh.com/"}}),
							added: args.data,
							description: '',
							comment: 0,
							preview: 0,
							tags: gettag(title)
						});
						return true
					}
				}
			}
		},
		parseflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost+args.pid.replace(/_/g,"/")+".html",
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
					reg: /<a>\u5171(\d+)\u9875:\s*<\/a>/g,
					str: args.result,
					find: "$1",
					successfn: function(rr) {
						if (rr) {
				var source=new Array();
				
				if(rr){
					rr=rr.split("{{separator}}");
					var arr=rr[0];
				}else{
					var arr=1;
				}
				
				
				for(var i=0;i<arr;i++){
					//source[i]="http://about:blank?"+pluginfo(args.plugin).apihost+args.pid.replace(/_/g,"/")+(i>0?("_"+(i+1)):"")+".html";
					source[i]=getpageload(pluginfo(args.plugin).apihost+args.pid.replace(/_/g,"/")+(i>0?("_"+(i+1)):"")+".html",args.plugin) ;
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
					reg: /<img\s*alt="(?!<).*?"\s*src="((?!<).*?)"\s*\/>/g,
					str: args.result,
					find: "$1",
					successfn: function(rr) {
						args.loadimgurl(getimgload(rr,args.plugin,{cacheheader:{"Referer":"http://m.yaoqmh.com/"}}));
					}
				}				
			}
		}/*{
			reloader: function(args) {
				console.log(args);
				var container = args.container;
				var reload = args.reload;
				var imgnow = $$(container).find("img");
				if (!imgnow.attr("data-nl-src")) {
					ExView.workers.pageimg.coreloader({
						container: container
					});
					return false
				}
				ExView.fw.confirm("重新获取图片?", "ExView", function() {
					ExView.workers.pageimg.coreloader({
						container: container,
						reload: reload
					})
				}, function() {
					if (imgnow.attr("src")) {
						if (!imgnow.attr("data-src")) {
							imgnow.attr("data-src", imgnow.attr("src"))
						}
						imgnow.attr("src", "img/logo.png");
						imgnow.attr("src", imgnow.attr("data-src"));
						console.log(imgnow.attr("data-src"))
					} else {
						imgnow.attr("src", imgnow.attr("data-src"))
					}
				})
			},
			loader: function(args) {
				return { //http://exhentai.org/s/851f40422f/908522-3
					url: args.url,
					method: "GET",
					timeout: 120,
					nativerequest: pluginfo(args.plugin).nativeres,
					showinfo: "" //((pluginfo(args.plugin).lazyload==true||pluginfo(args.plugin).lazyload=='on')?null:"")
				};
			},
			success: function(args) {
				var pagedom = args.pagedom;
				var pageurl = args.pageurl;
				var url = args.url;
				return function(result, header) {
					if (result) {
						ExView.modules.rulefind({
							reg: /<img\s*alt="(?!<).*?"\s*src="((?!<).*?)"\s*\/>/g,
							str: result,
							find: "$1",
							successfn: function(rr, arr, i, result) {
								if (rr) {
									var imgurl = ((rr.substr(0, 2) == "//") ? ("http:" + rr) : rr);
									if (pluginfo(args.plugin).cdn && imgurl.substring(0, 4) == "http" && imgurl.indexOf("http://about:blank?") == -1) {
										imgurl = pluginfo(args.plugin).cdn + imgurl.replace(pluginfo(args.plugin).cdn, "")
									}
									var imgcache = ExView.modules.getimgcache(imgurl, function(name, fullPath, entry, pid, imgurl) {
										var imgcachepath = fullPath;
										$$(pagedom).attr("data-src", imgcachepath);
										$$(pagedom).attr("src", imgcachepath);
										$$(pagedom).attr("onerror", "this.src='img/nopic.png';")
									}, function(error) {
										$$(pagedom).attr("src", 'img/nopic.png');
										ExView.fw.hidePreloader();
										mySession.isloading = 0
									});
									if (imgcache) {
										$$(pagedom).attr("onerror", "this.src='img/loading.png';");
										return true
									}
									$$(pagedom).attr("data-src", imgurl);
									$$(pagedom).attr("src", imgurl);
									$$(pagedom).attr("onerror", "this.src='img/nopic.png';")
								} else {
									$$(pagedom).attr("src", "img/nopic.png")
								}
								return true
							}
						});
						$$(pagedom).attr("data-nl-src", pageurl);
						ExView.fw.hidePreloader();
						mySession.isloading = 0
					} else {
						ExView.fw.hidePreloader();
						mySession.isloading = 0;
						ExView.fw.alert("图片信息获取失败！", "ExView")
					}
				}
			},
			error: function(args) {
				var pagedom = args.pagedom;
				var pageurl = args.pageurl;
				var url = args.url;
				return function(error) {
					$$(pagedom).attr("src", "img/nopic.png")
				}
			},
			download: function(args) {
				var pageurl = args.pageurl;
				var mimetype = args.mimetype;
				var runcore = args.runcore;
				var callback = args.callback;
				if (pageurl.indexOf("http://about:blank?") == 0) pageurl = pageurl.substring(("http://about:blank?").length);
				return {
					url: pageurl,
					method: "GET",
					timeout: 120,
					nativerequest: pluginfo(args.plugin).nativeres,
					successfn: function(result, header) {
						ExView.modules.rulefind({
							reg: /<img\s*alt="(?!<).*?"\s*src="((?!<).*?)"\s*\/>/g,
							str: result,
							find: "$1",
							successfn: function(rr, arr, i, result) {
								if (rr) {
									var imgurl = rr || "";
									if (pluginfo(args.plugin).cdn && imgurl.substring(0, 4) == "http" && imgurl.indexOf("http://about:blank?") == -1) {
										imgurl = pluginfo(args.plugin).cdn + imgurl.replace(pluginfo(args.plugin).cdn, "")
									}
									ExView.modules.curl({
										url: imgurl,
										method: "GET",
										timeout: 120,
										mimetype: mimetype,
										successfn: function(result, header) {
											runcore && runcore(result)
										},
										showinfo: '',
										errorfn: function() {
											callback && callback()
										}
									});
									return true
								} else {
									callback && callback()
								}
								return true
							}
						})
					},
					showinfo: ''
				}
			}
		}*/,
		updateflag: {
			loader: function(args) {
				if(args.page>1){
					args.multupdate();
					return false;
				} 
				return {
					url: pluginfo(args.plugin).apihost,
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
					reg:/<li\s*>\s*<a\s*href="\/((?!\").*?).html"\s*title="((?!\").*?)"\s*target="_blank"><img(?!\").*?rc="((?!\").*?)"/g,
					str: args.result,
					find:plugfns(args.plugin).pagefind,
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						if (rr) {
							rr = rr.split("{{separator}}");
							plugfns(args.plugin).pagedeal(rr, args)
						}
					}
				}
			}
		},
		hotflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "shaonvmanhua/"+(args.page>1?"list_4_"+args.page+".html":""),
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
							rr = rr.split("{{separator}}");
							plugfns(args.plugin).pagedeal(rr, args)
						}
					}
				}
			}
		}
	},
	fns: {
		pagerule: /<li\s*>\s*<a\s*href="\/((?!\").*?).html"\s*title="((?!\").*?)"\s*target="_blank"><img(?!\").*?xSrc="((?!\").*?)"/g,
		pagefind: "$1" + "{{separator}}" + "$2" + "{{separator}}" + "$3",
		pagedeal: function(rr, args) {
			args = args || {};
			var pid=rr[0].replace(/\//g,"_");
			var title=rr[1];
			var img=getcoverload(rr[2],{cacheheader:{"Referer":"http://m.yaoqmh.com/"},loadingimg:"img/loading.png"});
			var content = '';
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
				img: img,
				content: content,
				comment: 0,
				preview: 0,
				extrabutton: ''
			});
		}
	}
})