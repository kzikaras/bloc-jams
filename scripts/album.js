// Example Album
var albumPicasso = {
	title: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [
		{title: 'Blue', duration: '4:26'},
		{title: 'Green', duration: '3:14'},
		{title: 'Red', duration: '5:01'},
		{title: 'Pink', duration: '3:21'},
		{title: 'Magenta', duration: '2:15'},
	]
};


// Another Example Album
var albumMarconi = {
	title: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1909',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [
		{title: 'Hello, Operator?', duration: '1:01'},
		{title: 'Ring, ring, ring', duration: '5:01'},
		{title: 'Fits in your pocket', duration: '3:21'},
		{title: 'Can you hear me now?', duration: '3:14'},
		{title: 'Wrong phone number', duration: '2:15'},
	]
};

var vanHalen = {
	title: 'Van Halen',
	artist: 'Van Halen',
	label: 'Warner Bros',
	year: '1978',
	albumArtUrl: 'assets/images/album_covers/vanhalen.jpg',
	songs: [
		{title: 'Runnin with the Devil', duration: '3:36'},
		{title: 'Eruption', duration: '1:42'},
		{title: 'You Really Got Me', duration: '2:38'},
		{title: 'Aint talkin bout Love', duration: '3:50'},
		{title: 'Im the One', duration: '3:47'},
		{title: 'Jamies Cryin', duration: '3:31'},
		{title: 'Atomic Punk', duration: '3:02'},
		{title: 'Feel Your Love Tonight', duration: '3:43'},
		{title: 'Little Dreamer', duration: '3:23'},
		{title: 'Ice Cream Man', duration: '3:20'},
		{title: 'On Fire', duration: '3:01'},
	]
};

var createSongRow = function(songNumber, songName, songLength){
	var template = 
		'<tr class="album-view-song-item">'
		+'<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
		+'<td class="song-item-title">' + songName + '</td>'
		+'<td class="song-item-duration">' + songLength + '</td>'
		+'</tr>'
		;
	return template
}

var setCurrentAlbum = function(album) {
	// #1
	var albumTitle = document.getElementsByClassName('album-view-title')[0];
	var albumArtist = document.getElementsByClassName('album-view-artist')[0];
	var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
	var albumImage = document.getElementsByClassName('album-cover-art')[0];
	var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

	// #2
	albumTitle.firstChild.nodeValue = album.title;
	albumArtist.firstChild.nodeValue = album.artist;
	albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
	albumImage.setAttribute('src', album.albumArtUrl);

	// #3
	albumSongList.innerHTML = '';

	//#4
	for(var i=0;i<album.songs.length;i++){
		albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title,album.songs[i].duration);
	}
};
// Exercise question
var findParentByClassName = function(myNode, dest) {
	//var destination = document.querySelector("." + dest);
  //console.log(destination);
  if(!myNode.parentElement){
  	console.log('No parent found');
  };
  if(!dest){
  	console.log('No parent found with that class name');
  };
  while(myNode && myNode.className !== null && myNode.className !== dest){
  	myNode = myNode.parentElement;
  };
  return myNode;
};

//getSongItem goes here....
var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var clickHandler = function(targetElement) {
	var songItem = getSongItem(targetElement);
	if(currentlyPlayingSong === null) {
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
	} else if(currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
		songItem.innerHTML = playButtonTemplate;
		currentlyPlayingSong = null;
	}else if(currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
		var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
	}
};

var changeAlbum = function(album) {
	console.log('changeAlbum', album);
	if (album === 'van halen') {
		setCurrentAlbum(albumPicasso);
		album = 'album picasso';
	}
	else if (album === 'album picasso') {
		setCurrentAlbum(albumMarconi);
		album = 'album marconi';
	}
	else if (album === 'album marconi') {
		setCurrentAlbum(vanHalen);
		album = 'van halen';
	}
	return album;
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing song
var currentlyPlayingSong = null;

window.onload = function(){
	setCurrentAlbum(vanHalen);
	var currentAlbum = 'van halen';
	document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function() {
		currentAlbum = changeAlbum(currentAlbum);
	});	
	songListContainer.addEventListener('mouseover', function(event) {
		// Only target individual song rows during event delegation
		if(event.target.parentElement.className === 'album-view-song-item'){
			var songItem = getSongItem(event.target);

			if (songItem.getAttribute("data-song-number") !== currentlyPlayingSong) {
				songItem.innerHTML = playButtonTemplate;
			}
		}
	});

	for(var i=0;i<songRows.length;i++){
		songRows[i].addEventListener('mouseleave', function(event) {
			// revert the content back to the number

			//#1
			var songItem = getSongItem(event.target);
			var songItemNumber = songItem.getAttribute('data-song-number');
			//#2
			if (songItemNumber !== currentlyPlayingSong) {
				songItem.innerHTML = songItemNumber;
			}
		});
		songRows[i].addEventListener('click', function(event) {
			//Event handler call
			clickHandler(event.target);
		});
	}
}





















































		