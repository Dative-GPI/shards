import DDraggableDataTable from '@/components/DDraggableDataTable.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/DraggableDataTable",
    component: DDraggableDataTable
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DDraggableDataTable },
    props: Object.keys(argTypes),
    template:
        `<d-draggable-data-table v-bind="$props">
            <template #item.icon="{ item }">
                <d-icon> {{ item.icon }} </d-icon>
            </template>
        </d-draggable-data-table>`
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
    dragOverClass: (item) => {
        if (item.folder) { return "f-test" }
        return "";
    }
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

