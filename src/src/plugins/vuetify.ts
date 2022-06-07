import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.css';

import { Colors } from '@/colors';
import { Icons } from '@/icons';


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: Colors,
    },
  },
  icons: {
    values: Icons
  },
});
