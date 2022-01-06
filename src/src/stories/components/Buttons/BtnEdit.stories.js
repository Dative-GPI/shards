import DBtnEdit from '@/components/DBtnEdit.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/Edit',
  component: DBtnEdit,
  argTypes: {
    label: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBtnEdit },
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
  template: '<d-btn-edit v-model="valueClone" v-bind="oProps">{{label}}</d-btn-edit>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { label: "Button", value: false, responsive: true };


// export const Dangerous = Template.bind();
// Dangerous.args = {
//   color: "red-4",
//   class: "black-1--text",
//   label: "Button"
// }