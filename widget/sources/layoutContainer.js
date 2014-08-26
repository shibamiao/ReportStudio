require([
	"dijit/layout/BorderContainer", 
	"dijit/layout/ContentPane", 
	"dijit/layout/AccordionContainer",
	"dijit/layout/TabContainer",
	"dojo/request",
	"dojo/_base/array",
	"dojo/dnd/Source",
	"dojo/dom-construct",
	"dojo/dom",
	"myApp/widget/sources/buildSource",
	"myApp/widget/sources/buildTarget",
	"dojo/text!./widget/templates/formTemplate.html",
	"dojo/string",
	"dijit/registry",
	"dojo/domReady!"],
	function(BorderContainer,ContentPane,AccordionContainer,TabContainer,
	request,array,Source,domConstruct,dom,buildSource,buildTarget,formTemplate,string,registry){
		// create the BorderContainer and attach it to our appLayout div
		var appLayout = new BorderContainer({
			design: "headline",
			liveSplitters:true
		}, "appLayout");
		// create the center canvas
		var centerContent=new ContentPane({
			id:"centerContainer",
			className:"centerContainer",
			region:"center",
			splitter:true
		});
		appLayout.addChild(centerContent);
		
		// set the canvas and selector div
		var canvasContainer=domConstruct.create("div",{id:"canvasContainer",className:"canvasContainer"});
		var selectorContainer=domConstruct.create("div",{id:"selectorContainer",className:"selectorContainer"});
		centerContent.set({content:[selectorContainer,canvasContainer]});
		
		// set the canvas as a target for dnd
		var canvasObj=buildTarget.buildTargetWidget(canvasContainer);
		registry.add(canvasObj);
		
	//	topic.publish();
		// create the left accordioncontainer
		var aContainer = new AccordionContainer({
		style:"width: 150px",
		region:"left",
		id:"aContainer",
		splitter:true
		});
		// load data from json
		request.get("./data/WidgetInfo.json",{
			handleAs:"json"
		}).then(function(data){
			//load accordions
			array.forEach(data.items,function(item,i){
				// load title
				aContainer.addChild(new ContentPane({
					id:item.title,
					title:item.title,
		//			content:item.content+"<br>"
				}));
				//load drag&drop things
				if(item.children){
					// which is a draggable contentpane
					buildSource.buildSourceWidget(item.title,item.children,false);	
				}
			})
		},function(error){
			console.log(error);
			alert(error);
		});
		
		appLayout.addChild(aContainer);

		var tabContainer=new TabContainer({
			style:"width:150px",
			region:"right",
			id:"tabContainer",
			tabPosition:"right-h",
			splitter:true
		});
		// load data from json
		request.get("./data/Tab.json",{
			handleAs:"json"
		}).then(function(data){
			//load accordions
			array.forEach(data.items,function(item,i){
				// load title
				var contPane=new ContentPane({
					id:item.title,
					title:item.title
				});
				tabContainer.addChild(contPane);
				//load edit things
				if(item.children){
					var form=domConstruct.create("table");
					array.forEach(item.children,function(it,j){
						var tr=domConstruct.toDom(string.substitute(formTemplate,{
							label:it.label
						}));	
						domConstruct.place(tr,form,"last");
					});
				contPane.set("content",form);
				}
			})
		},function(error){
			console.log(error);
			alert(error);
		});
		
		appLayout.addChild(tabContainer);
		// start up and do layout
		appLayout.startup();
		
	});
	
 	var obj={}; 