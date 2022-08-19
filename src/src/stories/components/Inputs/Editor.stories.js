import DEditor from '@/components/DEditor.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/Inputs/Editor",
    component: DEditor
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DEditor },
    props: Object.keys(argTypes),
    template:
        `<d-editor v-bind="$props" />`
});

//👇 Each story then reuses that template
export const Default = Template.bind({});

