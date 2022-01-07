import DGrid from '@/components/DGrid.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/Grid",
    component: DGrid,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DGrid },
    props: Object.keys(argTypes),
    template: `
    <d-grid v-bind="$props">
        <template #item-key.c2>OverridedKey2</template>
        <template #item-value.c3="{ item, editMode }"><d-switch :editable="editMode" v-model="item.value" /></template>
        <template #item-value.c5="{ item, editMode }"><d-textarea v-model="item.value" :editable="editMode" /></template>
    </d-grid>
`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    editMode: false,
    items: [
        {
            code: "c1",
            key: "Very very very very very very very very very Very very very very very very very very very Very very very very very very very very very Very very very very very very very very very long text",
            value: "Value1",
            required: true,
            editable: true
        },
        {
            code: "c2",
            key: "Key2",
            value: "Value2",
            required: true,
            editable: false
        },
        {
            code: "c3",
            key: "Key3",
            value: false,
            required: false,
            editable: true
        },
        {
            code: "c4",
            key: "Key4",
            value: "Value4",
            required: false,
            editable: false
        },
        {
            code: "c5",
            key: "Key5",
            value: "Value5"
        },
    ]
};
