<template>
    <div class="w-full flex flex-col justify-center items-center px-4 py-4">
        <div class="w-full" v-if="currentStep == 0">
            <router-link to="/conta">
                <ChevronLeftIcon class="w-6 h-6 text-white" />
            </router-link>
        </div>
        <div class="w-full" v-else>
            <ChevronLeftIcon class="w-6 h-6 text-white" @click="prevStep" />
        </div>
        <div class="w-full flex flex-col justify-center mt-2">
            <h1 class="text-white text-2xl mt-6">Finalizar compra</h1>
            <h4 class="text-white font-light mt-2">Confira as informações abaixo antes de finalizar a compra do produto.
            </h4>
        </div>
        <template v-if="currentStep == 0">
            <div class="w-full flex flex-col justify-center items-start mt-6">
                <h6 class="text-white font-light my-2">Onde você quer receber?</h6>
                <div class="w-full flex flex-col justify-center items-start">
                    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3" v-for="method in methodDelivery.deliveryInStore" :key="method.id">
                        <input type="radio" :value="method" v-model="delivery" :id="method"
                            class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                        <label class="text-[#4E4B66] text-base">
                            {{method.name}}
                        </label>
                    </div>
                    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3" v-for="method in methodDelivery.deliveryInAddress" :key="method.id">
                        <input type="radio" :value="method" v-model="delivery" :id="method"
                            class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                        <label class="text-[#4E4B66] text-base">
                            {{method.street}}, {{method.number}} - {{method.cep}} / {{method.city.name}} - {{method.city.uf}}
                        </label>
                    </div>
                </div>
                <div class="w-full mt-6">
                    <button class="w-full min-h-[52px] rounded bg-white flex justify-center items-center my-2 py-3">
                        <PlusIcon class="w-6 h-6 text-[#263E80]" />
                        <span class="text-[#263E80] text-base ml-2">Adicionar novo endereço</span>
                    </button>
                </div>
            </div>
        </template>
        <template v-if="currentStep == 1">
            <div class="w-full flex flex-col justify-center items-start mt-6">
                <h6 class="text-white font-light my-2">Pagar pelo app</h6>
                <div class="w-full flex flex-col justify-center items-start">
                    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3" v-for="method in methodsPayments.paymentInApp" :key="method.id">
                        <input type="radio" :value="method" v-model="payment" :id="method.name"
                            class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                        <label class="text-[#4E4B66] text-base">
                            {{method.name}}
                        </label>
                    </div>
                    <h6 class="text-white font-light my-6">Pagar na entrega</h6>
                    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3" v-for="method in methodsPayments.paymentInDelivery" :key="method.id">
                        <input type="radio" :value="method" v-model="payment" :id="method.name"
                            class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                        <label class="text-[#4E4B66] text-base">
                            {{method.name}}
                        </label>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="currentStep == 2">
            <div class="w-full flex flex-col">
                <div class="w-full h-[90px] bg-white rounded mb-3" v-for="cart in carts" :key="cart.id">
                    <div class="w-full h-full flex justify-between items-center p-2">
                        <div class="flex justify-center items-center">
                            <img :src="cart.images" alt="" class="w-[70px] h-[70px]">
                            <div class="flex flex-col items-start ml-2">
                                <h3 class="text-base text-[#263E80]">{{cart.short_description}}</h3>
                                <span class="text-sm text-[#4E4B66]">{{formatCurrency(cart.price)}}</span>
                                <span class="text-xs text-[#4E4B66] mt-2">Qtd: {{cart.quantity}}</span>
                            </div>
                        </div>
                        <TrashIcon class="w-6 text-[#E74845]" @click="removeCart(cart.id)" />
                    </div>
                </div>
            </div>
            <div class="w-full mt-4 flex flex-col justify-center items-center">
                <div class="w-full flex flex-col justify-center items-start mt-4 mb-4">
                    <h2 class="text-white text-base">Resumo da compra</h2>
                </div>
                <div class="w-full flex flex-col justify-center items-start pb-16">
                    <div class="w-full flex justify-between">
                        <h2 class="text-white text-sm">Subtotal</h2>
                        <h2 class="text-white text-sm">{{formatCurrency(this.total)}}</h2>
                    </div>
                    <div class="w-full flex justify-between">
                        <h2 class="text-white text-sm">Taxa de entrega</h2>
                        <h2 class="text-white text-sm">{{formatCurrency(this.shippingPrice)}}</h2>
                    </div>
                    <div class="w-full flex justify-between">
                        <h2 class="text-white text-xl">Valor total</h2>
                        <h2 class="text-white text-xl">{{formatCurrency(totalAmount)}}</h2>
                    </div>
                    <button class="w-full h-12 bg-[#E74845] rounded mt-6 text-white" @click="stepCheckout">
                        Finalizar compra
                    </button>
                </div>
            </div>

        </template>
        <div class="w-full flex flex-col justify-center items-center mt-8">
            <button class="w-full" v-if="this.currentStep < 2">
                <h3 class="text-sm text-white bg-[#E74845] py-4 w-full text-center rounded" @click="nextStep">
                    Avançar
                </h3>
            </button>
            <button class="w-full" v-else>
                <h3 class="text-sm text-white bg-[#E74845] py-4 w-full text-center rounded" @click="createAccont">
                    Finalizar compra
                </h3>
            </button>
        </div>
        <!-- <template v-if="currentStep == 3">
            <div class="w-full flex flex-col">
                pagamento em dinheiro
            </div>

        </template> -->
    </div>
