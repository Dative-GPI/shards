import DImg from '@/components/DImg.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Image/Image",
  component: DImg,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DImg },
  props: Object.keys(argTypes),
  data: () => ({ data: "" }),
  template: '<d-img v-bind="$props" v-model="data"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
};