console.log('1.Вёрстка +10\n 2.При загрузке приложения на странице отображаются полученные от API изображения +10\n3.Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения\nсоответствующей тематики, если такие данные предоставляет API +10\n4.Поиск +30\n5.дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n! при клике на изображение всплывает окно с его полной версией, можно листать\n')


const galleryContainer = document.querySelector('.container');
const inputReset = document.querySelector('.reset-btn');
const popupWindow = document.querySelector('.popup-window');
const closePopup = document.querySelector('.close-popup');
const flipUp = document.querySelector('.flip-up');
const flipBack = document.querySelector('.flip-back');
let popupImg = document.querySelector('.popup-img');
let sort = location.search.split('=').pop();
let search = document.querySelector('.search-input');
const unsplash_key = 'b2oO9jlpPhirKEUuvFLEjxKsfrcWLt-XIQdry-Yepqw';
const url = `https://api.unsplash.com/photos/random?client_id=${unsplash_key}&count=15`;
const searchUrl = `https://api.unsplash.com/search/photos?client_id=${unsplash_key}&query=${sort}&per_page=15`;

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showImages(data);
}
async function getSearchData() {
    const res = await fetch(searchUrl);
    let data = await res.json();
    data = data.results;
    showImages(data);
}

if(sort == ''){
    getData();
}
else{
    getSearchData();
    search.value = sort;
}
inputReset.addEventListener('click', () =>{
    let img = document.querySelectorAll('.gallery-img');
    img.forEach(n =>{
        n.remove();
    })        
    location.search = '';
    getData();
})
function showImages(data){
    data.forEach((n,i) => {
        let img = document.createElement('img');
        img.classList.add('gallery-img')
        img.src = n.urls.regular;
        img.alt = `image`;
        galleryContainer.appendChild(img);

        img.addEventListener('click', imgPopup)
        function imgPopup(n){
            let currentImg = data[i];
            popupWindow.classList.remove('hidden'); 
            popupImg.src = currentImg.urls.regular;  
            if (i == 0){
                flipBack.classList.add('hidden');
            }
            if(i == 14){
                flipUp.classList.add('hidden');
            }
            
            flipUp.onclick = () => {
                flipBack.classList.remove('hidden');
                if(i < 14){
                    i++;
                    imgPopup()
                }
                else{
                    flipUp.classList.add('hidden');
                }
            }
            flipBack.onclick =  () => {
                flipUp.classList.remove('hidden');
                if(i > 0){
                    i--;
                    imgPopup(n);
                
                }
                else{
                    flipBack.classList.add('hidden');
                }
            }
        }        
    })
}

closePopup.addEventListener('click', () =>{
    popupWindow.classList.add('hidden');
});