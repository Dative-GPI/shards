import DChip from '@/components/DChip.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Chip",
  component: DChip
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DChip },
  props: Object.keys(argTypes),
  template: 
    `<d-chip v-bind="$props">{{ text }}
    </d-chip>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  text: "Test",
  disabled: false,
  close: false
};
