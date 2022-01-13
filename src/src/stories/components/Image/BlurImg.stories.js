import DBlurImg from '@/components/DBlurImg.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Components/Image/BlurImg',
    component: DBlurImg,
    argTypes: {
    }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DBlurImg },
    props: Object.keys(argTypes),
    template: `
    <d-blur-img v-bind="$props" />
  `
});

//👇 Each story then reuses that template
export const Img1 = Template.bind({});
Img1.args = {
    imageBlurHash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6.",
    imageWidth: 301,
    imageHeight: 193,
    width: 200,
    height: 150,
    round: false,
    src: "https://blurha.sh/assets/images/img2.jpg"
};


//👇 Each story then reuses that template
export const Img2 = Template.bind({});
Img2.args = {
    imageBlurHash: "q6Pj0^i_.AyE8^m+%gt,_3t7t7R*WBs,ofR-*0o#DgR4.Tt,ITVY_3R*D%xt%MIpRj%0McV@%itSI9R5x]tRIot7-:IoM{%LoeIV",
    imageWidth: 187,
    imageHeight: 120,
    width: 200,
    height: 200,
    round: true,
    fullfill: true,
    src: "https://blurha.sh/assets/images/img4.jpg"
};

//👇 Each story then reuses that template
export const Img3 = Template.bind({});
Img3.args = {
    imageBlurHash: "q6Pj0^i_.AyE8^m+%gt,_3t7t7R*WBs,ofR-*0o#DgR4.Tt,ITVY_3R*D%xt%MIpRj%0McV@%itSI9R5x]tRIot7-:IoM{%LoeIV",
    imageWidth: 1848,
    imageHeight: 1039,
    width: 200,
    height: 200,
    round: true,
    fullfill: true,
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
};
