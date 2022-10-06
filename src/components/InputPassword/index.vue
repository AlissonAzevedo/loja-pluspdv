<template>
    <div class="w-full">
        <input type="password" 
        :placeholder="this.placeholder"
        class="w-full py-2 px-3 rounded border outline-none focus:border-[#E74845] text-[#14142B] selection:bg-[#E74845] selection:text-white placeholder:[#6E7191]"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        :disabled="this.disabled"
        >
    </div>
</template>

<script>

export default {
    name: 'InputPassword',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style >

</style>