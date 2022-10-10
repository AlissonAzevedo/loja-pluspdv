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
                <div class="min-h-[340px] bg-white rounded mt-2 flex flex-col justify-center items-center"
                    v-if="payment.name == 'PIX'">
                    <img src="data:image/png;base64,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"
                        alt="">
                    <div class="w-full flex px-4 items-center">
                        <div class="w-full flex flex-col">
                            <h3 class="text-[#4E4B66]">Código PIX</h3>
                            <span class="text-[#4E4B66]">{{truncateString('00020126330014BR.GOV.BCB.PIX0111065327983395204000053039865802BR5905Loja 6008Teresina62100506Loja016304D5B6', 20)}}</span>
                        </div>
                        <DocumentDuplicateIcon 
                            class="h-6 w-6 text-[#2E3A59]"
                            @click="copy"
                            />
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
import { getQrCodePayment } from '@/services/payment.service'
import { createRequest } from '@/services/request.service'
import { formatCurrency } from '@/Utils/formatCurrency'
import { truncateString } from '@/Utils/truncateString'
export default {
    name: 'CheckoutView',
    data() {
        const copyText = '00020126330014BR.GOV.BCB.PIX0111065327983395204000053039865802BR5905Loja 6008Teresina62100506Loja016304D5B6'
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
        const consumer = JSON.parse(localStorage.getItem('consumer'))
        const InfoStore = localStorage.getItem('InfoStore')
        const store = localStorage.getItem('store')
        const carts = JSON.parse(localStorage.getItem('cart'))
        const shippingPrice = 0
        const total = 0
        const QrCodeUrl = ''
        return {
            copyText,
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
            consumer,
            InfoStore,
            store,
            shippingPrice,
            total,
            QrCodeUrl
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
        async createPixQrCode(){
        const data = `nome=${this.InfoStore.name}&cidade=${'Teresina'}&saida=qr&chave=${this.InfoStore.pix_key}&valor=${this.total_price}`
            const response = await getQrCodePayment(data)
            console.log(response.data)
        },
        async createRequest() {
            const request = {
                store: this.store, // slug da loja
                consumer: this.IdConsumer, //IdConsumer
                payment: this.payment?.methodId, //IdPayment
                phone: this.consumer.phone, // telefone do cliente
                total_price: this.total_price,
                delivery: true, //Se é entrega ou não 
                address: this.delivery?.id, //Id do endereço
                shipping_cost: this.shippingPrice, // Preço do frete
                status: 0, //Status do pedido => PEDIDO EM ABERTO
                items: this.carts.map(item => {
                    return {
                        product: item.id,
                        unit_price: item.price,
                        quantity: item.quantity,
                        observacao: item.note
                    }
                })
            }
            const response  = await createRequest(request)
            const statusCode = response.status
            if(statusCode === 201){
                this.$toast.open({
                    message: 'Pedido realizado com sucesso!',
                    type: 'success',
                    position: 'top',
                    duration: 3000
                })
                this.$router.push('/')
                localStorage.removeItem("cart")
            } else {
                this.$toast.open({
                    message: 'Erro ao realizar pedido!',
                    type: 'error',
                    position: 'top',
                    duration: 3000
                })
            }
            // console.log(response)
        },
        async copy(){
            await navigator.clipboard?.writeText(this.copyText)
            this.$toast.open({
                message: 'Chave copiada com sucesso!',
                type: 'success',
                position: 'top',
                duration: 3000
            })
        }
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
        truncateString() {
            return truncateString
        }
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
            else if (value < 200){
                this.shippingPrice = 20
            }
            else{
                this.shippingPrice = 0
            }
        },
        // currentStep(value) {
        //     if (value === 2) {
        //         if(this.payment?.name === 'PIX'){
        //             this.createPixQrCode()
        //         }
        //     }
        // }
    },

}
</script>

<style>

</style>