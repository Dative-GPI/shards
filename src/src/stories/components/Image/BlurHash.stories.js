import DBlurHash from '@/components/DBlurHash.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Components/Image/BlurHash',
    component: DBlurHash,
    argTypes: {
        value: {
            options: ["LKO2?U%2Tw=w]~RBVZRi};RPxuwH", "LEHV6nWB2yk8pyo0adR*.7kCMdnj", "LGF5]+Yk^6#M@-5c,1J5@[or[Q6."],
            control: { type: 'select' }
        }
    }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DBlurHash },
    props: Object.keys(argTypes),
    template: `
    <d-blur-hash v-bind="$props" />
  `
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { value: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH", width: 200, height: 150 };
