<template>
    <div class="sm:w-[382px] sm:h-[76px] w-[320px] h-[76px] rounded-lg bg-white my-2 flex items-center justify-center">
        <!-- <router-link :to="slug" class="w-full"> -->
            <div class="w-full flex items-center justify-around">
                <MapPinIcon class="w-6 text-[#395BB9] "/>
                <div class="w-3/4 pl-2">
                    <h3 class="text-[#14142B] text-base font-bold">{{name}}</h3>
                    <h3 class="text-[#4E4B66] text-sm font-bold">{{street}}, {{number}}</h3>
                </div>
                <ChevronRightIcon class="w-8 text-[#E74845]"/>
            </div>
        <!-- </router-link> -->
    </div>
</template>

<script>
import { MapPinIcon } from '@heroicons/vue/20/solid'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

export default {
    name: 'StoreOption',
    components: {
        MapPinIcon,
        ChevronRightIcon,
    },
    props: {
        slug: {
            type: String,
        },
        name: {
            type: String,
        },
        street: {
            type: String,
        },
        number: {
            type: Number,
        },
    },

    data (){
        return{
    
        }
    },
}
</script>
<style>

</style>
  