import DValidationBar from '@/components/DValidationBar.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/ValidationBar",
  component: DValidationBar,
};


const Template = (args, { argTypes }) => ({
    components: { DValidationBar },
    props: Object.keys(argTypes),
    template: '<d-validation-bar v-bind="$props"></d-validation-bar>',
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