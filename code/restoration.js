import { hideModalEvent, showModalEvent, deleteItem } from "./events.js";
import { createHTMLElement, createEditProductInput } from "./functions.js";
import { modalClose, modalSave } from "./var.js";


console.log(JSON.parse(localStorage.restorationBD));

//Вивід на сторінку позицій меню
     export function showRestoranMenu(arr = []) {
        //Знайшли tbody для виводу інформації по позиціям
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""

        arr.forEach(function ({productName, productQuantity, price, status, date, id}, i) {
            //Назва	Залишок	Ціна	Редагувати	Статус	Дата додавання	Видалити
            const tr = createHTMLElement("tr");
            const element = [
                createHTMLElement("td", undefined, i + 1),
                createHTMLElement("td", undefined, productName),
                createHTMLElement("td", undefined, productQuantity),
                createHTMLElement("td", undefined, price),
                createHTMLElement("td", undefined, `<span data-key="${id}" class="icon">&#9998;</span>`, undefined, editRestoranMenuEvent),
                createHTMLElement("td", undefined, status ? "<span class='icon green'>&#10004;</span>" : "<span class='icon red'>&#10008;</span>"),
                createHTMLElement("td", undefined, date),
                createHTMLElement("td", undefined, `<span data-key="${id}" class='icon'>&#10006;</span>`, undefined, deleteItem),
            ]
            tbody.append(tr);
            tr.append(...element)
        })
    }

    if (window.location.href.indexOf('restoran') !== -1 && localStorage.restorationBD) {
        showRestoranMenu(JSON.parse(localStorage.restorationBD));
    }


// Змінюємо страву з БД
function editRestoranMenuEvent(e) {
    console.log(e.target)
    if (e.target.tagName !== 'SPAN') return;
    showModalEvent();

    const rest = JSON.parse(localStorage.restorationBD);

    const modalWindow = document.querySelector(".modal");
    const modalBody = createHTMLElement("div", "modal-body");
    modalWindow.append(modalBody);

    // Робота з кнопками
    const btns = createHTMLElement('div', 'btns-save');

    modalSave.addEventListener('click', () => {
        newSaveMenuInfo(modalBody, rez);
        hideModalEvent()
        modalBody.remove()
        showRestoranMenu(JSON.parse(localStorage.restorationBD));
    })

    modalClose.addEventListener("click", () => {
        hideModalEvent()
        modalBody.remove()
    });

    btns.append(modalSave, modalClose);
    modalWindow.append(btns);

    //Визначення об'єкта для редагування
    const rez = rest.find(({ id }) => e.target.dataset.key === id);
    const data = Object.entries(rez);

    const inputsElements = data.map(([props, value]) => {
        return createEditProductInput(props, value)
    })
    modalBody.append(...inputsElements)
}

function newSaveMenuInfo(newObj, oldObj) {
    const inputs = newObj.querySelectorAll('input');

    const obj = {
        id: oldObj.id,
        date: oldObj.date,
        status: false
    }

    inputs.forEach(input => {
        switch (input.key) {
            case "productName": obj.productName = input.value;
                return
            case "productWeigth": obj.productWeigth = input.value;
                return
            case "ingridients": obj.ingridients = input.value;
                return
            case "description": obj.description = input.value;
                return
            case "price": obj.price = input.value;
                return
            case "productimageUrl": obj.productimageUrl = input.value;
                return
            case "productQuantity": obj.productQuantity = input.value;
                return
            case "keywords": obj.keywords = input.value;
                return
        }
    })
    if (obj.productQuantity > 0) {
        obj.status = true;
    } else {
        obj.status = false;
    }
    const rest = JSON.parse(localStorage.restorationBD);
    rest.splice(rest.findIndex(el => oldObj.id === el.id), 1, obj);
    localStorage.restorationBD = JSON.stringify(rest);
}


// function delRestoranMenuEvent(e) {
//     const rest = JSON.parse(localStorage.restorationBD);
//
//     e.target.closest('tr').remove();
//     rest.splice(rest.findIndex(({ id }) => e.target.dataset.key === id), 1)
//     localStorage.restorationBD = JSON.stringify(rest);
// }
