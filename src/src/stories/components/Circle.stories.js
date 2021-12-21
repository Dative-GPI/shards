import DCircle from '@/components/DCircle.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Circle',
  component: DCircle,
  argTypes: {
    color: { control: 'color' },
    fill: { control: 'color' },
  },
};


const Template = (args, { argTypes }) => ({
    components: { DCircle },
    props: Object.keys(argTypes),
    template: '<d-circle v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {color: 'purple', fill: "white", };