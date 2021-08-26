import Inputmask from 'inputmask';

export default Inputmask;

Inputmask({mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ'}).mask(
    '.masked-input'
  );