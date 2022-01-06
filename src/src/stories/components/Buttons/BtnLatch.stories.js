import DBtnLatch from '@/components/DBtnLatch.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/Latch',
  component: DBtnLatch,
  argTypes: {
    label: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBtnLatch },
  props: Object.keys(argTypes),
  template: '<d-btn-latch v-bind="$props">{{label}}</d-btn-latch>',
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