export const Flags: FlagsDictionary = {
  alertsWidget: {
    component: () => import("./France.vue")
  },
  bakery: {
    component: () => import("./Germany.vue")
  },
  caterer: {
    component: () => import("./GreatBritain.vue")
  },
  cog: {
    component: () => import("./Italy.vue")
  },
  device: {
    component: () => import("./Portugal.vue")
  },
  devices: {
    component: () => import("./Spain.vue")
  },
  devicesWidget: {
    component: () => import("./UnitedStates.vue")
  }
}

interface FlagsDictionary {
  [key: string]: {
    component: any
  }
}