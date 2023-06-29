Vue.component('slider', {
    data() {
        return {
            sliderData: [{
                id: 1,
                img: "image/image Slide.png"
            },
            {
                id: 2,
                img: "image/image Slide1.png"
            },
            {
                id: 3,
                img: "image/image Slide2.png"
            },
            {
                id: 4,
                img: "image/image Slide3.png"
            }],
            slideIndex: 0,
            width: null,
        }
    },
    methods: {
        prevSlide() {
            if (this.slideIndex > 0) {
                this.slideIndex--
            }
        },
        nextSlide() {
            if (this.slideIndex >= this.sliderData.length - 1) {
                this.slideIndex = 0;
            } else {
                this.slideIndex++
            }
        },
        init() {
            this.width = document.querySelector('.wrapper').offsetWidth;
            const sliderLine = document.querySelector('.slider');
            const images = document.querySelectorAll('.slider-item img');
            sliderLine.style.width = this.width * images.length + 'px';
            images.forEach(item => {
                item.style.width = this.width + 'px';
                item.style.height = 'auto';
            });
        }
    },
    created() {
        window.addEventListener('resize', this.init);
    },
    mounted() {
        this.init();
    },
    template: `<div class="wrapper">
                    <div class="slider" :style="{ 'margin-left': '-' + (100 * slideIndex) + '%' }">
                        <slider-item
                        v-for="item in sliderData"
                        :key="item.id"
                        :item_data="item"
                        ></slider-item>
                    </div> 
                        <button class="slider-btn prev"@click="prevSlide"><i class="fa-solid fa-angle-left"></i></button>
                        <button class="slider-btn next"@click="nextSlide"><i class="fa-solid fa-angle-right"></i></button>
                </div>`
});

Vue.component('slider-item', {
    props: {
        item_data: {
            type: Object,
            default: () => { }
        }
    },
    template: `<div class="slider-item">
                    <img :src="this.item_data.img" alt="img">
                </div>`
});