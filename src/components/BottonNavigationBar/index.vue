<template>
    <div class="w-full h-[52px] fixed inset-x-0 bottom-0 bg-white flex justify-around items-center z-50">
        <router-link 
            to="/" 
            class="w-full flex flex-col items-center"
            >
            <HomeIcon 
                class="w-6 h-6 text-[#395BB9]"
                v-if="this.homeActive"
                />
            <HomeIcon 
                class="w-6 h-6 text-[#14142B]"
                v-else
                />
            <h3 
                class="text-xs text-[#395BB9]"
                v-if="this.homeActive"
            >
                Pagina Inicial
            </h3>
            <h3 
                class="text-xs text-[#14142B]"
                v-else
            >
                Pagina Inicial
            </h3>
        </router-link>
      
        <router-link to="/carrinho" class="w-full flex flex-col items-center">
            <div class="w-full flex justify-center" v-if="this.cartActive">
                <ShoppingCartIcon 
                    class="w-6 h-6 text-[#395BB9]"
                />
                <span class="fixed ml-8 bg-[#E74845] rounded-full text-white text-xs px-2" v-if="this.cart.length >= 1">
                    {{this.cart.length}}
                </span>
            </div>
            <div class="w-full flex justify-center" v-else>
                <ShoppingCartIcon 
                    class="w-6 h-6 text-[#14142B]"
                />
                <span class="fixed ml-8 bg-[#E74845] rounded-full text-white text-xs px-2" v-if="this.cart.length >= 1">
                    {{this.cart.length}}
                </span>
            </div>
            <h3 
                class="text-xs text-[#395BB9]"
                v-if="this.cartActive"
            >
             Carrinho
            </h3>
            <h3 
                class="text-xs text-[#14142B]"
                v-else
            >
             Carrinho
            </h3>
        </router-link>

        <router-link to="/opcoes" class="w-full flex flex-col items-center">
            <UserIcon 
                class="w-6 h-6 text-[#395BB9]"
                v-if="this.opcoesActive"
            />
            <UserIcon 
                class="w-6 h-6 text-[#14142B]"
                v-else
            />
            <h3
                class="text-xs text-[#395BB9]"
                v-if="this.opcoesActive"
            >
                Mais opções
            </h3>
            <h3
                class="text-xs text-[#14142B]"
                v-else
            >
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
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const path = this.$route.path
        const homeActive = false
        const cartActive = false
        const opcoesActive = false
        return{
            cart,
            path,
            homeActive,
            cartActive,
            opcoesActive
        }
    },
    methods:{
        IsHome(){
            if(this.path == '/'){
                this.homeActive = true
            }else{
                this.homeActive = false
            }
        },
        IsCart(){
            if(this.path == '/carrinho'){
                this.cartActive = true
            }else{
                this.cartActive = false
            }
        },
        IsOpcoes(){
            if(this.path == '/opcoes'){
                this.opcoesActive = true
            }else{
                this.opcoesActive = false
            }
        }
        
    },
    created() {
        this.IsHome()
        this.IsCart()
        this.IsOpcoes()
    }
}
</script>
<style scoped>

</style>
  