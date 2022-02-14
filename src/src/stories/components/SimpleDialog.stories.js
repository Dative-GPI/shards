import DSimpleDialog from '@/components/DSimpleDialog.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/SimpleDialog",
    component: DSimpleDialog,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DSimpleDialog },
    props: Object.keys(argTypes),
    template: `
    <d-simple-dialog v-bind="$props">
    </d-simple-dialog>
`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    title: "Title",
    text: "Text",
    left: "Left",
    leftIcon: "mdi-close",
    right: "Right",
    rightIcon: undefined,
    value: true
};
