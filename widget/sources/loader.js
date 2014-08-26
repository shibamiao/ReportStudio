define([
	"dojo/_base/array",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dijit/Dialog",
	"dojo/string",
	"dojo/request",
	"dijit/registry",
	"dojo/string",
	"dojo/json",
	"dojo/text!./../templates/resultTemplate.html",
	"dojo/text!./../templates/divTemplate.html",
	"dojo/text!./../templates/jsonTemplate.html",
	"dojo/domReady!"
],function(arrayUtil,dom,domConstruct,style,Dialog,string,request,registry,string,JSON,resultTemplate,divTemplate,jsonTemplate){
	var runContent=new Dialog({
		title:"Running...",
		style:{
			width:"400px"
		},
		draggable:true
	});
	return {	
		init:function(){
			var target=dom.byId("canvasContainer");
			//console.log(target.getAllNodes());
			//alert("open");
			/* var fd=new ActiveXObject("MSComDlg.CommonDialog");
			fd.ShowOpen();  */
			var inputObj=document.createElement("input");
			inputObj.setAttribute("id","ef");
			inputObj.setAttribute("type","file");
			inputObj.setAttribute("style","visibility:hidden");
			target.appendChild(inputObj);
			inputObj.click();
			//alert(inputObj.value);
			
			
	
			var ForReading=1;
			var fso=new ActiveXObject("Scripting.FileSystemObject");
			var file=fso.OpenTextFile(inputObj.value,ForReading,true);
			//var changdu=file.length;
			//alert(changdu);
			var classNameTemp="";
			var i="";
			var contentAll="";
		
            var jsonContent="";
			var widgets="";
			
			//var quanbu=file.ReadAll();
			//alert(quanbu);
			var content=file.ReadLine();	
             contentAll+=content;			
			
			var num="";
			/*while(content!="")
			{
			if(content=="};")
			break;
			else
			{
			 if(content.indexOf("=")!=-1)
			 {
			  content=file.ReadLine();
			  contentAll+=content;
			  i=content[14];
			  content=file.ReadLine();
			  contentAll+=content;
			  var les=content.length;
			  //alert(les);
			  if(les==38)
			  {ClassNameTemp=content.substring(14,36);}
			  else if(les==37)
			  
			  {ClassNameTemp=content.substring(14,35);}
			  
			  //alert(ClassNameTemp);
			   
			   widgets+=string.substitute(divTemplate,{
					classN:ClassNameTemp,
					index:i
				});
				content=file.ReadLine();
				num=content[8];
				//alert(content[8]);
				
			 }
			 else
			 {
			 content=file.ReadLine();
			 contentAll+=content;
			 }
			}*/
			while(content!="};"){
			if(content.indexOf("=")!=-1)
			 {
			  content=file.ReadLine();
			  contentAll+=content;
			  i=content[14];
			  content=file.ReadLine();
			  contentAll+=content;
			  var les=content.length;
			  //alert(les);
			  if(les==38)
			  {ClassNameTemp=content.substring(14,36);}
			  else if(les==37)
			  
			  {ClassNameTemp=content.substring(14,35);}
			  
			  //alert(ClassNameTemp);
			   
			   widgets+=string.substitute(divTemplate,{
					classN:ClassNameTemp,
					index:i
				});
				content=file.ReadLine();
				num=content[8];
				//alert(content[8]);
				
			 }
			 else
			 {
			 content=file.ReadLine();
			 contentAll+=content;
			 }
				}
				
				if(num>1){
				//content=file.ReadLine();
				//contentAll+=content;
				for(var ci=0;ci<(num-1);ci++)
				{
				content=file.ReadLine();
				contentAll+=content;
				while(content!="};"){
				if(content.indexOf("=")!=-1)
			 {
			  content=file.ReadLine();
			  contentAll+=content;
			  i=content[14];
			  content=file.ReadLine();
			  contentAll+=content;
			  var les=content.length;
			 
			  if(les==38)
			  {ClassNameTemp=content.substring(14,36);}
			  else if(les==37)
			  
			  {ClassNameTemp=content.substring(14,35);}
			  
			  //alert(ClassNameTemp);
			   
			   widgets+=string.substitute(divTemplate,{
					classN:ClassNameTemp,
					index:i
				});
				content=file.ReadLine();
				//num=content[8];
				alert(content[8]);
				
			 }
			 else
			 {
			 content=file.ReadLine();
			 contentAll+=content;
			 }
				}
				}
             
			}
			file.close();
			
			//window.showModalDialog("one2.html");
			jsonContent=contentAll;
		  //  alert(jsonContent);
			
			/*jsonContent=file.ReadAll();
			
			ClassNameTemp="myProject_columnsChart";
			i="0";
			 widgets+=string.substitute(divTemplate,{
					classN:ClassNameTemp,
					index:i
				});*/
			 //alert("here");
			var contentHTML=string.substitute(resultTemplate,{
				jsons:jsonContent,
				divs:widgets
			});

				//alert("here1");
				var OpenWindow=window.open("", "newwin");  
	        OpenWindow.document.write(contentHTML);
			alert(contentHTML);
	        OpenWindow.document.close(); 
			//alert("here3");
			var showPage="<textarea spellcheck=\"false\" style=\"width: 100%; height: 400px; border:0; \">"+contentHTML+"</textarea>";
			runContent.set("content",showPage);
			runContent.show();
			
			
			
		}
		
	};
});