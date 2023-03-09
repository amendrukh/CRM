import { changeCategoryEvent } from "./events.js";

export const validate = (p, v) => p.test(v);
export const generationId = () => {
    const sizeID = Math.floor(Math.random() * (10 - 18) + 18)
    const a = "qwertyuiopasdfghjklzxcvbnm1234567890$&";
    let r = "";

    for (let i = 0; i < sizeID; i++) {
        r += a[Math.floor(Math.random() * a.length)];
    }

    return r
}

export function dateNow() {
    return `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
}

export function categorySelect() {
    const catigoty = document.querySelector(".catigoty");

    catigoty.insertAdjacentHTML("beforeend",
        `<select id="category">
    <option value="" disabled selected>Оберіть категорію</option>
    <option value="Магазин">Магазин</option>
    <option value="Відео хостинг">Відео хостинг</option>
    <option value="Ресторан">Ресторан</option>
</select>`);

    document.querySelector("#category")
        .addEventListener("change", changeCategoryEvent)
}


export function createHTMLElement(tagName = "div", className, value, attr = [], listener) {
    const el = document.createElement(tagName);
    if (className) {
        el.classList.add(className)
    }
    if ("inputtextareaoption".includes(tagName)) {
        if(value){
                el.value = value;
        }
        if(listener){
            el.addEventListener("change", listener)
        }
    } else {
        if(value !== undefined){
             el.innerHTML = value;
        }
        if(listener){
            el.addEventListener("click", listener)
        }
    }
    attr.forEach(attr => {
        // Зробити, щоб ми отримували точно сам об.
        if (typeof attr === "object" && attr !== null) {
            // отримати Значання з об...
            //el.setAttribute(attr.props, attr.value)
            el.setAttribute(Object.entries(attr)[0][0], Object.entries(attr)[0][1])
        }
    })
    return el;
}

export function createInputSring (type = "text", value = "", id, key) {
    const input = `
    <div class="element-product">
      <label for="${id}">${value}</label>
      <input type="${type}" id="${id}" data-type="${key}">
    </div>
    `
    return input
}

export function createEditProductInput (p, v) {
    const div = createHTMLElement("div", undefined);
    const id = generationId();
    const label = createHTMLElement("label", undefined, p, [{for: id}]);
    const input = createHTMLElement("input", undefined, v);
    input.key = p;
    if(p === "status"){
        input.type = "checkbox"
    }
    if(p === "id" || p === "date" || p === "status"){
        input.disabled = true;
    }
    input.id = id;

    div.append(label, input)
    return div
}



export function req (type = "ajax", url = "/") {
    if(type === "ajax"){
        const r = new XMLHttpRequest();
        r.open("GET", url);
        r.send();
        r.addEventListener("readystatechange", () => {
            if(r.readyState === 4 && r.status >= 200 && r.status < 300){
                localStorage.server = r.responseText;
                document.body.classList.add("rdone");
                setTimeout(()=>{document.body.classList.remove("rdone");}, 2000)
            }else if(r.readyState === 4){
                throw new Error(`Помилка з запитом: статус код : ${r.status}`)
            }
        })
        r.onerror = () => {
            alert("Немає звязку! Перевірте підключення до мережі!")
        }
    }else if (type === "fetch"){
        const info = fetch(url);

        info.then((data)=> {
            console.dir(data);
           return data.json()
        })
        .then((infoJson)=>{
            document.body.classList.add("rdone");
            setTimeout(()=>{document.body.classList.remove("rdone");}, 2000)
            localStorage.serverFetch = JSON.stringify(infoJson)
        })
        .catch(e => {
            console.dir(e);
            throw new Error(`Помилка з запитом: статус код : ${e.message}`)
        })
    }
}

