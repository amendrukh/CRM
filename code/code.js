// Додати нові продукти (Відео для відео хостингу та страви для ресторану)
// Відео має бути 3 зовнішнім посиланням та 3 відео завантажені до проекту

// Тут реалізація вашого коду.
// import { generationId, dateNow } from "./functions.js";
//
// export const saveVideoAndRestData = e => {
//     try {
//         const [isCategory] = document.querySelector("select").selectedOptions;
//         const [...inputs] = document.querySelectorAll('form input');
//         // console.log(isCategory.value)
//         // console.log(inputs)
//         if (isCategory.value === 'Відео хостинг') {
//             console.log('video')
//             const obj = {
//                 productName: 'string',
//                 poster: 'string',
//                 url: 'string',
//                 description: 'string',
//                 keywords: 'string array',
//             }
//
//             inputs.forEach(el => {
//                 console.log(el.value)
//                 obj[el.dataset.type] = el.value;
//                 el.value = '';
//             })
//
//             const video = JSON.parse(localStorage.video);
//             if (video.length === 0) {
//                 video.push(new videoElementCrm('Jellyfish', '', '/video/jellyfish.mp4', 'swimming jellyfish', 'медузи, jellyfish', dateNow, generationId));
//                 video.push(new videoElementCrm('Sheeps', '', '/video/sheep.mp4', 'sheeps in the field', 'вівці, мала вівця', dateNow, generationId));
//                 video.push(new videoElementCrm('Beach', '', '/video/beach.mp4', 'view on the beachside', 'пляж, beach, beachside', dateNow, generationId));
//                 video.push(new videoElementCrm('Owl', '', 'https://pixabay.com/ru/videos/%D1%81%D0%BE%D0%B2%D0%B0-%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D0%BE%D0%B5-%D0%BF%D1%82%D0%B8%D1%86%D0%B0-%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0-%D0%BF%D0%B5%D1%80%D0%BE-18244/', 'owl with orange eyes', 'сова, owl, eagle owl', dateNow, generationId));
//                 video.push(new videoElementCrm('Paragliding', '', 'https://pixabay.com/ru/videos/%D0%B3%D0%BE%D1%80%D1%8B-%D0%BF%D0%B0%D1%80%D0%B0%D1%88%D1%8E%D1%82-%D0%BF%D0%B0%D1%80%D0%B0%D0%BF%D0%BB%D0%B0%D0%BD%D0%B5%D1%80%D0%B8%D0%B7%D0%BC-%D1%81%D0%BF%D0%BE%D1%80%D1%82-81945/', 'Paragliding over the sea', 'paragliding, beach, mountains', dateNow, generationId));
//                 video.push(new videoElementCrm('Sea', '', 'https://pixabay.com/ru/videos/%D0%B6%D0%B8%D0%B2%D1%8B%D0%B5-%D0%BE%D0%B1%D0%BE%D0%B8-%D0%BC%D0%BE%D1%80%D0%B5-%D0%B2%D0%BE%D0%B4%D0%B0-%D0%B2%D0%BE%D0%BB%D0%BD%D1%8B-%D0%BE%D0%BA%D0%B5%D0%B0%D0%BD-112722/', 'view of the waves', 'хвилі, waves', dateNow, generationId));
//             }
//
//             video.push(new videoElementCrm(obj.productName, obj.poster, obj.url, obj.description, obj.keywords, dateNow, generationId));
//             localStorage.video = JSON.stringify(video);
//             console.log(JSON.stringify(video))
//         } else if (isCategory.value === 'Ресторан') {
//             console.log('restrant')
//             const obj = {
//                 productName: 'string',
//                 productWeigth: 'number',
//                 ingridients: 'string',
//                 description: 'string',
//                 price: 'number',
//                 productimageUrl: 'string',
//                 keywords: 'string array',
//             }
//
//             inputs.forEach(el => {
//                 obj[el.dataset.type] = el.value;
//                 el.value = '';
//             })
//
//             const rest = JSON.parse(localStorage.restorationBD);
//             rest.push(new restoranElementCrm(obj.productName, obj.productWeigth, obj.ingridients, obj.description, obj.price, obj.productimageUrl, obj.keywords, dateNow, generationId))
//             localStorage.restorationBD = JSON.stringify(rest);
//         }
//     } catch (error) {
//         console.error(error)
//     }
//
// }

class videoElementCrm {
    constructor(videoName = '', poster = '', url = '', description = '', keywords = [], dateNow = () => { }, id = () => { }) {
        this.id = id();
        this.date = dateNow();
        this.videoName = videoName;
        this.poster = poster;
        this.url = url;
        this.description = description;
        this.keywords = keywords.split(',');
        this.status = false;
    }
}

class restoranElementCrm {
    constructor(productName = '', productWeight = 0, ingridients = '', description = '', price = 0, productimageUrl = '', keywords = [], dateNow = () => { }, id = () => { }) {
        this.id = id();
        this.date = dateNow();
        this.productName = productName;
        this.productWeigth = productWeight;
        this.ingridients = ingridients;
        this.description = description;
        this.price = price;
        this.productimageUrl = productimageUrl;
        this.keywords = keywords.split(',');
        this.status = false;
    }
}