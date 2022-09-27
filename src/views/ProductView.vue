<template>
    <!-- <img src="../assets/img/img-product.png" :alt="this.product.short_description" class="w-full h-[240px]"> -->
    <div class=" flex flex-col justify-center items-center">
        <carousel :items-to-show="1" class="w-full h-[240px]">
            <slide v-for="img in this.product.images" :key="img" class="w-full">
                <img :src="img.image" :alt="this.product.short_description" class="w-full h-[240px]">
            </slide>
            <template #addons>
            <!-- <navigation /> -->
            <pagination />
            </template>
        </carousel>
    </div>
    <div class="w-full flex flex-col justify-center items-center divide-y px-4 ">
        <div class="w-full flex flex-col">
            <div class="w-full flex flex-col justify-center items-start">
                <h1 class="text-white text-2xl font-bold my-6">{{this.product.short_description}}</h1>
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
        <div class="w-full flex flex-col justify-center items-start mb-16">
            <h2 class="text-white text-sm mt-6 py-2">Você quer adicionar alguma observação?</h2>
            <input type="text" class="w-full h-12 rounded-md px-2 bg-white border-none focus:outline-none "
                placeholder="Digite aqui" v-model="note">
        </div>
    </div>
    <BottonSheet :price="this.product.price" />
</template>

<script>
import BottonSheet from '@/components/BottonSheet'
import { getProducts } from '@/services/product.service';
import { Carousel, Slide, Pagination, } from 'vue3-carousel';
export default {
    name: 'ProductView',
    components: {
        BottonSheet,
        Carousel,
        Slide,
        Pagination,
        // Navigation,
    },
    data() {
        return {
            product: {},
            note: '',
        }
    },
    methods: {
    },
    created() {
        const getProduct = async () => {
            if (this.$store.getters.getStore !== '' && this.$route.params.id !== undefined) {
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