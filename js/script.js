	var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri'
	});
    var map = L.map('map', {layers: [Esri_WorldTopoMap], center: new L.LatLng(44,-72), zoom: 8 });
	  	
	function buildPopup(feature, layer) {
		var popup = "<div class='popup_box_header'><strong>" + feature.properties.SiteName + "</strong></div>";
		popup += "<hr />";
		popup += feature.properties.Description + "<br />";
		popup += "</div>";
		layer.bindPopup(popup)
	}
		
	var addJSON = new L.GeoJSON.AJAX(["data.geojson"],{

		 onEachFeature: function (feature, layer) {
			buildPopup(feature, layer);
        }
		
		}).addTo(map);
	

// Toggle for 'About this map' and X buttons
// Only visible on mobile
isVisibleDescription = false;
// Grab header, then content of sidebar
sidebarHeader = $('.sidebar_header').html();
sidebarContent = $('.sidebar_content').html();
// Then grab credit information
creditsContent = $('.leaflet-control-attribution').html();
$('.toggle_description').click(function() {
	if (isVisibleDescription === false) {
		$('.description_box_cover').show();
		// Add Sidebar header into our description box
		// And 'Scroll to read more...' text on wide mobile screen
		$('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');
		// Add the rest of our sidebar content, credit information
		$('.description_box_text').html(sidebarContent + '<br />');
		$('#caption_box').html('Credits: ' + creditsContent);
		$('.description_box').show();
		isVisibleDescription = true;
	} else {
		$('.description_box').hide();
		$('.description_box_cover').hide();
		isVisibleDescription = false;
	}
});
