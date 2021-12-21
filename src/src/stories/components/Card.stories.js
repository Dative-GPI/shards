import DCard from '@/components/DCard.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Card',
  component: DCard,
  argTypes: {
    label: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DCard },
  props: Object.keys(argTypes),
  template: `
  <d-card v-bind="$props">
      <d-title>Title</d-title>
      <d-sub-title>Subtitle</d-sub-title>
      Lorem ipsum dolor sit amet. Qui nihil perspiciatis qui molestiae autem sed sint tempore aut culpa voluptas id error beatae? \nQui tempora delectus non ratione perspiciatis At quod tenetur qui consequatur corrupti omnis veniam est ipsam tenetur.\nUt fugit culpa ut soluta laboriosam sed quasi officia qui commodi consequuntur. Qui autem voluptas in reprehenderit error eos ratione totam quo quasi nihil aut minus voluptatum non nihil saepe eum enim autem. Eos quia accusamus id voluptatem quisquam ea quisquam placeat hic illum deserunt.
  </d-card>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  width: 400,
  height: "auto"
};
