import DTextField from '@/components/DTextField.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Text Field',
  component: DTextField,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DTextField },
  props: Object.keys(argTypes),
  template: '<d-text-field v-bind="$props"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  label: "Text field",
  value: "Blablalb",
  editable: true,
  outlined: true
};