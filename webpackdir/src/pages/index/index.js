function importAll(resolve) {
    resolve.keys().forEach(resolve);
}
importAll(require.context('../../../src/block', true,/\.js$|\.scss$/));
importAll(require.context('../../../src/pages', true,/\.js$|\.scss$/));

import Inputmask from 'inputmask';

export default Inputmask;

Inputmask({mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ'}).mask(
    '.input--masked'
  );