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
Default.args = {
  dateTimeFormat: "dd/MM/yyyy HH:mm",
  minDate: "2022-10-04",
  maxDate: "2022-10-27",
  label: "Ma plage de temps",
  allowedMinutes: m => m%10 == 0,
  allowedHours: h => h%2 == 0,
  allowedDate: d => d.startsWith("2022"),
  disabled: false,
  scrollable: false,
  showAdjacentMonths: false,
  showCurrent: true,
  showWeek: false
};