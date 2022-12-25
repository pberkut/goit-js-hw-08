import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("#vimeo-player");

const KEY = "videoplayer-current-time";
let currentTime = localStorage.getItem(KEY) || 0;

const player = new Player(iframe);

player.on("timeupdate", throttle(onPlay, 1000));

playbackPosition();

function onPlay(currentTime) {
  localStorage.setItem(KEY, currentTime.seconds);
}

function playbackPosition() {
  player.setCurrentTime(currentTime);
}
