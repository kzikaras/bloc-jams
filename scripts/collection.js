var buildCollectionItemTemplate = function(){
	var template = 
	'<div class="collection-album-container column fourth">'
	+'	<img src="assets/images/album_covers/vanhalen.jpg"/>'
	+'	<div class="collection-album-info caption">'
	+'		<p>'
	+'			<a class="album-name" href="album.html"> Van Halen </a>'
	+'			<br/>'
	+'			<a href="album.html"> Van Halen </a>'
	+'			<br/>'
	+'			11 songs'
	+'			<br/>'
	+'		</p>'
	+'	</div>'
	+'</div>'
	;

	// #2
	return $(template);

}; 

$(window).load(function() {
	
	// #3
	var $collectionContainer = $('.album-covers');
	// #4
	$collectionContainer.empty();

	for(var i=0;i<1;i++){
		var $newThumbnail = buildCollectionItemTemplate();
		//#5
		$collectionContainer.append($newThumbnail);
	}
});