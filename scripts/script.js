const images = document.querySelectorAll('.slider__image')
const dots = document.querySelectorAll('.slider__dot')
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        document.querySelector('.slider__dot_active').classList.remove('slider__dot_active');
        document.querySelector('.slider__image_active').classList.remove('slider__image_active')
        dot.classList.add('slider__dot_active')
        images[index].classList.add('slider__image_active')
    })
})
function showNextSlide() {
    let count = 0;
    for (i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('slider__dot_active')) {
            count = i
        }
    }
    dots[count].classList.remove('slider__dot_active');
    document.querySelector('.slider__image_active').classList.remove('slider__image_active');
    if (count >= dots.length - 1) {
        images[0].classList.add('slider__image_active')
        dots[0].classList.add('slider__dot_active')
    } else {
        images[count + 1].classList.add('slider__image_active')
        dots[count + 1].classList.add('slider__dot_active')
    }
}
setInterval(showNextSlide, 3000)
