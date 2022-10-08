<template>
    <div class="w-full min-h-[52px] rounded bg-white flex justify-start items-center my-2 py-3">
        <input 
            type="radio" 
            :value="this.label" 
            @input="$emit('update:modelValue', $event.target.value)"
            :id="this.label"
            class="w-[14px] h-[14px] mx-4 border-2 border-gray-500 checked:bg-[#E74845] focus:ring-[#E74845] text-[#E74845]"
        >
        <label 
            class="text-[#4E4B66] text-base">
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    name: 'InputRadio',
    props: {
        label: {
            type: String,
            default: ''
        },
        checked: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        value() {
            return this.label
        }
    }

}
</script>

<style>
</style>