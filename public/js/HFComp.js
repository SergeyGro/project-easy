Vue.component('header-comp', {
    data() {
        return {
            inputValue: '',
            cartItems: []
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id === product.id);
            if (find) {
                find.quantity++;
            } else {
                let prod = Object.assign(product, { quantity: 1 });
                this.cartItems.push(prod);
            }
        },
        deleteProduct(item) {
            let index = this.cartItems.findIndex(i => i.id === item.id);
            this.cartItems.splice(index, 1);
        },
        allDeleteProduct() {
            this.cartItems.splice(0, this.cartItems.length);
        },
        remove(item) {
            this.$parent.deleteJson(`/addToCart/${item.id}`, item.id)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                })
        }
    },
    mounted() {
        this.$parent.getJson('/addToCart')
            .then(data => {
                for (let el of data) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `<header class="header">
                    <div class="container">
                        <div class="between">
                            <div class="head-box">
                                <ul class="head left">
                                    <li class="index"><a href="index.html"><img src="image/b.svg" alt="logo"></a></li>
                                    <li class="lens">
                                        <form action="search.html" autocomplete="on">
                                            <input class="input-lens" type="text" v-model="inputValue" placeholder="Search">
                                            <input class="submit-lens" type="submit" v-model="inputValue" @click="$root.$refs.products.filter(inputValue)">
                                        </form>
                                    </li>
                                </ul>
                            </div>
                            <div class="head-box">
                                <ul class="head right">
                                    <menu-comp></menu-comp>
                                    <li class="account"><a href="registration.html"><img src="image/chel.svg" alt="logo"></a>
                                    </li>
                                    <li class="basket"><a href="cart.html"><img src="image/basket.png" alt="logo"></a>
                                    <div class="window-cart">
                                        <p class="cartsEmpty" 
                                        v-if="!cartItems.length">
                                        Your cart's empty</p>
                                        <window-cart-item class="window-cart-item"
                                        v-for="item of cartItems"
                                        :key="item.id"
                                        :cart-item="item"
                                        @remove="remove">
                                        </window-cart-item>
                                    </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>`
});

Vue.component('window-cart-item', {
    props: ['cartItem'],
    template: `<div class="window-purchase">
                    <div class="window-purchase-img-box">
                        <img class="purchase-img" :src="cartItem.img" alt="photo">
                    </div>
                    <div class="window-purchase-info">
                        <h1 class="window-purchase-h">{{cartItem.product_name}}</h1>
                        <p class="window-purchase-p">Price: <span class="purchase-price">$ {{cartItem.price}}</span></p>
                        <p class="window-purchase-p">Color: {{cartItem.color}}</p>
                        <p class="window-purchase-p">Size: {{cartItem.size}}</p>
                        <p class="window-purchase-p">Quantity: <span class="purchase-quant-numb">{{cartItem.quantity}}</span></p>
                    </div>
                    <button class="window-del-btn" type="submit" @click="$emit('remove', cartItem)">
                    <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>`
});

Vue.component('menu-comp', {
    template: `<li class="menu"><img src="image/3p.svg" alt="logo">
    <div class="open-menu">
        <h1 class="heading-menu">MENU</h1>
        <a href="menscatalog.html">
            <h1 class="h-menu">MAN</h1>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Accessories</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Bags</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Denim</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">T-Shirts</p>
        </a>
        <a href="menscatalog.html">
            <h1 class="h-menu">WOMAN</h1>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Accessories</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Jackets & Coats</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Polos</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">T-Shirts</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Shirts</p>
        </a>
        <a href="menscatalog.html">
            <h1 class="h-menu">KIDS</h1>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Accessories</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Jackets & Coats</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Polos</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">T-Shirts</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Shirts</p>
        </a>
        <a href="menscatalog.html">
            <p class="p-menu">Bags</p>
        </a>
    </div>
</li>`
});

Vue.component('footer-comp', {
    template: `<footer class="footer">
                    <div class="top-footer">
                        <div class="container flex-top-foot">
                            <div class="lady">
                                <img src="image/Intersect.png" alt="photo">
                                <p class="lady-text">“Vestibulum quis porttitor dui! Quisque viverra nunc mi, a pulvinar purus
                                    condimentum“</p>
                            </div>
                            <div class="subscribe">
                                <h1 class="h-sub">SUBSCRIBE</h1>
                                <p class="p-sub">FOR OUR NEWLETTER AND PROMOTION</p>
                                <form class="email-form" action="#">
                                    <input class="input-mail" type="text" placeholder="Enter Your Email">
                                    <button class="button-sub" type="submit">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-footer">
                        <div class="container between-center">
                            <div class="copyright">© 2021 Brand All Rights Reserved.</div>
                                <div class="soc-net">
                                    <a class="facebook" href="https://www.facebook.com"><i class="fa-brands fa-facebook-f"></i></a>
                                    <a class="instagram" href="https://www.instagram.com"><i class="fa-brands fa-instagram"></i></a>
                                    <a class="pinterest" href="https://www.pinterest.ru"><i
                                            class="fa-brands fa-pinterest-p"></i></a>
                                    <a class="twitter" href="https://twitter.com"><i class="fa-brands fa-twitter"></i></a>
                                </div>
                        </div>
                    </div>
                </footer>`
});

Vue.component('page-name', {
    props: ['text'],
    template: ` <div class="page-name">
                    <div class="container">
                        <h1 class="page-name-text">{{ text }}</h1>
                    </div>
                </div>`
});