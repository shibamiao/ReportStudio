
define([
	"dojo/_base/array",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dijit/Dialog",
	"dijit/registry",
	"dojo/string",
	"dojo/json",
	"dojo/text!./../templates/resultTemplate.html",
	"dojo/text!./../templates/HTMLTemplate.html",
	"dojo/text!./../templates/divTemplate.html",
	"dojo/text!./../templates/jsonTemplate.html",
	"dojo/domReady!"
],function(arrayUtil,dom,domConstruct,style,attr,Dialog,registry,string,JSON,resultTemplate,HTMLTemplate,divTemplate,jsonTemplate){
	var saveContent=new Dialog({
		title:"Save File",
		style:{
			width:"400px"
		},
		draggable:true
	});
	
	function savedata(content){
	/* var OpenWindow=window.open("", "newwin");  
	//file://写/成一行  
	OpenWindow.document.write(content);

	OpenWindow.document.close(); */

/* 	alert("test0"); */
	//var filePath="c://matest.txt;";
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	//alert("test1");
	var file=fso.CreateTextFile("c:/Users/one9.json",true);
	
	//if(fso.FileExists("c:/Users/one9.json"))
	//alert("cunz");
	//else
	//alert("bucunz");
	
	//alert("test2");
	file.Write(content);
/* 	alert("test3"); */
	file.close();
	
	} 
	
	return {	
		init:function(){
			var canvas=dom.byId("canvasContainer");
			
	//		console.log(canvas.childNodes);
			var jsonContent="";
			var widgets="";
			var numb=0;
			arrayUtil.forEach(canvas.childNodes,function(item,i){numb++});
			//alert(numb);
		
			
			arrayUtil.forEach(canvas.childNodes,function(item,i){
				//alert(arrayUtil.length);
				//var len=arrayUtil.length;
				//alert(len);
				var startPos=item.className.indexOf("myProject");
				var endPos=item.className.indexOf(" ",startPos);
				var classNameTemp=item.className.slice(startPos,endPos);
				var widgetObj=registry.byId(item.id);
				
				widgets+=string.substitute(divTemplate,{
					classN:classNameTemp,
					index:i
				});
				
				var jsonTemp=string.substitute(jsonTemplate,{
				
					classN:classNameTemp,
					index:i,
					num:numb,
					x:style.get(item,"left")+"px",
					y:style.get(item,"top")+"px",
					width:style.get(item,"width")+"px",
					height:style.get(item,"height")+"px",
					data:attr.get(item,"data-src")?attr.get(item,"data-src"):"",
					 eventListener:JSON.stringify(widgetObj.getEventListener()), 
					builder:classNameTemp.slice(classNameTemp.indexOf("_")+1) 
					
				});
				
				jsonContent+=jsonTemp;
				
			});
			//alert("savering4");
			var contentHTML=string.substitute(resultTemplate,{
				jsons:jsonContent,
				divs:widgets
			});
        
			var showPage="<textarea spellcheck=\"false\" style=\"width: 100%; height: 400px; border:0; \">"+contentHTML+"</textarea>";
			saveContent.set("content",showPage);
			saveContent.show();
			//savadata(numb);
			savedata(jsonContent);
			alert("complete saving");
		}
	};
});