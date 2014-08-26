//Require the module we need
require([
	"dijit/MenuBar",
	"dijit/MenuBarItem",
	"dijit/Menu",
	"dijit/MenuItem",
	"dijit/PopupMenuBarItem",
	"dojo/dom-class",
	"dojo/request",
	"dojo/_base/array",
	"dojo/dom",
	"dojo/domReady!"
	], function(MenuBar,MenuBarItem,Menu,MenuItem,PopupMenuBarItem,domClass,request,arrayUtil,dom){
		//Add class to div
	//	domClass.add("mainMenu","Menu");
		//Build a menu
		var mainMenu=new MenuBar({},"mainMenu");
		//Request a json 
		request.get("./data/MenuBar.json",{
			handleAs:"json"
		}).then(function(data){
			arrayUtil.forEach(data.items,function(item,i){
				//If the item has children, create it as a popup menu
				//alert(item);
				//alert(i);
				if(item.children){
					//Add child to the item
					var temp=new Menu();
					arrayUtil.forEach(item.children,function(it,j){
						temp.addChild(new MenuItem({
							id:it.id,
							label:it.label,
							onClick:function(event){
								if(it.onClicker){
									require([it.onClicker],function(onClicker){
										onClicker.init();
									});							
								}
							}
						}));
					});
					//Add the item to the main menu
					mainMenu.addChild(new PopupMenuBarItem({
						id:item.id,
						label:item.label,
						popup:temp
					}));
				}
				else
					//It's a normal menu bar item
					mainMenu.addChild(new MenuBarItem({
						id:item.id,
						label:item.label
					}));
			});

			mainMenu.startup();
		},function(error){
			alert(error);
		});


	}
);