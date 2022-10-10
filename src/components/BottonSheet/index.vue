<template>
    <div class="w-full h-[52px] fixed inset-x-0 bottom-0 bg-[#E74845] flex justify-between items-center z-50 px-4">
        <div class=" flex flex-col justify-center items-start">
            <span class="text-white text-sm">{{formatCurrency(product_total_price)}}</span>
            <span class="text-white text-xs font-superlight">Ou até {{this.infoStore.quantidade_max_parcelamento}}x de {{formatCurrency(installmentsValue)}} sem
                juros</span>
        </div>
        <div class=" flex justify-center items-center">
            <span class="text-white text-sm" @click="addCart">Comprar</span>
        </div>
    </div>
</template>

<script>
import { formatCurrency } from '@/Utils/formatCurrency';
export default {
    name: 'BottonSheet',
    data() {
        const orderItem = {}
        const infoStore = JSON.parse(localStorage.getItem('InfoStore'))
        return {
            orderItem,
            infoStore
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
        },
        quantity: {
            type: Number,
            default: 0
        },
        product_total_price: {
            type: Number,
            default: 0
        }
    },
    computed: {
        installmentsValue() {
            return this.product_total_price / this.infoStore.quantidade_max_parcelamento
        },
        formatCurrency() {
            return formatCurrency
        },
    },
    methods: {
        addCart() {
            const storedCart = JSON.parse(localStorage.getItem('cart'))

            this.orderItem = {
                id: this.product.id,
                short_description: this.product.short_description,
                images: this.product.images[0].image,
                product_total_price: this.product_total_price,
                price: this.price,
                quantity: this.quantity,
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
            this.$toast.open({
                message: 'Produto adicionado ao carrinho',
                type: 'success',
                position: 'top',
                duration: 4000
            }) 
            this.$router.push('/carrinho')
        }
    }
}
</script>

<style scoped>

</style>