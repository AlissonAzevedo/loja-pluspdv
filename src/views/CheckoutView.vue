<template>
    <div class="w-full flex flex-col justify-center items-center px-4 py-4">
        <div class="w-full" v-if="currentStep == 0">
            <router-link to="/conta">
                <ChevronLeftIcon class="w-6 h-6 text-white" />
            </router-link>
        </div>
        <div class="w-full" v-else>
            <ChevronLeftIcon class="w-6 h-6 text-white" @click="prevStep" v-if="currentStep != 3" />
            <ChevronLeftIcon class="w-6 h-6 text-white" @click="() => currentStep = 1" v-if="currentStep == 3" />
        </div>
        <div class="w-full flex flex-col justify-center mt-2" v-if="currentStep != 3">
            <h1 class="text-white text-2xl mt-6">Finalizar compra</h1>
            <h4 class="text-white font-light mt-2">Confira as informações abaixo antes de finalizar a compra do produto.
            </h4>
        </div>
        <div class="w-full flex flex-col justify-center mt-2" v-if="currentStep == 3">
            <h1 class="text-white text-2xl mt-6">Dinheiro</h1>
            <h4 class="text-white font-light mt-2">Complemente a informação abaixo para finalizarmos a sua compra.</h4>
        </div>
        <template v-if="currentStep == 0">
            <div class="w-full flex flex-col justify-center items-start mt-6">
                <h6 class="text-white font-light my-2">Onde você quer receber?</h6>
                <div class="w-full flex flex-col justify-center items-start">
                    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3"
                        v-for="method in methodDelivery.deliveryInStore" :key="method.id">
                        <input type="radio" :value="method" v-model="delivery" :id="method"
                            class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                        <label class="text-[#4E4B66] text-base">
                            {{method.name}}
                        </label>
                    </div>
                    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3"
                        v-for="method in methodDelivery.deliveryInAddress" :key="method.id">
                        <input type="radio" :value="method" v-model="delivery" :id="method"
                            class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                        <label class="text-[#4E4B66] text-base">
                            {{method.street}}, {{method.number}} - {{method.cep}} / {{method.city.name}} -
                            {{method.city.uf}}
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
                    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3"
                        v-for="method in methodsPayments.paymentInApp" :key="method.id">
                        <input type="radio" :value="method" v-model="payment" :id="method.name"
                            class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                        <label class="text-[#4E4B66] text-base">
                            {{method.name}}
                        </label>
                    </div>
                    <h6 class="text-white font-light my-6">Pagar na entrega</h6>
                    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3"
                        v-for="method in methodsPayments.paymentInDelivery" :key="method.id">
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
            <div class="w-full flex flex-col mt-4">
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
            <div class="w-full my-6" v-if="delivery">
                <h3 class="text-white text-sm">Endereço de entrega</h3>
                <div class="h-[70px] bg-white rounded mt-2 flex justify-start items-center">
                    <h3 class="text-base text-[#4E4B66] px-4" v-if="delivery.name != 'Retirar na loja'">
                        {{delivery.street}}, {{delivery.number}} - {{delivery.cep}} / {{delivery.city?.name}} -
                        {{delivery.city?.uf}}
                    </h3>
                    <h3 class="text-base text-[#4E4B66] px-4" v-else>
                        {{delivery.name}}
                    </h3>
                </div>
            </div>
            <div class="w-full my-6" v-if="payment">
                <h3 class="text-white text-sm" v-if="payment.name == 'Cartão de crédito'">Pagamento na entrega</h3>
                <h3 class="text-white text-sm" v-if="payment.name == 'Dinheiro'">Pagamento na entrega</h3>
                <h3 class="text-white text-sm" v-if="payment.name == 'PIX'">Pagamento no app</h3>
                <div class="min-h-[70px] bg-white rounded mt-2 flex flex-col justify-center items-start text-start"
                    v-if="payment.name != 'PIX'">
                    <h3 class="text-base text-[#4E4B66] px-4 my-1">
                        {{payment.name}}
                    </h3>
                    <h3 class="text-xs text-[#4E4B66] px-4" v-if="payment.name == 'Dinheiro'">
                        Troco para R$ {{transshipmentValue}}
                    </h3>
                </div>
                <!-- <div class="h-[70px] bg-white rounded mt-2 flex justify-start items-center"
                    v-if="payment.name == 'Dinheiro'">
                    <h3 class="text-base text-[#4E4B66] px-4">
                        {{payment.name}}
                    </h3>
                </div> -->
                <div class="min-h-[340px] bg-white rounded mt-2 flex flex-col justify-center items-center"
                    v-if="payment.name == 'PIX'">
                    <img src="data:image/png;base64,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"
                        alt="">
                    <div class="w-full flex px-4 items-center">
                        <div class="w-full flex flex-col">
                            <h3 class="text-[#4E4B66]">Código PIX</h3>
                            <span class="text-[#4E4B66]">d096e8b-ce74-d097e8b-ce74...</span>
                        </div>
                        <DocumentDuplicateIcon class="h-6 w-6 text-[#2E3A59]" />
                    </div>
                </div>
            </div>
            <div class="w-full mt-4 flex flex-col justify-center items-center">
                <div class="w-full flex flex-col justify-center items-start mt-4 mb-4">
                    <h2 class="text-white text-base">Resumo da compra</h2>
                </div>
                <div class="w-full flex flex-col justify-center items-start pb-6">
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
                        <h2 class="text-white text-xl">{{formatCurrency(total_price)}}</h2>
                    </div>
                </div>
            </div>
        </template>
        <div class="w-full flex flex-col justify-center items-center mt-8" v-if="currentStep != 3">
            <button class="w-full" v-if="this.currentStep < 2">
                <h3 class="text-sm text-white bg-[#E74845] py-4 w-full text-center rounded" @click="nextStep">
                    Avançar
                </h3>
            </button>
            <button class="w-full" v-else>
                <h3 class="text-sm text-white bg-[#E74845] py-4 w-full text-center rounded" @click="createRequest">
                    Finalizar compra
                </h3>
            </button>
        </div>
        <div class="w-full flex flex-col justify-center items-center py-4" v-if="currentStep == 3">
            <template v-if="currentStep == 3">
                <div class="w-full flex flex-col">
                    <div class="w-full my-6">
                        <h3 class="text-white text-sm">Você irá precisar de troco?</h3>
                        <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3">
                            <input type="radio" value="true" v-model="optionTransshipment" id="method"
                                class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                            <label class="text-[#4E4B66] text-base">
                                Sim
                            </label>
                        </div>
                        <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3">
                            <input type="radio" value="false" v-model="optionTransshipment" id="method"
                                class="form-radio w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]">
                            <label class="text-[#4E4B66] text-base">
                                Não
                            </label>
                        </div>
                    </div>
                    <div class="w-full my-6">
                        <h3 class="text-white text-sm">Troco para quanto?</h3>
                        <div class="w-full flex justify-start items-center border-[#E74845] bg-white rounded h-[45px] mt-4"
                        :class="{'bg-black/40 cursor-not-allowed': !IsDisabled}"
                        >
                            <span class="ml-2 text-[#4E4B66]">
                                R$
                            </span>
                            <input 
                                type="text" 
                                class="text-[#4E4B66] bg-transparent border-none focus:outline-none focus:ring-0 h-full" 
                                placeholder="0,00" 
                                v-model="transshipmentValue" 
                                :disabled="!this.IsDisabled"
                                v-mask="['##,##', '###,##']"
                            >
                        </div>
                    </div>
                    <div class="w-full flex flex-col justify-center items-center mt-8">
                        <button :disabled="!IsDisabled" class="text-sm text-white bg-[#E74845] py-4 w-full text-center rounded disabled:bg-[#E74845]/40" @click="() => currentStep = 2">
                            Avançar
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { ChevronLeftIcon, PlusIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { DocumentDuplicateIcon } from '@heroicons/vue/24/outline'
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
        const optionTransshipment = false
        const transshipmentValue = ''
        const IsDisabled = false
        const methodsPayments = {
            paymentInApp: [
                { id: 1, name: 'PIX', methodId: 3 },
            ],
            paymentInDelivery: [
                { id: 1, name: 'Cartão de crédito', methodId: 1 },
                { id: 2, name: 'Dinheiro', methodId: 2 }
            ]
        }
        const IdConsumer = JSON.parse(localStorage.getItem('id_consumer'))
        const carts = JSON.parse(localStorage.getItem('cart'))
        const shippingPrice = 0
        const total = 0
        return {
            methodDelivery,
            currentStep,
            delivery,
            payment,
            optionTransshipment,
            transshipmentValue,
            IsDisabled,
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
        DocumentDuplicateIcon
    },
    methods: {
        nextStep() {
            this.currentStep++
            if (this.payment.name === 'Dinheiro') {
                this.currentStep = 3
            }
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
        createRequest() {
            const request = {
                store: '', // slug da loja
                consumer: this.IdConsumer, //IdConsumer
                payment: this.payment?.methodId, //IdPayment
                phone: '', // telefone do cliente
                total_price: this.total_price,
                delivery: true, //Se é entraga ou não 
                address: this.delivery?.id, //Id do endereço
                items: this.carts.map(item => {
                    return {
                        product: item.id,
                        unit_price: item.price,
                        quantity: item.quantity
                    }
                })
            }
            console.log(request)
        },
    },
    created() {
        this.getDeliveryConsumer(this.IdConsumer)
        this.total = this.carts.reduce((acc, item) => acc + item.product_total_price, 0)
    },
    computed: {
        formatCurrency() {
            return formatCurrency
        },
        SubTotal() {
            return this.total
        },
        total_price() {
            return this.total + this.shippingPrice
        },
    },
    watch: {
        optionTransshipment(value){
            if (value == 'true') {
                this.IsDisabled = true
            }
            else{
                this.IsDisabled = false
                this.transshipmentValue = ''
            }
        },
        delivery(value) {
            if (value.name === 'Retirar na loja') {
                this.delivery = value
            }
            else if (value.cep != "") {
                this.delivery = value
            }
        },
        total(value) {
            if (value < 60) {
                this.shippingPrice = 10
            }
            else if (value < 100) {
                this.shippingPrice = 15
            }
        }
    },

}
</script>

<style>

</style>