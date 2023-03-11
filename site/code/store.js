const store = JSON.parse(localStorage.store);

if (!Array.isArray(store)) {
    throw Error("...")
}
console.log(store)
const storeEl = store.map(({
                               productName,
                               id,
                               productDescription,
                               porductPrice,
                               productImage,
                               productQuantity,
                               keywords
                           }) => {
    return `
    <div class="store">
    <h3 class="store-name">${productName}</h3>
    <img class="store-image " id="${id}" src="${productImage}" alt="${keywords}">
    <p class="store-description">
    <span class="store-title">Опис продукту:</span> ${productDescription}
    </p>
     <p class="store-description">
    <span class="store-title">Ціна:</span> ${porductPrice} грн.
    </p>
         <p class="store-description">
    <span class="store-title">Залишок:</span> ${productQuantity} шт.
    </p>
    </div>
    `
})

document.querySelector(".store-box")
    .insertAdjacentHTML("beforeend", storeEl.join(""));