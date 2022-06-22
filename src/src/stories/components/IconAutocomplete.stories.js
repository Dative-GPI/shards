import DIconAutocomplete from '@/components/DIconAutocomplete.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/IconAutocomplete",
  component: DIconAutocomplete,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DIconAutocomplete },
  props: Object.keys(argTypes),
  data: () => ({ valueClone: "mdi-wifi" }),
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
  template: '<d-icon-autocomplete v-model="valueClone" v-bind="oProps" />',
});

//👇 Each story then reuses that template
export const Default = Template.bind({})
Default.args = {
  value: "mdi-wifi"
}
