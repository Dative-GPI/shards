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
export const SingleLineSolo = Template.bind({});
SingleLineSolo.args = {
  label: "Text field",
  value: "Blablalb",
  editable: true,
  singleLine: true,
  outlined: false,
  solo: false
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: "Text field",
  value: "",
  editable: true,
  outlined: true
};