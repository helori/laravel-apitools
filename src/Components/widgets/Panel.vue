<style scoped>
.panel{
    margin: 0 0 30px 0;
}
</style>

<template>
    <div class="panel panel-default">
        <div class="panel-heading" v-if="hasSlot('title')">
            <h4 class="panel-title">
                <slot name="title"></slot>
            </h4>
        </div>
        <div class="panel-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            hasSlot(slot){
                return this.$slots[slot] ? true : false;
            }
        }
    }
</script>
