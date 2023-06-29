Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            sum: 0
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id === product.id);
            if (find) {
                this.$parent.putJson(`/addToCart/${find.id}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign(product, { quantity: 1 });
                this.$parent.postJson('/addToCart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        minus(item) {
            let find = this.cartItems.find(el => el.id === item.id);
            if (find) {
                if (item.quantity <= 1) {
                    this.remove(item);
                } else {
                    this.$parent.putJson(`/addToCart/${item.id}`, { quantity: -1 });
                    find.quantity--;
                }
            }
        },
        plus(item) {
            let find = this.cartItems.find(el => el.id === item.id);
            if (find) {
                this.$parent.putJson(`/addToCart/${find.id}`, { quantity: 1 });
                find.quantity++;
            }
        },
        remove(item) {
            this.$parent.deleteJson(`/addToCart/${item.id}`, item.id)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                    this.calculateSum();
                })
        },
        allRemove() {
            this.$parent.deleteJson('/addToCart')
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(0, this.cartItems.length);
                        this.calculateSum();
                    }
                });
        },
        calculateSum() {
            let calc = 0;
            if (this.cartItems.length) {
                this.cartItems.forEach(el => {
                    calc += el.price * el.quantity;
                    this.sum = calc;
                })
            } else {
                this.sum = 0;
            }
        }
    },
    mounted() {
        this.$parent.getJson('/addToCart')
            .then(data => {
                for (let el of data) {
                    this.cartItems.push(el);
                }
                this.calculateSum()
            });
    },
    template: `<div class="container flexContentCart">
                    <div class="addedProducts">
                        <div class="purchases">
                            <p class="cartsEmpty" 
                            v-if="!cartItems.length">
                            Your cart's empty</p>
                            <cart-item class="cart-item"
                            v-for="item of cartItems"
                            :key="item.id"
                            :cart-item="item"
                            @remove="remove">
                            </cart-item>
                            <div class="purchase-button">
                                <button class="purchase-butt" type="submit" @click="allRemove" v-if="cartItems.length">CLEAR SHOPPING CART</button>
                                <a href="menscatalog.html">
                                <button class="purchase-butt" type="submit">CONTINUE SHOPPING</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <order-registration :sum="sum"></order-registration>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<div class="purchase">
                    <div class="purchase-img-box">
                        <img class="purchase-img" :src="cartItem.img" alt="photo">
                    </div>
                    <div class="purchase-info">
                        <h1 class="purchase-h">{{cartItem.product_name}}</h1>
                        <p class="purchase-p">Price: <span class="purchase-price">$ {{cartItem.price}}</span></p>
                        <p class="purchase-p">Color: {{cartItem.color}}</p>
                        <p class="purchase-p">Size: {{cartItem.size}}</p>
                        <p class="purchase-p">Quantity: <span class="purchase-quant-numb">{{cartItem.quantity}}</span></p>
                    </div>
                    <button class="del-btn" type="submit" @click="$emit('remove', cartItem), $root.$refs.headercomp.deleteProduct(cartItem)">
                    <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>`
});

Vue.component('order-registration', {
    props: ['sum'],
    template: `<div class="adress">
                        <div class="adress-form">
                            <h1 class="h-adress">SHIPPING ADRESS</h1>
                            <form class="form-adress" action="#">
                                <input type="adress" class="input-adress coutry" placeholder="Bangladesh">
                                <input type="adress" class="input-adress state" placeholder="State">
                                <input type="adress" class="input-adress zip" placeholder="Postcode / Zip">
                                <button class="adress-button">GET A QUOTE</button>
                            </form>
                        </div>
                        <div class="buy">
                            <div class="result">
                                <p class="total-sub">SUB TOTAL <span class="sub-span">$ {{sum}}</span></p>
                                <p class="total-grand">GRAND TOTAL <span class="grand-span">$ {{sum}}</span></p>
                            </div>
                            <div class="flex-box-button">
                                <div class="box-buy-button">
                                    <button class="button-buy" type="submit">PROCEED TO CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                    
                </div>`
});