<template>
    <div>
        <h1>{{this.$route.params.slug}}</h1>
        <BottonNavigationBar />
    </div>
</template>

<script>
    import BottonNavigationBar from '@/components/BottonNavigationBar'
    export default {
        name: 'StoreView',
        components: {
            BottonNavigationBar,
        },
    }
</script>

<style>

</style>