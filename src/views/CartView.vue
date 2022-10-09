<template>
    <div class="w-full h-full px-4 flex flex-col justify-between items-center">
        <div class="w-full flex flex-col justify-center items-start my-4">
            <h2 class="text-white text-2xl">Carrinho</h2>
        </div>
    </div>
    <div class="w-full px-4 flex flex-col justify-between items-center" v-if="this.cart.length >= 1">
        <div class="w-full flex flex-col justify-between items-center divide-y divide-[#343435]">
            <div class="w-full flex flex-col justify-center items-center">
                <!-- CardItem -->
                <div class="w-full h-[90px] bg-white rounded mb-3" v-for="itemCart in this.cart" :key="itemCart.id">
                    <div class="w-full h-full flex justify-between items-center p-2">
                        <div class="flex justify-center items-center">
                            <img :src="itemCart.images" :alt="itemCart.short_description" class="w-[70px] h-[70px]">
                            <div class="flex flex-col items-start ml-2">
                                <h3 class="text-base text-[#263E80]">{{itemCart.short_description}}</h3>
                                <span class="text-sm text-[#4E4B66]">{{formatCurrency(itemCart.price)}}</span>
                                <span class="text-xs text-[#4E4B66] mt-2">Qtd: {{itemCart.quantity}}</span>
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
                        <h2 class="text-white text-sm">A calcular</h2>
                    </div>
                    <div class="w-full flex justify-between">
                        <h2 class="text-white text-xl">Valor total</h2>
                        <h2 class="text-white text-xl">{{formatCurrency(totalAmount)}}</h2>
                    </div>
                    <button class="w-full h-12 bg-[#E74845] rounded mt-6 text-white" @click="stepCheckout">
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>
        <BottonNavigationBar />
    </div>
    <div class="w-full flex flex-col justify-center items-center" v-else>
        <img src="../assets/img/nocart.png" alt="nocart" class="w-56">
        <h2 class="text-white text-base mt-6">Carrinho vazio</h2>
        <BottonNavigationBar />
    </div>

</template>

<script>
import BottonNavigationBar from '@/components/BottonNavigationBar'
import { formatCurrency } from '@/Utils/formatCurrency'
import { TrashIcon } from '@heroicons/vue/20/solid'
import {VerifyLogin} from '@/services/consumer.service'

export default {
    name: 'CartView',
    components: {
        BottonNavigationBar,
        TrashIcon
    },
    data() {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const quantity = 1
        return {
            cart,
            quantity
        }
    },
    methods: {
        removeCart(id) {
            const cart = this.cart.filter(item => item.id !== id)
            localStorage.setItem('cart', JSON.stringify(cart))
            this.cart = cart
        },
        stepCheckout() {
            const IsLogged = VerifyLogin()
            if (IsLogged) {
                this.$router.push('/checkout')
            } else {
                this.$toast.open({
                    message: 'Você precisa estar logado',
                    type: 'warning',
                    position: 'top',
                    duration: 3000
                })
                this.$router.push('/conta')
            }
        },
    },
    computed: {
        total() {
            return this.cart.reduce((acc, item) => acc + item.product_total_price, 0)
        },
        formatCurrency() {
            return formatCurrency
        },
        totalAmount() {
            return this.total
        }
    },
}
</script>

<style scoped>

</style>