export default function VideoPlayer(videoNode){
 if (!(videoNode instanceof HTMLVideoElement)) {
     throw new Error('video Node must be of type HTMLVideoElement');
   }

   this.videoNode = videoNode;
   this.loopRange = {
     start:0,
     end:0,
   };
   this.LoopEnabled = false;

  this.isPaused = function () {
   return this.videoNode.paused;
  }

  this.pause = function () {
    this.videoNode.pause();
    return this;
  }

  this.play = function () {
    this.videoNode.play();
    return this;
  }

  this.setSpeed = function (val) {
    this.videoNode.playbackRate = val;
    return this;
  }
  this.getDuration = function () {
    return this.videoNode.duration;
  }

  this.Getspeed = function () {
    return this.videoNode.playbackRate;
  }

  this.setDefaultspeed = function () {
   this.videoNode.defaultPlaybackRate;
   return this;
  }

  this.GetDefaultspeed = function () {
    return this.videoNode.defaultPlaybackRate;
  }

  this.setMuted = function (bool) {
    bool = Boolean(bool);
    this.videoNode.muted = bool;
    return this;
  }

  this.getMuted = function () {
    return this.videoNode.muted;
  }

  this.setControls = function (bool) {
    bool = Boolean(bool);
    this.videoNode.controls = bool;
    return this;
  }

  this.getControls = function () {
    return this.videoNode.controls;
  }

  this.setAutoplay = function (bool) {
    bool = Boolean(bool);
    this.videoNode.autoplay = bool;
    return this;
  }

  this.getAutoplay = function () {
    return this.videoNode.autoplay;
  }

  this.setCurrentTime = function (val) {
    this.videoNode.currentTime = val;
    return this;
  }

  this.getCurrentTime = function () {
    return this.videoNode.currentTime;
  }
  //because bind change it's siganture of watchLoopRange function
  // watch loop will be called in diffrent context
  this.watchLoopRange = function () {
    let ct = this.getCurrentTime();
    if (ct < this.loopRange.start || ct >= this.loopRange.end ) {
        this.setCurrentTime(this.loopRange.start);
    }
  }.bind(this);

  this.watch = function (callback) {
         this.videoNode.addEventListener('ended',callback);
    return this;
  }.bind(this);

  this.removeWatch = function (callback) {
    this.videoNode.removeEventListener('timeupdate',callback);
  }
  this.addLoopRange = function (start,end) {
    this.loopRange.start = start;
    this.loopRange.end = end;
    this.videoNode.addEventListener('timeupdate',this.watchLoopRange);
    return this;
  }

  this.removeLoopRange = function (start,end) {
    this.videoNode.removeEventListener('timeupdate',this.watchLoopRange);
    this.setCurrentTime(0);
    return this;
  }

  this.isLoopEnabled = function () {
    // this.video.addEvent.listener('timeupdate',this.setLoopEnabled);
  }

}
