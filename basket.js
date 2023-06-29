"use strict";

const basket = document.querySelector('.window-cart');
const buyBtn = document.querySelectorAll('.add-cart');


let cart = {
    "product_1": {
        price: 52,
        count: 0
    },
    "product_2": {
        price: 52,
        count: 0
    },
    "product_3": {
        price: 52,
        count: 0
    },
    "product_4": {
        price: 52,
        count: 0
    },
    "product_5": {
        price: 52,
        count: 0
    },
    "product_6": {
        price: 52,
        count: 0
    },
    "product_7": {
        price: 52,
        count: 0
    },
    "product_8": {
        price: 52,
        count: 0
    },
    "product_9": {
        price: 52,
        count: 0
    },
};

let sum = 0;
let units = 0;

function addToCart(el) {
    cart[el.target.dataset.id].count++;
    processed(obj);
    showed();
}

buyBtn.forEach((button) => {
    button.addEventListener('click', addToCart);
});

function renderCart() {
    console.log(cart);
}

function processed(obj) {
    for (let key in cart) {
        sum = sum += cart[key].price;
        units = units += cart[key].count;
    }
}

function showed() {
    if (units == 0) {
        basket.insertAdjacentHTML("afterbegin", "Корзина пуста.");
    } else {
        basket.insertAdjacentHTML("afterbegin", `<p>Товаров в корзине: ${units}.<br/>Итого: ${sum}$.</p>`);
    }
}

showed();