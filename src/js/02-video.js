import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  console.log(data.seconds);
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
