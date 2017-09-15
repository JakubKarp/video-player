window.addEventListener('load', function() {

  
  // video container
  video = document.getElementById('video');
  
  // progress bar container
  pbarContainer = document.getElementById('pbar-container');
  pbar = document.getElementById('pbar');
  
  
  // button container
  playButton = document.getElementById('play-button');
  timeField = document.getElementById('time-field');
  soundButton = document.getElementById('sound-button');
  sbarContainer = document.getElementById('sbar-container');
  sbar = document.getElementById('sbar');
  fullscreenButton = document.getElementById("full-screen");
  
  
 
  video.load();
  video.addEventListener('canplay', function() {
    playButton.addEventListener('click', playOrPause, false);
    }, false);
    pbarContainer.addEventListener('click', skip, false); 
    video.addEventListener('durationchange', function() {
        updatePlayer();
    });
    soundButton.addEventListener('click', muteOrUnmute, false);
    sbarContainer.addEventListener('click', changeVolume, false);  
    fullscreenButton.addEventListener('click', fullscreen, false);
   
}, false);

// function play or pause and change icons and set Interval
function playOrPause() {
 if (video.paused) {
    video.play();
    playButton.src="images/pause.png";
    update = setInterval(updatePlayer, 30);
  } else {
    video.pause();
    playButton.src="images/play.png";
    window.clearInterval(update);
  };
};


// function updating bar with percentage duration of video
function updatePlayer() {
  var percentage = (video.currentTime/video.duration)*100;
  pbar.style.width = percentage + '%';
  timeField.innerHTML = getFormattedTime();
  if (video.ended) {
    window.clearInterval(update);
    playButton.src = 'images/replay.png'
  };
};


// function for skipping video through clicking on the bar
function skip(ev) {
  var mouseX = ev.pageX - pbarContainer.offsetLeft; //0 from start point of bar
  var barWidth = window.getComputedStyle(pbarContainer).getPropertyValue('width') //takes value of width of bar
  barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2)); //changes from string to number
  
  video.currentTime = (mouseX/barWidth)*video.duration; // making magic
  updatePlayer(); // making magic when video is stopped
  
};


// function for showing counting time of video
function getFormattedTime() {

  var seconds = Math.round(video.currentTime); //give current time rounded to 1
  var minutes = Math.floor(seconds/60); // give minutes from seconds floored 
  if (minutes > 0) seconds -= minutes*60; // give only 60 seconds for minute
  if (seconds.toString().length === 1) seconds = '0' + seconds; // give zero before 
  
  // for total duration - almost the same code
    var totalSeconds = Math.round(video.duration); //duration gives NaN if video is not set https://github.com/videojs/video.js/issues/2017 
  var totalMinutes = Math.floor(totalSeconds/60); 
  if (totalMinutes > 0) totalSeconds -= totalMinutes*60; 
  if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds; 
  
    return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
};


// function for muting sound
function muteOrUnmute() {
  if (!video.muted) {
    video.muted = true;
    soundButton.src = 'images/mute.png';
    sbar.style.display = 'none';
  } else {
    video.muted = false;
    soundButton.src = 'images/sound.png';
    sbar.style.display = 'block';
  }
};


// function for change volume by sound bar
function changeVolume(ev) {
  var mouseX = ev.pageX - sbar.offsetLeft;
  var width = window.getComputedStyle(sbarContainer).getPropertyValue('width') //takes value of width of bar
  width = parseFloat(width.substr(0, width.length - 2)); //changes from string to number
  
  video.volume = (mouseX/width);
  sbar.style.width = (mouseX/width) * 100 + '%';
  video.muted = false; 
  soundButton.src = 'images/sound.png';
  sbar.style.display = 'block';
};

//function for fullscreen
function fullscreen() {
  if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.requestFullscreen) {
    video.requestFullscreen();
  }
  
};