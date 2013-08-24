var resultTemplate = '{{#posts}}'
+ '<div class="site-post-entry">'
+ '<h4><a title="{{title}}" href="{{url}}">{{title}}</a></h4>'
+ '{{#postDate}}'
+ '<div class="metabar">'
+ '<em>'
+ '<span class="sword"> posted on </span>'
+ '<span class="date time published" title="{{postDate}}">{{postDate}}</span>'
+ '</em>'
+ '</div>'																					
+ '{{excerpt}} &nbsp;<a title="{{title}}" href="{{url}}">[&hellip;]</a>'
+ '{{/postDate}}'
+ '</div>'
+ '{{/posts}}';

var months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
$( document ).ready(function() {
	var searchAPI = new SearchAPI(searchService);
    searchAPI.search(function(searchResult){
    	if (searchResult.posts.length>0) {
    		$("#titleQueryString").html("&quot;"+searchResult.queryString+"&quot;");
    		
    		searchResult["postDate"] = function() {
    			if (!this.date) {
    				return null;
    			}
    			
    			var postDate = new Date(this.date);
    			var date = postDate.getDate();
    			var month = months[postDate.getMonth()];
    			var year = postDate.getFullYear();
    			
    			return (date>9?"":"0")+date+ " " + month + " " + year;
    		};
    		
        	var html = Mustache.render(resultTemplate, searchResult);
        	$("#searchResults").html(html);
        	
        	$("#searchResults").removeClass("hidden");
        	$("#pageTitle").removeClass("hidden");
    	} else {
    		$("#pageTitle").addClass("hidden");
    		$("#noSearchResults").removeClass("hidden");
    		$("#queryString").html("&quot;"+searchResult.queryString+"&quot;");	
    	}
    });
});