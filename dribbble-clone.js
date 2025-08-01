/* SEARCH BOX PLACEHOLDER AND TRENDS' LINKS */

const searchInput = document.querySelector('.search-box-input');
const shots = document.getElementById('shots');
const designers = document.getElementById('designers');
const services = document.getElementById('services');
const shotsTrends = document.querySelector('.shots-trends');
const designersTrends = document.querySelector('.designers-trends');
const servicesTrends = document.querySelector('.services-trends');

function changePlaceholder() {
  if (shots.checked) {
    searchInput.placeholder = 'What type of design are you interested in?';
  } else if (designers.checked) {
    searchInput.placeholder = 'What type of designer do you need?';
  } else if (services.checked) {
    searchInput.placeholder = 'What do you need designed?';
  }

   shotsTrends.style.display = 'none';
   designersTrends.style.display = 'none';
   servicesTrends.style.display = 'none';

   if (shots.checked) {
    shotsTrends.style.display = 'block';
  } else if (designers.checked) {
    designersTrends.style.display = 'block';
  } else if (services.checked) {
    servicesTrends.style.display = 'block';
  }
};

shots.addEventListener('change', changePlaceholder);
designers.addEventListener('change', changePlaceholder);
services.addEventListener('change', changePlaceholder);

changePlaceholder();


/* VIDEOPLAYER CLIPS */

const videoclips = [
  'videos/Dipa-Inhouse.mp4',
  'videos/Geex-Arts.mp4',
  'videos/Hitoshi-Morita.mp4',
  'videos/ILLO.mp4',
];

const videoPlayer = document.querySelector('.video-player');
let currentVideoInd = 0;

function playNextVideoclip() {
  currentVideoInd = (currentVideoInd + 1)%videoclips.length;
  videoPlayer.src = videoclips[currentVideoInd];
  videoPlayer.play();
};

/* videoPlayer.src = videoclips[currentVideoInd];
videoPlayer.play(); */

videoPlayer.addEventListener('ended', playNextVideoclip);
