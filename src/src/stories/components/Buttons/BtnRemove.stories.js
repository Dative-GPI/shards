import DBtnRemove from '@/components/DBtnRemove.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/Remove',
  component: DBtnRemove,
  argTypes: {
    label: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBtnRemove },
  props: Object.keys(argTypes),
  template: '<d-btn-remove v-bind="$props">{{label}}</d-btn-remove>',
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