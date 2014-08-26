define([ 
"dojo/string", 
"dojo/dom-construct", 
"dojo/dom-class", 
"dojo/dnd/Source"
], function(stringUtil, domConstruct, domClass, Source){
	// creates the DOM representation for the given item
	function elementWidgetCreator(item,hint){

		// create a node using an HTML template
		if(hint==="avatar"){
			var node=domConstruct.create("div",{id:item.id,className:"avatarWidget"});
		}
		else{
			var node=domConstruct.create("div",{id:item.id,className:"sourceWidget"});
			require([item.codebase]);
		}	
		var img=domConstruct.create("img",{src:item.img,className:"image"},node);
		var title=domConstruct.create("div",{innerHTML:item.id,className:"title"},node);
		
		return { node: node, data: item};
	}

	// creates a dojo/dnd/Source from the data provided
	function buildSourceWidget(node, data,selfAccept){

		// create the Source
		var dndObj = new Source(node, {
			// ensure that only copy operations ever occur from this source
			copyOnly: true,
			
			selfCopy: false,

			// define whether or not this source will accept drops from itself, based on the value passed into
			// buildCatalog; defaults to true, since this is the default that dojo/dnd uses
			selfAccept: selfAccept === undefined ? true : selfAccept,
			// use catalogNodeCreator as our creator function for inserting new nodes
			creator: elementWidgetCreator
		});

		// insert new nodes to the Source; the first argument indicates that they will not be highlighted (selected)
		// when inserted
		dndObj.insertNodes(false, data);

		// add CSS hooks for element styling

		return dndObj;
	}

	// expose our API
	return {
		buildSourceWidget: buildSourceWidget
	};
});
