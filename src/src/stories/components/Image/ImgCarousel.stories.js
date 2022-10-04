import DImgCarousel from '@/components/DImgCarousel.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Image/ImageCarousel",
  component: DImgCarousel,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DImgCarousel },
  props: Object.keys(argTypes),
  template: `
    <d-img-carousel 
      v-bind="$props"
    />
  `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  imageSrcs: [
    "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
    "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
    "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
  ]
};