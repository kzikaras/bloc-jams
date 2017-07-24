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
			currentSoundFile.play();
			updatePlayerBarSong();
			
			
		} else if (currentlyPlayingSongNumber === songNumber) {
			// Switch from Pause -> Play button to pause currently playing song.
			$(this).html(playButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPlayButton);
			setSong(null);

			if(currentSoundFile.isPaused()) {
				currentSoundFile.play();
				$(this).html(pauseButtonTemplate);
			}
			else{
				currentSoundFile.pause();
				$(this).html(playButtonTemplate);
			}

			
			
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

	// currentlyPlayingSongNumber = parseInt(currentSongIndex + 1);
	// currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
	

	setSong(currentSongIndex + 1);
	currentSoundFile.play();


	
	// update the player bar information
	updatePlayerBarSong();

	
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
	if(currentSongIndex < 0) {
		currentSongIndex = currentAlbum.songs.length - 1;
	}
	// Saves the song number as the previous song for reference.
	var lastSongNumber = currentlyPlayingSongNumber;

	// Sets a new current song.
	// currentlyPlayingSongNumber = currentSongIndex + 1;
	// currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
	setSong(currentSongIndex+1);

	currentSoundFile.play();


	
	// update the player bar display information
	updatePlayerBarSong();

	// var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber +'"]'); ///// ?????
	// var $lastSongNumberCell = $('.song-item-number[data-song-number="'+ lastSongNumber +'"]'); /// ????

	var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
	var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
	
	$nextSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber);

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


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing song
// #1
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;


var updatePlayerBarSong = function(){
	//update <h2> tags in player bar
	//to contain song name and artist name
	//ref data from current song variables to populate them
	$('.currently-playing .song-name').text(currentSongFromAlbum.title);
	$('.currently-playing .artist-name').text(currentAlbum.artist);
	$('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);
	$('.main-controls .play-pause').html(playerBarPauseButton);
};

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

// assignment-19 work --------

// this function will re-assign currentlyPlayingSongNumber and currentSongFrom Album
var setSong = function(songNumber){

	if(currentSoundFile) {
		currentSoundFile.stop();
	}

	currentlyPlayingSongNumber = parseInt(songNumber);
	currentSongFromAlbum = currentAlbum.songs[songNumber-1];

	// #1
	currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
		// #2
		formats: ['mp3'],
		preload: true
	});

	setVolume(currentVolume);
};

var setVolume = function(volume) {
	if (currentSoundFile) {
		currentSoundFile.setVolume(volume);
	}
};

var getSongNumberCell = function(number) {
	return $('.song-item-number[data-song-number="' + number + '"]');
}

var togglePlayFromPlayerBar = function() {
	if(currentSoundFile.isPaused()) {
		$(getSongNumberCell(currentlyPlayingSongNumber)).html(playButtonTemplate);
		$('.main-controls .play-pause').html(playerBarPlayButton);
		currentSoundFile.play();
	}

	else if(currentSoundFile) {
		$(getSongNumberCell(currentlyPlayingSongNumber)).html(pauseButtonTemplate);
		$('.main-controls .play-pause').html(playerBarPauseButton);
		currentSoundFile.pause();
	}
};


//----------------------------


$(document).ready(function(){
	setCurrentAlbum(albumPicasso);
	$previousButton.click(previousSong);
	$nextButton.click(nextSong);
	var play = $('.main-controls .play-pause');
	play.click(function(){
		togglePlayFromPlayerBar();
	});
});























































		