import DOutlinedBlurImg from '@/components/DOutlinedBlurImg.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/Image/Outlined Blur Image",
    component: DOutlinedBlurImg,
};



const Template2 = (args, { argTypes }) => ({
    components: { DOutlinedBlurImg },
    props: Object.keys(argTypes),
    template: `
    <d-outlined-blur-img v-bind="$props" />
    `,
});

export const Img2 = Template2.bind({});
Img2.args = {
    size: 400,
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    imageWidth: 1848,
    imageHeight: 1039,
    imageBlurHash: "LXH:mlQ-4N[S_RES2dRC:%otoaWF",
    fullfill: true,
    editable: false,
};