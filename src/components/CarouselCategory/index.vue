<template>
    <div class="w-full flex flex-col justify-start items-center px-5">
        <div class="w-full items-center justify-start">
            <p class="text-white text-xs">{{name}}</p>
        </div>
        <div class="w-full flex overflow-auto items-start justify-between">
            <CardProduct 
              v-for="product in products" 
              :key="product.id"
              :title="product.short_description"
              :price="product.price"
              :img="product.images[0].image"
              :id="product.id"
              />
        </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import CardProduct from '@/components/CardProduct'
  export default {
    name: 'CarouselCategory',
    components: {
        CardProduct, 
    },
    props: {
      name:{
        type: String,
        default: 'Categoria'
      },
      products:{
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: []
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
  