</template>

<script>
import { ChevronLeftIcon, PlusIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { getAddressCosumer } from '@/services/consumer.service'
import { formatCurrency } from '@/Utils/formatCurrency'
export default {
    name: 'CheckoutView',
    data() {
        const methodDelivery = {
            deliveryInStore: [
                {
                    id: 1,
                    name: 'Retirar na loja',
                }
            ],
            deliveryInAddress: []
        }
        const currentStep = 0;
        const delivery = ''
        const payment = ''
        const methodsPayments = {
            paymentInApp: [
                { id: 1, name: 'PIX', methodId: 3},
            ],
            paymentInDelivery: [
                { id: 1, name: 'Cartão de crédito', methodId: 1},
                { id: 2, name: 'Dinheiro', methodId: 2}
            ]
        }
        const IdConsumer = localStorage.getItem('id_consumer')
        const carts = JSON.parse(localStorage.getItem('cart'))
        const shippingPrice = 0
        const total = 0
        return {
            methodDelivery,
            currentStep,
            delivery,
            payment,
            carts,
            methodsPayments,
            IdConsumer,
            shippingPrice,
            total
        }
    },
    components: {
        ChevronLeftIcon,
        PlusIcon,
        TrashIcon,
    },
    methods: {
        nextStep() {
            this.currentStep++
        },
        prevStep() {
            this.currentStep--
        },
        removeCart(id) {
            const cart = this.cart.filter(item => item.id !== id)
            localStorage.setItem('cart', JSON.stringify(cart))
            this.cart = cart
        },
        async getDeliveryConsumer(IdConsumer) {
            const response = await getAddressCosumer(IdConsumer)
            this.methodDelivery.deliveryInAddress = response.data
        },
    },
    created() {
        this.getDeliveryConsumer(this.IdConsumer)
        this.total = this.carts.reduce((acc, item) => acc + item.price, 0)
    },
    computed: {
        formatCurrency() {
            return formatCurrency
        },
        totalAmount() {
            return this.total + this.shippingPrice
        }
    },
    watch: {
        payment(value) {
            if(value.name === 'Dinheiro') {
                this.currentStep = 3
            }
            // console.log(value)
        },
        delivery(value) {
            if(value.name === 'Retirar na loja') {
                // console.log('retirar na loja')
                // console.log(value)
                this.delivery = value
            } 
            else if(value.cep != "") {
                // console.log(value.cep)
                this.delivery = value
            }
        },
        total(value){
            if(value < 60) {
                this.shippingPrice = 10
            }
            else if(value < 100) {
                this.shippingPrice = 15
            }
        }
    },

}
</script>

<style>

</style>