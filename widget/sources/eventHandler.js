require([
"dojo/_base/lang",
"dojo/dom",
"dojo/topic",
"dijit/registry",
"myApp/widget/sources/selector",
"myApp/widget/sources/editorDialog",
"dojo/on",
"dojo/query",
"dojo/dom-geometry",
"dojo/dom-class",
"dojo/dom-style",
"dijit/registry",
"dojo/NodeList-dom",
"dojo/NodeList-traverse",
"dojo/domReady!"
],function(lang,dom,topic,registry,selector,editorDialog,on,query,domGeometry,domClass,style,registry){
	topic.subscribe("/dnd/drop",selector.setDropSelector);
	topic.subscribe("/dnd/start",selector.setSelectorDisplay);
	topic.subscribe("/dnd/drag",dragWidget);
	topic.subscribe("/dnd/mouseup",mouseUpHandler);
	topic.subscribe("/dnd/resize",resizeWidget);
	

	// mouse down event
	
		var clickEvent=on(selectorContainer,"click",clickHandler);
	function clickHandler(event){
		selectorContainer.style.display="none";
		var selectingWidget=document.elementFromPoint(event.clientX,event.clientY);
		selectorContainer.style.display="block";

		var targetWidget=query(selectingWidget).parents(".targetWidget")[0];		
	
		if(targetWidget){
			on.emit(targetWidget,"click",event);
		}	
	}
	
	var mouseDownEvent=on(selectorContainer,"mousedown",switchWidget);	
	
//	var dblClickEvent=on(selectorContainer,"dblclick",dblClickHandler);
	
	function dblClickHandler(event){
		selecyitorContainer.style.display="none";
		var selectingWidget=document.elementFromPoint(event.clientX,event.clientY);
		selectorContainer.style.display="block";

		var targetWidget=query(selectingWidget).parents(".targetWidget")[0];		

		if(targetWidget==undefined&&domClass.contains(selectingWidget,"targetWidget"))
			targetWidget=selectingWidget;
		
	//	var canvasObj=registry.byId(targetWidget.id);
	//	console.log(canvasObj);
		editorDialog.dataSelectDialog(targetWidget);
	}
	
	// distinguish which widget the mouse down on
	function switchWidget(event){	
		// the widget 
		selectorContainer.style.display="none";
		var selectingWidget=document.elementFromPoint(event.clientX,event.clientY);
		selectorContainer.style.display="block";
		query(".coverNode").style("display","block");
		var selectingNode=document.elementFromPoint(event.clientX,event.clientY);
		query(".coverNode").style("display","none");
		var targetWidget=query(selectingWidget).parents(".targetWidget")[0];		
		var targetNode=query(selectingNode).parents(".coverNode")[0];
		if(targetWidget==undefined&&domClass.contains(selectingWidget,"targetWidget"))
			targetWidget=selectingWidget;
		
		if(targetNode==undefined&&domClass.contains(selectingNode,"coverNode"))
			targetNode=selectingNode;
		
		// if choose the blank part, select nothing
		if(!domClass.contains(selectingNode,"coverNode"))
			if(domClass.contains(selectingNode,"selectorNode")){			
				topic.publish("/dnd/resize",{selectingNode:selectingNode,targetNode:targetNode,targetWidget:targetWidget,event:event})				
			}
			else if(domClass.contains(selectingNode,"editNode")||query(selectingNode).parents(".editNode")[0]){
				//console.log("I am clicking the editNode of ",selectingWidget);
				query(selectingNode).parents(".coverNode")[0].style.display="block";
			//	editorDialog.dataSelectDialog(targetWidget);
			}
			else
				query(".coverNode").style("display","none");
		else{
			// if choose a widget, select the coverNode and the parent/ancestor of the widget as a draggable part	
			selectingNode.style.display="block";
			topic.publish("/dnd/drag",{selectingNode:selectingNode, selectingWidget:targetWidget, event:event});
		}
	}

	function resizeWidget(element){
		query(element.selectingNode).parents(".coverNode")[0].style.display="block";
		var originX=element.event.clientX;
		var originY=element.event.clientY;			
		var originWidth=style.get(element.targetWidget,"width");
		var originHeight=style.get(element.targetWidget,"height");
		var originLeft=style.get(element.targetWidget,"left");
		var originTop=style.get(element.targetWidget,"top");
		
		var resizeMove=on(selectorContainer,"mousemove",function(event){		
			var w=event.clientX-originX;
			var h=event.clientY-originY;
			if(domClass.contains(element.selectingNode,"selectorRBNode")){
				resizePosition(element.targetNode,element.targetWidget,w,h,originWidth,originHeight);
			}
			if(domClass.contains(element.selectingNode,"selectorLTNode")){
				resizePosition(element.targetNode,element.targetWidget,-w,-h,originWidth,originHeight);						
				element.targetWidget.style.left=originLeft+w+"px";
				element.targetWidget.style.top=originTop+h+"px";
				element.targetNode.style.left=originLeft+w+"px";
				element.targetNode.style.top=originTop+h+"px";
			}
			if(domClass.contains(element.selectingNode,"selectorRTNode")){
				resizePosition(element.targetNode,element.targetWidget,w,-h,originWidth,originHeight);
				element.targetWidget.style.top=originTop+h+"px";
				element.targetNode.style.top=originTop+h+"px";
			}
			if(domClass.contains(element.selectingNode,"selectorLBNode")){
				resizePosition(element.targetNode,element.targetWidget,-w,h,originWidth,originHeight);						
				element.targetWidget.style.left=originLeft+w+"px";
				element.targetNode.style.left=originLeft+w+"px";
			}
			selector.setSelectorPosition(element.targetNode,element.targetWidget);						
			});
			topic.publish("/dnd/mouseup",{handler:resizeMove});
	}
	
	function resizePosition(targetNode,targetWidget,w,h,originWidth,originHeight){
			targetWidget.style.width=originWidth+w+"px";
			targetWidget.style.height=originHeight+h+"px";
			targetNode.style.width=originWidth+w+"px";
			targetNode.style.height=originHeight+h+"px";
	}
	
	function setMovePosition(widget,event,leftO,rightO){
		widget.style.left=(parseInt(event.clientX-domGeometry.position("centerContainer",false).x-leftO)/10)*10+"px";
		widget.style.top=(parseInt(event.clientY-domGeometry.position("centerContainer",false).y-rightO)/10)*10+"px";
	}
	// set drag event handler
	function dragWidget(element){
		var leftOriginPosition=element.event.clientX-domGeometry.position(element.selectingNode,false).x;
		var rightOriginPosition=element.event.clientY-domGeometry.position(element.selectingNode,false).y;

		var tag=true;
		var moveWidget=on(selectorContainer,"mousemove",function(e){
				
				query(".selectorNode").style("display","none");
				query(".editNode").style("display","none");
				setMovePosition(element.selectingWidget,e,leftOriginPosition,rightOriginPosition);
				setMovePosition(element.selectingNode,e,leftOriginPosition,rightOriginPosition);
		});
		topic.publish("/dnd/mouseup",{handler:moveWidget});
	}
	//set mouse up event handler
	function mouseUpHandler(elementfunc){
		on.once(selectorContainer,"mouseup",function(){
			query(".selectorNode").style("display","block");
			query(".editNode").style("display","block");
			elementfunc.handler.remove();
		});	
	}
});