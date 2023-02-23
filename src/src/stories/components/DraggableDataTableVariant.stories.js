import DDraggableDataTableVariant from '@/components/DDraggableDataTableVariant.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/DraggableDataTableVariant",
    component: DDraggableDataTableVariant
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DDraggableDataTableVariant },
    props: Object.keys(argTypes),
    data: () => ({
        itemsClone: []
    }),
    computed: {
        oProps() {
            const { items, ...others } = this.$props;
            return others;
        }
    },
    watch: {
        items(newItems) {
            this.itemsClone = newItems;
        }
    },
    mounted() {
        this.itemsClone = this.items;
    },
    template:
        `<d-draggable-data-table-variant v-bind="oProps" :items.sync="itemsClone">
            <template #item.icon="{ item }">
                <d-icon> {{ item.icon }} </d-icon>
            </template>
        </d-draggable-data-table-variant>`
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    multiSort: true,
    columnText: "text",
    columnValue: "value",
    columnPosition: "index",
    configurationIcon: "$cog",
    showSelect: false,
    singleSelect: true,
    sortable: true,
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
};

export const NoHeader = Template.bind({});
NoHeader.args = {
    multiSort: true,
    columnText: "text",
    columnValue: "value",
    columnPosition: "index",
    configurationIcon: "$cog",
    showSelect: false,
    singleSelect: true,
    sortable: true,
    hideHeader: true,
    columns: [
        {
            text: 'Article',
            filterable: true,
            value: 'name',
            sortable: true,
            hidden: false,
            index: 0,
            configurable: true
        },
        {
            text: 'Serial number',
            value: 'SerialNumbe',
            align: 'end',
            sortable: true,
            hidden: false,
            width: 180,
            index: 1
        },
        {
            text: 'Localisation',
            value: 'localisation',
            hidden: false,
            index: 6,
            sortable: true,
            configurable: true
        },
        {
            text: 'Etages',
            value: 'Etages',
            align: "center",
            hidden: false,
            filterable: true,
            width: 120,
            index: 3
        },
        {
            text: 'Numéro de sécurité',
            value: 'NumeroDeSecurité',
            hidden: false,
            index: 4
        },
    ],
    items: [
        {
            id: 1,
            name: 'Four à chariot rotatif',
            SerialNumbe: 159,
            localisation: ["Strasbourg"],
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

export const Pagination = Template.bind({});
Pagination.args = {
    multiSort: true,
    columnText: "text",
    columnValue: "value",
    columnPosition: "index",
    configurationIcon: "$cog",
    showSelect: false,
    singleSelect: true,
    sortable: true,
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
        },
        {
            id: 5,
            label: "File 4",
            icon: "mdi-file-outline",
            code: "F4",
            folder: false
        },
        {
            id: 6,
            label: "File 5",
            icon: "mdi-file-outline",
            code: "F5",
            folder: false
        },
        {
            id: 7,
            label: "File 6",
            icon: "mdi-file-outline",
            code: "F6",
            folder: false
        },
        {
            id: 8,
            label: "File 7",
            icon: "mdi-file-outline",
            code: "F7",
            folder: false
        },
        {
            id: 9,
            label: "File 8",
            icon: "mdi-file-outline",
            code: "F8",
            folder: false
        },
        {
            id: 10,
            label: "File 9",
            icon: "mdi-file-outline",
            code: "F9",
            folder: false
        },
        {
            id: 11,
            label: "File 10",
            icon: "mdi-file-outline",
            code: "F10",
            folder: false
        },
        {
            id: 12,
            label: "File 11",
            icon: "mdi-file-outline",
            code: "F11",
            folder: false
        }
    ],
    itemKey: "id",
};

export const NoData = Template.bind({});
NoData.args = {
    multiSort: true,
    columnText: "text",
    columnValue: "value",
    columnPosition: "index",
    configurationIcon: "$cog",
    showSelect: false,
    singleSelect: true,
    sortable: true,
    noDataText: "test",
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
    items: [],
    itemKey: "id",
};
