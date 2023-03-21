import DDraggableDataList from '@/components/DDraggableDataList.vue';
import DDraggableTile from '@/components/DDraggableTile.vue';
import DDroppableBreadcrumbs from '@/components/DDroppableBreadcrumbs.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/DraggableDataList",
  component: DDraggableDataList,
  argTypes: {
    initialMode: {
      options: ['table', 'tile'],
      control: { type: 'radio' }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DDraggableDataList, DDraggableTile, DDroppableBreadcrumbs },
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
  template:
    `<v-container fluid class="pa-0 ma-0">
      <v-row no-gutters>
        <d-droppable-breadcrumbs
          :items="breadcrumbs"
          :dragOverClass="dragOverBreadcrumbs"
        />
      </v-row>
      <v-row no-gutters class="mt-5">
        <d-draggable-data-list
          v-bind="oProps"
          :columns.sync="columnsClone"
          :canDrop="canDrop"
          :dragOverClass="dragOverClass"
          @click:row="itemClick"
        >
          <template #table-item.icon="{ item }">
            <v-row no-gutters justify="center">
              <d-icon> {{ item.icon }} </d-icon>
            </v-row>
          </template>

          <template #tile-item="{ item }">
            <d-draggable-tile
              imgSrc=""
              :selectable="true"
              :width="300"
              :height="230"
              :item="item"
              :canDrop="canDrop"
            >
              <template #status>
                <div style="height: 80px; background-color: whitesmoke;" />
              </template>

              <template #footer>
                <div style="height: 90px; background-color: whitesmoke;"> 
                  <span class="text-body-1"> {{ item.label }} </span>
                </div>
              </template>
            </d-draggable-tile>
          </template>
        </d-draggable-data-list>
      </v-row>
    </v-container>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  multiSort: true,
  columnText: "text",
  columnValue: "value",
  columnPosition: "index",
  configurationIcon: "$cog",
  columns: [
    {
        text: 'Label',
        value: 'label',
        align: 'start',
        index: 0,
        filterable: true,
        sortable: true,
        hidden: false
    },
    {
        text: 'Icon',
        value: 'icon',
        align: 'center',
        index: 1,
        width: 150,
        filterable: false,
        sortable: true,
        hidden: false
    },
    {
        text: 'Code',
        value: 'code',
        align: 'end',
        index: 2,
        filterable: true,
        sortable: true,
        hidden: false
    }
  ],
  items: [
      {
          id: 1,
          label: "Folder",
          icon: "mdi-folder-outline",
          code: "FF0",
          folder: true
      },
      {
          id: 2,
          label: "File 1",
          icon: "mdi-file-outline",
          code: "F1",
          folder: false
      },
      {
          id: 3,
          label: "File 2",
          icon: "mdi-file-outline",
          code: "F2",
          folder: false
      },
      {
          id: 4,
          label: "File 3",
          icon: "mdi-file-outline",
          code: "F3",
          folder: false
      }
  ],
  search: "",
  itemKey: "id",
  canDrop: (item) => {
    if (item.folder) { return true; }
    return false;
  },
  dragOverClass: (item) => {
    if (item.folder) { return "f-slateblue-background" }
    return "f-gainsboro-background";
  },
  itemClick: (item) => {
    alert(item.label);
  },
  breadcrumbs: [
    { text: "Test 1", disabled: false },
    { text: "Test 2", disabled: true }
  ],
  dragOverBreadcrumbs: (item) => {
    if (item.text != "") { return "f-slateblue-background" }
    return "f-";
  }
};

