let leftBtn = document.querySelector(".slider__leftBtn"),
    rightBtn = document.querySelector(".slider__rightBtn"),
    imgBlock = document.querySelector(".slider-container"),
    imgs = ["background-image: url(assets/img/Slider/Screenshot_20191113_193921.png);",
            "background-image: url(assets/img/Slider/12008BODcyjzqLbSxTZwUrCJuiMnQk.jpg);",
            "background-image: url(assets/img/Slider/pXCdZ1zikC753dbEwkw1YL02ONWTB_87pB5nvgO3f4o.jpg);"],
    count = 0,
    initialPoint,
    finalPoint;
let value = 1;
const slider__h1 = document.querySelector(".slider__h1");
const slider__h2 = document.querySelector(".slider__h2");

imgBlock.style.cssText = imgs[count]; //set first img

const changeOpacity = (element) => { element.style.cssText = `opacity: ${value.toFixed(1)}`};
const setTimer = (flag) => { const interval = setInterval(() => { isShowText(flag) }, 100);
      setTimeout(() => { clearInterval(interval) }, 1000);};

const isShowText = (positive) => {
    positive ? value += 0.1 : value -= 0.1;
    changeOpacity(slider__h1);
    changeOpacity(slider__h2);
};

const timer = () => {
    if (count === 0) {setTimer(true);}
    else if (parseInt(value.toFixed(1)) !== 0) {setTimer(false)}
};

const addCounterLeft = () => {
    count += 1;
    if (count > 2) {count = 0}
    timer();
    imgBlock.style.cssText = imgs[count]
};

const addCounterRight = () => {
    count -= 1;
    if (count < 0) {count = 2}
    timer();
    imgBlock.style.cssText = imgs[count]
};

leftBtn.addEventListener("click", addCounterLeft);
rightBtn.addEventListener("click", addCounterRight);

imgBlock.addEventListener('touchstart', function (event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
}, false);

imgBlock.addEventListener('touchend', function (event) {
    event.preventDefault();
    event.stopPropagation();
    finalPoint = event.changedTouches[0];
    let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX) {
                addCounterLeft()
            } else {
                addCounterRight()
            }
        }
    }
}, false);
