<template>
    <div class="w-full h-[52px] fixed inset-x-0 bottom-0 bg-[#E74845] flex justify-between items-center z-50 px-4">
        <div class=" flex flex-col justify-center items-start">
            <span class="text-white text-sm">{{formatCurrency(price)}}</span>
            <span class="text-white text-xs font-superlight">Ou até 12x de {{formatCurrency(installmentsValue)}} sem
                juros</span>
        </div>
        <div class=" flex justify-center items-center">
            <span class="text-white text-sm" @click="addCart">Comprar</span>
        </div>
    </div>
</template>

<script>
import { formatCurrency } from '@/Utils/formatCurrency';
import { mapMutations } from 'vuex'
export default {
    name: 'BottonSheet',
    data() {
        return {
            orderItem: {}
        }
    },
    props: {
        product: {
            type: Object,
            default: () => ({})
        },
        note: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        }
    },
    computed: {
        // price() {
        //     return this.product.stocks[0].unit_price
        // },
        installmentsValue() {
            return this.price / 12
        },
        formatCurrency() {
            return formatCurrency
        }
    },
    methods: {
        ...mapMutations(["setCart"]),
        addCart() {
            const storedCart = JSON.parse(localStorage.getItem('cart'))


            this.orderItem = {
                id: this.product.id,
                short_description: this.product.short_description,
                images: this.product.images[0].image,
                unit_price: this.price,
                quantity: 1,
                note: this.note
            }
            if (storedCart) {
                localStorage.setItem(
                    'cart',
                    JSON.stringify([...storedCart, this.orderItem])
                )
            } else {
                localStorage.setItem('cart', JSON.stringify([this.orderItem]))
            }
            // console.log(JSON.stringify(this.orderItem))
            // this.$store.dispatch('setCart', JSON.stringify(this.orderItem))
            // localStorage.setItem("cart", JSON.stringify(this.orderItem));
            // this.SetCart(JSON.stringify(this.orderItem))  
            this.$router.push('/carrinho')
        }
    },
}
</script>

<style scoped>

</style>