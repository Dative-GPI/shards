export const Icons: IconsDictionary = {
  alertsWidget: {
    component: () => import("./AlertsWidget.vue")
  },
  bakery: {
    component: () => import("./Bakery.vue")
  },
  caterer: {
    component: () => import("./Caterer.vue")
  },
  cog: {
    component: () => import("./Cog.vue")
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
  google: {
    component: () => import("./Google.vue")
  },
  locations: {
    component: () => import("./Locations.vue")
  },
  locationsWidget: {
    component: () => import("./LocationsWidget.vue"),
  },
  marker: {
    component: () => import("./Marker.vue")
  },
  microsoft: {
    component: () => import("./Microsoft.vue")
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
  scenarios: {
    component: () => import("./Scenarios.vue")
  },
  snacking: {
    component: () => import("./Snacking.vue")
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