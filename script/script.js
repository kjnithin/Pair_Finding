$(document).ready(function() {
    
  var ImgSource = [
  "images/ace.jpg",
  "images/diamond.jpg",
  "images/Jack.jpg",
  "images/king.jpg",
  "images/queen.jpg"
  
];
 

    
  var firstRow = "#firstRow";
  var secondRow = "#secondRow";
    
  function getRandomIndex(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
    
 function ShuffleImages() {
	var ImgAll = $(firstRow).children();
	var ImgThis = $(firstRow + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(firstRow + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var randomIndex = getRandomIndex(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[randomIndex]);
		ImgArr.splice(randomIndex, 1);
		ImgThis = ImgThis.next();
	}
}
    
    
   var openedImage = "";    
   var openedDiv = "";
   var currentImage = "";
   var Counter = 0;
   var pairsFound = 0;
    
    
  function onClickCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
            
          $(firstRow + " div").unbind("click", onClickCard);
          $("#" + id + " img").slideDown('fast');
            
         if (openedImage == "") {
			openedDiv = id;
			openedImage = $("#" + id + " img").attr("src");
 			setTimeout(function() {
				$(firstRow + " div").bind("click", onClickCard)
			}, 200);
		  }
          else{
             currentImage = $("#" + id + " img").attr("src");
             if(currentImage == openedImage)
             {
                 openedDiv = "";
                 openedImage = "";
                 setTimeout(function() {
				$(firstRow + " div").bind("click", onClickCard)
			     }, 400);
                 pairsFound++;
             }
             else
             {
                setTimeout(function(){
                    $("#" + id + " img").slideUp('fast');
                    $('#' + openedDiv + " img").slideUp('fast');
                    openedDiv = "";
                    openedImage = "";}, 500);
                    
             
               setTimeout(function() {
				$(firstRow + " div").bind("click", onClickCard)
			}, 400);
             }
              
             
          }
          
        Counter++;
		$("#counter").html("" + Counter);  
        
        if(pairsFound == ImgSource.length)
        {
            $("#message").html("Congratulations!");
            $("#message").show();
        }
        
	}
}    
    
  
  $("#reset").click(function(){
       ShuffleImages();
	$(firstRow + " div img").hide();
	$(firstRow + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	openedDiv = "";
	openedImage = "";
	ImgFound = 0;
	return false;
  });
    
  
    
  $(function(){
      
        $("#message").hide();
        
        for(var row=0; row<2; row++)
        {
            for(var i=0; i<ImgSource.length; i++){
                var className = " class='col-sm-2 col-xs-3'";
                var index = row * ImgSource.length + i;
            	$(firstRow).append("<div id=card" + index  + className + "><img src=" +  ImgSource[i] + " />");
            }
        
        }
         ShuffleImages();
        
        $(firstRow + " div").click(onClickCard);

    });
   
    

});