function initSlider () {const images = document.querySelectorAll('.slider__image')
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
}
document.addEventListener('load', initSlider())
    const API_KEY = 'AIzaSyDR2SMVcmo3MnKW4-4brdX7NoTDbRiKTZc';
    let quantityCards = 6;
    let category = 'Architecture';
    const URL = `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=${API_KEY}&printType=books&startIndex=0&maxResults=${quantityCards}&langRestrict=en`;
    const cards = document.querySelector('.book_cards')
    const more = document.querySelector('.more')
    const genreList = document.querySelectorAll('.list_item')
    function showMoreCards() {
        removeCards();
        quantityCards += 6;
        getCards(quantityCards, category);
    }
    more.addEventListener('click',()=>{ showMoreCards(); getCards()})
    function removeCards () {
        while (cards.lastChild) {
            cards.lastChild.remove()
        }
    }
    function makeShorterDescription (str) {
        if (str) {
            return str.slice (0, 147) + '...'
        }
        else {
            return 'there is no description for this book'
        }
        //str? str.slice(0, 200):'there is no description'
        //str.length>200? str.slice(0, 197) + '...': str         не работает
    }
    function createCards(data) {
        //removeCards();
        cards.insertAdjacentHTML('beforeend', `<div class="card">
        <img src="${data.volumeInfo.imageLinks.thumbnail}" class="image">
        <div class="about">
            <div class="author">${data.volumeInfo.authors?data.volumeInfo.authors:'неизвестен'}</div>
            <div class="name">${data.volumeInfo.title}</div>
            <div class="rate">
                <div class="stars">****</div>
                <div class="review">reviews</div>
            </div>
            <div class="discription">${makeShorterDescription(data.volumeInfo.description)}</div>
            <div class="price">price</div>
            <button class="buy_btn">button</button>
        </div>
    </div>`)
    }
    function getCards(count, genre) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${genre}"&key=${API_KEY}&printType=books&startIndex=0&maxResults=${count}&langRestrict=en`).then(function(res) {
        return res.json()
    }).then(function(data) {
        data.items.map(card => createCards(card))
    }).catch(function(err) { console.log(err)})
}
document.addEventListener('load', getCards(quantityCards, category))

function changeCategory () {
    for (k in genreList) {
        genreList[k].addEventListener('click', (e) => {
            document.querySelector('.list_item__active').classList.remove('list_item__active');
            e.target.classList.add('list_item__active')
            category = e.target.innerHTML.replace(/\s/g, '')
            quantityCards = 6;
            removeCards();
            getCards(quantityCards, category)
        })
    }
}
document.addEventListener('load', changeCategory())