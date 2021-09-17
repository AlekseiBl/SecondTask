var slider = document.getElementById('slider');
import * as noUiSlider from 'nouislider';
import wNumb from 'wNumb';
import 'nouislider/dist/nouislider.css';
$(document).ready(() => {
  if (slider) {
    noUiSlider.create(slider, {
      start: [5000, 10000],
      step:100,
      connect: true,
      range: {
        'min': 500,
        'max': 20000
      },
      format: wNumb({
        decimals: 0,
        thousand: ' ',
      })
    });
    
    var nodes = [
      document.getElementById('lower-value'), // 0
      document.getElementById('upper-value')  // 1
    ];
    
    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    slider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
      nodes[handle].innerHTML = values[handle];
    }); 
  } 
});

