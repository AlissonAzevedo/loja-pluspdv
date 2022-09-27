<template>
    <div class="w-full h-[52px] fixed inset-x-0 bottom-0 bg-[#E74845] flex justify-between items-center z-50 px-4">
        <div class=" flex flex-col justify-center items-start">
            <span class="text-white text-sm">{{price}}</span>
            <span class="text-white text-xs font-superlight">Ou até 12x de {{installmentsValue}} sem juros</span>
        </div>
        <div class=" flex justify-center items-center">
            <span class="text-white text-sm">Comprar</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BottonSheet',
    data() {
        return {
        }
    },
    props: {
        price: {
            type: Number,
            default: 120.00
        },
        installments: {
            type: String,
            default: 'Ou até 12x de 00,00 sem juros'
        },

    },
    computed: {
        installmentsValue() {
            return this.price / 12
        }
    },
}
</script>

<style scoped>

</style>