<template>
    <div class="w-full flex flex-col justify-center items-center px-4 py-4">
        <div class="w-full" v-if="this.currentStep > 0">
            <ChevronLeftIcon class="w-6 h-6 text-white" @click="prevStep" />
        </div>
        <div class="w-full" v-if="this.currentStep == 0">
            <router-link to="/conta">
                <ChevronLeftIcon class="w-6 h-6 text-white" />
            </router-link>
        </div>
        <div class="w-full flex flex-col justify-center mt-2">
            <h1 class="text-white text-3xl"> Passo {{this.currentStep + 1}} de 3</h1>
        </div>
        <div class="w-full flex flex-col">
            <template v-if="this.currentStep == 0">
                <div class="w-full flex flex-col justify-center">
                    <h4 class="text-white font-light mt-2">Confirme o seus dados de entrega</h4>
                    <h1 class="text-white text-2xl mt-6">Endereço para entrega</h1>
                </div>
                <span class="my-2 text-white">CEP</span>
                <InputText placeholder="Insira o seu CEP aqui..." v-model="person.cep" />
                <span class="my-2 text-white">Rua</span>
                <InputText placeholder="Insira a rua aqui..." v-model="person.street" />
                <span class="my-2 text-white">Número</span>
                <InputText placeholder="Insira o número da sua casa aqui..." v-model="person.number" />
                <span class="my-2 text-white">Complemento</span>
                <InputText placeholder="Insira o complemento aqui..." v-model="person.complement" />
                <span class="my-2 text-white">Estado</span>
                <InputText placeholder="Insira o estado aqui..." v-model="person.state" />
                <span class="my-2 text-white">Cidade</span>
                <InputText placeholder="Insira a cidade aqui..." v-model="person.city" />
            </template>
        </div>
        <div class="w-full flex flex-col">
            <template v-if="this.currentStep == 1">
                <div class="w-full flex flex-col justify-center">
                    <h4 class="text-white font-light mt-2">Confirme o seus dados pessoais</h4>
                    <h1 class="text-white text-2xl mt-6">Dados pessoais</h1>
                </div>
                <span class="my-2 text-white">Nome completo</span>
                <InputText placeholder="Insira o seu nome aqui..." v-model="person.name" />
                <span class="my-2 text-white">CPF</span>
                <InputText placeholder="Insira o seu CPF aqui..." v-model="person.cpf" />
                <span class="my-2 text-white">Data de nascimento</span>
                <InputText placeholder="00/00/0000" v-model="person.date_of_birth" />
                <span class="my-2 text-white">Telefone</span>
                <InputText placeholder="(00) 00000 - 0000" v-model="person.phone" />
            </template>
        </div>
        <div class="w-full flex flex-col">
            <template v-if="this.currentStep == 2">
                <div class="w-full flex flex-col justify-center">
                    <h4 class="text-white font-light mt-2">Confirme o seus dados para acesso</h4>
                    <h1 class="text-white text-2xl mt-6">Dados para acesso</h1>
                </div>
                <span class="my-2 text-white">Telefone</span>
                <InputText placeholder="(00) 00000 - 0000" v-model="person.phone" />
                <span class="my-2 text-white">Senha</span>
                <InputText placeholder="Insira a sua senha aqui..." v-model="person.password" />
                <span class="my-2 text-white">Confirmar senha</span>
                <InputText placeholder="Confirme a sua senha aqui..." v-model="person.password_confirmation" />
            </template>
        </div>
        <div class="w-full flex flex-col justify-center items-center mt-8">
            <button class="w-full" v-if="this.currentStep < 2">
                <h3 class="text-sm text-white bg-[#E74845] py-4 w-full text-center rounded" @click="nextStep">
                    Próximo
                </h3>
            </button>
            <button class="w-full" v-else>
                <h3 class="text-sm text-white bg-[#E74845] py-4 w-full text-center rounded" @click="createAccont">
                    Próximo
                </h3>
            </button>
        </div>
    </div>
</template>

<script>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import InputText from '../components/InputText'
export default {
    name: 'RegisterView',
    data() {
        const currentStep = 2;
        const person = {
            name: '',
            cpf: '',
            date_of_birth: '',
            phone: '',
            cep: '',
            street: '',
            number: '',
            complement: '',
            state: '',
            city: '',
            password: '',
            password_confirmation: '',
        };

        return {
            currentStep,
            person,
        }
    },
    components: {
        ChevronLeftIcon,
        InputText,
    },
    methods: {
        nextStep() {
            this.currentStep++

        },
        prevStep() {
            if (this.currentStep) {
                this.currentStep--
            }
        },
        getAdress() {
            fetch(`https://viacep.com.br/ws/${this.person.cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    this.person.street = data.logradouro
                    this.person.state = data.uf
                    this.person.city = data.localidade
                    this.person.complement = data.complemento
                })
        },
        createAccont() {
            if (this.passwordMatch == true){
                console.log(this.person)
            }
        }
    },
    watch: {
        'person.cep'(newValue,) {
            if (newValue.length == 8) {
                this.getAdress()
            }
        }
    },
    computed: {
        passwordMatch() {
            const { password, password_confirmation } = this.person
            let isMatch = false
            if(password == password_confirmation && password.length > 0 && password_confirmation.length > 0) {
                isMatch = true
                return isMatch
            }
            return isMatch
        }

    },


}
</script>

<style>

</style>