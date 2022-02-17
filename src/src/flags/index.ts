export const Flags: FlagsDictionary = {
  france: {
    component: () => import("./France.vue")
  },
  germany: {
    component: () => import("./Germany.vue")
  },
  greatBritain: {
    component: () => import("./GreatBritain.vue")
  },
  italy: {
    component: () => import("./Italy.vue")
  },
  portugal: {
    component: () => import("./Portugal.vue")
  },
  spain: {
    component: () => import("./Spain.vue")
  },
  unitedStates: {
    component: () => import("./UnitedStates.vue")
  }
}

interface FlagsDictionary {
  [key: string]: {
    component: any
  }
}