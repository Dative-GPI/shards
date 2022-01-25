import DToggleSet from '@/components/DToggleSet.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/ToggleSet",
  component: DToggleSet,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DToggleSet },
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
  template:
    `<d-toggle-set
      v-model="valueClone" v-bind="oProps"
    >
    </d-toggle-set>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  items: [
    {
      value: "1",
      text: "Week",
      icon: "mdi-domain",
    },
    {
      value: "2",
      text: "Planning",
      icon: "mdi-email",
    },
    {
      value: "3",
      text: "Week",
      icon: "mdi-domain",
    },
    {
      value: "4",
      text: "Planning",
      icon: "mdi-email",
    },
    {
      value: "5",
      text: "Week",
      icon: "mdi-domain",
    },
    {
      value: "6",
      text: "Planning",
      icon: "mdi-email",
    },
    {
      value: "7",
      text: "Week",
      icon: "mdi-domain",
    },
    {
      value: "8",
      text: "Planning",
      icon: "mdi-email",
    },
  ],
  itemText: "text",
  itemIcon: "icon",
  itemValue: "value",
  mandatory: false,
  value: "1",
  responsive: false
};

