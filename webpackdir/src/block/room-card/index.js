import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';

var sliders = document.querySelectorAll('div.glide');

function createSlider(item) {
  new Glide(item, {
  type: 'carousel',
  classes: {activeNav: 'slider__bullet--active'},
  }).mount({ Controls, Breakpoints }
)};

$(document).ready(() => {
  sliders.forEach((item) => createSlider(item))      
});