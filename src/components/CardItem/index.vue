<template>
    <div class="w-full h-[90px] bg-white rounded mb-3">
        <div class="w-full h-full flex justify-between items-center p-2">
            <div class="flex justify-center items-center">
                <img :src="img" alt="" class="w-[70px] h-[70px]">
                <div class="flex flex-col items-start ml-2">
                    <h3 class="text-base text-[#263E80]">{{title}}</h3>
                    <span class="text-sm text-[#4E4B66]">{{price}}</span>
                    <span class="text-xs text-[#4E4B66] mt-2">Qtd: {{quantity}}</span>
                </div>
            </div>
            <!-- <TrashIcon class="w-6 text-[#E74845]" @click="removeCart(itemCart.id)" /> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardItem',
    props: {
        title: {
            type: String,
            default: 'Produto'
        },
        price: {
            type: String,
            default: 'R$ 0,00'
        },
        quantity: {
            type: Number,
            default: 0
        },
        img: {
            type: String,
            default: 'https://via.placeholder.com/150'
        },
        id: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style scoped>

</style>