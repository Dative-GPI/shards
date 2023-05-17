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
        addWidget({templateId, x, y, width, height}){
            let template = this.widgetTemplates.find(t => t.id == templateId)
            let widget = {
                id: "w" + Math.random(100000),
                templateId: templateId,
                x,
                y,
                width: width,
                height: height,
                meta: {
                    label: template.label,
                    border: true
                }
            }
            this.widgetsClone.push(widget);
            this.configuredWidgetClone = widget.id;
        },
        updateWidget({widgetId, x, y, width, height}){
            let widget = this.widgetsClone.find(w => w.id == widgetId);
            widget.x = x;
            widget.y = y;
            widget.width = width;
            widget.height = height;
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
            :style="editable ? 'height: 70vh; overflow-y: auto' : ''"
            >

            <template #widget="{ item, configure, remove }">
                <div class="h-100 w-100" :class="{'d-card-border': item.meta.border || item.hideBorders === false}">
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
    editable: false,
    columns: 10,
    widgetTemplates: [
        {
            id: "wt1",
            code: "first.template",
            label: "First template",
            description: "This is ths first widget template available. It has a wifi icon.",
            icon: "mdi-wifi",
            defaultWidth: 3,
            defaultHeight: 2,
        },
        {
            id: "wt2",
            code: "second.template",
            label: "Second template",
            icon: "mdi-abacus",
            defaultWidth: 2,
            defaultHeight: 3,
        },
        {
            id: "wt3",
            code: "third.template",
            label: "Third template",
            icon: "mdi-account-school-outline",
            defaultWidth: 5,
            defaultHeight: 2,
        },
        {
            id: "wt4",
            code: "fourth.template",
            label: "Fourth template",
            icon: "mdi-airport",
            defaultWidth: 5,
            defaultHeight: 2,
        },
        {
            id: "wt5",
            code: "fifth.template",
            label: "Fifth template",
            icon: "mdi-alarm-light-outline",
            defaultWidth: 5,
            defaultHeight: 2,
        },
        {
            id: "wt6",
            code: "sixth.template",
            label: "Sixth template",
            icon: "mdi-alert-octagon-outline",
            defaultWidth: 5,
            defaultHeight: 2,
        },
        {
            id: "wt7",
            code: "seventh.template",
            label: "Seventh template",
            icon: "mdi-alpha-t-circle-outline",
            defaultWidth: 5,
            defaultHeight: 2,
        }
    ],
    widgets: []
}