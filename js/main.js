let leftBtn = document.querySelector(".slider__leftBtn"),
    rightBtn = document.querySelector(".slider__rightBtn"),
    slider_container = document.querySelector(".slider-container"),
    initialPoint,
    finalPoint;
let currentSlide = 0;
let slides = document.querySelectorAll(".slide");
let arr = Array.from(slides);

const isShowSlide = (right, quantitySlides) => {
    arr[currentSlide].classList.remove("showing");
    if (right) {
        currentSlide !== quantitySlides ? currentSlide += 1 : currentSlide = 0;
        arr[currentSlide].classList.add("showing")
    } else {  currentSlide <= 0 ? currentSlide = quantitySlides : currentSlide -= 1;
              arr[currentSlide].classList.add("showing") }
};

leftBtn.addEventListener("click", () => {isShowSlide(false, 2)});
rightBtn.addEventListener("click", () => {isShowSlide(true, 2)});

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
    let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX) {
                isShowSlide(true, 2)
            } else {
                isShowSlide(false, 2)
            }
        }
    }
}, false);
