import DSwitch from '@/components/DSwitch.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Switch',
  component: DSwitch,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DSwitch },
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
  template: '<d-switch v-model="valueClone" v-bind="oProps"></d-switch>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  value: false,
  editable: true
}