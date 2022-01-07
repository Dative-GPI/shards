import DBtnCancel from '@/components/DBtnCancel.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/Cancel',
  component: DBtnCancel,
  argTypes: {
    label: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBtnCancel },
  props: Object.keys(argTypes),
  template: '<d-btn-cancel v-bind="$props">{{label}}</d-btn-cancel>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { label: "Cancel", responsive: true };


// export const Dangerous = Template.bind();
// Dangerous.args = {
//   color: "red-4",
//   class: "black-1--text",
//   label: "Button"
// }