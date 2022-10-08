<template>
    <div class="w-full flex flex-col justify-center items-center">
        <div class="fixed inset-x-0 top-4 z-50 px-4">
            <router-link to="/">
                <ChevronLeftIcon class="w-8 text-[#263E80]" />
            </router-link>
        </div>
        <carousel :items-to-show="1" class="w-full h-[240px]">
            <slide v-for="img in this.product.images" :key="img" class="w-full bg-white">
                <img :src="img.image" :alt="this.product.short_description" class=" min-h-[240px] h-[240px]">
            </slide>
            <template #addons>
                <pagination />
            </template>
        </carousel>
    </div>
    <div class="w-full flex flex-col justify-center items-center divide-y px-4 ">
        <div class="w-full flex flex-col">
            <div class="w-full flex flex-col justify-center items-start">
                <h1 class="text-white text-2xl font-bold my-6">{{this.product.short_description}}</h1>
                <h2 class="text-white text-sm font-normal mt-2">Quantidade</h2>
                <div class="h-[40px] flex justify-start items-center bg-white rounded mt-2">
                    <span class="border-r h-full flex items-center px-2">
                        <MinusIcon class="w-6 h-6 text-[#E74845]" @click="decrementProduct"/>
                    </span>
                    <span class="text-[#14142B] font-normal px-4">{{quantity}}</span>
                    <span class="border-l h-full flex items-center px-2">
                        <PlusIcon class="w-6 h-6 text-[#E74845]"  @click="incrementProduct"/>
                    </span>
                </div>
                <h2 class="text-white text-sm font-normal mt-2">Opções</h2>
                <div class="w-full flex justify-around items-center my-6">
                    <span class="p-4 bg-black/25 rounded-lg text-white">opção1</span>
                    <span class="p-4 bg-black/25 rounded-lg text-white">opção2</span>
                    <span class="p-4 bg-black/25 rounded-lg text-white">opção3</span>
                </div>
            </div>
        </div>
        <div class="w-full flex flex-col justify-center items-start">
            <h2 class="text-white text-sm font-normal mt-2">Descrição</h2>
            <h2 class="text-white text-sm font-normal my-4">{{this.product.description}}</h2>
        </div>
        <div class="w-full flex flex-col justify-center items-start pb-16">
            <h2 class="text-white text-sm mt-6 py-2">Você quer adicionar alguma observação?</h2>
            <input type="text" class="w-full h-12 rounded-md px-2 bg-white border-none focus:outline-none "
                placeholder="Digite aqui" v-model="note">
        </div>
    </div>
    <BottonSheet :product="this.product" :note="this.note" :price="this.price" :quantity="this.quantity"/>
</template>

<script>
import { ChevronLeftIcon, PlusIcon, MinusIcon } from '@heroicons/vue/20/solid'
import BottonSheet from '@/components/BottonSheet'
import { getProducts } from '@/services/product.service';
import { Carousel, Slide, Pagination, } from 'vue3-carousel';

export default {
    name: 'ProductView',
    components: {
        ChevronLeftIcon,
        BottonSheet,
        Carousel,
        Slide,
        Pagination,
        PlusIcon,
        MinusIcon
    },
    data() {
        const product = {}
        const note = ''
        const quantity = 1
        const storeOption = localStorage.getItem('store')
        return {
            product,
            note,
            quantity,
            storeOption
        }
    },
    methods: {
        incrementProduct(){
            this.quantity++
        },
        decrementProduct(){
            if(this.quantity > 1){
                this.quantity--
            }
        }
    },
    computed: {
        price () {
            const price = undefined
            if (this.product?.stocks?.length >= 1) {
                return this.product.stocks[0].unit_price * this.quantity
            }
            else {
                return price * this.quantity
            }
            //
        },
    },
    created() {
        const getProduct = async () => {
            if (this.storeOption && this.$route.params.id !== undefined || '') {
                const response = await getProducts(this.$route.params.id)
                this.product = response[0]
            }
            else {
                this.$router.push('/unidade')
            }
        }
        getProduct()
    },
}
</script>

<style>

</style>