var slider = document.getElementById('slider');
import * as noUiSlider from 'nouislider';
import wNumb from 'wNumb';
import 'nouislider/dist/nouislider.css';
$(document).ready(() => {
  if (slider) {
    noUiSlider.create(slider, {
      start: [5000, 10000],
      step: 100,
      connect: true,
      range: {
        'min': 500,
        'max': 20000
      },
      format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '₽',
      }),
      cssPrefix: 'slider-',
      cssClasses: {
        target: 'target',
        base: 'base',
        origin: 'origin',
        handle: `handle`,
        handleLower: 'handle-lower',
        handleUpper: 'handle-upper',
        touchArea: 'touch-area',
        horizontal: 'horizontal',
        vertical: 'vertical',
        background: 'background',
        connect: `connect`,
        connects: 'connects',
        ltr: 'ltr',
        rtl: 'rtl',
        textDirectionLtr: 'txt-dir-ltr',
        textDirectionRtl: 'txt-dir-rtl',
        draggable: 'draggable',
        drag: 'state-drag',
        tap: 'state-tap',
        active: 'active',
        tooltip: 'tooltip',
        pips: 'pips',
        pipsHorizontal: 'pips-horizontal',
        pipsVertical: 'pips-vertical',
        marker: 'marker',
        markerHorizontal: 'marker-horizontal',
        markerVertical: 'marker-vertical',
        markerNormal: 'marker-normal',
        markerLarge: 'marker-large',
        markerSub: 'marker-sub',
        value: 'value',
        valueHorizontal: 'value-horizontal',
        valueVertical: 'value-vertical',
        valueNormal: 'value-normal',
        valueLarge: 'value-large',
        valueSub: 'value-sub',
      },
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

