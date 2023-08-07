import DScrollContainer from '@/components/DScrollContainer.vue';

export default {
    component: DScrollContainer,
    title: "Components/ScrollContainer",
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
    components: { DScrollContainer },
    props: Object.keys(argTypes),
    data: () => ({ height: args.height }),
    template:
        `
        <d-scroll-container>
            <div v-for="n in 200" :key="n" :height="height">
                Hello
            </div>
        </d-scroll-container>
        `
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    height: "500px"
};