import DIcon from '@/components/DIcon.vue';
import { Icons } from "@/icons"

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Icon",
  component: DIcon,
  argTypes: {
    icon: {
      options: Object.keys(Icons).map(i => `$${i}`),
      control: {
        type: "select"
      }
    }
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DIcon },
  props: Object.keys(argTypes),
  template: '<d-icon v-bind="$props">{{icon}}</d-icon>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { dense: true, icon:"mdi-email", size: 250 };
