<template>
    <div class="w-full flex flex-col justify-center items-center px-4 py-4">
        <div class="w-full">
            <router-link to="/conta">
                <ChevronLeftIcon class="w-6 h-6 text-white" />
            </router-link>
        </div>
        <div class="w-full flex flex-col justify-center mt-2">
            <h1 class="text-white text-2xl mt-6">Acessar conta</h1>
            <h4 class="text-white font-light mt-2">Insira os dados da sua conta para poder continuar com o processo de
                compra.</h4>
        </div>
        <div class="w-full flex flex-col justify-center items-start mt-24">
            <span class="my-2 text-white">Telefone</span>
            <InputText placeholder="(00) 00000 - 0000" v-model="user.username" v-mask="['(##) #### - ####', '(##) ##### - ####']" />
            <span class="my-2 text-white">Senha</span>
            <InputPassword placeholder="Insira a sua senha aqui..." v-model="user.password" />
        </div>
        <div class="w-full flex flex-col justify-center items-center mt-8">
            <span class="text-white text-center w-full my-8 text-sm">
                <router-link to="/conta">
                    Esqueci minha senha
                </router-link>
            </span>
            <button class="w-full">
                <button :disabled="!IsDisabled" class="text-sm text-white bg-[#E74845] py-4 w-full text-center rounded disabled:bg-[#E74845]/40" @click="loginAccont">
                    Próximo
                </button>
            </button>
        </div>

    </div>
</template>

<script>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import InputText from '../components/InputText'
import InputPassword from '../components/InputPassword'
import { LoginConsumer } from '@/services/consumer.service'

import { mask } from 'vue-the-mask'
export default {
    name: 'LoginView',
    data() {
        const user = {
            username: '',
            password: ''
        }
        return {
            user
        }
    },
    components: {
        ChevronLeftIcon,
        InputText,
        InputPassword,
    },
    directives: {
        mask
    },
    methods: {
        async loginAccont() {
            const data = {
                "username": this.user.username,
                "password": this.user.password
            }
            const response = await LoginConsumer(data)
            const statusCode = response.status
            if (statusCode == 200) {
                this.$toast.open({
                    message: 'Logado com sucesso',
                    type: 'success',
                    position: 'top',
                    duration: 4000
                })
                this.$router.push('/')
            } else if(statusCode == 403) {
                this.$toast.open({
                    message: 'Erro ao logar, verifiques os dados',
                    type: 'error',
                    position: 'top',
                    duration: 4000
                })
            }
            else {
                this.$toast.open({
                    message: 'Erro, entre em contato com o suporte',
                    type: 'error',
                    position: 'top',
                    duration: 4000
                })
            }

        }
    },
    computed: {
        IsDisabled(){
            let fieldsIsValidate = false
            this.user.username.length > 0 && this.user.password.length > 0 ? fieldsIsValidate = true : fieldsIsValidate = false
            return fieldsIsValidate
        }
    }
}
</script>

<style scoped>

</style>