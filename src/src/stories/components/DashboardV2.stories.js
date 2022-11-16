import DashboardV2 from "@/components/dashboard-v2/DDashboard.vue";

export default {
    title: "Components/DashboardV2",
    component: DashboardV2
}

const Template = (args, {argTypes}) => ({
    components: { DashboardV2 },
    props: Object.keys(argTypes),
    data: () => ({ widgetsClone: [], columnsClone: 10, configuredWidgetClone: "" }),
    watch: {
      widgets(newVal) {
        this.widgetsClone = newVal;
      },
      columns(newVal) {
        this.columnsClone = newVal;
      }
    },
    computed: {
      oProps() {
        const { widgets, columns, configuredWidget, ...others } = this.$props;
        return others
      },
      smartWidgets(){
        return this.widgetsClone.map(w => {
            let {width, ...others} = w;
            return {
                ...others,
                width: Math.min(width, this.columnsClone)
            };
        })
      }
    },
    mounted() {
      this.widgetsClone = this.widgets;
      this.columnsClone = this.columns;
    },
    methods: {
        addWidget({templateId, x, y}){
            let template = this.widgetTemplates.find(t => t.id == templateId)
            let widget = {
                id: "w" + Math.random(100000),
                templateId: templateId,
                x,
                y,
                width: template.defaultWidth,
                height: template.defaultHeight,
                meta: {
                    label: template.label,
                    border: true
                }
            }
            this.widgetsClone.push(widget);
            this.configuredWidgetClone = widget.id;
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
      `
      <div>
        <div style="background-color: whitesmoke; height: 50px; width: 100%; margin-bottom: 10px;">
        </div>
        <d-dashboard-v2
            :widget-templates="widgetTemplates"
            :widgets="smartWidgets" 
            :columns.sync="columnsClone"
            :configured-widget.sync="configuredWidgetClone"
            v-bind="oProps"
            @add="addWidget"
            @update="updateWidget"
            style="overflow-y: auto; overflow-x: hidden"
            :style="editable ? 'height: 70vh' : ''"
            >

            <template #widget="{ item, configure, remove }">
                <div class="h-100 w-100" :class="{'d-card-border': item.meta.border}">
                    <d-btn v-if="editable" @click="configure">Configure</d-btn>
                    ({{ item.x }}, {{ item.y}}) [{{ item.width }}, {{ item.height}}] 
                </div>
            </template>

            <template #widget-dragover="props">
                {{ props }}
            </template>

            <template #configuration="{ widgetId }">
                <template  v-if="getWidget(widgetId)">
                    <d-text-field class="mt-5" label="configuration" v-model="getWidget(widgetId).meta.label" />
                    <d-text-field type="number" min="1" :max="columnsClone" class="mt-5" label="width" v-model.number="getWidget(widgetId).width" />
                    <d-text-field type="number" min="1" :max="columnsClone" class="mt-5" label="height" v-model.number="getWidget(widgetId).height" />
                    <d-switch class="mx-1 mt-3" label="border" v-model="getWidget(widgetId).meta.border" />
                </template>
            </template>
        
        </d-dashboard-v2>
        <div style="background-color: whitesmoke; height: 50px; width: 100%; margin-top: 10px;">
        </div>
    </div>`,
})

export const Default = Template.bind({});
Default.args = {
    editable: true,
    columns: 10,
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
                label: "Coucou",
                border: true
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
                label: "Coucou2",
                border: false
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
                label: "Coucou3",
                border: true
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
                label: "Coucou3",
                border: true
            }
        }
    ]
}