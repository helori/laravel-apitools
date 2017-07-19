export default {
    data(){
        return{
            dataValue: this.value,
            uniqId: Math.random().toString(36).substring(7) + '_',
            hasFocus: false,
            debounceDelay: 0
        };
    },

    props: {
        // "value" is required to use v-model on the component
        value: { 
            default: null
        },
        name: {
            type: String,
            default: ''
        },
        error: {
            default: null
        },
        placeholder: { 
            type: String,
            default: '',
            required: false
        },
        required: {
            type: Boolean,
            default: false,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        }
    },

    computed: {
        errorMessage: function () {
            if(this.error){
                if(this.error[0]){
                    return this.error[0];
                }
                else{
                    return this.error;
                }
            }
            return '';
        }
    },

    watch: {
        value: {
            handler: function (val) {
                this.dataValue = val;
            }
        }
    },

    methods: {
        updateValueDebounce(value) {
            var self = this;
            var debounceUpdate = _.debounce(function() {
                self.updateValue(value);
            }, self.debounceDelay);
            debounceUpdate();
        },

        updateValue(value) {
            if(this.validateValue(value))
            {
                var displayValue = this.formatDisplayValue(value);

                // Replace the displayed value by the formatted one
                if (displayValue !== value) {
                    this.$refs.input.value = displayValue;
                }

                // required to use v-model on the component :
                var v = this.formatUpdateValue(value);
                this.$emit('input', v);
            }
        },

        // To be overloaded :
        formatDisplayValue(value) {
            return value;
        },

        // To be overloaded :
        formatUpdateValue(value){
            return value;
        },

        // To be overloaded :
        validateValue(value) {
            return true;
        }
    }
}
