// Animation step 1
const featuresBoxItem = document.querySelectorAll('.features-box__item');

featuresBoxItem.forEach((item, index) => {
    setTimeout(() => {
        item.classList.remove('features-box__item--initial');
    }, index * 200)
})

const heroContent = document.querySelector('.hero__content');
heroContent.classList.remove('hero__content--initial');

// Animations on scroll

// Animation step 2 elements
const secondStepContainer = document.querySelector('#about .info');
const secondStepImage = document.querySelector('#about .info__image-box');
const secondStepContent = document.querySelector('#about .info__content');

// Animation step 3 element
const thirdStepEl = document.querySelector('.graph.--initial');

// Animation step 4 element
const fourthStepEl = document.querySelector('.unique-experiences__animbox');

// Animation step 5 elements
const fifthStepImage = document.querySelector('.step5-image');
const fifthStepText = document.querySelector('.step5-text');

// Animation step 6 elements
const sixthStepImage = document.querySelector('.step6-image');
const sixthStepText = document.querySelector('.step6-text');

// Animation step 7 elements
const seventhStepBox = document.querySelector('.ue-features');
const seventhStepItems = document.querySelectorAll('.ue-features__item');

// Animation step 8 elements
const eighthStepBox = document.querySelector('.footer__links-box');
const eighthStepEls = document.querySelectorAll('.footer__links-box>*');

let timerId;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    // Header show
    header.classList.remove('header--hidden');
    clearTimeout(timerId);
    timerId = setTimeout(() => {
        header.classList.add('header--hidden');
    }, 1500)
    // Animation step 2 detection
    const secondStepRect = secondStepContainer.getBoundingClientRect();
    if (secondStepRect.top < 400) {
        secondStepImage.classList.remove('--initial');
        secondStepContent.classList.remove('--initial');
    }
    const thirdStepRect = thirdStepEl.getBoundingClientRect();
    if (thirdStepRect.top < 600) {
        thirdStepEl.classList.remove('--initial');
    }
    const fourthStepRect = fourthStepEl.getBoundingClientRect();
    if (fourthStepRect.top < 600) {
        fourthStepEl.classList.remove('--initial');
    }
    const fifthStepRect = fifthStepImage.getBoundingClientRect();
    if (fifthStepRect.top < 600) {
        fifthStepImage.classList.remove('--initial');
        fifthStepText.classList.remove('--initial');
    }
    const sixthStepRect = sixthStepImage.getBoundingClientRect();
    if (sixthStepRect.top < 700) {
        sixthStepImage.classList.remove('--initial');
        sixthStepText.classList.remove('--initial');
    }
    const seventhStepRect = seventhStepBox.getBoundingClientRect();
    if (seventhStepRect.top < 700) {
        seventhStepItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('--initial');
            }, 100 * index)
        })
    }
    const eighthStepRect = eighthStepBox.getBoundingClientRect();    
    if (eighthStepRect.top < 1400) {        
        eighthStepEls.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('--initial');
            }, 75 * index)
        })
    }
})

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});