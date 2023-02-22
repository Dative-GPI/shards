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
        names: ["Alice", "Benjamin", "Christopher", "Dylan", "Emily"],
        backgrounds: ["aquamarine", "beige", 'coral'],
        dragIndex: -1,
        bgIndex: 0
    }),
    computed: {
        bg() {
            return this.backgrounds[this.bgIndex % this.backgrounds.length];
        }
    },
    methods: {
        dragStart(evt) {
            this.dragIndex = evt.index;
        },
        onDrop(evt) {
            if (this.dragIndex < 0) return;

            const insertOffset = this.dragIndex > evt.index ? 0 : 1;
            const deleteOffset = this.dragIndex > evt.index ? 1 : 0;
            this.names.splice(evt.index + insertOffset, 0, this.names[this.dragIndex]);
            this.names.splice(this.dragIndex + deleteOffset, 1);

            this.dragIndex = -1;
        },
        dragStop() {
            this.dragIndex = -1;
        },
        changeColor() {
            this.bgIndex++;
        }
    },
    template:
        `
        <div class="d-flex">
            <d-draggable
                v-bind="$props"
                v-for="(name, index) in names" 
                @dragstart="dragStart" 
                @drop="onDrop"
                @dragstop="dragStop"
                :index="index"
                :key="index"
            >
                <div :style="{
                        height: '50px',
                        background: bg,
                        padding: '10px'
                    }"
                    @click="changeColor"
                >
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

