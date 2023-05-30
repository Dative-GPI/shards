export const Icons: IconsDictionary = {
  alertsPodiumWidget: {
    component: () => import("./AlertsPodiumWidget.vue")
  },
  alertsWidget: {
    component: () => import("./AlertsWidget.vue")
  },
  bakery: {
    component: () => import("./Bakery.vue")
  },
  caterer: {
    component: () => import("./Caterer.vue")
  },
  chartsWidget: {
    component: () => import("./ChartsWidget.vue")
  },
  cog: {
    component: () => import("./Cog.vue")
  },
  dashboardsWidget: {
    component: () => import("./DashboardsWidget.vue")
  },
  device: {
    component: () => import("./Device.vue")
  },
  devices: {
    component: () => import("./Devices.vue")
  },
  devicesWidget: {
    component: () => import("./DevicesWidget.vue")
  },
  editWidget: {
    component: () => import("./EditWidget.vue")
  },
  google: {
    component: () => import("./Google.vue")
  },
  groupsWidget: {
    component: () => import("./GroupsWidget.vue")
  },
  locations: {
    component: () => import("./Locations.vue")
  },
  locationsWidget: {
    component: () => import("./LocationsWidget.vue")
  },
  mapWidget: {
    component: () => import("./MapWidget.vue")
  },
  marker: {
    component: () => import("./Marker.vue")
  },
  microsoft: {
    component: () => import("./Microsoft.vue")
  },
  modelsWidget: {
    component: () => import("./ModelsWidget.vue")
  },
  pastries: {
    component: () => import("./Pastries.vue")
  },
  pastry: {
    component: () => import("./Pastry.vue")
  },
  production: {
    component: () => import("./Production.vue")
  },
  profileWidget: {
    component: () => import("./ProfileWidget.vue")
  },
  scenarios: {
    component: () => import("./Scenarios.vue")
  },
  snacking: {
    component: () => import("./Snacking.vue")
  },
  textWidget: {
    component: () => import("./TextWidget.vue")
  },
  tile: {
    component: () => import("./Tile.vue")
  },
  utilisation: {
    component: () => import("./Utilisation.vue")
  },
}

interface IconsDictionary {
  [key: string]: {
    component: any
  }
}