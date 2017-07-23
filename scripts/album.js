
var createSongRow = function(songNumber, songName, songLength){
	var template = 
		'<tr class="album-view-song-item">'
		+'<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
		+'<td class="song-item-title">' + songName + '</td>'
		+'<td class="song-item-duration">' + songLength + '</td>'
		+'</tr>'
		;
	var $row = $(template);

	var clickHandler = function() {
		var songNumber = parseInt($(this).attr('data-song-number'));

		if (currentlyPlayingSongNumber !== null) { //if there is a song playing...
			// Revert to song number for currently playing song because user started playing new song.
			// var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
			var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
			currentlyPlayingCell.html(currentlyPlayingSongNumber);
			currentSongFromAlbum = $(".song-item-title").html();

		}
		if (currentlyPlayingSongNumber !== songNumber) {
			// Switch from Play -> Pause button to indicate new song is playing.
			$(this).html(pauseButtonTemplate);
			setSong(songNumber);
			
		} else if (currentlyPlayingSongNumber === songNumber) {
			// Switch from Pause -> Play button to pause currently playing song.
			$(this).html(playButtonTemplate);
			setSong(null);
			
			
		}
	};

	// This function changes the song number to the play icon
	var onHover = function(event){
		//identifies the song number
		var songNumCell = $(this).find('.song-item-number');
		// test - console.log(songNumCell);
		var songNum = parseInt(songNumCell.attr('data-song-number'));
		

		if (songNum !== currentlyPlayingSongNumber) {
			songNumCell.html(playButtonTemplate);
		}
		
	};
	// This function changes the play icon back to the song number
	var offHover = function(event){
		var songNumCell = $(this).find('.song-item-number');
		var songNum = parseInt(songNumCell.attr('data-song-number'));
		if(songNum !== currentlyPlayingSongNumber) {
			songNumCell.html(songNum);
		console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
		}

	};


	// #1
	$row.find('.song-item-number').click(clickHandler);
	// #2
	$row.hover(onHover, offHover);
	// #3
	return $row;

}

var setCurrentAlbum = function(album) {
	currentAlbum = album;
	// #1
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');

	// #2
	$albumTitle.text(album.title);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);
	$albumImage.attr('src', album.albumArtUrl);

	// #3
	$albumSongList.empty();

	//#4
	for(var i=0;i<album.songs.length;i++){
		var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
		$albumSongList.append($newRow);
	}
};

var trackIndex = function(album, song) {
	return album.songs.indexOf(song);
}

var nextSong = function(){
	// This function must increment the index of the currently playing song
	
	var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
	currentSongIndex++;
	// Sets the index back to zero if we reach the end of the album - will bring us to the first song again.
	if(currentSongIndex >= currentAlbum.songs.length) {
		currentSongIndex = 0;
	}
	// Saves the song number as the previous song for reference.
	var lastSongNumber = currentlyPlayingSongNumber;

	// Sets a new current song.
	
	setSong(currentSongIndex + 1);

	
	// update the player bar information
	updatePlayerBarSong();

	// var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber +'"]'); ///// ?????
	// var $lastSongNumberCell = $('.song-item-number[data-song-number="'+ lastSongNumber +'"]'); /// ????
	var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
	var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

	$nextSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber);

};

var previousSong = function(){
	// Will perform similar functionality as nextSong but will go to the previous song.

	var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
	currentSongIndex--;
	// Sets the index back to zero if we reach the end of the album - will bring us to the first song again.
	if(currentSongIndex >= currentAlbum.songs.length-1) {
		currentSongIndex = 0;
	}
	// Saves the song number as the previous song for reference.
	var lastSongNumber = currentlyPlayingSongNumber;

	// Sets a new current song.
	
	setSong(currentSongIndex + 1);

	
	// update the player bar display information
	updatePlayerBarSong();

	// var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber +'"]'); ///// ?????
	// var $lastSongNumberCell = $('.song-item-number[data-song-number="'+ lastSongNumber +'"]'); /// ????

	var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
	var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
	
	$nextSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber);

};

