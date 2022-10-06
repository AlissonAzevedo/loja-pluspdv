<template>
    <div class="w-full h-screen flex flex-col justify-center items-center px-4">
        <h1 class="text-white text-3xl">Acesse sua conta ou cadastre-se!</h1>
        <h4 class="text-white font-light mt-8">Para continuar o processo de compra, escolha uma das opções abaixo.</h4>
        <div class="w-full flex flex-col justify-center items-center">
            <router-link to="/conta/entrar" class="w-full flex flex-col justify-center items-center mt-8">
                <h3 class="text-xs text-white bg-[#E74845] py-4 w-full text-center rounded">
                    Login
                </h3>
            </router-link>
            <router-link to="/conta/cadastro" class="w-full flex flex-col justify-center items-center mt-8 text-center">
                <h3 class="text-xs text-white py-4 w-full border-2 border-white rounded">
                    Cadastro
                </h3>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterView',

}
</script>

<style scoped>

</style>