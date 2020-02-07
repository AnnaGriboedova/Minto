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

// check data (validation)
const submit = document.querySelector('.modalSubmit__input');


submit.addEventListener('click', () => {

    const name = modalForm.elements[0].value;
    const surname = modalForm.elements[1].value;
    const phone = modalForm.elements[2].value;
    const mail = modalForm.elements[3].value;
    
    const nameInput = document.querySelector('.userInfo__nameInput');
    const surnameInput = document.querySelector('.userInfo__surnameInput');
    const phoneInput = document.querySelector('.userInfo__phoneInput');
    const mailInput = document.querySelector('.userInfo__mailInput');

    let isValidName = false;
    let isValidSurname = false;
    let isValidPhone = false;
    let isValidMail = false;
    
    if (!/[A-Z][A-Za-z]+/.test(name)) {      
        nameInput.classList.add('notValid');
        isValidName = false;       
    } else {       
        nameInput.classList.remove('notValid');
        isValidName = true;   
    }

    if (!/[A-Z][A-Za-z]+/.test(surname)) {       
        surnameInput.classList.add('notValid');
        isValidSurname = false;       
    } else {  
        surnameInput.classList.remove('notValid');
        isValidSurname = true;
    }

    if (!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone)) {       
        phoneInput.classList.add('notValid');
        isValidPhone = false;       
    } else {        
        phoneInput.classList.remove('notValid');
        isValidPhone = true;
    }

    if (!/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i.test(mail)) {      
        mailInput.classList.add('notValid');
        isValidMail = false;       
    } else {       
        mailInput.classList.remove('notValid');
        isValidMail = true;   
    }
    
    if (isValidName && isValidSurname && isValidPhone && isValidMail) {
        modalForm.submit();
    } else {
        event.preventDefault();
    }

    }
);