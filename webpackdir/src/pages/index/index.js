function importAll(resolve) {
    resolve.keys().forEach(resolve);
}
importAll(require.context('../../../src/', true,/\.js$|\.scss$/));

import Inputmask from 'inputmask';

export default Inputmask;

Inputmask({mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ'}).mask(
    '.input--masked'
  );