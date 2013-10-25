/*
1. Listen to #
2. Wait for something that isn't a number, capture the #1234 id
3. Find the card with the corresponding number $(".card-short-id:contains('#17')")
4. Get the parent of the other card, and the corresponding link
5. Create a link [#17](http://link-to-card/)
*/

var trelloCardIdModule = (function(){
	var cardId = false;

	console.log("loaded");

	var loadOnEdit = function(){
		var area = document.querySelector('.card-detail-edit textarea.field');
		if (area && area.addEventListener) {
		  area.addEventListener('blur', function(event) {
		  	cardId = false;
		  });
		  area.addEventListener('keypress', function(event) {
		  	var char = String.fromCharCode(event.keyCode);
		  	if(char === "#")
		  		cardId = "#";
		  	else if(cardId){
		  		if(/[0-9]/.test(char))
		  			cardId += char;
		  		else
		  		{
		  			if(cardId.length > 1){
			  			var el = $(".card-short-id:contains('" + cardId + " ')").parent();
			  			if(el && el.length > 0){
			  				var link = el.attr("href");
			  				var markdownToInsert = "[" + cardId + "](" + link + ")";

			  				var startPos = area.selectionStart - cardId.length;
					        var endPos = area.selectionEnd;
					        area.value = area.value.substring(0, startPos)
					            + markdownToInsert
					            + area.value.substring(endPos, area.value.length);
			  			}
		  			}
		  			
		  			cardId = false;
		  		}
		  	}
		  }, false);
		}	
	}

	window.addEventListener ('DOMNodeInserted', function(event){
		if(event.relatedNode.classList.contains("window-wrapper"))
			loadOnEdit();
	}, false);
})();
