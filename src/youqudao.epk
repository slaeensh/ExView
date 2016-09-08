ExView.Plugins({
	info: {
		name: "有趣岛漫画",
		version: "2.1",
		db: "youqudao",
		icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUmxPsAltgVi9knuvUZk+AAvP0enuscmeYBjtMosfB93/4ore0ipfERg9EAf8H////7H/3yAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUCJljWHMGAhiyVoHBGoYDoXJy7x6G8jAkyL1///9fKBtDwvv//9+/e8gGEfn/j52hACTyD8goBqv5Z85QDKTfv39owuD8HsSCMEBqTBiU3/9/9/7dCyMGzffv/gO1T2LQ7ut49+7di0kMt3eDwV6Gu1AAANz3XG1lICT3AAAAAElFTkSuQmCC',
		apihost:"http://yqd.mobi/",
		pagetitle:["<br>","收藏","每周推荐","类型","下载"],
		download:true,
		lazyload:true,
		setting:true,
		cdn:""//"http://127.0.0.1/proxy.php?"
	},
	set: function(args) {
		args = args || {};
		ExView.modules.commentpage.toolbar = '';
		ExView.modules.commentpage.buttons = '<a href="#" class="link" onclick="ExView.modules.commentpage.openpage(ExView.modules.commentpage.tmp.openpageflag);"><i class="icon icon-comment-white"></i></a><a href="#" class="link" onclick="ExView.workers.comment.loader(ExView.modules.commentpage.tmp.flag);"><i class="icon icon-refresh"></i></a>';
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
				if (!args.front && !args.page) setnowlistname("每周推荐", "", pluginfo(args.plugin).icon);
				/*if (!args.front && !args.page) {
					//addcardlist('<div align="center" class="list-block threat"><img src="img/logo.png"/><br>正在加载每周推荐...<div class="progress"></span></div>', 2);
					addtypelist('<div align="center" class="list-block"><img src="img/logo.png"/><br>正在加载类型...<div class="progress"></span></div>', 2)
				}*/
				return {
					url: pluginfo(args.plugin).apihost+"web/reconmend",
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
							setnowlistname("每周推荐", "", pluginfo(args.plugin).icon);
						}
						//addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2);
						ExView.fw.hidePreloader();
						mySession.isloading = 0;
						ExView.fw.alert("网络错误！", "ExView")
					},
					canclefn: function() {
						if (!args.page) {
							setnowlistname("每周推荐", "", pluginfo(args.plugin).icon);
						}
						//addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2);
					},
					showinfo: {
						text: '正在加载...' + ((args.page > 1) ? '<br>第' + args.page + '页' : ''),
						name:'每周推荐',
						title: mySession.nowlistname,
						img: mySession.nowlistimg
					}
				}
			},
			finder: function(args) {
				return {
					reg: /<li>\s*\r*\n*\r*\s*<a\s*href=".*?albumId=(.*?)"><img\s*src="(.*?)".*?\/><\/a>\s*\r*\n*\r*\s*<p><a\s*href="">(.*?)<\/a><\/p>/g,
					str: args.result,
					find: "$1" + "{{separator}}" + "$2" + "{{separator}}" + "$3" ,
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						rr=rr||"";
						rr=rr.split("{{separator}}");
						if (array_count(rr)) {
							var pid=rr[0];
							var img=rr[1];
							var title=rr[2];
								addcardlist({
									pid: pid,
									title: title,
									img: img,
									comment: 1
								})								
							

						} else {
							addcardlist('<div align="center" class="list-block"><img src="img/logo.png"/><br>没有内容</div>', 2)
						}
					},
					errorfn: function() {
						if (!args.page) {
							setnowlistname("每周推荐", "", pluginfo(args.plugin).icon)
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
						mySession.nowlistpages = "-1" + "|" + "每周推荐" + "|" + "index";
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
					url: pluginfo(args.plugin).apihost+"web/category",
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
					title: '每周推荐',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "daohang",
						title: "导航"
					},
					content: '每周推荐'
				});
				addtypelist({
					tid: 'zuixin',
					listflag: 'jslast',
					title: '最新',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "daohang",
						title: "导航"
					},
					content: '最新'
				});
				addtypelist({
					tid: 'remen',
					listflag: 'jshot',
					title: '热门',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "daohang",
						title: "导航"
					},
					content: '热门'
				});				
				return {
					reg: /<li.*?>\s*\r*\n*\r*\s*<a\s*href=".*?"><img\s*src="(.*?)"\s*width="100%"\s*alt=""\/><\/a>\s*\r*\n*\r*\s*<div\s*class="category"><a\s*href=".*?categoryId=(\d+)&page=1">(.*?)<\/a>/g,
					str: args.result,
					find: "$1" + "{{separator}}" + "$2"+ "{{separator}}" + "$3",
					successfn: function(rr) {
						rr = rr.split("{{separator}}");
						if (array_count(rr)) {
							var tid=rr[1];
							var img=rr[0];
							var title=rr[2];
							addtypelist({
								tid: tid,
								title: title,
								img: img,
								//listbg:true,
								group: {
									name: "fenlei",
									title: "分类"
								},
								content: title
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
					url: pluginfo(args.plugin).apihost+ "web/list/"+(mySession.nowlistflag||"jssearch")+"?page="+(args.page||1)+"&categoryId=" + args.keyword,
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
					json:true,
					str: args.result,
					successfn: function(rr) {
						rr=rr.data;
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
				return {
					url: pluginfo(args.plugin).apihost+ "web/list/jssearch?page="+(args.page||1)+"&keyWord="+encodeURIComponent(args.keyword)+"&categoryId=0",
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
					json:true,
					str: args.result,
					successfn: function(rr, arr, i) {
						rr=rr.data;
						console.log(rr);
						if (array_count(rr)) {
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
					url: pluginfo(args.plugin).apihost+ "web/album/detail?albumId=" + args.pid,
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
					reg: /<li.*?><a\s*href=".*?workId=(\d+)&albumName=(.*?)"><span>(\d+)<\/span><\/a><\/li>/g,
					str: args.result,
					find: {
						pid: args.pid,
						cid: "$1",
						title: "第$3话"
					},
					//"$1" + "|" + "$2" + "|" + "$3",
					successfn: function(rr, arr, i, result) {
						if (array_count(rr)) {
							if(!args.checkupdate){

								additemlist({
									id: i,
									newest: (args.newest && i == 0),
									pid: rr.pid,
									cid: rr.cid,
									title: rr.title,
									count: arr.length,
									reverse: 0
								})
								
							}else{
								var rr=result[result.length-1];
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
					reg: /<section\s*class="mh_d">\s*\r*\n*\r*\s*<p\s*class="hot_box"><img\s*src="(.*?)".*?\/><\/p>\s*\r*\n*\r*\s*<article\s*class="hot_box1">\s*\r*\n*\r*\s*<header>\s*\r*\n*\r*\s*<div>\s*\r*\n*\r*\s*<p\s*class="tx">\u63d0\u4f9b\u5546\uff1a(.*?)<\/p>\s*\r*\n*\r*\s*<p\s*class="tx">\u4f5c\u8005\uff1a(.*?)<\/p>\s*\r*\n*\r*\s*<p\s*class="fl">.*?>(\d+)<\/span><\/p>\s*\r*\n*\r*\s*<\/div>\s*\r*\n*\r*\s*<\/header>\s*\r*\n*\r*\s*<\/article>\s*\r*\n*\r*\s*<\/section>\s*\r*\n*\r*\s*<p\s*class="mh_d1">((?:.|[\r\n])*?)<\/p>/g,
					str: args.result,
					find: "$1" + "{{separator}}" + "$2" + "{{separator}}" + "$3" + "{{separator}}" + "$4"+ "{{separator}}" + "$5",
					successfn: function(rr, arr, i, result) {
						rr=rr||"";
						rr=rr.split("{{separator}}");						
						var img=rr[0];
						var author=rr[2];
						var hot=rr[3];
						var description=rr[4];
						var title=getstr(/<title>(.*?)<\/title>/,args.result);
						var authors=author?author.split("/"):[];
						authors=authors.map(function(item){
							return gettag(item);
						});
						setlistpic({
							name: title,
							img: img,
							added: args.data,
							description: "<p>"+"【作者】"+author+"<br>"+"【热度】"+hot+"<br>【简介】"+description+"</p>",
							comment: 1,
							preview: 0,
							tags: gettag(title)+authors.join("")
						});
						return true
					}
				}
			}
		},
		parseflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost+ "web/album/work?workId=" + args.cid ,
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
					reg: /<div\s*id="img\d".*?><img\s*src="(.*?)".*?\/><\/div>/g,
					str: args.result,
					find: "$1",
					successfn: function(rr, arr, i, result) {
						if (array_count(result)) {
							var source =result;
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
				args.noclean=0;
				ExView.modules.commentpage.tmp.flag = args;
				ExView.modules.commentpage.tmp.openpageflag = {
					url: "http://www.youqudao.com/comic/"+args.pid+".htm",
					title: args.title + " - 有趣岛评论"
				};
				$$("#commentpage-title").html("评论 - " + args.title);
				ExView.modules.commentpage.tmp.page=ExView.modules.commentpage.tmp.page||1;
				return {
					url: pluginfo(args.plugin).apihost+ "web/album/comment?albumId="+args.pid+"&page="+(ExView.modules.commentpage.tmp.page||1),
					method: "GET",
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
    return {
        reg: /<p\s*class="fl"><img\s*src="(.*?)".*?\/><\/p>\s*\r*\n*\r*\s*<div>\s*\r*\n*\r*\s*<p\s*class="tl\s*fl">(.*?)<\/p>\s*\r*\n*\r*\s*<p\s*class="tl1\s*fr">(.*?)<\/p>\s*\r*\n*\r*\s*<\/div>\s*\r*\n*\r*\s*<h1>(.*?)<\/h1>/g,
        str: args.result,
        find: "$1{{separator}}$2{{separator}}$3{{separator}}$4",
        successfn: function(rr) {
			//["http://cache.youqudao.com/phone/icon/1931243?2","漫友1931243","2015-11-29 23:42","好棒"]
			//alert(JSON.stringify(rr));
			console.log(JSON.stringify(rr));
//return false;
rr=rr||"";
rr=rr.split("{{separator}}");

			if(array_count(rr)){
				//alert(123);
				ExView.modules.myMessages.prependMessage({text:rr[3],name:rr[1],avatar:("'"+rr[0]+"'),url('img/logo.png'"),type:"received",label:"",day:rr[2],time:""}, true);
				ExView.modules.commentpage.tmp.more=1;		
			}else{
				ExView.modules.commentpage.tmp.more=0;
				//return true;
			}
        },
		errorfn:function(){
			
				ExView.fw.hidePreloader();
				mySession.isloading = 0;	
		},
		afterfn:function(){
			if(ExView.modules.commentpage.tmp.more){
				ExView.modules.commentpage.tmp.page++;
				if($$($$(".message-last")[0]).offset().top>=-21){
						ExView.modules.commentpage.tmp.flag.noclean=1;
						ExView.workers.comment.loader(ExView.modules.commentpage.tmp.flag);		
				}
			}
				ExView.fw.hidePreloader();
				mySession.isloading = 0;
$$("#commentpage")[0].onscroll=function(){
	console.log($$(this).offset().top);
	if($$(this).offset().top===0){
		
		if(ExView.modules.commentpage.tmp.more){
			ExView.modules.commentpage.tmp.flag.noclean=1;
			ExView.workers.comment.loader(ExView.modules.commentpage.tmp.flag);			
		} 

	} 
	
}			
				
		}
    }
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
					url: pluginfo(args.plugin).apihost + "web/list/jslast?page="+(args.page||1)+"&categoryId=zuixin",
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
					json:true,
					str: args.result,
					successfn: function(rr) {
						rr=rr.data;
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
					url: pluginfo(args.plugin).apihost + "web/list/jshot?page="+(args.page||1)+"&categoryId=remen",
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
					json:true,
					str: args.result,
					successfn: function(rr) {
						rr=rr.data;
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
		pagedeal: function(rr, args) {
			args = args || {};
							
							rr.forEach(function(item){
				var pid=item.albumId;
				var img=item.coverPic;
				var title=item.name;
				var author=item.author;
				var type=item.label;
				var newest=item.descriptions;
				var update=new Date(parseInt(item.updateTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
				//addcardlist(rr[0],rr[3],rr[1],rr[6]);
				var content=update;
				

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
									name:'【'+author+'】'+title,
									img: img,
									stitle: update,
									content:('【'+type+'】') +newest,
									comment: 1
								})								
							});
		}
	}
})