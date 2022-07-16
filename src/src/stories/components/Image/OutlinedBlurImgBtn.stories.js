import DOutlinedBlurImgBtn from '@/components/DOutlinedBlurImgBtn.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: "Components/Image/Outlined Blur Image Button",
    component: DOutlinedBlurImgBtn,
};



const Template = (args, { argTypes }) => ({
    components: { DOutlinedBlurImgBtn },
    props: Object.keys(argTypes),
    data: () => ({}),
    methods: {
        onClick: () => alert("Button clicked"),
        onClickIcon: (index) => alert("Icon " + index + " clicked"),
        onRemove: () => alert("Remove button clicked"),
        onEdit: () => alert("Edit button clicked")
    },
    template: `
    <d-outlined-blur-img-btn v-bind="$props" @click="onClick" @click:icon="onClickIcon" @remove="onRemove" @edit="onEdit"/>
    `,
});

export const ImgBtn = Template.bind({});
ImgBtn.args = {
    size: 200,
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    imageWidth: 1848,
    imageHeight: 1039,
    imageBlurHash: "LXH:mlQ-4N[S_RES2dRC:%otoaWF",
    fullfill: true,
    editable: false,
};

export const ImgBtnWithIcons = Template.bind({});
ImgBtnWithIcons.args = {
    size: 400,
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    imageWidth: 1848,
    imageHeight: 1039,
    imageBlurHash: "LXH:mlQ-4N[S_RES2dRC:%otoaWF",
    fullfill: true,
    editable: false,
    additionalIcons: ["mdi-abacus", "mdi-alien", "mdi-allergy"]
};