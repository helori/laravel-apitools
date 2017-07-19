<style scoped>
.btn-cloud{
    margin: 0 2.5px 5px 2.5px;
}
.btn-cloud-right{
    margin: 0 0 5px 5px;
}
.btn-2{
    width: 49%;
}
.btn-2:first-child{
    margin: 0 1% 0 0;
}
.btn-2:last-child{
    margin: 0 0 0 1%;
}
</style>

<template>
    
    <div :class="{'text-center': display === 'cloud', 'text-right': display === 'cloud-right'}">
        <button 
            v-for="option in options"
            type="button"
            class="btn"
            :class="{'btn-primary': hasOption(option[optionValueKey]), 'btn-default': !hasOption(option[optionValueKey]), 'btn-block': display === 'column', 'btn-cloud': display === 'cloud', 'btn-cloud-right': display === 'cloud-right', 'btn-2': display === 'column2'}"
            @click="setOption(option[optionValueKey])">
            {{ option[optionLabelKey] }}
        </button>
    </div>

</template>

<script>
    import inputMixin from '../crud/InputMixin.js'
    export default {
        mixins: [inputMixin],
        props: {
            options: {
                type: Array,
                required: true,
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
            display: {
                type: String,
                default: 'cloud',
                required: false
            },
            multiple: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        methods: {
            setOption(opt){
                if(this.multiple){
                    var idx = this.dataValue.indexOf(opt);
                    if(idx !== -1){
                        this.dataValue.splice(idx, 1);
                    }else{
                        this.dataValue.push(opt);
                    }
                }else{
                    this.dataValue = opt;
                }
                this.updateValue(this.dataValue);
            },

            hasOption(opt){
                if(this.multiple){
                    if(this.dataValue !== null){
                        var idx = this.dataValue.indexOf(opt);
                        return (idx !== -1);    
                    }else{
                        return false;
                    }
                }else{
                    return (this.dataValue === opt);
                }
            }
        }
    }
</script>

