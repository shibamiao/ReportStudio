define([ 
"dojo/dom-construct", 
"dojo/dom-style",
"dojo/dnd/Target",
"dojo/on",
"dojo/topic",
"dijit/registry"
], function(domConstruct,domStyle, Target,on,topic,registry){
	// creates the DOM representation for the given item
	var idCount=0;
	function elementWidgetCreator(item){
	
			var widget=domConstruct.create("div",{className:"targetWidget",id:"widget_"+idCount});	
			domStyle.set(widget,"z-index",idCount+3);
			idCount++;
			
			var builder=require(item.codebase);					
			widget=new builder(widget);

			return {node:widget.containerNode, data:item}
		};

	// creates a dojo/dnd/Source from the data provided
	function buildTargetWidget(node){
	
		// create the Source
		var dndObj = new Target(node, {

			// use catalogNodeCreator as our creator function for inserting new nodes
			creator:elementWidgetCreator
		});
		
		dndObj.id=node.id;
		return dndObj;
	}

	// expose our API
	return {
		buildTargetWidget:buildTargetWidget
	};
});
