<template>
    <div class="w-full h-full px-4 flex flex-col justify-between items-center">
        <div class="w-full flex flex-col justify-center items-start my-4">
            <h2 class="text-white text-2xl">Carrinho</h2>
        </div>
    </div>
    <div class="w-full h-screen px-4 flex flex-col justify-between items-center" v-if="this.cart.length >= 1">
        <div class="w-full flex flex-col justify-between items-center divide-y divide-[#343435]">
            <div class="w-full flex flex-col justify-center items-center">
                <!-- CardItem -->
                <div class="w-full h-[90px] bg-white rounded mb-3" v-for="itemCart in this.cart" :key="itemCart.id">
                    <div class="w-full h-full flex justify-between items-center p-2">
                        <div class="flex justify-center items-center">
                            <img :src="itemCart.images" alt="" class="w-[70px] h-[70px]">
                            <div class="flex flex-col items-start ml-2">
                                <h3 class="text-base text-[#263E80]">{{itemCart.short_description}}</h3>
                                <span class="text-sm text-[#4E4B66]">{{formatCurrency(itemCart.unit_price)}}</span>
                            </div>
                        </div>
                        <TrashIcon class="w-6 text-[#E74845]" @click="removeCart(itemCart.id)" />
                    </div>
                </div>

            </div>
            <div class="w-full mt-4 flex flex-col justify-center items-center">
                <div class="w-full flex flex-col justify-center items-start mt-4 mb-4">
                    <h2 class="text-white text-base">Resumo da compra</h2>
                </div>
                <div class="w-full flex flex-col justify-center items-start pb-16">
                    <div class="w-full flex justify-between">
                        <h2 class="text-white text-sm">Subtotal</h2>
                        <h2 class="text-white text-sm">{{formatCurrency(this.total)}}</h2>
                    </div>
                    <div class="w-full flex justify-between">
                        <h2 class="text-white text-sm">Taxa de entrega</h2>
                        <h2 class="text-white text-sm">R$ 0,00</h2>
                    </div>
                    <div class="w-full flex justify-between">
                        <h2 class="text-white text-xl">Valor total</h2>
                        <h2 class="text-white text-xl">{{formatCurrency(totalAmount)}}</h2>
                    </div>
                    <button class="w-full h-12 bg-[#E74845] rounded mt-6 text-white">
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>
        <BottonNavigationBar />
    </div>
    <div class="w-full h-screen flex flex-col justify-center items-center" v-else>
        <img src="../assets/img/nocart.png" alt="nocart" class="w-56">
        <h2 class="text-white text-base mt-6">Carrinho vazio</h2>
        <BottonNavigationBar />
    </div>

</template>

<script>
import BottonNavigationBar from '@/components/BottonNavigationBar'
import { formatCurrency } from '@/Utils/formatCurrency'
import { TrashIcon } from '@heroicons/vue/20/solid'
export default {
    name: 'CartView',
    components: {
        BottonNavigationBar,
        TrashIcon
    },
    data() {
        return {
            cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
            // totalAmount: 0,
            shippingPrice: 0,

        }
    },
    methods: {
        removeCart(id) {
            const cart = this.cart.filter(item => item.id !== id)
            localStorage.setItem('cart', JSON.stringify(cart))
            this.cart = cart
        }
    },
    computed: {
        total() {
            return this.cart.reduce((acc, item) => acc + item.unit_price, 0)
        },
        formatCurrency() {
            return formatCurrency
        },
        totalAmount() {
            return this.total + this.shippingPrice
        },
        // shippingPrice() {
        //     return this.total > 250 ? 0 : 10
        // }
    },
}
</script>

<style scoped>

</style>