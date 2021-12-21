import DBottomBar from '@/components/DBottomBar.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/BottomBar',
  component: DBottomBar,
  argTypes: {
    label: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBottomBar },
  props: Object.keys(argTypes),
  template: '<d-bottom-bar v-bind="$props">{{label}}</d-bottom-bar>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {label: "BottomBar"};
