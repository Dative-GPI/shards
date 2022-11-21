import { parseISO } from "date-fns";
import DDatePicker from '@/components/DDatePicker.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/DatePicker',
  component: DDatePicker,
};


const Template = (args, { argTypes }) => ({
  components: { DDatePicker },
  props: Object.keys(argTypes),
  data: () => ({ valueClone: "" }),
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
  template: `<d-date-picker v-model="valueClone" v-bind="oProps" />`,
});

export const Default = Template.bind({});
Default.args = {
  value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 0, 0),
  contentClass: "my-5"
};

export const ErrorTooLow = Template.bind({});
Default.args = {
  value: parseISO("0001-01-01T00:00:00"),
  contentClass: "my-5"
};


export const ErrorTooHigh = Template.bind({});
Default.args = {
  value: parseISO("9999-12-31T23:59:59.999999"),
  contentClass: "my-5"
};