import DOutlinedImg from '@/components/DOutlinedImg.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Image/Outlined Image",
  component: DOutlinedImg,
};


const Template1 = (args, { argTypes }) => ({
  components: { DOutlinedImg },
  props: Object.keys(argTypes),
  template: '<d-outlined-img v-bind="$props"/>',
});

export const Img1 = Template1.bind({});
Img1.args = {
  size: 400,
  fill: 'transparent',
  src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  editable: false,
  circle: false
};
