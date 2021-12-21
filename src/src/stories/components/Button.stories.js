import DBtn from '@/components/DBtn.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: DBtn,
  argTypes: {
    label: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBtn },
  props: Object.keys(argTypes),
  template: '<d-btn v-bind="$props">{{label}}</d-btn>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {label: "Button"};


// export const Dangerous = Template.bind();
// Dangerous.args = {
//   color: "red-4",
//   class: "black-1--text",
//   label: "Button"
// }