import DFullScreenDialog from '@/components/DFullScreenDialog.vue';
import DDataList from '@/components/DDataList.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/FullScreenDialog",
    component: DFullScreenDialog, DDataList,
    argTypes: {
      initialMode: {
        options: ['table', 'tile'],
        control: { type: 'radio' }
      }
    }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DFullScreenDialog },
    props: Object.keys(argTypes),
    data: () => ({ columnsClone: [] }),
    watch: {
      columns(newVal) {
        this.columnsClone = newVal;
      }
    },
    computed: {
      oProps() {
        const { columns, ...others } = this.$props;
        return others
      }
    },
    mounted() {
      this.columnsClone = this.columns;
    },
    template: `
    <d-full-screen-dialog v-bind="$props">
      <v-card-text>
        <d-data-list :columns.sync="columnsClone" :value="valueItems" v-bind="oProps">
          <template #table-item.localisation="{ configure, item }">
              <d-chip-set :editable="configure" v-model="item.localisation" item-text="name" />
          </template>
          <template #tile-item="{ item }">
            <d-tile img-src="">
            </d-tile>
          </template>
        </d-data-list>
      </v-card-text>
    </d-full-screen-dialog>
`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    title: "Title",
    maxWidth: "calc(100vw - 100px)",
    text: "Text",
    left: "Left",
    leftIcon: "mdi-close",
    right: "Right",
    rightIcon: undefined,
    value: true,


    multiSort: true,
    columnText: "text",
    columnValue: "value",
    columnPosition: "index",
    configurationIcon: "$cog",
    search: "",
    columns: [
      {
        text: 'Index',
        sortable: false,
        filterable: true,
        value: 'name',
        sortable: true,
        hidden: false,
        width: 50,
        index: 0
      }
    ],
    items: [...Array(15).keys()].map(i => ({ name: i })),
    itemKey: "name",
    valueItems: []
};
