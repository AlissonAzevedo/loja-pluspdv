<template>
    <div class="w-full">
        <input type="text" 
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
    name: 'InputText',
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
    }

}
</script>

<style >

</style>