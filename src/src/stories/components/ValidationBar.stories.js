import DValidationBar from '@/components/DValidationBar.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/ValidationBar",
  component: DValidationBar,
};


const Template = (args, { argTypes }) => ({
  components: { DValidationBar },
  props: Object.keys(argTypes),
  data: () => ({ open: false }),
  template: `
      <div>
        <d-btn-edit :hidden="open" @click="open = true" />
        <d-validation-bar v-if="open" v-bind="$props" @cancel="open = false" @save="open = false" @remove="open = false"></d-validation-bar>
      </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
  removable: false,
  saveable: true,
  responsive: true,
  saveText: "Enregistrer les modifications",
  cancelText: 'Annuler',
  removeText: "Supprimer",
  backgroundColor: "white"
};