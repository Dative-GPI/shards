import DRightDrawer from '@/components/DRightDrawer.vue';

export default {
    component: DRightDrawer,
    title: "Components/Right Drawer",
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
    components: { DRightDrawer },
    props: Object.keys(argTypes),
    data: () => ({ drawer: false }),
    template:
        `
        <div>
            <d-btn @click.stop="drawer = !drawer">
                Toggle
            </d-btn>

            <d-right-drawer v-bind="$props" v-model="drawer" >
                <template #title>
                    {{ title }}
                </template>
                
                <div>
                    Body 
                    <div class="mt-12" v-for="n in 20" :key="n">Hello</div>
                </div>

                <template #actions>
                    <v-row no-gutters>
                        <v-spacer />
                        <d-btn>Go</d-btn>
                    </v-row>
                </template>
            </d-right-drawer>
        </div>
        `
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    title: "Titre",
    hideOverlay: false
};