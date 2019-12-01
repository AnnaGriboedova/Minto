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
    event.preventDefault();
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
}, false);

slider_container.addEventListener('touchend', function (event) {
    event.preventDefault();
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
