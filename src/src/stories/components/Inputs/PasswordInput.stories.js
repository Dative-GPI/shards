import DPasswordInput from '@/components/DPasswordInput.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/PasswordInput',
  component: DPasswordInput,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DPasswordInput },
  props: Object.keys(argTypes),
  data: () => ({ valueClone: [] }),
  watch: {
    value(newVal) {
      this.valueClone = newVal;
    }
  },
  computed: {
    oProps() {
      const { value, ...others } = this.$props;
      return others
    }
  },
  mounted() {
    this.valueClone = this.value;
  },
  template: '<d-password-input v-model="valueClone" v-bind="oProps"></d-password-input>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  value: "",
  editable: true,
}