<template>
    <div class="min-w-[120px] min-h-[180px] flex flex-col my-2 mr-2">
        <router-link :to="`/produto/${this.id}`">
            <img :src="this.img" alt="img-product" class="min-w-[120px] max-w-[120px] h-[120px] rounded-lg">
            <div class="w-full my-2 text-start">
                <h2 class="text-white text-sm font-normal">{{title}}</h2>
                <p class="text-white text-xs font-light">{{formatCurrency(price)}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
import { formatCurrency } from '@/Utils/formatCurrency';

export default {
    name: 'CardProduct',
    components: {
    },
    data() {
        return {
            select_quantity: 1,
        }
    },
    props: {
        price: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            default: 'Café especial torrado Fazenda - 250g'
        },
        img: {
            type: String,
            default: require('../../assets/img/img-product.png')
        },
        id: {
            type: Number,
            default: 9999
        }
    },
    methods: {
        quantity(){

        }
    },
    computed: {
        formatCurrency() {
            return formatCurrency;
        },
        
    },
}
</script>

<style>

</style>