import DDraggableList from '@/components/DDraggableList.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/DraggableList",
    component: DDraggableList
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DDraggableList },
    props: Object.keys(argTypes),
    data: () => ({ itemsClone: [] }),
    computed: {
      oProps() {
        const { items, ...others } = this.$props;
        return others
      }
    },
    watch: {
      items(newItems) {
        this.itemsClone = newItems;
      }
    },
    mounted() {
        this.itemsClone = this.items
    },
    template:
        `
            <d-draggable-list
                v-bind="oProps" 
                :items="itemsClone"
                @change="itemsClone = $event"
            >
                <template #item="{ item }">
                    <div style="height: 50px; background: aquamarine; padding: 10px">
                        {{ item }}
                    </div>
                </template>
            </d-draggable-list>
        `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    draggable: true,
    items: [ "Alice", "Benjamin", "Christopher", "Dylan", "Emily" ]
};

