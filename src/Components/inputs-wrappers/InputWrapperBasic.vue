<style scoped>
    .form-group{
        margin-bottom: 5px;
    }
</style>

<template>
    
    <div class="form-group" :class="{'has-error': error}">
        <label :for="name" v-if="label !== null" v-html="label"></label>
        <slot name="input"></slot>
        <p class="help-block" v-if="help">{{ help }}</p>
        <p class="help-block" v-if="error">{{ error }}</p>
    </div>

</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: null,
                required: false
            },
            name: {
                type: String,
                default: ''
            },
            error: {
                default: null
            },
            help: {
                type: String,
                default: null
            }
        },
    }
</script>
