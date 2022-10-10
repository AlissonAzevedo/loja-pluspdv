<template>
    <div class="h-[50px] bg-white w-full rounded flex justify-start items-center my-2 hover:bg-white/40">
        <div class="px-2 flex items-center justify-center">
            <slot></slot>
            <h1 class="text-[#14142B] ml-4">{{title}}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardOptions',
    data() {
        return {

        }
    },
    props: {
        title: {
            type: String,
            default: 'title'
        }
    }
}
</script>

<style scoped>

</style>