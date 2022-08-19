import DBtnToggle from '@/components/DBtnToggle.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Buttons/Button Toggle",
  component: DBtnToggle,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBtnToggle },
  props: Object.keys(argTypes),
  template: 
  `<d-btn-toggle v-model="value">
    <d-btn>
      <v-icon>mdi-format-align-left</v-icon>
    </d-btn>
    <d-btn>
      <v-icon>mdi-format-align-center</v-icon>
    </d-btn>
    <d-btn>
      <v-icon>mdi-format-align-justify</v-icon>
    </d-btn>
    <d-btn>
      <v-icon>mdi-format-align-right</v-icon>
    </d-btn>
  </d-btn-toggle>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {value:1};