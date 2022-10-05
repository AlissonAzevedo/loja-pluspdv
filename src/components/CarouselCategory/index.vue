<template>
    <div class="w-full flex flex-col justify-start items-center px-5">
        <div class="w-full items-center justify-start">
            <p class="text-white text-xs">{{name}}</p>
        </div>
        <!-- <div class="w-full flex items-center">
          <Carousel :items-to-show="1">
            <Slide v-for="product in products"  :key="product.id">
                <CardProduct 
                  :title="product.short_description"
                  :price="product.stocks[0].unit_price"
                  :img="product.images[0].image"
                  :id="product.id"
                  />  
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div> -->
        <div class="w-full flex carousel-daisyui carousel-center items-start">
            <CardProduct 
              v-for="product in products" 
              :key="product.id"
              :title="product.short_description"
              :price="product.stocks[0].unit_price"
              :img="product.images[0].image"
              :id="product.id"
              class="carousel-item"
              />
        </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import CardProduct from '@/components/CardProduct'
  // import { Carousel, Slide } from 'vue3-carousel';
  export default {
    name: 'CarouselCategory',
    components: {
        CardProduct,
        // Carousel,
        // Slide,
        // Navigation, 
    },
    props: {
      name:{
        type: String,
        default: 'Categoria'
      },
      products:{
        type: Array,
        default: () => {[]}
      }
    },
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
    },
    created() {
    }
  
  }
  </script>
  