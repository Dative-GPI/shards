import DDateTimeRangePicker from '@/components/DDateTimeRangePicker.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Inputs/DateTimeRangePicker",
  component: DDateTimeRangePicker,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DDateTimeRangePicker },
  props: Object.keys(argTypes),
  data: () => ({ 
    valueClone: ""
  }),
  watch: {
    value(newVal) {
      this.valueClone = newVal;
    }
  },
  computed: {
    oProps() {
      const { value, ...others } = this.$props;
      return others;
    },
  },
  mounted() {
    this.valueClone = this.value;
  },
  template: `
    <d-date-time-range-picker
      v-bind="$props"
      v-model="valueClone"
    />
  `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {};