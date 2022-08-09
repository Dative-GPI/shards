import DDataTable from '@/components/DDataTable.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/DataTable",
    component: DDataTable
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DDataTable },
    props: Object.keys(argTypes),
    template:
        `<d-data-table v-bind="$props">
            <template #header.Etages.filter.item="{ item }">
                <d-chip-set :editable="false" :value="[item.text]" />
            </template>
            <template #item.localisation="{ configure, item }">
                <d-chip-set :editable="configure" v-model="item.localisation" />
            </template>
            <template #item.name="{configure, item}">
                <d-text-field v-model="item.name" :editable="configure" />
            </template>
        </d-data-table>`,
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
        {
            id: 9,
            name: '',
            SerialNumbe: 375,
            localisation: ["Strasbourg"],
            Etages: 25,
        },
        {
            id: 19,
            name: '',
            SerialNumbe: 375,
            localisation: [],
            Etages: 25,
        },
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

