import DAccess from '@/components/DAccess.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/Access",
    component: DAccess
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DAccess },
    props: Object.keys(argTypes),
    template:
        `<d-access v-bind="$props" />`
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    value: 0
};
