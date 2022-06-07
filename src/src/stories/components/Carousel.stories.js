import DCarousel from '@/components/DCarousel.vue';
import DCarouselItem from "@/components/DCarouselItem.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Carousel',
  component: DCarousel,
  subcomponents: { DCarouselItem }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DCarousel, DCarouselItem },
  props: Object.keys(argTypes),
  template: `
  <d-carousel v-bind="$props">
    <d-carousel-item :key="1">
        <v-row no-gutters justify="center" align="center">
          <d-icon> mdi-forest </d-icon>
        </v-row>
    </d-carousel-item>
    <d-carousel-item :key="2">
      <v-row no-gutters justify="center" align="center">
        <d-icon> mdi-fire </d-icon>
      </v-row>
    </d-carousel-item>
  </d-card>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {};
