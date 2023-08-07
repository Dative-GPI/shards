import DRightDrawer from '@/components/DRightDrawer.vue';
import DFadingContainer from "@/components/DFadingContainer.vue";

export default {
    component: DRightDrawer,
    title: "Components/Right Drawer",
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
    components: { DRightDrawer, DFadingContainer },
    props: Object.keys(argTypes),
    data: () => ({ drawer: false }),
    template:
        `
        <d-fading-container height="500px">
            <d-btn @click.stop="drawer = !drawer">
                Toggle
            </d-btn>
            <div class="mt-4" v-for="n in 60" :key="n">
            Bonjour
            <v-divider />
            </div>

            <d-right-drawer v-bind="$props" v-model="drawer" >
                <div>
                    <div class="mt-4" v-for="n in 60" :key="n">Hello</div>
                </div>
            </d-right-drawer>
        </d-fading-container>
        `
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    title: "Titre",
    hideOverlay: false
};