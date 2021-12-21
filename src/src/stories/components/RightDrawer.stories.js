import DRightDrawer from '@/components/DRightDrawer.vue';

export default {
    component: DRightDrawer,
    title: "Components/Right Drawer",
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
    components: { DRightDrawer },
    props: Object.keys(argTypes),
    template:
        `
        <v-container>
            <d-btn @click.stop="drawer = !drawer">
            Toggle
            </d-btn>
            <d-right-drawer v-bind="$props" v-model="drawer">
                <v-list>
                        <v-list-item
                        v-for="([icon, text], i) in items"
                        :key="i"
                        link
                    >
                        <v-list-item-icon>
                            <v-icon>{{ icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </d-right-drawer>
        </v-container>
        `
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    drawer: null,
    items: [
        ['mdi-email', 'Inbox'],
        ['mdi-account-supervisor-circle', 'Supervisors'],
        ['mdi-clock-start', 'Clock-in'],
      ],
};