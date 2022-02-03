import DIconBtn from '@/components/DIconBtn.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/Icon',
  component: DIconBtn,
  argTypes: {
    icon: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DIconBtn },
  props: Object.keys(argTypes),
  template: '<d-icon-btn v-bind="$props"></d-icon-btn>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { icon: "mdi-pencil", hidden: false };
