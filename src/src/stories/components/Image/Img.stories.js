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
  data: () => ({ data: "", srcData: "https://cdn.vuetifyjs.com/images/parallax/material.jpg" }),
  template: '<d-img v-bind="$props" :src="srcData" v-model="data" @remove="data = null; srcData = null;"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  width: 100,
  height: 100
};