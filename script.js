// DOM Elements
const header = document.getElementById('site-header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const profileDropdownToggle = document.getElementById('profile-dropdown-toggle');
const profileDropdownMenu = document.getElementById('profile-dropdown-menu');
const heroSlides = document.getElementById('hero-slides');
const carouselIndicators = document.getElementById('carousel-indicators');
const trendingSlider = document.getElementById('trending-slider');
const seriesSlider = document.getElementById('series-slider');
const newReleasesSlider = document.getElementById('new-releases-slider');
const originalsSlider = document.getElementById('originals-slider');
const contentDetailModal = document.getElementById('content-detail-modal');
const contentDetailBody = document.getElementById('content-detail-body');
const videoPlayerModal = document.getElementById('video-player-modal');
const videoPlayerBody = document.getElementById('video-player-body');
const toast = document.getElementById('toast');
const promoBtn = document.getElementById('promo-btn');
const currentYearEl = document.getElementById('current-year');

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Header scroll effect
function handleScroll() {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (mobileMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Profile dropdown
if (profileDropdownToggle) {
    profileDropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdownMenu.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!profileDropdownMenu.contains(e.target) && e.target !== profileDropdownToggle) {
            profileDropdownMenu.classList.remove('show');
        }
    });
}

// Hero Carousel
let activeSlideIndex = 0;
let autoplayInterval;

