const rest = JSON.parse(localStorage.restorationBD);

if (!Array.isArray(rest)) {
    throw Error("...")
}
console.log(rest)
const restEl = rest.map(({
                             productName,
                             id,
                             description,
                             productWeigth,
                             price,
                             productimageUrl,
                             ingridients,
                             productQuantity,
                             keywords
                         }) => {
    return `
    <div class="rest">
    <h3 class="rest-name">${productName}</h3>
    <img class="rest-image " id="${id}" src="${productimageUrl}" alt="${keywords}">
    <p class="rest-description">
    <span class="rest-title">Інгридієнти:</span> ${ingridients}
    </p>
        <p class="rest-description">
    <span class="rest-title">Опис:</span> ${description}
    </p>
            <p class="rest-description">
    <span class="rest-title">Вага:</span> ${productWeigth} грамм
    </p>
     <p class="rest-description">
    <span class="rest-title">Ціна:</span> ${price} грн.
    </p>
         <p class="rest-description">
    <span class="rest-title">Залишок:</span> ${productQuantity} шт.
    </p>
    </div>
    `
})

document.querySelector(".rest-box")
    .insertAdjacentHTML("beforeend", restEl.join(""));