<style scoped>
    
</style>

<template>
  <div>
    <select
        :id="name"
        class="form-control"
        v-model="dataValue"

        @input=""
        @change="updateValue($event.target.value)"
        @keyup.enter="updateValue($event.target.value)"
        @focus="hasFocus = true"
        @blur="hasFocus = false">
            <option disabled v-if="hasEmpty" :value="emptyValue">{{ emptyLabel }}</option>
            <option v-for="option in options" :value="option[optionValueKey]">{{ option[optionLabelKey] }}</option>
    </select>
  </div>
</template>

<script>
    import inputMixin from '../crud/InputMixin.js'
    export default {
        mixins: [inputMixin],
        props: {
            options: { 
              type: Array,
              default: function(){
                return [];
              }
            },
            optionLabelKey: {
                type: String,
                default: 'label'
            },
            optionValueKey: {
                type: String,
                default: 'value'
            },
            hasEmpty: {
              type: Boolean,
              default: true
            },
            emptyValue: {
              type: String,
              default: ''
            },
            emptyLabel: {
              type: String,
              default: ''
            }
        },
    }
</script>
