<style scoped>
    
</style>

<template>
    <input 
        type="password"
        :id="name"
        class="form-control"
        :placeholder="placeholder"
        v-model="dataValue"

        @input=""
        @change="updateValue($event.target.value)"
        @keyup.enter="updateValue($event.target.value)"
        @focus="hasFocus = true"
        @blur="hasFocus = false" />
</template>

<script>
    import inputMixin from '../crud/InputMixin.js'
    export default {
        mixins: [inputMixin]
    }
</script>

