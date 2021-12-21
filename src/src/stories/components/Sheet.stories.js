import DSheet from "@/components/DSheet.vue"
import { Colors } from "@/colors";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Components/Sheet',
    component: { DSheet },
    argTypes: {
        color: {
            options: Object.keys(Colors),
            mapping: Colors,
            control: {
                type: "select"
            }
        }
    },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
    <d-sheet v-bind="$props"
    height="100"
    width="100">
    </d-sheet>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { color: "primary" };