function createHeroCarousel() {
    const featuredContent = mockContent.filter(item => item.isFeatured);
    
    if (featuredContent.length === 0) return;
    
    // Create slides
    featuredContent.forEach((content, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        
        // Create slide content
        slide.innerHTML = `
            <img class="slide-background" src="${content.banner || content.thumbnail}" alt="${content.title}">
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <div class="container">
                    <div class="slide-content-inner">
                        ${content.isOriginal ? '<span class="content-tag">HOICHOI ORIGINAL</span>' : ''}
                        <h1 class="slide-title">${content.title}</h1>
                        <div class="content-meta">
                            ${content.releaseYear ? `<span>${content.releaseYear}</span>` : ''}
                            ${content.ageRating ? `<span class="content-rating">${content.ageRating}</span>` : ''}
                            ${content.duration ? `<span>${content.duration}</span>` : ''}
                            ${content.genres ? `<span>${content.genres.join(', ')}</span>` : ''}
                        </div>
                        <p class="slide-description">${content.description.length > 150 ? content.description.substring(0, 150) + '...' : content.description}</p>
                        <div class="slide-actions">
                            <button class="btn btn-primary watch-btn" data-id="${content.id}">
                                <i class="fas fa-play-circle"></i> Watch Now
                            </button>
                            <button class="btn btn-outline add-list-btn" data-id="${content.id}">
                                <i class="fas fa-plus"></i> My List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        heroSlides.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('button');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.dataset.index = index;
        
        carouselIndicators.appendChild(indicator);
    });
    
    // Add event listeners to indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.dataset.index);
            setActiveSlide(index);
        });
    });
    
    // Add event listeners to carousel controls
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    prevBtn.addEventListener('click', () => {
        setActiveSlide((activeSlideIndex - 1 + featuredContent.length) % featuredContent.length);
    });
    
    nextBtn.addEventListener('click', () => {
        setActiveSlide((activeSlideIndex + 1) % featuredContent.length);
    });
    
    // Start autoplay
    startAutoplay();
    
    // Add event listeners to watch and add to list buttons
    document.querySelectorAll('.watch-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const contentId = parseInt(this.dataset.id);
            const content = mockContent.find(item => item.id === contentId);
            openVideoPlayer(content);
        });
    });
    
    document.querySelectorAll('.add-list-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const contentId = parseInt(this.dataset.id);
            const content = mockContent.find(item => item.id === contentId);
            addToList(content);
        });
    });
}

function setActiveSlide(index) {
    // Update active slide
    const slides = document.querySelectorAll('.carousel-slide');
    slides[activeSlideIndex].classList.remove('active');
    slides[index].classList.add('active');
    
    // Update active indicator
    const indicators = document.querySelectorAll('.indicator');
    indicators[activeSlideIndex].classList.remove('active');
    indicators[index].classList.add('active');
    
    // Update active index
    activeSlideIndex = index;
    
    // Reset autoplay
    clearInterval(autoplayInterval);
    startAutoplay();
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        const slides = document.querySelectorAll('.carousel-slide');
        setActiveSlide((activeSlideIndex + 1) % slides.length);
    }, 6000);
}

// Content Rows
function createContentRow(elementId, contents) {
    const slider = document.getElementById(elementId);
    
    if (!slider) return;
    
    contents.forEach(content => {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.dataset.id = content.id;
        
        card.innerHTML = `
            <img class="card-image" src="${content.thumbnail}" alt="${content.title}">
            <div class="card-overlay">
                <div class="card-actions">
                    <button class="icon-button play-btn" data-id="${content.id}">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="icon-button add-btn" data-id="${content.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <h3 class="card-title">${content.title}</h3>
                <div class="card-meta">
                    ${content.releaseYear ? `<span>${content.releaseYear}</span>` : ''}
                    ${content.duration ? `<span>${content.duration}</span>` : ''}
                    ${content.ageRating ? `<span>${content.ageRating}</span>` : ''}
                </div>
            </div>
        `;
        
        // Card click opens content detail
        card.addEventListener('click', () => {
            openContentDetail(content);
        });
        
        slider.appendChild(card);
    });
    
    // Add event listeners to play and add buttons
    slider.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const contentId = parseInt(this.dataset.id);
            const content = mockContent.find(item => item.id === contentId);
            openVideoPlayer(content);
        });
    });
    
    slider.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const contentId = parseInt(this.dataset.id);
            const content = mockContent.find(item => item.id === contentId);
            addToList(content);
        });
    });
    
    // Add scroll functionality
    const container = slider.parentElement;
    const scrollLeft = container.querySelector('.scroll-left');
    const scrollRight = container.querySelector('.scroll-right');
    
    if (scrollLeft && scrollRight) {
        scrollLeft.addEventListener('click', () => {
            slider.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        scrollRight.addEventListener('click', () => {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

// Populate Content Rows
function populateContentRows() {
    // Trending Movies
    const trendingContent = mockContent.filter(item => item.type === 'movie').slice(0, 5);
    createContentRow('trending-slider', trendingContent);
    
    // Web Series
    const webSeriesContent = mockContent.filter(item => item.type === 'series').slice(0, 5);
    createContentRow('series-slider', webSeriesContent);
    
    // New Releases
    const newReleases = [...mockContent].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, 5);
    createContentRow('new-releases-slider', newReleases);
    
    // Originals
    const originalContent = mockContent.filter(item => item.isOriginal).slice(0, 5);
    createContentRow('originals-slider', originalContent);
}

// Content Detail Modal
function openContentDetail(content) {
    // Find similar content based on genres
    const similarContent = getSimilarContent(content);
    
    // Create content detail HTML
    contentDetailBody.innerHTML = `
        <div class="content-detail">
            <div class="detail-main">
                <div class="detail-banner">
                    <img src="${content.banner || content.thumbnail}" alt="${content.title}">
                    <div class="banner-overlay">
                        <button class="play-button detail-play-btn" data-id="${content.id}">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
                
                <h1 class="detail-title">${content.title}</h1>
                
                <div class="detail-meta">
                    ${content.releaseYear ? `<span>${content.releaseYear}</span>` : ''}
                    ${content.ageRating ? `<span class="content-rating">${content.ageRating}</span>` : ''}
                    ${content.duration ? `<span>${content.duration}</span>` : ''}
                    ${content.genres ? `<span>${content.genres.join(', ')}</span>` : ''}
                </div>
                
                <div class="detail-actions">
                    <button class="btn btn-primary detail-watch-btn" data-id="${content.id}">
                        <i class="fas fa-play"></i> Watch Now
                    </button>
                    <button class="btn btn-outline detail-add-btn" data-id="${content.id}">
                        <i class="fas fa-plus"></i> My List
                    </button>
                </div>
                
                <div class="detail-description">
                    <p>${content.description}</p>
                </div>
                
                <div class="detail-credits">
                    ${content.starring && content.starring.length > 0 ? `
                    <h3>Starring</h3>
                    <p>${content.starring.join(', ')}</p>
                    ` : ''}
                    
                    ${content.director ? `
                    <h3>Director</h3>
                    <p>${content.director}</p>
                    ` : ''}
                </div>
            </div>
            
            <div class="detail-sidebar">
                <h3 class="similar-title">More Like This</h3>
                <div class="similar-grid">
                    ${similarContent.map(item => `
                    <div class="content-card" data-id="${item.id}">
                        <img class="card-image" src="${item.thumbnail}" alt="${item.title}">
                        <div class="card-overlay">
                            <div class="card-actions">
                                <button class="icon-button similar-play-btn" data-id="${item.id}">
                                    <i class="fas fa-play"></i>
                                </button>
                            </div>
                            <h3 class="card-title">${item.title}</h3>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons in the modal
    contentDetailBody.querySelector('.detail-play-btn').addEventListener('click', function() {
        const contentId = parseInt(this.dataset.id);
        const content = mockContent.find(item => item.id === contentId);
        closeContentDetail();
        openVideoPlayer(content);
    });
    
    contentDetailBody.querySelector('.detail-watch-btn').addEventListener('click', function() {
        const contentId = parseInt(this.dataset.id);
        const content = mockContent.find(item => item.id === contentId);
        closeContentDetail();
        openVideoPlayer(content);
    });
    
    contentDetailBody.querySelector('.detail-add-btn').addEventListener('click', function() {
        const contentId = parseInt(this.dataset.id);
        const content = mockContent.find(item => item.id === contentId);
        addToList(content);
    });
    
    // Add event listeners to similar content cards
    contentDetailBody.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('click', function() {
            const contentId = parseInt(this.dataset.id);
            const content = mockContent.find(item => item.id === contentId);
            closeContentDetail();
            openContentDetail(content);
        });
    });
    
    contentDetailBody.querySelectorAll('.similar-play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const contentId = parseInt(this.dataset.id);
            const content = mockContent.find(item => item.id === contentId);
            closeContentDetail();
            openVideoPlayer(content);
        });
    });
    
    // Show modal
    contentDetailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add close event
    const closeBtn = contentDetailModal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeContentDetail);
}

function closeContentDetail() {
    contentDetailModal.classList.remove('show');
    document.body.style.overflow = '';
    contentDetailBody.innerHTML = '';
}

// Video Player Modal
function openVideoPlayer(content) {
    videoPlayerBody.innerHTML = `
        <div class="video-player">
            <div class="player-content">
                <div class="player-message">
                    <h3>${content.title}</h3>
                    <p>[Video content would play here]</p>
                </div>
            </div>
            
            <div class="player-controls">
                <div class="progress-bar">
                    <div class="progress-slider">
                        <div class="progress-fill" style="width: 33%;"></div>
                        <div class="progress-handle" style="left: 33%;"></div>
                    </div>
                    <div class="progress-time">12:45 / 38:15</div>
                </div>
                
                <div class="controls-row">
                    <div class="controls-left">
                        <button class="icon-button">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="icon-button">
                            <i class="fas fa-step-forward"></i>
                        </button>
                        <button class="icon-button">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    
                    <div class="controls-right">
                        <button class="icon-button">
                            <i class="fas fa-closed-captioning"></i>
                        </button>
                        <button class="icon-button">
                            <i class="fas fa-cog"></i>
                        </button>
                        <button class="icon-button">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    videoPlayerModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add close event
    const closeBtn = videoPlayerModal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeVideoPlayer);
}

function closeVideoPlayer() {
    videoPlayerModal.classList.remove('show');
    document.body.style.overflow = '';
    videoPlayerBody.innerHTML = '';
}

// Utility Functions
function getSimilarContent(content) {
    if (!content || !content.genres) return [];
    
    return mockContent
        .filter(item => 
            item.id !== content.id && 
            item.genres && 
            item.genres.some(genre => content.genres?.includes(genre))
        )
        .slice(0, 4);
}

function addToList(content) {
    showToast(`Added to My List`, `"${content.title}" has been added to your list`);
}

function showToast(title, message) {
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add event for Promo button
promoBtn.addEventListener('click', () => {
    showToast('Subscription Info', 'This would open subscription details page');
});

// Add event listeners to modal close buttons
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        contentDetailModal.classList.remove('show');
        videoPlayerModal.classList.remove('show');
        document.body.style.overflow = '';
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createHeroCarousel();
    populateContentRows();
});
