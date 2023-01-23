import DDataList from '@/components/DDataList.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/DataList",
  component: DDataList,
  argTypes: {
    initialMode: {
      options: ['table', 'tile'],
      control: { type: 'radio' }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DDataList },
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
    `<d-data-list :columns.sync="columnsClone" v-bind="oProps">

      <template #table-item.localisation="{ configure, item }">
        <v-row no-gutters v-if="item != null">
          {{ item.first }} {{ item.second }}
        </v-row>
      </template>

      <template #tile-item="{ item }">
        <d-tile img-src="">
        </d-tile>
      </template>
    </d-data-list>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  multiSort: true,
  columnText: "text",
  columnValue: "value",
  columnPosition: "index",
  configurationIcon: "$cog",
  search: "",
  columns: [
    {
      text: 'Article',
      sortable: false,
      filterable: true,
      value: 'name',
      sortable: true,
      hidden: false,
      width: 50,
      index: 0
    },
    {
      text: 'Serial number',
      value: 'SerialNumbe',
      align: 'end',
      sortable: true,
      hidden: false,
      width: 50,
      index: 1
    },
    {
      text: 'Localisation',
      value: 'localisation',
      filterable: true,
      hidden: false,
      index: 6,
      width: 50,
      configurable: true
    },
    {
      text: 'Etages',
      value: 'Etages',
      hidden: false,
      filterable: true,
      width: 50,
      index: 3
    },
    {
      text: 'Numéro de sécurité',
      value: 'NumeroDeSecurité',
      hidden: false,
      width: 100,
      index: 4
    },
  ],
  items: [
    {
      id: 1,
      name: 'Four à chariot rotatif',
      SerialNumbe: 159,
      localisation: ["Strasbourg", "Paris"],
      Etages: 1,
      NumeroDeSecurité: 5,
    },
    {
      id: 2,
      name: 'Four spécial',
      localisation: ["Strasbourg"],
      Etages: 4,
    },
    {
      id: 3,
      name: 'Four à chariot rotatif',
      SerialNumbe: 305,
      Etages: 5,
      NumeroDeSecurité: 3,
    },
    {
      id: 8,
      name: 'Four à chariot rotatif 2',
      SerialNumbe: 305,
      Etages: 5,
      NumeroDeSecurité: 3,
    },
    {
      id: 4,
      name: 'Four à chariot rotatif',
      SerialNumbe: 375,
      localisation: ["Strasbourg"],
      Etages: 25,
    },
  ],
  itemKey: "id",
};

export const WithObjectArray = Template.bind({});
WithObjectArray.args = {
  multiSort: true,
  columnText: "text",
  columnValue: "value",
  columnPosition: "index",
  configurationIcon: "$cog",
  search: "",
  columns: [
    {
      text: 'Article',
      sortable: false,
      filterable: true,
      value: 'name',
      sortable: true,
      hidden: false,
      width: 50,
      index: 0
    },
    {
      text: 'Serial number',
      value: 'SerialNumbe',
      align: 'end',
      sortable: true,
      hidden: false,
      width: 50,
      index: 1
    },
    {
      text: 'Localisation',
      value: 'localisation',
      filterable: true,
      hidden: false,
      index: 6,
      width: 50,
      configurable: true,
      innerValue: (v) => v?.name ?? undefined
    },
    {
      text: 'Etages',
      value: 'Etages',
      hidden: false,
      filterable: true,
      width: 50,
      index: 3
    },
    {
      text: 'Numéro de sécurité',
      value: 'NumeroDeSecurité',
      hidden: false,
      width: 100,
      index: 4
    },
  ],
  items: [
    {
      id: 1,
      name: 'Four à chariot rotatif',
      SerialNumbe: 159,
      localisation: [
        { name: "Strasbourg" }, { name: "Paris" }
      ],
      Etages: 1,
      NumeroDeSecurité: 5,
    },
    {
      id: 2,
      name: 'Four spécial',
      localisation: [
        { name: "Strasbourg" }
      ],
      Etages: 4,
    },
    {
      id: 3,
      name: 'Four à chariot rotatif',
      SerialNumbe: 305,
      Etages: 5,
      NumeroDeSecurité: 3,
    },
    {
      id: 8,
      name: 'Four à chariot rotatif 2',
      SerialNumbe: 305,
      Etages: 5,
      NumeroDeSecurité: 3,
      localisation: []
    },
    {
      id: 4,
      name: 'Four à chariot rotatif',
      SerialNumbe: 375,
      localisation: [
        { name: "Strasbourg" }
      ],
      Etages: 25,
    },
  ],
  itemKey: "id",
};

export const WithFilters = Template.bind({});
WithFilters.args = {
  multiSort: true,
  columnText: "text",
  columnValue: "value",
  columnPosition: "index",
  configurationIcon: "$cog",
  search: "",
  columns: [
    {
      text: 'Article',
      sortable: false,
      filterable: true,
      value: 'name',
      sortable: true,
      hidden: false,
      width: 50,
      index: 0,
      fixedFilters: [{ value: "lol", text: "Ah ah ah" }],
      methodFilter: (value, item) => {
        return (item != null && item != "");
      }
    },
    {
      text: 'Serial number',
      value: 'SerialNumber',
      align: 'end',
      filterable: true,
      sortable: true,
      hidden: false,
      width: 50,
      index: 1,
      methodFilter: (value, item) => {
        if (item == null) {
          return value == null;
        }
        return item >= value;
      }
    },
    {
      text: 'Localisation',
      value: 'localisation',
      filterable: true,
      hidden: false,
      index: 6,
      width: 50,
      configurable: true,
      fixedFilters: [{ value: 0, text: "" }, { value: 1, text: "Alsace" }, { value: 2, text: "Region parisienne" }],
      methodFilter: (value, item) => {
        if (item == null) {
          return value == null;
        }
        switch (value) {
          case 1: return item.first === "Strasbourg";
          case 2: return item.first === "Paris";
        }
      }
    }
  ],
  items: [
    {
      id: 1,
      name: 'Four à chariot rotatif',
      localisation: { first: "Strasbourg", second: "Paris" },
      SerialNumber: 100
    },
    {
      id: 2,
      name: 'Four spécial',
      localisation: { first: "Paris" },
      SerialNumber: 200
    },
    {
      id: 3,
      name: 'Four à chariot fixe',
      localisation: { first: "Strasbourg", second: "Paris" },
      SerialNumber: 300
    },
    {
      id: 4,
      name: 'Four à graisse de phoque',
      SerialNumber: 400
    },
    {
      id: 5,
      name: '',
      SerialNumber: 500
    }
  ],
  itemKey: "id",
};