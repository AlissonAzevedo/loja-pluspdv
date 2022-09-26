<template>
  <div class="w-full flex flex-col justify-start items-center bg-gradient-to-r from-[#3F4C6B] to-[#606C88] ">
    <div class="w-full">
      <img src="../assets/img/home-banner.png" alt="banner" class="w-full">
    </div>
    <div class="w-full flex justify-center items-center my-6">
      <div class="w-full flex justify-start items-center border-[#E74845] bg-white rounded-md h-[45px] mx-5">
        <MagnifyingGlassIcon class="w-4 h-4 text-[#395BB9] mx-2"/>
        <input 
          type="text" 
          class="bg-transparent border-none ml-2 focus:outline-none" 
          placeholder="Digite a busca aqui"
          v-model="search"
          >
      </div>
    </div>
    <div class="w-full mb-14" v-if="this.categories != []">
      <!-- <div v-for="category in filteredProducts" :key="category.id">
        {{category.description}}
      </div> -->
      <CarouselCategory
        v-for="category in filteredProducts"
        :key="category.id"
        :name="category.description"
        :products="category.products"
        
      />
      <!-- <CarouselCategory/> -->
    </div>
    <div v-else class="w-full justify-center items-center flex flex-col">
      <img src="../assets/img/nocontent.png" alt="nocontent" class="w-1/2">
      <h1 class="text-white text-md mt-6">Não encontramos nenhum resultado.</h1>
    </div>
  </div>
  <BottonNavigationBar />
</template>

<script>
// @ is an alias to /src


import {MagnifyingGlassIcon} from '@heroicons/vue/20/solid'
import {getCategorias} from '@/services/store.service'
import CarouselCategory from '@/components/CarouselCategory'
import BottonNavigationBar from '@/components/BottonNavigationBar'
export default {
  name: 'HomeView',
  components: {
    BottonNavigationBar,
    MagnifyingGlassIcon,
    CarouselCategory,
    
  },
  data() {
    return {
      search: '',
      store: this.$store.getters.getStore,
      categories: [],
    }
  },
  methods: {
  },
  computed: {
    filteredProducts() {
      return this.categories.filter(category => {
        return category.description.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created() {
    const getProducts = async () => {
      if(this.$store.getters.getStore !== '') {
        const response = await getCategorias(this.store)
        this.categories = response
      }
      else {
        this.$router.push('/unidade')
      }
      // console.log(this.$store.getters.getStore)
      // console.log(this.categories)
    }
    getProducts()
  }

}
</script>
