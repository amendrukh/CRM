import { getLogin, getPassword } from "./var.js";
import { generationId, validate, createInputSring, dateNow } from "./functions.js";
import { StoreElementCRM, restoranElementCrm, videoElementCrm } from "./class.js";
import { showRestoranMenu } from "./restoration.js";
import {showStoreProduct} from "./store.js"
import {showVideo} from "./video.js";




//changeInputEvent Object
const isDisabledBtn = {
    flagLogin: false,
    flagPassword: false
}

function changeInputEvent(e) {
    if (e.target.dataset.type === "login" && validate(new RegExp("^" + getLogin + "$"), e.target.value)) {
        e.target.classList.remove("error")
        isDisabledBtn.flagLogin = true;
    } else if (e.target.dataset.type === "password" && validate(new RegExp("^" + getPassword + "$"), e.target.value)) {
        e.target.classList.remove("error")
        isDisabledBtn.flagPassword = true;
    } else {
        e.target.classList.add("error");
        if (e.target.dataset.type === "login") {
            isDisabledBtn.flagLogin = false;
        } else if (e.target.dataset.type === "password") {
            isDisabledBtn.flagPassword = false;
        }
    }

    if (isDisabledBtn.flagLogin && isDisabledBtn.flagPassword) {
        document.getElementById("disabled").disabled = false;
    } else {
        document.getElementById("disabled").disabled = true;
    }
}

function userLoginEvent() {
    sessionStorage.isLogin = true;
    document.location = "/"
}

function showModalEvent() {
    const modal = document.querySelector(".container-modal").classList.remove("hide")
}

function hideModalEvent() {
    const modal = document.querySelector(".container-modal").classList.add("hide")
}

function changeCategoryEvent(e) {
    const modal__body = document.querySelector(".modal__body");
    modal__body.innerHTML = "";
    console.log(e.target.value);
    if (e.target.value === "Магазин") {
        modal__body.insertAdjacentHTML("beforeend", `
       <form>
        ${createInputSring("text", "Назва продукту", generationId(), "productName")}
        ${createInputSring("number", "Вартість продукту", generationId(), "porductPrice")}
        ${createInputSring("url", "Картинка продукту", generationId(), "productImage")}
        ${createInputSring("text", "Опис продукту", generationId(), "productDescription")}
        ${createInputSring("text", "Ключеві слова для пошуку. Розділяти комою", generationId(), "keywords")}
       </form>
       `)

    }else if (e.target.value === "Відео хостинг"){
        modal__body.insertAdjacentHTML("beforeend", `
        <form>
         ${createInputSring("text", "Назва відео", generationId(), "productName")}
         ${createInputSring("url", "Постер", generationId(), "poster")}
         ${createInputSring("url", "Посилання на відео", generationId(), "url")}
         ${createInputSring("text", "Опис продукту", generationId(), "description")}
         ${createInputSring("text", "Ключеві слова для пошуку. Розділяти комою", generationId(), "keywords")}
        </form>
        `)
    }else if (e.target.value === "Ресторан"){
        modal__body.insertAdjacentHTML("beforeend", `
        <form>
         ${createInputSring("text", "Назва Страви", generationId(), "productName")}
         ${createInputSring("text", "Грамовка", generationId(), "productWeiht")}
         ${createInputSring("text", "Склад", generationId(), "ingredients")}
         ${createInputSring("text", "Залишок", generationId(), "productQuantity")}
         ${createInputSring("text", "Опис продукту", generationId(), "description")}
         ${createInputSring("text", "Ключеві слова для пошуку. Розділяти комою", generationId(), "keywords")}
         ${createInputSring("text", "Вартість продукту", generationId(), "price")}
         ${createInputSring("url", "Забраження продукту", generationId(), "productimageUrl")}
        </form>
        `)
    }
}

