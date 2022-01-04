import DAlert from "./components/DAlert.vue";
import DApp from "./components/DApp.vue";
import DAutocomplete from "./components/DAutocomplete.vue";
import DBottomBar from "./components/DBottomBar.vue";
import DBreadcrumbs from "./components/DBreadcrumbs.vue";
import DBtn from "./components/DBtn.vue";
import DBtnToggle from "./components/DBtnToggle.vue";
import DCard from "./components/DCard.vue";
import DCheckbox from "./components/DCheckbox.vue";
import DChip from "./components/DChip.vue";
import DChipGroup from "./components/DChipGroup.vue";
import DChipSet from "./components/DChipSet.vue";
import DCircle from "./components/DCircle.vue";
import DContainer from "./components/DContainer.vue";
import DCreateEntityBtn from "./components/DCreateEntityBtn.vue";
import DCreateEntityForm from "./components/DCreateEntityForm.vue";
import DDataList from "./components/DDataList.vue";
import DDataTable from "./components/DDataTable.vue";
import DExpansionPanel from "./components/DExpansionPanel.vue";
import DExpansionPanels from "./components/DExpansionPanels.vue";
import DIcon from "./components/DIcon.vue";
import DImg from "./components/DImg.vue";
import DLink from "./components/DLink.vue";
import DList from "./components/DList.vue";
import DListItem from "./components/DListItem.vue";
import DListItemGroup from "./components/DListItemGroup.vue";
import DMenu from "./components/DMenu.vue";
import DMenuBtn from "./components/DMenuBtn.vue";
import DOutlinedImg from "./components/DOutlinedImg.vue";
import DRightDrawer from "./components/DRightDrawer.vue";
import DSearchInput from "./components/DSearchInput.vue";
import DSelect from "./components/DSelect.vue";
import DSimpleCheckbox from "./components/DSimpleCheckbox.vue";
import DSheet from "./components/DSheet.vue"
import DSpinner from "./components/DSpinner.vue";
import DSubTitle from "./components/DSubTitle.vue";
import DSwitch from "./components/DSwitch.vue";
import DTextarea from "./components/DTextarea.vue";
import DTextField from "./components/DTextField.vue";
import DTile from "./components/DTile.vue";
import DTitle from "./components/DTitle.vue";
import DToggle from "./components/DToggle.vue";
import DToggleSet from "./components/DToggleSet.vue";
import DTwoOptionsDialog from "./components/DTwoOptionsDialog.vue";
import DValidationBar from "./components/DValidationBar.vue";

import AlertLoader from "./components/loaders/AlertLoader.vue";
import DashboardLoader from "./components/loaders/DashboardLoader.vue";
import DeviceLoader from "./components/loaders/DeviceLoader.vue";
import DListLoader from "./components/loaders/DListLoader.vue";
import DrawerLoader from "./components/loaders/DrawerLoader.vue";
import DumbListLoader from "./components/loaders/DumbListLoader.vue";
import LocationLoader from "./components/loaders/LocationLoader.vue";
import MapLoader from "./components/loaders/MapLoader.vue";
import OrganisationLoader from "./components/loaders/OrganisationLoader.vue";
import ScenarioCreationLoader from "./components/loaders/ScenarioCreationLoader.vue";
import ScenarioLoader from "./components/loaders/ScenarioLoader.vue";
import StatisticsDeviceLoader from "./components/loaders/StatisticsDeviceLoader.vue";
import StatisticsLoader from "./components/loaders/StatisticsLoader.vue";
import StatisticTemplateLoader from "./components/loaders/StatisticTemplateLoader.vue";

import { Icons } from "./icons";
import { Colors } from "./colors";

import "./style.css";
import '@fontsource/open-sans'
import '@fontsource/montserrat'

const Shards = {
  install(vue: any, options: any) {
    console.log("Registering dat-components locally");

    vue.component("d-alert", DAlert);
    vue.component("d-app", DApp);
    // Components
    vue.component("d-autocomplete", DAutocomplete);
    vue.component("d-bottom-bar", DBottomBar);
    vue.component("d-breadcrumbs", DBreadcrumbs);
    vue.component("d-btn", DBtn);
    vue.component("d-btn-toggle", DBtnToggle);
    vue.component("d-card", DCard);
    vue.component("d-checkbox", DCheckbox);
    vue.component("d-chip", DChip);
    vue.component("d-chip-set", DChipSet);
    vue.component("d-chip-group", DChipGroup);
    vue.component("d-circle", DCircle);
    vue.component("d-container", DContainer);
    vue.component("d-create-entity-btn", DCreateEntityBtn);
    vue.component("d-create-entity-form", DCreateEntityForm);
    vue.component("d-data-list", DDataList);
    vue.component("d-data-table", DDataTable);
    vue.component("d-expansion-panel", DExpansionPanel);
    vue.component("d-expansion-panels", DExpansionPanels);
    vue.component("d-icon", DIcon);
    vue.component("d-img", DImg);
    vue.component("d-link", DLink);
    vue.component("d-list", DList);
    vue.component("d-list-item", DListItem);
    vue.component("d-list-item-group", DListItemGroup);
    vue.component("d-menu", DMenu);
    vue.component("d-menu-btn", DMenuBtn);
    vue.component("d-outlined-img", DOutlinedImg);
    vue.component("d-right-drawer", DRightDrawer);
    vue.component("d-search-input", DSearchInput);
    vue.component("d-select", DSelect);
    vue.component("d-sheet", DSheet);
    vue.component("d-simple-checkbox", DSimpleCheckbox);
    vue.component("d-spinner", DSpinner);
    vue.component("d-sub-title", DSubTitle);
    vue.component("d-switch", DSwitch);
    vue.component("d-textarea", DTextarea);
    vue.component("d-text-field", DTextField);
    vue.component("d-tile", DTile);
    vue.component("d-title", DTitle);
    vue.component("d-toggle", DToggle);
    vue.component("d-toggle-set", DToggleSet);
    vue.component("d-two-options-dialog", DTwoOptionsDialog);
    vue.component("d-validation-bar", DValidationBar);

    // Loaders
    vue.component("alert-loader", AlertLoader);
    vue.component("dashboard-loader", DashboardLoader);
    vue.component("device-loader", DeviceLoader);
    vue.component("d-list-loader", DListLoader);
    vue.component("drawer-loader", DrawerLoader);
    vue.component("dumb-list-loader", DumbListLoader);
    vue.component("location-loader", LocationLoader);
    vue.component("map-loader", MapLoader);
    vue.component("organisation-loader", OrganisationLoader);
    vue.component("scenario-creation-loader", ScenarioCreationLoader);
    vue.component("scenario-loader", ScenarioLoader);
    vue.component("statistics-device-loader", StatisticsDeviceLoader);
    vue.component("statistics-loader", StatisticsLoader);
    vue.component("statistic-template-loader", StatisticTemplateLoader);
  }
};

export { Shards, Icons, Colors };