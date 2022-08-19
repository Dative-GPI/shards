import DInputAutocomplete from '@/components/DInputAutocomplete.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/Inputs/InputAutocomplete",
    component: DInputAutocomplete
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DInputAutocomplete },
    props: Object.keys(argTypes),
    data: () => ({ valueClone: "" }),
    computed: {
      oProps() {
        const { value, ...others } = this.$props;
        return others
      }
    },
    watch: {
      value(newVal) {
        this.valueClone = newVal;
      }
    },
    mounted() {
        this.valueClone = this.value;
    },
    template:
        `
        <div>    
            <d-input-autocomplete
                v-bind="oProps" 
                v-model="valueClone"
            />
            <span>Your name : {{ valueClone }}</span>
        </div>
        `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    onInputText: "Enter your name :",
    items: [ "Alice", "Benjamin", "Christopher", "Dylan", "Emily" ]
};

