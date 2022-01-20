import Vue from 'vue'
import Vuetify from 'vuetify'
import vuetify from '../src/plugins/vuetify' // <== important
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import { Shards } from "../src/index.ts"
import "./storybook.css"
import { MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';

// configure Vue to use Vuetify
Vue.use(Vuetify)
Vue.use(Shards)


const customViewports = {
  _160px: {
    name: '160px',
    styles: {
      width: '160px',
      height: '568px',
    },
  },
  IphoneSE: {
    name: 'S | Iphone SE',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  IphoneSELandscape: {
    name: 'S | Iphone SE, paysage',
    styles: {
      width: '568px',
      height: '320px',
    },
  },
  IpadMini: {
    name: 'M | Ipad mini',
    styles: {
      width: '744px',
      height: '1133px',
    },
  },
  IpadMiniLandscape: {
    name: 'L | Ipad mini, paysage',
    styles: {
      width: '1133px',
      height: '744px',
    },
  },
  MacBookPeo: {
    name: 'L | MacBook Pro 14"',
    styles: {
      width: '1512px',
      height: '982px',
    },
  },
  Desktop1440: {
    name: 'L | Desktop 1440',
    styles: {
      width: '1440px',
      height: '1024px',
    },
  },
  Desktop1920: {
    name: 'L | Desktop 1920',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  _2560px: {
    name: '2560px',
    styles: {
      width: '2560px',
      height: '1080px',
    },
  },
};

// this was the only thing here by default
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      ...customViewports,
      ...MINIMAL_VIEWPORTS,
    }
  },
  paddings: {
    values: [
      { name: "S & M | 12px", value: '12px' },
      { name: "L | 24px", value: '24px' },
    ],
    default: "S & M | 12px",
  },
}


// THIS is my decorator
export const decorators = [
  (story, context) => {
    // wrap the passed component within the passed context
    const wrapped = story(context)
    // extend Vue to use Vuetify around the wrapped component
    return Vue.extend({
      vuetify,
      components: { wrapped },
      props: {
        dark: {
          type: Boolean,
          default: context.args.dark,
        },
      },
      watch: {
        dark: {
          immediate: true,
          handler(val) {
            this.$vuetify.theme.dark = val
          }
        },
      },
      template: `
        <d-app class="storybook">
          <v-main>
            <wrapped />
          </v-main>
        </d-app>
      `
    })
  },
]