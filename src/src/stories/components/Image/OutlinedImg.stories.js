import DOutlinedImg from '@/components/DOutlinedImg.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Image/Outlined Image",
  component: DOutlinedImg,
  argTypes: {
    color: { control: 'color' },
    fill: { control: 'color' },
  },
};


const Template = (args, { argTypes }) => ({
    components: { DOutlinedImg },
    props: Object.keys(argTypes),
    template: '<d-outlined-Img v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
    size: 400,
    fill: 'white', 
    color: 'blue', 
    imgSrc: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    editable: false,
    circle: false
};