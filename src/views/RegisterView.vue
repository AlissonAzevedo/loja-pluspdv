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
                <InputText placeholder="Insira o seu CEP aqui..." v-model="person.cep" v-mask="'#####-###'" />
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
                <InputText placeholder="Insira o seu CPF aqui..." v-model="person.cpf" v-mask="'###.###.###-##'" />
                <span class="my-2 text-white">Data de nascimento</span>
                <InputText placeholder="00/00/0000" v-model="person.date_of_birth" v-mask="'##/##/####'" />
                <span class="my-2 text-white">Telefone</span>
                <InputText placeholder="(00) 00000 - 0000" v-model="person.phone"
                    v-mask="['(##) #### - ####', '(##) ##### - ####']" />
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
                <InputPassword placeholder="Insira a sua senha aqui..." v-model="person.password" />
                <span class="my-2 text-white">Confirmar senha</span>
                <InputPassword placeholder="Confirme a sua senha aqui..." v-model="this.password_confirmation" />
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
import InputPassword from '../components/InputPassword'
import { createConsumer } from '@/services/consumer.service'

import { mask } from 'vue-the-mask'
export default {
    name: 'RegisterView',
    data() {
        const currentStep = 0;
        const person = {
            name: '',
            cpf: '',
            date_of_birth: '',
            phone: '',
            cep: '',
            neighborhood: '',
            street: '',
            number: '',
            complement: '',
            state: '',
            city: '',
            password: '',
        };
        const password_confirmation = '';

        return {
            currentStep,
            person,
            password_confirmation
        }
    },
    directives: {
        mask
    },
    components: {
        ChevronLeftIcon,
        InputText,
        InputPassword,
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
                    this.person.neighborhood = data.bairro
                })
        },
        async createAccont() {
            const storedConsumer = JSON.parse(localStorage.getItem('consumer'))
            if (this.passwordMatch == true) {
                const data = {
                    "consumer": {
                        "birth_date": this.date_of_birth_formated,
                        "name": this.person.name,
                        "phone": this.person.phone,
                        "cpf_cnpj": this.cpf_formated,
                        "user": {
                            "username": this.person.phone,
                            "password": this.person.password
                        }
                    },
                    "address": {
                        "neighborhood": this.person.neighborhood,
                        "street": this.person.street,
                        "number": this.person.number,
                        "complement": this.person.complement,
                        "cep": this.person.cep,
                        "city": this.person.city,
                        "uf": this.person.state
                    }
                }
                const response = await createConsumer(data)
                console.log(response)
                const statusCode = response.status
                if (statusCode == 201) {
                    this.$toast.open({
                        message: 'Usuario criado com sucesso',
                        type: 'success',
                        position: 'top',
                        duration: 4000
                    })
                    if (storedConsumer) {
                        localStorage.setItem(
                            'consumer',
                            JSON.stringify([...storedConsumer, response.data])
                        )
                    } else {
                        localStorage.setItem('consumer', JSON.stringify(response.data))
                    }
                    this.$router.push('/checkout')
                }
                else {
                    this.$toast.open({
                        message: 'Entre em contato com admistrador',
                        type: 'error',
                        position: 'top',
                        duration: 4000
                    })
                }
            }
        }
    },
    watch: {
        'person.cep'(newValue,) {
            if (newValue.length > 8) {
                this.getAdress()
            }
        }
    },
    computed: {
        passwordMatch() {
            const { password } = this.person
            let isMatch = false
            if (password == this.password_confirmation && password.length > 0 && this.password_confirmation.length > 0) {
                isMatch = true
                return isMatch
            }
            return isMatch
        },
        cpf_formated() {
            let cpf = this.person.cpf
            let cpf_formated = cpf.split('.').join('')
            return cpf_formated.split('-').join('')
        },
        date_of_birth_formated() {
            const date = this.person.date_of_birth
            const date_formated = date.split('/').join('')
            const day = date_formated.slice(0, 2)
            const month = date_formated.slice(2, 4)
            const year = date_formated.slice(4, 8)

            const newDateFormated = `${year}/${month}/${day}`

            const newDate = new Date(newDateFormated).toISOString();

            return newDate
        }

    },


}
</script>

<style>

</style>