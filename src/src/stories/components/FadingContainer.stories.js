import DFadingContainer from '@/components/DFadingContainer.vue';

export default {
    component: DFadingContainer,
    title: "Components/FadingContainer",
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
    components: { DFadingContainer },
    props: Object.keys(argTypes),
    data: () => ({ height: args.height }),
    template:
        `
        <d-fading-container>
            <div v-for="n in 200" :key="n" :height="height">
                Hello
            </div>
        </d-fading-container>
        `
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    height: "500px"
};