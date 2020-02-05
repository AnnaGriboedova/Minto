let leftBtn = document.querySelector(".slider__leftBtn"),
    rightBtn = document.querySelector(".slider__rightBtn"),
    slider_container = document.querySelector(".slider-container"),
    initialPoint,
    finalPoint;
let currentSlideIndex = 0;
let slides = document.querySelectorAll(".slides_slide");
let slidesArray = Array.from(slides);
let lastSlideIndex = slides.length - 1;

const isShowSlide = (right) => {
    slidesArray[currentSlideIndex].classList.remove("slides_slide--showing");
    if (right) {
        currentSlideIndex !== lastSlideIndex ? currentSlideIndex += 1 : currentSlideIndex = 0;
        slidesArray[currentSlideIndex].classList.add("slides_slide--showing")
    } else {  currentSlideIndex <= 0 ? currentSlideIndex = lastSlideIndex : currentSlideIndex -= 1;
              slidesArray[currentSlideIndex].classList.add("slides_slide--showing") }
};

leftBtn.addEventListener("click", () => {isShowSlide(false)});
rightBtn.addEventListener("click", () => {isShowSlide(true)});

slider_container.addEventListener('touchstart', function (event) {
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
}, false);

slider_container.addEventListener('touchend', function (event) {
    event.stopPropagation();
    finalPoint = event.changedTouches[0];
    let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    if (xAbs > 20) {
            if (finalPoint.pageX < initialPoint.pageX) {
                isShowSlide(true)
            } else {
                isShowSlide(false)
            }
    }
}, false);

// *** modal popup ***

const modal = document.querySelector('.modal');
const buttonModal = document.querySelector('.buttonModal'); 
const cancel = document.querySelector('.modalCancel');
const modalForm = document.querySelector('.modalForm');

//show modal popup, block scroll and set focus on the first input
buttonModal.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflowY = 'hidden';
    modalForm.elements[0].focus();
});

cancel.addEventListener('click', () => {modal.style.display = 'none'});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
       modal.style.display = 'none';
       document.body.style.overflowY = '';
    }}
);

// set cursor switching only in modal window
const firstFocusElement = modalForm.elements[0];
const lastFocusElement = modalForm.elements[modalForm.elements.length - 1];

lastFocusElement.onkeydown = function(e) {
    if (e.key == 'Tab' && !e.shiftKey) {
        firstFocusElement.focus();
        return false;
    }
};

firstFocusElement.onkeydown = function(e) {
    if (e.key == 'Tab' && e.shiftKey) {
        lastFocusElement.focus();
        return false;
    }
};
