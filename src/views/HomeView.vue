<template>
  <div class="w-full flex flex-col justify-between items-center ">
    <!-- <img src="../assets/img/home-banner.png" alt="banner" class="w-full"> -->
    <img :src="this.infoStore.banner" alt="banner" class="w-full h-[160px]">
    <div class="w-full flex justify-center items-center my-6">
      <div class="w-full flex justify-start items-center border-[#E74845] bg-white rounded-md h-[45px] mx-5">
        <MagnifyingGlassIcon class="w-4 h-4 text-[#395BB9] mx-2" />
        <input type="text" class="bg-transparent border-none ml-2 focus:outline-none focus:ring-transparent" placeholder="Digite a busca aqui"
          v-model="search">
      </div>
    </div>
    <div class="w-full justify-center items-center flex flex-col py-20" v-if="this.filteredProducts.length < 1">
      <img src="../assets/img/nocontent.png" alt="nocontent" class="w-1/2">
      <h1 class="text-white text-md mt-6">Não encontramos nenhum resultado.</h1>
    </div>
    <div class="w-full mb-14" v-else>
      <CarouselCategory v-for="category in filteredProducts" :key="category.id" :name="category.description"
        :products="category.products" />
    </div>
  </div>
  <BottonNavigationBar />
</template>

<script>
// @ is an alias to /src

import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { getCategorias } from '@/services/product.service'
import { getInfoStore } from '@/services/store.service'
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
    const search = ''
    const storeOption = localStorage.getItem('store')
    const categories = []
    const infoStore = {}
    return {
      search,
      storeOption,
      categories,
      infoStore,
    }
  },
  methods: {
    async getStore() {
      if (this.storeOption) {
        const response = await getInfoStore(this.storeOption)
        this.infoStore = response
        localStorage.setItem('InfoStore', JSON.stringify(response))
      }
      else {
        this.$router.push('/unidade')
      }
    },
    async getCategories() {
      if (this.storeOption) {
        const response = await getCategorias(this.storeOption)
        this.categories = response
      }
      else {
        this.$router.push('/unidade')
      }
    },
  },
  computed: {
    filteredProducts() {
      return this.categories.filter(category => {
        return category.description.toLowerCase().includes(this.search.toLowerCase())
      }
      )
    },
    filteredData() {
      return this.filteredProducts
    }
  },
  created() {
    this.getStore(this.storeOption)
    this.getCategories()
  },
}
</script>
