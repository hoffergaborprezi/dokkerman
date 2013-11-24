/*
            .---._------------------------------+
___________/ ._____)                            |
              ) __|          DOKKERMAN          |
                __|   and the turkeying fellaz  |
..---------.._____|                             |
                  +-----------------------------+
 */

 window.fbAsyncInit = function() {
	    // init the FB JS SDK
	    FB.init({
	      appId      : '587719267937359',                       // App ID from the app dashboard
	      channelUrl : '', 										// Channel file for x-domain comms
	      status     : true,                                 	// Check Facebook Login status
	      cookie	 : true,
	      xfbml      : true                                  	// Look for social plugins on the page
	    });
	    var token;
	    // TODO: proper authentication
		FB.getLoginStatus(function (response) {
			$.getJSON("https://graph.facebook.com/dokkerman/posts?access_token=587719267937359|3faac613025bbfaa2346f45c681ac7ba&limit=50",function(json){
				for (item in json.data) {
					var appendOutput = '';
				    appendOutput += '<div class="item">';
				    if (json.data[item].picture) { appendOutput += '<a href="https://www.facebook.com/' + json.data[item].id + '/" target="_blank"><img src="' + json.data[item].picture + '" width="100%" /></a>'; }
				    if (json.data[item].name) { appendOutput += '<h3>' + json.data[item].name + '</h3>'; }
				    if (json.data[item].story) { appendOutput += '<h3>' + json.data[item].story + '</h3>'; }
				    if (json.data[item].message) { appendOutput += '<p>' + json.data[item].message +'</p>'; }
				    appendOutput += '</div>';
				    $("#postsFromFacebook").append(appendOutput);
				    
				    //getItemDescription(json.data[item].id);
				}
				// Wookmark init script
				$('.item').wookmark({
				  align: 'center',
				  autoResize: true,
				  container: $('#postsFromFacebook'),
				  direction: 'left',
				  ignoreInactiveItems: true,
				  itemWidth: 200,
				  fillEmptySpace: false,
				  flexibleWidth: false,
				  offset: 10,
				  onLayoutChanged: undefined,
				  outerOffset: 0,
				  resizeDelay: 50,
				  possibleFilters: []
				});
			});

			$.getJSON("https://graph.facebook.com/dokkerman/events?access_token=587719267937359|3faac613025bbfaa2346f45c681ac7ba",function(json){
				for (item in json.data) {
					var appendOutput = '';
				    appendOutput += '<div class="event">';
				    if (json.data[item].picture) { appendOutput += '<a href="https://www.facebook.com/' + json.data[item].id + '/" target="_blank"><img src="' + json.data[item].picture + '" width="100%" /></a>'; }
				    if (json.data[item].name) { appendOutput += '<h3>' + json.data[item].name + '</h3>'; }
				    appendOutput += '</div>';
				    $("#eventsFromFacebook").append(appendOutput);
				    getItemDescription(json.data[item].id);
				}
			});


			// Get and parse event descriptions. This is a separate call for each event.
			function getItemDescription(id) {
			    $.getJSON("https://graph.facebook.com/"+id+"?access_token=587719267937359|3faac613025bbfaa2346f45c681ac7ba",function(json) {
					var appendEvent = '';
					appendEvent += '<p>' + json.description + '</p>';
					appendEvent += '<p>' + json.location + '</p>';
					appendEvent += '<p>' + json.venue.latitude + ' / ' + json.venue.longitude + '</p>';
				    $("#eventsFromFacebook").append(appendEvent);
			    });
			}

		});
	    // Additional initialization code such as adding Event Listeners goes here
	  };

	  // Load the SDK asynchronously
	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/all.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));