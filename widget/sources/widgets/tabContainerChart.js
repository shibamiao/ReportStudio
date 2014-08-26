define([
	"myApp/widget/sources/baseWidget",
	"myApp/widget/sources/widgets/contentPaneTarget",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom",
	"dojo/dom-class",
    "dijit/layout/TabContainer", 
	"dijit/layout/ContentPane"
], function(baseWidget,contentPaneTarget,declare,arrayUtil,dom,domClass,TabContainer,ContentPane){
	
	return declare("widget.sources.widgets.tabContainerChart",[baseWidget], {
		
		contents:[],
		
		buildContent:function(_title,_content){
			var content=new ContentPane({
				title:_title,
				content:_content
			});
			this.contents.push(content);
		},
		
		constructor:function(){
			 this.widget= new TabContainer({
				style: "height:200px; width:300px;"
			}, this.domNode);


			this.className="myProject_tabContainerChart";
			domClass.add(this.containerNode,this.className);
			
			this.buildContent("tab1","content1");
			this.buildContent("tab2","content2");
			this.buildContent("tab3","content3");
			
			for(i in this.contents){
				this.widget.addChild(this.contents[i]);
			}
			this.widget.startup();
			
		},

		_onClick:function(event){
			if(dom.byId("selectorContainer")){
				dom.byId("selectorContainer").style.display="none";
				var selectingWidget=document.elementFromPoint(event.clientX,event.clientY);
				dom.byId("selectorContainer").style.display="block";

				if(domClass.contains(selectingWidget,"tabLabel")){
					var index=selectingWidget.id.charAt(selectingWidget.id.length-1);

					this.widget.selectChild(this.contents[index]);
					
				}
			}
		}
	});
});