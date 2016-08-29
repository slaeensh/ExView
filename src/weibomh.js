ExView.Plugins({
	info: {
		name: "微漫画",
		version: "2.1",
		icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABSlBMVEUAAADjThvmUx/gSRbDPg7iTxypKQDZSRfpUh7aTBnIPg/SQhGuLgLIQRDvWCKyNAfOQxO4OArwWiSpKQDORRTuURysMATqUx/SRxXiShepKgC+OwyzNAe3NAeuMgXjUR28OAqtMAPTSBa0NQivMgXqViGvMwa7Ogu2Nwn/45X/2Y3/1Ir/zIP/yoLcVyPQRxXMQRHXQRC4NQizMQT/7p7/6pr/5Zf+35T/25D/0Yj/zob/x4H/w37+v3r4s2/zl1brj1HhgkXXeD/QYCvqXSfTWiXgUR7fThvZSxjUSBayMwe7LwL70of4zIL/xX7/w333wnr1vHb7tnP2q2rvrmnrqGXzomPqomH2nV7pjlHpi03fi03qhEfxfkLXekHadj7ndjzocznbZS3gZC3LYCzIXyvJUyDqVB/WUx/ERxbCPQ66PA22Ow3ENAcfh2H6AAAAKXRSTlMAwxH73M+8qEga+e7l4N/Avbq2tLOwpaOjk46Jfnp2aGJXS0Q2MhQNB7QEA1QAAADFSURBVBjTY8AOOET5hJgQXCbxWHuXdFU4n5PVRdfEnllekpGRAyzP6u4WYZvI7OYQ484IEmD3MPTQ0zM0TNDUTGYH8pU8PaMCfHxDkvSC7DK4JTgZRAwiLbQsNE1MHfX1DVz1BRh4Dex0dCy1tczMXHMdzUO5GFiywqz9dK20tUyjvR3MA1kYpI2cbW38rXUsNZ28M+PTFBjUBY2dg22ASsKzjYyMZYHWaMjw5KQ4xaV6GXvxK0OcqqYoJczGJianwkAUAABg1CGtEFC04QAAAABJRU5ErkJggg==",
		db: "weibomh",
		apihost:"http://manhua.weibo.cn/",
		pagetitle:["<br>","收藏","首页","类型","下载"],
		download:true,
		lazyload:true,
		nativeres:true,
		vphotomode:true,
		watermode:true,
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
				if (!args.front && !args.page) setnowlistname("首页", "", pluginfo(args.plugin).icon);
				/*if (!args.front && !args.page) {
					//addcardlist('<div align="center" class="list-block threat"><img src="img/logo.png"/><br>正在加载首页...<div class="progress"></span></div>', 2);
					addtypelist('<div align="center" class="list-block"><img src="img/logo.png"/><br>正在加载类型...<div class="progress"></span></div>', 2)
				}*/
				return {
					url: pluginfo(args.plugin).apihost+"comic/home/ajax_index_recommend",
					method: "POST",
					data:"page="+(args.page||1),
					timeout: 120,
					nativerequest:pluginfo(args.plugin).nativeres,
					header: {
						"content-type": "application/x-www-form-urlencoded","Referer":pluginfo(args.plugin).apihost
					},
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
						//addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2);
						ExView.fw.hidePreloader();
						mySession.isloading = 0;
						ExView.fw.alert("网络错误！", "ExView")
					},
					canclefn: function() {
						if (!args.page) {
							setnowlistname("首页", "", pluginfo(args.plugin).icon);
						}
						//addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2);
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
					json: true,
					str: args.result,
					successfn: function(rr) {
						console.log(JSON.stringify(rr));
						rr=(rr||{}).data.data;
						if (array_count(rr)) {
							rr.forEach(function(item){
								addcardlist({
									pid: getstr(/c\/(\d+)/g,item.link_url),
									title: item.title,
									img: item.image_url,
									stitle: item.chapter_num,
									comment: 1
								})										
							});

				

							
						

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
					json:true,
					str:args.result,
					successfn: function(rr) {
						try{
							var pagecount=Math.ceil(rr.data.total_num/10);
							return {pagecount:pagecount}
						}catch(e){}
					}
				}
			}
		},
		typeflag: {
			loader: function(args) {
				//addtypelist('<div align="center" class="list-block"><img src="img/logo.png"/><br>正在加载类型...<div class="progress"></span></div>', 2);
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
				addtypelist({
					tid: '',
					listflag: 'new',
					title: '更新',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "daohang",
						title: "导航"
					},
					content: '更新'
				});
				addtypelist({
					tid: '',
					listflag: 'top',
					title: '排行',
					img: pluginfo(args.plugin).icon,
					group: {
						name: "daohang",
						title: "导航"
					},
					content: '排行'
				});				
				return {
					reg: /\/i\/category\/(\d+)">((?!<).*?)</g,
					str: args.result,
					find: "$1" + "{{separator}}" + "$2",
					successfn: function(rr) {
						rr = rr.split("{{separator}}");
						if (array_count(rr)) {
							addtypelist({
								tid: rr[0],
								title: rr[1],
								img: pluginfo(args.plugin).icon,
								group: {
									name: "fenlei",
									title: "分类"
								},
								content: rr[1]
							})
						}/* else {
							addtypelist('<div align="center" class="list-block"><a href="javascript:void(0);" onclick="ExView.workers.type.loader();"><img src="img/logo.png"/><br>加载失败，请刷新重试！</a></div>', 2)
						}*/
					}
				}
			},
		},
		listflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + (mySession.nowlistflag?(mySession.nowlistflag=="top"?"comic/home/ajax_rank_list?rank_type=read":"comic/home/ajax_recent_update?page="+(args.page||1)):"comic/home/ajax_category?page="+(args.page||1)+"&cate_id="+args.keyword),
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
						if (array_count(rr)) {
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
					json:true,
					str:args.result,
					successfn: function(rr) {
						if(rr.total_num){
							var pagecount=Math.ceil(rr.total_num/20);
						}else{
							var pagecount=-1;
						}
						return {pagecount:pagecount}
					}
				}
			}
		},
		searchflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost+"comic/home/ajax_search",
					method: "POST",
					data:"kw="+encodeURIComponent(args.keyword)+"&page="+(args.page||1),
					timeout: 120,
					nativerequest:pluginfo(args.plugin).nativeres,
					header: {
						"content-type": "application/x-www-form-urlencoded","Referer":pluginfo(args.plugin).apihost
					},
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
					json:true,
					str:args.result,
					successfn: function(rr) {
						if(rr.total_num){
							var pagecount=Math.ceil(rr.total_num/20);
						}else{
							var pagecount=-1;
						}
						return {pagecount:pagecount}
					}
				}
			}
		},
		contentflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "c/" + args.pid,
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
					reg: /\/p\/(\d+)" class="V_CLR_G6"><div class="dir_c T_ellipsis">((?!<).*?)<\/div>/g,
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
								id: i,
								newest: (args.newest && i == 0),
								pid: rr.pid,
								cid: rr.cid,
								title: rr.title,
								count: arr.length,
								reverse: 0
							})
}else{
	rr=obj_contact(result).pop();
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
				//return false;
				return {
					json:true,
					str:getstr(/_BFD.BFD_INFO\s*=\s*(.*?)\s*;/g,getresult(args.result)),
					successfn: function(rr, arr, i, result) {
						
						var img = rr.pic;
						var title = rr.title;
						var update = getLocalTime(rr.ptime*1000);
						var author = rr.author;
						var tags = rr.kw;
						//var description = getstr(/class="description_intro">\s*((?!<).*?)\s*<\/span>/,rr);
						setlistpic({
							name: title,
							img: img,
							added: args.data,
							description: "<p>" + "【作者】" + author + "<br>" + "【类型】" + tags + "<br>" + "【更新】" + update + "</p>",
							comment: 1,
							preview: 0,
							tags: gettag(title)+gettag(author)+gettag(tags.split(","))
						});
						return true
					}
				}
			}
		},
		parseflag: {
			loader: function(args) {
				return {
					url: pluginfo(args.plugin).apihost + "p/" + args.cid,
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
					json:true,
					str: getstr(/var\s*json_content\s*=\s*(.*?);\r*\n/g,args.result),
					successfn: function(rr, arr, i, result) {
						if (array_count(rr)) {
							rr=rr.page;
							var source =rr.map(function(item){
								return item.mobileImgUrl;
							});
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
					url: pluginfo(args.plugin).apihost + "c/" + args.pid ,
					title: args.title + " - 微漫画评论"
				};
				$$("#commentpage-title").html("评论 - " + args.title);
				return {
					url: pluginfo(args.plugin).apihost + "comic/comment/get_comic_comment?comic_id="+args.pid+"&page="+(args.page||1),
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
				var res = JSON.parse(args.result);
				ExView.modules.commentpage.tmp.page = 1;
				var comments = res.data.data;
				ExView.modules.commentpage.tmp.pid = args.pid;
				ExView.modules.commentpage.tmp.more = (args.page<Math.ceil(res.data.total_num/20)?1:0);
				for (var key in comments) {
					ExView.modules.myMessages.prependMessage({
						text: comments[key].content,
						name: comments[key].user_info.sina_nickname,
						avatar: ("'"+comments[key].user_info.avatar+"'),url('img/logo.png'"),
						type: "received",
						label: comments[key].create_time,
						day: "",
						time: ""
					}, true)
				}
				if(ExView.modules.commentpage.tmp.more){
					if($$($$(".message-last")[0]).offset().top>=-21){
							ExView.modules.commentpage.tmp.flag.noclean=1;
							args.page=(args.page||1)+1;
							ExView.modules.commentpage.tmp.flag.page=args.page;
							ExView.workers.comment.loader(ExView.modules.commentpage.tmp.flag);		
					}
				}					
				ExView.fw.hidePreloader();
				mySession.isloading = 0;
				$$("#commentpage")[0].onscroll = function() {
					console.log($$(this).offset().top);
					if ($$(this).offset().top <= 0) {
						if(ExView.modules.commentpage.tmp.more){
							ExView.modules.commentpage.tmp.flag.noclean=1;
							args.page=(args.page||1)+1;
							ExView.modules.commentpage.tmp.flag.page=args.page;
							ExView.workers.comment.loader(ExView.modules.commentpage.tmp.flag);	
						}
					}
				}
				/*if (!$$(".messages").html()) {
					$$(".messages").html('<div align="center" class="list-block">没有内容</div>')
				}*/
				return false
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
					url: pluginfo(args.plugin).apihost + "comic/home/ajax_recent_update?page="+(args.page||1),
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
						if (array_count(rr)) {
							plugfns(args.plugin).pagedeal(rr, args)
						}else{
							args.multupdate();
						}
					}
				}
			}
		},
		hotflag: {			
			loader: function(args) {
				if(parseInt(args.page||1)>1){
					args.multhot();
					return false;
				}					
				return {
					url: pluginfo(args.plugin).apihost + "comic/home/ajax_rank_list?rank_type=read",
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
						if (array_count(rr)) {
							plugfns(args.plugin).pagedeal(rr, args)
						}else{
							args.multhot();
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
								var pid=item.comic_id;
								var img=item.cover;
								var title=item.name;
								var author=gettext(item.artists);
								var description=item.description;
								var update=getLocalTime(item.update_time*1000);
								var content="更新日期 "+update;

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
									stitle:author,
									content: (update?("【更新】"+update+"<br>"):"")+(description?("【简介】"+description+"<br>"):""),
									comment: 1
								})								
							});
		}
	}
})