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
  eco: {
    component: () => import("./Eco.vue")
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
  pastries: {
    component: () => import("./Pastries.vue")
  },
  pastry: {
    component: () => import("./Pastry.vue")
  },
  planning: {
    component: () => import("./Planning.vue")
  },
  production: {
    component: () => import("./Production.vue")
  },
  recipe: {
    component: () => import("./Recipe.vue")
  },
  scenarios: {
    component: () => import("./Scenarios.vue")
  },
  snacking: {
    component: () => import("./Snacking.vue")
  },
  temperature: {
    component: () => import("./Temperature.vue")
  },
  tile: {
    component: () => import("./Tile.vue")
  },
  toque: {
    component: () => import("./Toque.vue")
  },
  utilisation: {
    component: () => import("./Utilisation.vue")
  },
  week: {
    component: () => import("./Week.vue")
  },
}

interface IconsDictionary {
  [key: string]: {
    component: any
  }
}