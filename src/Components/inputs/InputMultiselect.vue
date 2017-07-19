<style scoped>
    
</style>

<template>
    <select multiple
        :id="name"
        class="form-control"
        v-model="dataValue"
        
        @input=""
        @change="updateValue($event.target.value)"
        @keyup.enter="updateValue($event.target.value)"
        @focus="hasFocus = true"
        @blur="hasFocus = false">
            <option v-for="option in options" :value="option[optionValueKey]">{{ option[optionLabelKey] }}</option>
    </select>
</template>

<script>
    import inputMixin from '../crud/InputMixin.js'
    export default {
        mixins: [inputMixin],
        props: {
            value: { 
                default: function(){
                    return [];
                }
            },
            options: { 
                type: Array,
                default: function(){
                    return [];
                }
            },
            optionLabelKey: {
                type: String,
                default: 'name'
            },
            optionValueKey: {
                type: String,
                default: 'id'
            }
        },
    }
</script>
