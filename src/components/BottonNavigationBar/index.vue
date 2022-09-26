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
            <ShoppingCartIcon class="w-6 h-6 text-[#395BB9]"/>
            <h3 class="text-xs text-[#395BB9]">
             Carrinho
            </h3>
        </router-link>

        <router-link to="/conta" class="w-full flex flex-col items-center">
            <UserIcon class="w-6 h-6 text-[#395BB9]"/>
            <h3 class="text-xs text-[#395BB9]">
                Minha conta
            </h3>
        </router-link>
    </div>
    <!-- text-[#395BB9] -->
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
            
        }
    },
    methods:{
        
    },
}
</script>
<style scoped>

</style>
  