import DDraggable from '@/components/DDraggable.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/Draggable",
    component: DDraggable
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    components: { DDraggable },
    props: Object.keys(argTypes),
    data: () => ({
        names: [ "Alice", "Benjamin", "Christopher", "Dylan", "Emily" ],
        dragIndex: -1,
        draggingClone: false
    }),
    computed: {
      oProps() {
        const { dragging, ...others } = this.$props;
        return others
      }
    },
    methods: {
        dragStart(evt, index) {
            this.dragIndex = index;
            this.draggingClone = true;
        },
        onDrop({ evt, isRight }, index) {
            const endIndex = isRight ? index + 1 : index;
        
            this.names.splice(endIndex, 0, this.names[this.dragIndex]);
            const startIndex =
              endIndex <= this.dragIndex
                ? this.dragIndex + 1
                : this.dragIndex;
            this.names.splice(startIndex, 1);
        
            this.dragIndex = -1;
            this.draggingClone = false;
        },
        dragStop() {
            this.dragIndex = -1;
            this.draggingClone = false;
        }
    },
    template:
        `
        <div class="d-flex">
            <d-draggable
                v-bind="oProps"
                :dragging="draggingClone"
                v-for="(name, index) in names" 
                @dragstart="dragStart($event, index)" 
                @drop="onDrop($event, index)"
                @dragstop="dragStop"
                :key="index"
            >
                <div style="height: 50px; background: aquamarine; padding: 10px">
                    {{ name }}
                </div>
            </d-draggable>
        </div>
        `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    draggable: true
};

