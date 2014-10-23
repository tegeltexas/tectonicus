var maxZoom = {{maxZoom}};

var MAP_COORD_SCALE_FACTOR = {{mapCoordScaleFactor}};

var showSpawn = {{showSpawn}};			
var signsInitiallyVisible = {{signsInitiallyVisible}};
var playersInitiallyVisible = {{playersInitiallyVisible}};
var portalsInitiallyVisible = {{portalsInitiallyVisible}};
var bedsInitiallyVisible = {{bedsInitiallyVisible}};
var spawnInitiallyVisible = {{spawnInitiallyVisible}};
var viewsInitiallyVisible = true; // todo!



function createPlayerMarker(map, player, pos, signWindow)
{
	var marker = new google.maps.Marker(
			{		
	      		position: pos,
				map: map, 
				title: player.name,
				icon: 'Images/'+player.name+'.png',
				optimized: false
			});
			marker.player = player;
			
			google.maps.event.addListener(marker, 'click', function()
			{
				if (player.donation == '')
				{
					jQuery.getJSON("http://www.triangularpixels.com/Tectonicus/Query/getDonation.py?json_callback=?",
					{
						username: player.name
					},
					function(data)
					{
						player.donation = data.html
						
						document.getElementById("donationDiv").innerHTML = getDonationHtml(player)
					});
				}
				
				showPlayerHtml(map, this.player, signWindow, this);
			});
			
	return marker;
}

function showPlayerHtml(map, player, signWindow, anchor)
{
	var options =
	{
		content: getPlayerHtml(player)
	};
	signWindow.close();
	signWindow.setOptions(options);
	signWindow.open(map, anchor);
}

function getPlayerHtml(player)
{
	var html = ''
		+ '<div>'
						
			+ '<div class=\"playerName\" style=\"text-align:center; font-size:110%\" >' + player.name + '</div>'
			+ '<div style=\"width:300px; margin:4px;\" >'
			+ 	'<img style=\"float:left; margin:4px;\" src=\"Images/' + player.name + '.png\" width=\"32\" height=\"64\" />'
			+	'<div>'
			+		'<div>' + getHealthHtml(player) + '</div>'
			+		'<div>' + getFoodHtml(player) + '</div>'
			+		'<div>' + getAirHtml(player) + '</div>'
			+		'<div>' + getInventoryHtml(player) + '</div>'
			+		'<div>' + getItemsHtml(player) + '</div>'
			+	'</div>'
			+ '</div>'
			
			+ '<div id=\"xpDiv\" style=\"clear:both; text-align:center\" >'
			+   'Experience level '+player.xpLevel
			+ '</div>'
			
			+ '<div id=\"donationDiv\" style=\"clear:both; text-align:center\" >'
			+	getDonationHtml(player)
			+ '</div>'
			
		+ '</div>';
		
	return html;
}

function getHealthHtml(player)
{
	var html = '';
	
	var NUM_ICONS = 10;
	for (var i=0; i<NUM_ICONS; i++)
	{
		var image;
		if (i*2+1 < player.health)
			image = 'Images/FullHeart.png';
		else if (i*2 < player.health)
			image = 'Images/HalfHeart.png';
		else
			image = 'Images/EmptyHeart.png';
			
		html += '<img style=\"margin:1px\" src=\"' + image + '" width=\"18\" height=\"18\" />';
	}
	
	return html;
}

function getFoodHtml(player)
{
	var html = '';
	
	var NUM_ICONS = 10;
	for (var i=0; i<NUM_ICONS; i++)
	{
		var image;
		if (i*2+1 < player.food)
			image = 'Images/FullFood.png';
		else if (i*2 < player.food)
			image = 'Images/HalfFood.png';
		else
			image = 'Images/EmptyFood.png';
			
		html += '<img style=\"margin:1px\" src=\"' + image + '" width=\"18\" height=\"18\" />';
	}
	
	return html;
}

function getAirHtml(player)
{
	var html = '';
	
	var NUM_ICONS = 10;
	for (var i=0; i<NUM_ICONS; i++)
	{
		var image;
		if (i*30 < player.air)
			image = 'Images/FullAir.png';
		else
			image = 'Images/EmptyAir.png';
			
		html += '<img style=\"margin:1px\" src=\"' + image + '" width=\"18\" height=\"18\" />';
	}
	
	return html;
}

function getInventoryHtml(player)
{
	var html = '';
/*	
	html += '<table>'
	
	html += '<tr>'
	
	for (var x=0; x<9; x++)
	{
		html += '<td>'
		html += 'item'
		html += '</td>'
	}
	
	html += '</tr>'
	
	html += '</table>'
*/	
	return html;
}

function getItemsHtml(player)
{
	var html = '';
	
	// ..
	
	return html;
}

function getDonationHtml(player)
{
	var html = '';
	
	html += '<div>';

	if (player.donation != '')
	{
		html += player.donation;
	}
	else
	{
		html += '<img src=\"Images/Spacer.png\" style=\"height:38px;\" />';
	}
	
	html += '</div>';

	return html;
}

function getUrlWithoutParams()
{
	parts = window.location.href.split('?');
	return parts[0];
}

function getQueryParams()
{
	var urlParams = {};
	var e,
	a = /\+/g,  // Regex for replacing addition symbol with a space
	r = /([^&;=]+)=?([^&;]*)/g,
	d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
	q = window.location.search.substring(1);
	
	while (e = r.exec(q))
		urlParams[d(e[1])] = d(e[2]);
	
	return urlParams;
}

function getFragmentParams()
{	
	var hashParams = {};
	var e,
	a = /\+/g,  // Regex for replacing addition symbol with a space
	r = /([^&;=]+)=?([^&;]*)/g,
	d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
	q = window.location.hash.substring(1);
	
	while (e = r.exec(q))
		hashParams[d(e[1])] = d(e[2]);
	
	return hashParams;
}

function runGa()
{
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-4472611-2']);
	_gaq.push(['_setDomainName', 'tectonicus.triangularpixels.com']);
	_gaq.push(['_trackPageview']);

	var selfUrl = window.location.href;
	_gaq.push(['_trackEvent', 'ViewMap', selfUrl]);

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}