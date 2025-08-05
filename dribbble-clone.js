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


/* VIDEOPLAYER CLIPS with INFO */

const designersData = [{
  name: 'AmazingUI',
  img: 'images-icons/AmazingUI.webp',
  clip: 'videos/AmazingUI.mp4'
}, {
  name: 'DipaInhouse',
  img: 'images-icons/Dipa-Inhouse.webp',
  clip: 'videos/Dipa-Inhouse.mp4'
}, {
  name: 'GeexArts',
  img: 'images-icons/Geex-Arts.webp',
  clip: 'videos/Geex-Arts.mp4'
}, {
  name: 'Hitoshi Morita',
  img: 'images-icons/Hitoshi-Morita.webp',
  clip: 'videos/Hitoshi-Morita.mp4'
}, {
  name: 'ILLO',
  img: 'images-icons/ILLO.webp',
  clip: 'videos/ILLO.mp4'
}];

const videoclips = designersData.map(item => item.clip);
const images = designersData.map(item => item.img);
const names = designersData.map(item => item.name);

const videoPlayer = document.querySelector('.video-player');
const designersImg = document.querySelector('.designers-info__img');
const designersName = document.querySelector('.designers-info__name');

let currentVideoInd = 0;

function playNextVideoclip() {
  currentVideoInd = (currentVideoInd + 1)%videoclips.length;
  videoPlayer.src = videoclips[currentVideoInd];
  designersImg.src = images[currentVideoInd];
  designersName.innerHTML = names[currentVideoInd];
  videoPlayer.play();
};

videoPlayer.src = videoclips[currentVideoInd];
designersImg.src = images[currentVideoInd];
designersName.innerHTML = names[currentVideoInd];
videoPlayer.play();

videoPlayer.addEventListener('ended', playNextVideoclip);


/* VIDEOPLAYER PLAY/PAUSE BUTTON */

const playPauseBtn = document.querySelector('.play-pause-button');
const playIcon = document.querySelector('.fa-play');
const pauseIcon = document.querySelector('.fa-pause');

playPauseBtn.addEventListener('click', () => {
  const isPlayIconDisplayed = window.getComputedStyle(playIcon).display === "none";

  if(isPlayIconDisplayed) {
    playIcon.style.display = "block";
    videoPlayer.pause();
    pauseIcon.style.display = "none";
  } else {
    playIcon.style.display = "none";
    videoPlayer.play();
    pauseIcon.style.display = "block";
  }
});