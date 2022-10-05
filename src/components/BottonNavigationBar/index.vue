<template>
    <div class="w-full h-[52px] fixed inset-x-0 bottom-0 bg-white flex justify-around items-center z-50">
        <router-link 
            to="/" 
            class="w-full flex flex-col items-center"
            >
            <HomeIcon class="w-6 h-6 text-[#395BB9]"/>
            <h3 class="text-xs text-[#395BB9]">
             Pagina Inicial
            </h3>
        </router-link>
      
        <router-link to="/carrinho" class="w-full flex flex-col items-center">
            <div class="w-full flex justify-center">
                <ShoppingCartIcon class="w-6 h-6 text-[#395BB9]"/>
                <span class="fixed ml-8 bg-[#E74845] rounded-full text-white text-2xs px-2" v-if="this.cart.length >= 1">
                    {{this.cart.length}}
                </span>
            </div>
            <h3 class="text-xs text-[#395BB9]">
             Carrinho
            </h3>
        </router-link>

        <router-link to="/opcoes" class="w-full flex flex-col items-center">
            <UserIcon class="w-6 h-6 text-[#395BB9]"/>
            <h3 class="text-xs text-[#395BB9]">
                Mais opções
            </h3>
        </router-link>
    </div>
</template>

<script>
    import { HomeIcon } from '@heroicons/vue/20/solid'
    import { ShoppingCartIcon } from '@heroicons/vue/20/solid'
    import { UserIcon } from '@heroicons/vue/20/solid'
export default {
    name: 'BottonNavigationBar',
    components: {
        HomeIcon,
        ShoppingCartIcon,
        UserIcon,
    },

    data (){
        return{
            cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
        }
    },
    methods:{
        
    },
}
</script>
<style scoped>

</style>
  