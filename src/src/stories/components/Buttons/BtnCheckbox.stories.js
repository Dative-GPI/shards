import DBtnCheckbox from '@/components/DBtnCheckbox.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/Checkbox',
  component: DBtnCheckbox,
  argTypes: {
    label: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBtnCheckbox },
  props: Object.keys(argTypes),
  template: '<d-btn-checkbox v-bind="$props">{{label}}</d-btn-checkbox>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { label: "Button" };


// export const Dangerous = Template.bind();
// Dangerous.args = {
//   color: "red-4",
//   class: "black-1--text",
//   label: "Button"
// }