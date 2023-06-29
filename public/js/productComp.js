Vue.component('products', {
    data() {
        return {
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(searchLine) {
            const searchLineObj = { searchLine };
            this.$parent.postJson('/search', searchLineObj);
        }
    },
    mounted() {
        this.$parent.getJson('/catalogData')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.$parent.getJson('/search')
            .then(data => {
                for (let el of data) {
                    const regexp = new RegExp(el.searchLine, 'i');
                    this.filtered = this.products.filter(el => regexp.test(el.product_name));
                }
                if (this.filtered.length === 0) {
                    this.filtered = this.products;
                }
            });
    },
    template: `<div class="container">
                    <div class="products">
                        <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
                    </div>
                </div>`
});

Vue.component('product', {
    props: ['product'],
    template: `<a class="card" @click="$root.$refs.productselection.clickProduct(product)" href="product.html">
                    <div class="card-top">
                        <img class="card-img" :src="product.img" alt="product">
                        <button class="add-cart" @click="$root.$refs.cart.addProduct(product), $root.$refs.headercomp.addProduct(product)" onclick="event.preventDefault()">
                            <img class="cart-img" src="image/Vector.png" alt="cart">
                            <p class="addBtn">Add to Cart</p>
                        </button>
                    </div>
                    <div class="card-text">
                        <h1 class="card-h">{{product.product_name}}</h1>
                        <p class="card-p">{{product.description}}</p>
                        <p class="card-price">{{product.price}}$</p>
                    </div>
                </a>`
});

Vue.component('productselection', {
    data() {
        return {
            selectedProduct: [],
            sum: 0,
            quantity: 1,
            color: 'red',
            size: 'XS',
            gender: ''
        }
    },
    methods: {
        clickProduct(product) {
            this.$parent.postJson('/productItem', product)
                .then(data => {
                    if (data.result === 1) {
                        this.selectedProduct.splice(0, 1, product);
                    }
                })
        },
        addProduct(product) {
            let prod = Object.assign(product[0], { quantity: this.quantity });
            prod.color = this.color;
            prod.size = this.size;
            this.$parent.postJson('/addToCart', prod);
        }
    },
    mounted() {
        this.$parent.getJson('/productItem')
            .then(data => {
                this.selectedProduct = data;
                this.gender = data[0].gender.toUpperCase();
                this.selectedProduct.forEach(el => {
                    this.sum = el.price * this.quantity;
                })
            });
    },
    template: `<div class="container">
                    <div class="product-info">
                        <section class="product-section">
                            <div class="product-section-top">
                                <h2 class="women-coll">{{gender}} COLLECTION</h2>
                                <h1 class="cheap-and">MOSCHINO CHEAP AND CHIC</h1>
                                <p class="product-info-text">Compellingly actualize fully researched processes before
                                    proactive
                                    outsourcing. Progressively
                                    syndicate collaborative architectures before cutting-edge services. Completely
                                    visualize
                                    parallel
                                    core competencies rather than exceptional portals.</p>
                                <p class="product-info-price">$ {{sum}}</p>
                            </div>
                            <div class="choose">
                                <details class="sorting">
                                    <summary class="summary-choose">CHOOSE COLOR</summary>
                                    <div class="choose-label">
                                        <select v-model="color">
                                            <option>black</option>
                                            <option>white</option>
                                            <option>red</option>
                                            <option>blue</option>
                                            <option>green</option>
                                            <option>yellow</option>
                                        </select>
                                    </div>
                                </details>
                                <details class="sorting">
                                    <summary class="summary-choose">CHOOSE SIZE</summary>
                                    <div class="choose-label">
                                        <select v-model="size">
                                            <option>XS</option>
                                            <option>S</option>
                                            <option>M</option>
                                            <option>L</option>
                                        </select>
                                     </div>
                                </details>
                                <details class="sorting">
                                    <summary class="summary-choose">QUANTITY</summary>
                                    <div class="choose-label">
                                    <input class="inp-quantity" type="number" v-model="quantity">
                                    </div>
                                </details>
                            </div>
                            <button class="probuct-button" type="submit" @click="addProduct(selectedProduct)">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <p class="probuct-button-text">Add to Cart</p>
                            </button>
                        </section>
                    </div>
                </div>`
});

Vue.component('featured-items', {
    data() {
        return {
            filtered: []
        }
    },
    mounted() {
        this.$parent.getJson('/catalogData')
            .then(data => {
                for (let el of data) {
                    if (el.featured) {
                        this.filtered.push(el);
                    }
                }
            });
    },
    template: `<div class="container">
                    <div class="product-text">
                        <h1 class="product-h">Fetured Items</h1>
                        <p class="product-p">Shop for items based on what we featured in this week</p>
                    </div>
                    <div class="products">
                        <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
                    </div>
                    <div class="flex-button">
                                    <a class="product-button" href="menscatalog.html">Browse All Product</a>
                    </div>
                </div>`
});

Vue.component('minimal-products', {
    data() {
        return {
            filtered: []
        }
    },
    methods: {
        filter(searchLine) {
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            if (this.filtered.length === 0) {
                alert('нет данных');
            }
        }
    },
    mounted() {
        this.$parent.getJson('/catalogData')
            .then(data => {
                for (let el of data) {
                    if (this.filtered.length <= 2) {
                        this.filtered.push(el);
                    }
                }
            });
    },
    template: `<div class="container">
                    <div class="products minimal-products">
                        <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
                    </div>
                </div>`
});

Vue.component('products-for-man', {
    data() {
        return {
            man: [],
            filtered: [],
            min: null,
            max: null
        }
    },
    methods: {
        filterByPrice() {
            if (this.min === "" || this.max === "") {
                this.min = null;
                this.max = null;
            }

            if (this.min === null && this.max === null) {
                this.filtered = [...this.man];
            } else if (this.min !== null && this.max !== null) {
                this.filtered = this.man.filter(el => el.price >= this.min && el.price <= this.max);
            } else if (this.min !== null && this.max === null) {
                this.filtered = this.man.filter(el => el.price >= this.min);
            } else {
                this.filtered = this.man.filter(el => el.price <= this.max);
            }
        }
    },
    mounted() {
        this.$parent.getJson('/catalogData')
            .then(data => {
                for (let el of data) {
                    if (el.gender === "man") {
                        this.man.push(el);
                    }
                }
                this.filtered = [...this.man];
            });
    },
    template: `<div class="container">
                    <div class="catalog">
                        <div class="flex">
                            <details class="filter-details sorting">
                                <summary class="filter">FILTER</summary>
                                <details class="inside-details">
                                    <summary class="inside-summ">CATEGORY</summary>
                                    <ul class="ul-category-list">
                                    <li class="category-list"><a class="a-category-list" href="#">Accessories</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Bags</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Hoodies & Sweatshirts</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Jackets & Coats</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Polos</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Shirts</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Shoes</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Sweaters & Knits</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">T-Shirts</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Tanks</a></li>
                                    </ul>  
                                </details>
                                <details class="inside-details">
                                    <summary class="inside-summ">BRAND</summary>
                                </details>
                                <details class="inside-details">
                                    <summary class="inside-summ">DESIGNER</summary>
                                </details>
                            </details>
                            <div class="trending-box">
                                <details class="trending-details sorting">
                                    <summary class="trending">TRENDING NOW</summary>
                                </details>
                                <details class="size-details sorting">
                                    <summary class="trending">SIZE</summary>
                                    <div class="choose-label">
                                        <label for="XS">
                                            <input id="XS" type="checkbox">
                                            XS
                                        </label>
                                        <label for="S">
                                            <input id="S" type="checkbox">
                                            S
                                        </label>
                                        <label for="M">
                                            <input id="M" type="checkbox">
                                            M
                                        </label>
                                        <label for="L">
                                            <input id="L" type="checkbox">
                                            L
                                        </label>
                                    </div>
                                </details>
                                <details class="price-details sorting">
                                    <summary class="trending">PRICE</summary>
                                    <div class="input-price-block">
                                        <input class="input-price" type="number" placeholder="Inside" v-model="min">
                                        <input class="input-price" type="number" placeholder="Out" v-model="max"> 
                                        <button class="input-price-button" @click="filterByPrice"><i class="fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                    <div class="products">
                        <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
                    </div>
                </div>`
});

Vue.component('products-for-woman', {
    data() {
        return {
            woman: [],
            filtered: [],
            min: null,
            max: null
        }
    },
    methods: {
        filterByPrice() {
            if (this.min === "" || this.max === "") {
                this.min = null;
                this.max = null;
            }

            if (this.min === null && this.max === null) {
                this.filtered = [...this.woman];
            } else if (this.min !== null && this.max !== null) {
                this.filtered = this.woman.filter(el => el.price >= this.min && el.price <= this.max);
            } else if (this.min !== null && this.max === null) {
                this.filtered = this.woman.filter(el => el.price >= this.min);
            } else {
                this.filtered = this.woman.filter(el => el.price <= this.max);
            }
        }
    },
    mounted() {
        this.$parent.getJson('/catalogData')
            .then(data => {
                for (let el of data) {
                    if (el.gender === "woman") {
                        this.woman.push(el);
                    }
                }
                this.filtered = [...this.woman];
            });
    },
    template: `<div class="container">
                    <div class="catalog">
                        <div class="flex">
                            <details class="filter-details sorting">
                                <summary class="filter">FILTER</summary>
                                <details class="inside-details">
                                    <summary class="inside-summ">CATEGORY</summary>
                                    <ul class="ul-category-list">
                                    <li class="category-list"><a class="a-category-list" href="#">Accessories</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Bags</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Hoodies & Sweatshirts</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Jackets & Coats</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Polos</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Shirts</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Shoes</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Sweaters & Knits</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">T-Shirts</a></li>
                                    <li class="category-list"><a class="a-category-list" href="#">Tanks</a></li>
                                    </ul>  
                                </details>
                                <details class="inside-details">
                                    <summary class="inside-summ">BRAND</summary>
                                </details>
                                <details class="inside-details">
                                    <summary class="inside-summ">DESIGNER</summary>
                                </details>
                            </details>
                            <div class="trending-box">
                                <details class="trending-details sorting">
                                    <summary class="trending">TRENDING NOW</summary>
                                </details>
                                <details class="size-details sorting">
                                    <summary class="trending">SIZE</summary>
                                    <div class="size-label">
                                        <label for="XS">
                                            <input id="XS" type="checkbox">
                                            XS
                                        </label>
                                        <label for="S">
                                            <input id="S" type="checkbox">
                                            S
                                        </label>
                                        <label for="M">
                                            <input id="M" type="checkbox">
                                            M
                                        </label>
                                        <label for="L">
                                            <input id="L" type="checkbox">
                                            L
                                        </label>
                                    </div>
                                </details>
                                <details class="price-details sorting">
                                    <summary class="trending">PRICE</summary>
                                    <div class="input-price-block">
                                        <input class="input-price" type="number" placeholder="Inside" v-model="min">
                                        <input class="input-price" type="number" placeholder="Out" v-model="max"> 
                                        <button class="input-price-button" @click="filterByPrice"><i class="fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                    <div class="products">
                        <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
                    </div>
                </div>`
});