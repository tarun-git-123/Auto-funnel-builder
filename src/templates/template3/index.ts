// lib/templates/template1/index.ts

import layout from './layout';
import home from './home';
import about from './about';
import pricing from './pricing';
import checkout from './checkout';
import thankYou from './thank-you';
import index from './index';

const template1: any = {
  layout,
  home,
  about,
  pricing,
  checkout,
  thankYou,
  index, // 🟢 This is your full preview
};

export default template1;