function saveData() {
    try {
        const [isCategory] = document.querySelector("select").selectedOptions;
        const [...inputs] = document.querySelectorAll("form input");
        if (isCategory.value === "Магазин") {
            const obj = {
                productName: "string",
                porductPrice: "number",
                productImage: "string",
                productDescription: "string",
                keywords: "string array",
            };

            inputs.forEach(e => {
                obj[e.dataset.type] = e.value;
                e.value = ''
            })

            const store = JSON.parse(localStorage.store);
            store.push(new StoreElementCRM(
                obj.productName,
                obj.porductPrice,
                obj.productImage,
                obj.productDescription,
                undefined,
                obj.keywords,
                dateNow,
                generationId));

            localStorage.store = JSON.stringify(store);

        } else if (isCategory.value === 'Відео хостинг') {
            console.log('video')
            const obj = {
                productName: 'string',
                poster: 'string',
                url: 'string',
                description: 'string',
                keywords: 'string array',
            }

            inputs.forEach(el => {
                console.log(el.value)
                obj[el.dataset.type] = el.value;
                el.value = '';
            })

            const video = JSON.parse(localStorage.video);
            if (video.length === 0) {
                video.push(new videoElementCrm('Jellyfish', '', '/video/jellyfish.mp4', 'swimming jellyfish', 'медузи, jellyfish', dateNow, generationId));
                video.push(new videoElementCrm('Sheeps', '', '/video/sheep.mp4', 'sheeps in the field', 'вівці, мала вівця', dateNow, generationId));
                video.push(new videoElementCrm('Beach', '', '/video/beach.mp4', 'view on the beachside', 'пляж, beach, beachside', dateNow, generationId));
                video.push(new videoElementCrm('Owl', '', 'https://pixabay.com/ru/videos/%D1%81%D0%BE%D0%B2%D0%B0-%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D0%BE%D0%B5-%D0%BF%D1%82%D0%B8%D1%86%D0%B0-%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0-%D0%BF%D0%B5%D1%80%D0%BE-18244/', 'owl with orange eyes', 'сова, owl, eagle owl', dateNow, generationId));
                video.push(new videoElementCrm('Paragliding', '', 'https://pixabay.com/ru/videos/%D0%B3%D0%BE%D1%80%D1%8B-%D0%BF%D0%B0%D1%80%D0%B0%D1%88%D1%8E%D1%82-%D0%BF%D0%B0%D1%80%D0%B0%D0%BF%D0%BB%D0%B0%D0%BD%D0%B5%D1%80%D0%B8%D0%B7%D0%BC-%D1%81%D0%BF%D0%BE%D1%80%D1%82-81945/', 'Paragliding over the sea', 'paragliding, beach, mountains', dateNow, generationId));
                video.push(new videoElementCrm('Sea', '', 'https://pixabay.com/ru/videos/%D0%B6%D0%B8%D0%B2%D1%8B%D0%B5-%D0%BE%D0%B1%D0%BE%D0%B8-%D0%BC%D0%BE%D1%80%D0%B5-%D0%B2%D0%BE%D0%B4%D0%B0-%D0%B2%D0%BE%D0%BB%D0%BD%D1%8B-%D0%BE%D0%BA%D0%B5%D0%B0%D0%BD-112722/', 'view of the waves', 'хвилі, waves', dateNow, generationId));
            }

            video.push(new videoElementCrm(obj.productName, obj.poster, obj.url, obj.description, obj.keywords, dateNow, generationId));
            localStorage.video = JSON.stringify(video);

        } else if (isCategory.value === 'Ресторан') {
            const obj = {
                productName: 'string',
                productWeigth: 'number',
                ingridients: 'string',
                productQuantity: 'number',
                description: 'string',
                price: 'number',
                productimageUrl: 'string',
                keywords: 'string array',
            }

            inputs.forEach(el => {
                obj[el.dataset.type] = el.value;
                el.value = '';
            })

            const rest = JSON.parse(localStorage.restorationBD);
            rest.push(new restoranElementCrm(obj.productName, obj.productWeigth, obj.ingridients,obj.productQuantity, obj.description, obj.price, obj.productimageUrl, obj.keywords, dateNow, generationId))
            localStorage.restorationBD = JSON.stringify(rest);
        }
    } catch (e) {
        console.error(e)
    }
}

function deleteItem(e) {
    try {
        if(e.target.tagName !== "SPAN") return;
        let span = e.target;
        if (window.location.href.indexOf('restoran') !== -1 && localStorage.restorationBD) {
            let restorationBD = JSON.parse(localStorage.restorationBD);
            restorationBD = restorationBD.filter(el => el.id !== span.dataset.key);
            showRestoranMenu(restorationBD)
            localStorage.restorationBD = JSON.stringify(restorationBD);
        } else if (window.location.href.indexOf('store') !== -1 && localStorage.store) {
            let store = JSON.parse(localStorage.store);
            store = store.filter(el => el.id !== span.dataset.key);
            showStoreProduct(store)
            localStorage.store = JSON.stringify(store);
        } else if (window.location.href.indexOf('video') !== -1 && localStorage.video) {
            let video = JSON.parse(localStorage.video);
            video = video.filter(el => el.id !== span.dataset.key);
            showVideo(video)
            localStorage.video = JSON.stringify(video);
        }
    } catch (e) {
        console.error(e)
    }
}

export function exportDataEvent () {

    let windowData = open("/window", "test");
    console.log(document.querySelector(".show-json"));
    
    setTimeout(()=>{
        windowData.close()
    }, 5000)
}

export { changeInputEvent, userLoginEvent, showModalEvent, changeCategoryEvent, hideModalEvent, saveData, deleteItem }