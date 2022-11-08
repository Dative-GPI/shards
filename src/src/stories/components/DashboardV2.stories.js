import DashboardV2 from "@/components/dashboard-v2/DDashboard.vue";

export default {
    title: "Components/DashboardV2",
    component: DashboardV2
}

const Template = (args, {argTypes}) => ({
    components: { DashboardV2 },
    props: Object.keys(argTypes),
    data: () => ({ valueClone: [] }),
    watch: {
      value(newVal) {
        this.valueClone = newVal;
      }
    },
    computed: {
      oProps() {
        const { value, ...others } = this.$props;
        return others
      }
    },
    mounted() {
      this.valueClone = this.value;
    },
    template:
      `<d-dashboard-v2
        :widget-templates="widgetTemplates"
        v-model="valueClone" 
        v-bind="oProps" 
        style="height: 90vh"
        >

        <template #widget="{ item, configure, remove }">
            {{ item.meta.label }}
        </template>

        <template #widget-configure="{ item }">
            <d-text-field label="configuration" v-model="item.meta.label" />
        </template>
      
      </d-dashboard-v2>`,
})

export const Default = Template.bind({});
Default.args = {
    editable: true,
    widgetTemplates: [
        {
            id: "wt1",
            code: "tata",
            label: "Tata",
            description: "Clablsqlqsd lqqsd lqdkqd kqcx kq kqsdj",
            icon: "mdi-wifi",
            width: 2,
            height: 2,
        },
        {
            id: "wt2",
            code: "toto",
            label: "Toto",
            icon: "mdi-wifi",
            width: 2,
            height: 2,
        },
        {
            id: "wt3",
            code: "titi",
            label: "Titi",
            icon: "mdi-wifi",
            width: 2,
            height: 2,
        }
    ],
    value: [
        {
            id: "w1",
            templateId: "wt1",
            x: 0,
            y: 0,
            width: 3,
            height: 2,
            meta: {
                label: "Coucou"
            }
        },
        {
            id: "w2",
            templateId: "wt1",
            x: 0,
            y: 0,
            width: 3,
            height: 2,
            meta: {
                label: "Coucou2"
            }
        },
        {
            id: "w3",
            templateId: "wt1",
            x: 0,
            y: 0,
            width: 3,
            height: 2,
            meta: {
                label: "Coucou3"
            }
        },
        {
            id: "w4",
            templateId: "wt2",
            x: 0,
            y: 0,
            width: 3,
            height: 2,
            meta: {
                label: "Coucou3"
            }
        }
    ]
}