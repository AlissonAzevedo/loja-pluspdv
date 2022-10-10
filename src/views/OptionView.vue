<template>
    <div class="w-full flex flex-col p-4">
        <h1 class="text-white text-xl my-2">Mais opções</h1>
        <div class="w-full flex flex-col">
            <CardOptions title="Mudar unidade" @click="SelectUnit">
                <ArrowsRightLeftIcon class="w-6 h-6 text-[#395BB9]"/>
            </CardOptions>
            <CardOptions title="Minha conta" v-if="IsLogged">
                <UserIcon class="w-6 h-6 text-[#395BB9]"/>
            </CardOptions>
            <CardOptions title="Meus pedidos" v-if="IsLogged">
                <QueueListIcon class="w-6 h-6 text-[#395BB9]"/>
            </CardOptions>
            <CardOptions title="Ajuda">
                <InformationCircleIcon class="w-6 h-6 text-[#395BB9]"/>
            </CardOptions>
            <CardOptions title="Sair" v-if="IsLogged" @click="logoutConsumer">
                <ArrowLeftOnRectangleIcon class="w-6 h-6 text-[#395BB9]"/>
            </CardOptions>
            <CardOptions title="Entrar" v-else @click="Login">
                <ArrowRightOnRectangleIcon class="w-6 h-6 text-[#395BB9]"/>
            </CardOptions>
        </div>
    </div>
    <ButtonNavigationBar />
</template>

<script>
import ButtonNavigationBar from '@/components/BottonNavigationBar'
import CardOptions from '@/components/CardOptions'
import { LogoutConsumer, VerifyLogin } from '@/services/consumer.service'
import { 
    UserIcon, 
    ArrowLeftOnRectangleIcon, 
    ArrowRightOnRectangleIcon, 
    ArrowsRightLeftIcon, 
    InformationCircleIcon,
    QueueListIcon 
} from '@heroicons/vue/24/outline'
export default {
    name: 'OptionView',
    components: {
        ButtonNavigationBar,
        CardOptions,
        UserIcon,
        ArrowLeftOnRectangleIcon,
        ArrowRightOnRectangleIcon,
        ArrowsRightLeftIcon,
        InformationCircleIcon,
        QueueListIcon
    },
    methods: {
        SelectUnit() {
            this.$router.push('/unidade')
        },
        logoutConsumer() {
            LogoutConsumer()
            this.$router.push('/')
        },
        Login() {
            this.$router.push('/conta/entrar')
        }
    },
    computed: {
        IsLogged() {
            return VerifyLogin()
        }
    }
}
</script>
<style>

</style>
  