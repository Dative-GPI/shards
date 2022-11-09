import DashboardV2 from "@/components/dashboard-v2/DDashboard.vue";

export default {
    title: "Components/DashboardV2",
    component: DashboardV2
}

const Template = (args, {argTypes}) => ({
    components: { DashboardV2 },
    props: Object.keys(argTypes),
    data: () => ({ widgetsClone: [] }),
    watch: {
      widgets(newVal) {
        this.widgetsClone = newVal;
      }
    },
    computed: {
      oProps() {
        const { value, ...others } = this.$props;
        return others
      }
    },
    mounted() {
      this.widgetsClone = this.widgets;
    },
    methods: {
        addWidget({templateId, x, y}){
            let template = this.widgetTemplates.find(t => t.id == templateId)
            this.widgetsClone.push({
                id: "w" + Math.random(100000),
                templateId: templateId,
                x,
                y,
                width: template.defaultWidth,
                height: template.defaultHeight,
                meta: {
                    label: template.label
                }
            });
        },
        updateWidget({widgetId, x, y}){
            let widget = this.widgetsClone.find(w => w.id == widgetId);
            widget.x = x;
            widget.y = y;
        },
        getWidget(id){
            return this.widgetsClone.find(w => w.id == id);
        }
    },
    template:
      `<d-dashboard-v2
        :widget-templates="widgetTemplates"
        :widgets="widgetsClone" 
        v-bind="oProps" 
        @add="addWidget"
        @update="updateWidget"
        style="height: 90vh"
        >

        <template #widget="{ item, configure, remove }">
            <d-btn @click="configure">Configure</d-btn>
            {{ item.meta.label }}
        </template>

        <template #widget-dragover="{templateId}">
            {{ templateId }}
        </template>

        <template #configuration="{ widgetId }">
            <d-text-field class="mt-5" v-if="getWidget(widgetId)" label="configuration" v-model="getWidget(widgetId).meta.label" />
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
            defaultWidth: 3,
            defaultHeight: 2,
        },
        {
            id: "wt2",
            code: "toto",
            label: "Toto",
            icon: "mdi-wifi",
            defaultWidth: 2,
            defaultHeight: 3,
        },
        {
            id: "wt3",
            code: "titi",
            label: "Titi",
            icon: "mdi-wifi",
            defaultWidth: 5,
            defaultHeight: 2,
        }
    ],
    widgets: [
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