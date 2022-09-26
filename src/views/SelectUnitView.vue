<template>
    <div class="w-full flex flex-col h-screen justify-center items-center bg-gradient-to-r from-[#3F4C6B] to-[#606C88]">
      <div class="flex flex-col w-full justify-center items-center text-center">
        <img alt="PlusPDV logo" src="../assets/img/PlusPDV_logo.png" class="w-[128px] h-[96px]">
        <h1 class="text-3xl text-white mt-6 px-22">Olá, seja bem-vindo.</h1>
        <h3 class="text-white mx-4 text-base mt-6">Antes de continuarmos, selecione uma de nossas unidades.</h3>
      </div>
      <div class="w-full flex flex-col justify-center items-center mt-8">
        <StoreOption 
          v-for="store in stores" 
          :key="store.id" 
          :name="store.name" 
          :street="store.street" 
          :number="store.number"
          :slug="store.slug"
          @click="selectStore(store.slug)"
          />
      </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import StoreOption from '@/components/StoreOption'
  import { getStores } from '@/services/store.service'
  
  export default {
    name: 'SelectUnitView',
    components: {
      StoreOption,
    },
    data() {
      return {
        stores: []
      }
    },
    methods: {
      selectStore(slug) {
        this.$store.commit('setStore', slug)
        this.$router.push('/')
        // console.log(this.$store.getters.getStore)
      }
    },
    created() {
      const getAllStores = async () => {
        const response = await getStores()
        this.stores = response.stores
      }
      getAllStores()
    }
  }
  </script>
  