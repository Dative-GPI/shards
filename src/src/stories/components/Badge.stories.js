import DBadge from '@/components/DBadge.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Badge',
  component: DBadge
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBadge },
  props: Object.keys(argTypes),
  template: `
  <d-badge v-bind="$props">
    <template #badge> 8 </template>
    <v-icon> mdi-account </v-icon>
  </d-badge>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    value: true,
    bordered: true,
    offsetX: 8,
    offsetY: 8,
    color: "#DD3333"
};
