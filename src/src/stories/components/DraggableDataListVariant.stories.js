import DDraggableDataListVariant from '@/components/DDraggableDataListVariant.vue';
import DTile from '@/components/DTile.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/DraggableDataListVariant",
  component: DDraggableDataListVariant,
  argTypes: {
    initialMode: {
      options: ['table', 'tile'],
      control: { type: 'radio' }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DDraggableDataListVariant, DTile },
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
      <v-row no-gutters class="mt-5">
        <d-draggable-data-list-variant
          v-bind="oProps"
          :columns.sync="columnsClone"
          @click:row="itemClick"
          style="width: 100%;"
        >
          <template #table-item.icon="{ item }">
            <v-row no-gutters justify="center">
              <d-icon> {{ item.icon }} </d-icon>
            </v-row>
          </template>

          <template #tile-item="{ item }">
            <d-tile
              imgSrc=""
              :selectable="true"
              :width="300"
              :height="230"
              :item="item"
            >
              <template #status>
                <div style="height: 80px; background-color: whitesmoke;" />
              </template>

              <template #footer>
                <div style="height: 90px; background-color: whitesmoke;"> 
                  <span class="text-body-1"> {{ item.label }} </span>
                </div>
              </template>
            </d-tile>
          </template>
        </d-draggable-data-list-variant>
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
  itemKey: "id",
  itemClick: (item) => {
    alert(item.label);
  },
};

