import {designProjects, designProjectsNew} from './design-projects.js';


/************************************
 FIXED HEADER + SEARCH BOX on scroll
*************************************/

const header = document.querySelector('.header');
const allContentWrapper = document.querySelector('.all-content-wrapper');
const headerSearchBox = document.querySelector('.header-div__search-box-wrapper');

window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  
  if (scrollHeight > 450) {
    header.classList.add('fixed-header');
    allContentWrapper.classList.add('paddind-top');
    headerSearchBox.classList.add('display-search-box');
  } else {
    header.classList.remove('fixed-header');
    allContentWrapper.classList.remove('paddind-top');
    headerSearchBox.classList.remove('display-search-box');
  }
});


/************************************
 ANIMATED MENU ICON (Hamburger to X)
 TOGGLE MENU with MODAL OVERLAY
*************************************/

const toggleBtn = document.querySelector('.nav-toggle-button');
const modalOverlay = document.querySelector('.modal-overlay');
const navToggleMenu = document.querySelector('.nav-toggle-menu-container');
const navToggleMenuOptions = document.querySelectorAll('.nav-toggle-menu__option-title');
const headerDiv = document.querySelector('.header-div');

const navToggleInsideOptions = document.querySelectorAll('.nav-toggle-div__expandable');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('change');
  navToggleMenu.classList.toggle('open-nav-toggle-menu');
  modalOverlay.classList.toggle('open-modal');

  navToggleMenuOptions.forEach(option => {
    option.classList.toggle('translateX');
  });

  navToggleInsideOptions.forEach(option => {
    option.classList.toggle('translateX');
  });

   if (navToggleMenu.classList.contains('open-nav-toggle-menu')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

window.addEventListener('click', (event) => {
  if (event.target === modalOverlay || event.target === headerDiv) {
    toggleBtn.classList.remove('change');
    navToggleMenu.classList.remove('open-nav-toggle-menu');
    modalOverlay.classList.remove('open-modal');

    navToggleMenuOptions.forEach(option => {
      option.classList.remove('translateX');
    });

    navToggleInsideOptions.forEach(option => {
      option.classList.remove('translateX');
    });

    document.body.style.overflow = '';
  }
});


/*******************************
 TOGGLE MENU EXPANDABLE CONTENT
********************************/

const collapsibleMenuOptions = document.querySelectorAll('.nav-toggle-menu__option-title');

collapsibleMenuOptions.forEach(option => {
  const collapsibleContainer = option.parentElement;
  const insideContent = collapsibleContainer.querySelector('.nav-toggle-div__expandable');

  option.addEventListener('click', () => {
    collapsibleContainer.classList.toggle('show-hide-content');

    if (collapsibleContainer.classList.contains('show-hide-content')) {
      let fullHeight = insideContent.scrollHeight + "px";
      insideContent.style.maxHeight = fullHeight;
    } else {
      insideContent.style.maxHeight = "0px";
    };
  });
});


/****************************************
 SEARCH BOX PLACEHOLDER AND TRENDS LINKS 
*****************************************/

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


/*********************************
 SEARCH BOX SHOTS(options) button 
**********************************/

const dropdownBtnContainer = document.querySelector('.header-div__dropdown-btn');
const shotsBtn = document.querySelector('.shots-btn');
const shotsDropdownOptions = document.querySelector('.shots-btn-options');
const shotsChevronDown = document.querySelector('.shots-chevron-down');

function hideDropdownOptions() {
  const isVisible = shotsDropdownOptions.style.display === "block";
  shotsDropdownOptions.style.display = isVisible ? "none" : "block";
  shotsChevronDown.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
};

shotsBtn.addEventListener('click', hideDropdownOptions);

window.addEventListener('click', (e) => {
  if (!dropdownBtnContainer.contains(e.target)) {
    shotsDropdownOptions.style.display = "none";
    shotsChevronDown.style.transform = "rotate(0deg)";
  }
});

const shotsDropdownOptionsLi = document.querySelectorAll('.shots-btn-options li');

shotsDropdownOptionsLi.forEach((option) => {
  option.addEventListener('click', () => {
    shotsBtn.textContent = option.textContent;

    shotsBtn.appendChild(shotsChevronDown);

    shotsDropdownOptionsLi.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');

    hideDropdownOptions();
  });
});


/*****************************
  VIDEOPLAYER CLIPS with INFO 
******************************/

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
const designersInfoContainer = document.querySelector('.designers-info');
const designersImg = document.querySelector('.designers-info__img');
const designersName = document.querySelector('.designers-info__name');

let currentVideoInd = 0;

function playNextVideoclip() {
  currentVideoInd = (currentVideoInd + 1)%videoclips.length;
  videoPlayer.src = videoclips[currentVideoInd];
  designersImg.src = images[currentVideoInd];
  designersName.innerHTML = names[currentVideoInd];

  designersInfoContainer.classList.remove('slide-in-animation');
  void designersInfoContainer.offsetWidth;
  designersInfoContainer.classList.add('slide-in-animation');

  videoPlayer.play();
};

designersInfoContainer.classList.add('slide-in-animation');
videoPlayer.src = videoclips[currentVideoInd];
designersImg.src = images[currentVideoInd];
designersName.innerHTML = names[currentVideoInd];
videoPlayer.play();

videoPlayer.addEventListener('ended', playNextVideoclip);


/******************************
 VIDEOPLAYER PLAY/PAUSE BUTTON
*******************************/

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


/*********************************
 SCROLL BUTTONS on filter section
**********************************/

const filterCategories = document.querySelector('.main-content__filter-categories');
const btnLeft = document.querySelector('.scroll-btn.left');
const btnRight = document.querySelector('.scroll-btn.right');

const scrollNumber = 500;

btnLeft.addEventListener('click', () => {
  filterCategories.scrollBy({
    left: -scrollNumber,
    behavior: 'smooth'
  });
});

btnRight.addEventListener('click', () => {
  filterCategories.scrollBy({
    left: scrollNumber,
    behavior: 'smooth'
  });
});


/***************************** 
  DISPLAY/HIDE filter section 
******************************/

const filtersBtn = document.querySelector('.filters-btn');
const filtersExpandableSection = document.querySelector('.filters-expandable-section');

filtersBtn.addEventListener('click', () => {
  filtersExpandableSection.classList.toggle('open');
});


/******************************************
 POPULAR(options) BUTTON in filter section 
*******************************************/

const optionsBtnContainer = document.querySelector('.main-content__dropdown-btn');
const optionsBtn = document.querySelector('.popular-btn');
const dropdownOptions = document.querySelector('.dropdown-btn-options');
const chevronDown = document.querySelector('.popular-chevron-down');

function hidePopularOptions() {
  const isVisible = dropdownOptions.style.display === "block";
  dropdownOptions.style.display = isVisible ? "none" : "block";
  chevronDown.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
};

optionsBtn.addEventListener('click', hidePopularOptions);

window.addEventListener('click', (e) => {
  if (!optionsBtnContainer.contains(e.target)) {
    dropdownOptions.style.display = "none";
    chevronDown.style.transform = "rotate(0deg)";
  }
});

const dropdownOptionsLi = document.querySelectorAll('.dropdown-btn-options li');
const checkPopular = document.querySelector('.popular-check');

dropdownOptionsLi.forEach((option) => {
  option.addEventListener('click', () => {
    optionsBtn.textContent = option.textContent + '';

    if (optionsBtn.textContent.includes("New")) {
      displayProjects(designProjectsNew);
    } else {
      displayProjects(designProjects);
    };
    
    optionsBtn.appendChild(chevronDown);

    dropdownOptionsLi.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    option.appendChild(checkPopular);

    hidePopularOptions();
  });
});


/****************************************
 TIMEFRAME(now) BUTTON in filter section 
*****************************************/

const timeframeOptionsContainer = document.querySelector('.timeframe-options-div');
const nowBtn = document.querySelector('.now-btn');
const nowDropdownOptionsUl = document.querySelector('.now-dropdown-btn-options');
const nowChevronDown = document.querySelector('.now-chevron-down');

function hideOptions() {
  const isVisible = nowDropdownOptionsUl.style.display === "block";
  nowDropdownOptionsUl.style.display = isVisible ? "none" : "block";
  nowChevronDown.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
};

nowBtn.addEventListener('click', hideOptions);

window.addEventListener('click', (e) => {
  if ((!timeframeOptionsContainer.contains(e.target))) {
    nowDropdownOptionsUl.style.display = "none";
    nowChevronDown.style.transform = "rotate(0deg)";
  }
});

const nowDropdownOptions = document.querySelectorAll('.now-dropdown-btn-options li');
const checkNow = document.querySelector('.now-check');

nowDropdownOptions.forEach((option) => {
  option.addEventListener('click', () => {
    nowBtn.textContent = option.textContent + '';
    nowBtn.appendChild(nowChevronDown);

    nowDropdownOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    option.appendChild(checkNow);
   
    hideOptions();
  });
});


/******************************
  HEX COLORS in filter section 
*******************************/

const colorInput = document.querySelector('.color-input');
const colorPalette = document.querySelector('.color-palette-container');

colorInput.addEventListener('focus', () => {
  const isVisible = colorPalette.style.display === "block";
  colorPalette.style.display = isVisible ? "none" : "block";
});

window.addEventListener('click', (q) => {
  if ((!colorInput.contains(q.target))) {
    colorPalette.style.display = "none";
  }
});

const colorLinks = document.querySelectorAll('.color a');
const colorInputContainer = document.querySelector('.filters_input-container2');
const colorPaletteIcon = document.querySelector('.color-palette-icon');

colorLinks.forEach((color) => {
  color.addEventListener('click', () => {
    const colorCode = color.innerHTML;
    colorInput.value = colorCode.slice(1,7).toUpperCase(); 
    colorInputContainer.classList.add('has-color');
    colorInput.style.paddingLeft = "3.2rem";

    colorPaletteIcon.classList.add('solid-color');
    colorPaletteIcon.style.setProperty('--icon-color', colorCode);
  });
});

colorInput.addEventListener('input', () => {
  colorInput.value = colorInput.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase();
});

colorInput.addEventListener('keydown', (event)=> {
  if (event.key === 'Enter') {
    colorPaletteIcon.classList.add('solid-color');
    colorPaletteIcon.style.setProperty('--icon-color', '#' + colorInput.value);
  }
});

colorInput.addEventListener('input', () => {
  if (colorInput.value === '') {
    colorPaletteIcon.classList.remove('solid-color');
  }
});

if (colorInput.value === '') {
  colorPaletteIcon.classList.remove('solid-color');
}


/***********************
  GENERATE MAIN content
************************/

const projectsContainer = document.querySelector('.main-content__projects-list');

window.addEventListener('DOMContentLoaded', () => {
  displayProjects(designProjects);
});

function displayProjects(projects) {
  let displayMainContent = projects.map((project) => {
    return `<li>
              <div class="project-thumbnail-container">
                <img class="project-img" src="${project.project}" alt="">
                <span class="project-img-shadow">
                  <div class="project-img-shadow__info">
                    <div class="project-name">${project.projectName}</div>
                    <div class="project-buttons">
                      <div class="bookmark-btn" title="Save shot">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" class="icon ">
                        <path d="M3.33337 5.2C3.33337 4.0799 3.33337 3.51984 3.55136 3.09202C3.74311 2.71569 4.04907 2.40973 4.42539 2.21799C4.85322 2 5.41327 2 6.53337 2H9.46671C10.5868 2 11.1469 2 11.5747 2.21799C11.951 2.40973 12.257 2.71569 12.4487 3.09202C12.6667 3.51984 12.6667 4.0799 12.6667 5.2V14L8.00004 11.3333L3.33337 14V5.2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                      </div>
                      <div class="like-project-btn" title="Like this shot">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" class="icon ">
                        <path d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
              <div class="designer-information">
                <div class="designer-information__ava-name-badge">
                  <div class="designer-information__ava-name">
                    <img class="designer-avatar" src="images-icons/icon-${project.id}.webp" alt="">
                    <span class="designer-name">
                      ${project.designerName}
                    </span>
                  </div>
                  ${project.account ? `<a class="designer-badge" href="#">${project.account}</a>` : ''}
                </div>
                <div class="designer-information__stats">
                  <div class="likes">
                    <div class="likes-icon-container" title="Like this shot">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" class="icon fill-current shot-tools-icon">
                        <path d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </div>
                    <span class="likes-count">
                      ${project.likes}
                    </span>
                  </div>
                  <div class="views">
                    <div class="views-icon-container">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" class="icon fill-current shot-tools-icon">
                        <path d="M8 3C4.36992 3 1.98789 6.21774 1.18763 7.49059C1.09079 7.64462 1.04237 7.72163 1.01527 7.84042C0.99491 7.92964 0.99491 8.07036 1.01527 8.15958C1.04237 8.27837 1.09079 8.35539 1.18763 8.50941C1.98789 9.78226 4.36992 13 8 13C11.6301 13 14.0121 9.78226 14.8124 8.50941L14.8124 8.50939C14.9092 8.35538 14.9576 8.27837 14.9847 8.15958C15.0051 8.07036 15.0051 7.92964 14.9847 7.84042C14.9576 7.72163 14.9092 7.64462 14.8124 7.4906L14.8124 7.49059C14.0121 6.21774 11.6301 3 8 3Z" fill="currentColor"></path>
                        <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="white"></path>
                      </svg>
                    </div>
                    <span class="views-count">
                      ${project.views}
                    </span>
                  </div>
                </div>
              </div>
            </li>`
  });
  displayMainContent = displayMainContent.join('');
  projectsContainer.innerHTML = displayMainContent;
};


/********************
  BACK-TO-TOP button
*********************/

const backToTopBtn = document.querySelector('.back-to-top-button');

function btnVisibleOnScroll() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    backToTopBtn.style.opacity = 1;
    backToTopBtn.style.visibility = "visible";
  } else {
    backToTopBtn.style.opacity = 0;
    backToTopBtn.style.visibility = "hidden";
  }
};

window.addEventListener('scroll', btnVisibleOnScroll);


/****************
  COPYRIGHT DATE
*****************/

const copyrightDate = document.querySelector('.copyright-date');
copyrightDate.innerHTML = new Date().getFullYear();

