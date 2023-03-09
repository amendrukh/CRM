import { hideModalEvent, showModalEvent } from "./events.js";
import { createHTMLElement, createEditProductInput } from "./functions.js";
import { modalClose, modalSave } from "./var.js";

// Вивід на сторінку список відео
function showVideo(arr = []) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ""

    arr.forEach(({ videoName, date, url, id }, i) => {
        // #	Назва	Дата публікації	Посилання	Редагувати	Видалити
        const tr = createHTMLElement('tr');
        const element = [
            createHTMLElement("td", undefined, i + 1),
            createHTMLElement("td", undefined, videoName),
            createHTMLElement("td", undefined, date),
            createHTMLElement("td", undefined, url),
            createHTMLElement("td", undefined, `<span data-key="${id}" class="icon">&#9998;</span>`, undefined, editVideoListEvent),
            createHTMLElement("td", undefined, `<span data-key="${id}" class='icon'>&#10006;</span>`, undefined, delVideoItemtEvent),
        ]
        element[3].style.maxWidth = '700px'
        element[3].style.overflow = 'hidden'

        tbody.append(tr);
        tr.append(...element);
    })
}

// Читаємо з localStorage
if (localStorage.video) {
    showVideo(JSON.parse(localStorage.video));
}

// Змінюємо опис відео з БД
function editVideoListEvent(e) {
    if (e.target.tagName !== 'SPAN') return;
    console.log(e.target)
    showModalEvent();

    const video = JSON.parse(localStorage.video);

    const modalWindow = document.querySelector('.modal');
    const modalBody = createHTMLElement('div', 'modal-body');
    modalWindow.append(modalBody);

    // Робота з кнопками
    const btns = createHTMLElement("div", "btns-save");

    modalSave.addEventListener("click", () => {
        newSaveVideoInfo(modalBody, rez)
        hideModalEvent()
        modalBody.remove()
        showVideo(JSON.parse(localStorage.video));
    });

    modalClose.addEventListener("click", () => {
        hideModalEvent()
        modalBody.remove()
    });

    btns.append(modalSave, modalClose);
    modalWindow.append(btns);

    //Визначення об'єкта для редагування
    const rez = video.find(({ id }) => e.target.dataset.key === id);
    const data = Object.entries(rez);

    // Редагування позиції
    const inputsElements = data.map(([props, value]) => {
        return createEditProductInput(props, value)
    })
    modalBody.append(...inputsElements);
}

function newSaveVideoInfo(newObj, oldObj) {
    const inputs = newObj.querySelectorAll('input');

    const obj = {
        id: oldObj.id,
        date: oldObj.date,
        status: false
    }

    inputs.forEach(input => {
        switch (input.key) {
            case "videoName": obj.videoName = input.value;
                return
            case "poster": obj.poster = input.value;
                return
            case "url": obj.url = input.value;
                return
            case "description": obj.description = input.value;
                return
            case "keywords": obj.keywords = input.value;
                return
        }
    })

    const video = JSON.parse(localStorage.video);
    video.splice(video.findIndex(el => oldObj.id === el.id), 1, obj);
    localStorage.video = JSON.stringify(video);
}

function delVideoItemtEvent(e) {
    const video = JSON.parse(localStorage.video);

    e.target.closest('tr').remove();
    video.splice(video.findIndex(({ id }) => e.target.dataset.key === id), 1);
    localStorage.video = JSON.stringify(video);
}