// Old vanilla JS Code----------------------------------------------------------------
// // Exercise question
// var findParentByClassName = function(myNode, dest) {
//     //var destination = document.querySelector("." + dest);
//   //console.log(destination);
//   if(!myNode.parentElement){
//       return console.log('No parent found');
//   };
  
//   while(myNode && myNode.className !== null && myNode.className !== dest){
//       myNode = myNode.parentElement;
//   };
  
//   if(myNode === null){
//       return console.log('No parent found with that class name');
//   };
  
//   return myNode;
// };
  	
 
  


//getSongItem goes here....
// var getSongItem = function(element) {
//     switch (element.className) {
//         case 'album-song-button':
//         case 'ion-play':
//         case 'ion-pause':
//             return findParentByClassName(element, 'song-item-number');
//         case 'album-view-song-item':
//             return element.querySelector('.song-item-number');
//         case 'song-item-title':
//         case 'song-item-duration':
//             return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
//         case 'song-item-number':
//             return element;
//         default:
//             return;
//     }  
// };

// var clickHandler = function(targetElement) {
// 	var songItem = getSongItem(targetElement);
// 	if(currentlyPlayingSong === null) {
// 		songItem.innerHTML = pauseButtonTemplate;
// 		currentlyPlayingSong = songItem.getAttribute('data-song-number');
// 	} else if(currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
// 		songItem.innerHTML = playButtonTemplate;
// 		currentlyPlayingSong = null;
// 	}else if(currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
// 		var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
// 		currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
// 		songItem.innerHTML = pauseButtonTemplate;
// 		currentlyPlayingSong = songItem.getAttribute('data-song-number');
// 	}
// };
// end old vanilla code ----------------------------------------------------------

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
// old vanilla code ---------------------
// var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
// var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing song
// #1
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;


var updatePlayerBarSong = function(){
	//update <h2> tags in player bar
	//to contain song name and artist name
	//ref data from current song variables to populate them
	if(currentlyPlayingSongNumber !== null){
		$(".artist-song-mobile").html(currentSongFromAlbum);
		$(".artist-name").html(currentAlbum.artist);
	$('.main-controls .play-pause').html(playerBarPauseButton);
		
	};
};

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

// assignment-19 work --------

// this function will re-assign currentlyPlayingSongNumber and currentSongFrom Album
var setSong = function(songNumber){
	currentlyPlayingSongNumber = parseInt(songNumber);
	currentSongFromAlbum = currentAlbum.songs[songNumber-1];
};

var getSongNumberCell = function(number) {
	return $('.song-item-number[data-song-number="' + number + '"]');
}


//----------------------------


$(document).ready(function(){
	setCurrentAlbum(vanHalen);
	$previousButton.click(previousSong);
	$nextButton.click(nextSong);
});

// old vanilla JS ---------------------------------------------------------

// window.onload = function(){
// 	setCurrentAlbum(vanHalen);
// 	var currentAlbum = 'van halen';
// 	document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function() {
// 		currentAlbum = changeAlbum(currentAlbum);
// 	});	
// 	songListContainer.addEventListener('mouseover', function(event) {
// 		// Only target individual song rows during event delegation
// 		if(event.target.parentElement.className === 'album-view-song-item'){
// 			var songItem = getSongItem(event.target);

// 			if (songItem.getAttribute("data-song-number") !== currentlyPlayingSong) {
// 				songItem.innerHTML = playButtonTemplate;
// 			}
// 		}
// 	});

// 	for(var i=0;i<songRows.length;i++){
// 		songRows[i].addEventListener('mouseleave', function(event) {
// 			// revert the content back to the number

// 			//#1
// 			var songItem = getSongItem(event.target);
// 			var songItemNumber = songItem.getAttribute('data-song-number');
// 			//#2
// 			if (songItemNumber !== currentlyPlayingSong) {
// 				songItem.innerHTML = songItemNumber;
// 			}
// 		});
// 		songRows[i].addEventListener('click', function(event) {
// 			//Event handler call
// 			clickHandler(event.target);
// 		});
// 	}
// }





















































		