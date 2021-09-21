window.$ = window.jQuery = require( "jquery" );

$(document).ready(() => {
  $('.iqdropdown').iqDropdown({});
});

(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: 'items',
    Guest: ['гость', 'гостя', 'гостей'],
    Bedroom: ['спальня', 'спальни', 'спален'],
    Bed: ['кровать', 'кровати', 'кроватей'],    
    textPlural: 'items',
    type: 1,
    buttons: true,
    isExpanded: false,
    controls: {
      position: 'right',
      displayCls: 'iqdropdown-content',
      controlsCls: 'iqdropdown-item-controls',
      counterCls: 'counter',
    },
    items: {},
    onChange: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true,
    setSelectionText (itemCount, totalItems, type) {          
      if(type===2){
        let numberBedroom = itemCount.item1;
        let textBedroom = declOfNum(numberBedroom, defaults.Bedroom); 
        let numberBed = itemCount.item2;
        let textBed = declOfNum(numberBed, defaults.Bed);
        if(totalItems===0){
          numberBedroom = 0;
          numberBed = 0;
        };        
        return `${numberBedroom} ${textBedroom}, ${numberBed} ${textBed}...`;
      } else {
        // const usePlural = totalItems !== 1 && this.textPlural.length > 0;
        // const text = usePlural ? this.textPlural : this.selectionText;
        //return `${totalItems} ${text}`;
        const textGuest = declOfNum(totalItems, defaults.Guest);  
        if(totalItems===0){
          return "Сколько гостей";
        } else {
          return `${totalItems} ${textGuest}`; 
        }  
      }
    },
  };

  function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
  };

  $.fn.visible = function() {
    return this.css('visibility', 'visible');
  };

  $.fn.invisible = function() {
    return this.css('visibility', 'hidden');
  };

  $.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
  };

  $.fn.iqDropdown = function (options) {
    this.each(function () {
      const $this = $(this);
      const $selection = $this.find('p.iqdropdown-selection').last();
      const $menu = $this.find('div.iqdropdown-menu');
      const $items = $menu.find('div.iqdropdown-menu-option');
      const $control = $menu.find('div.iqdropdown-menu-control');
      const dataAttrOptions = {
        selectionText: $selection.data('selection-text'),
        textPlural: $selection.data('text-plural'),
      };            
      const type = $selection.data('type');
      defaults.isExpanded = $selection.data('expanded'); 
      defaults.buttons = $selection.data('buttons');        
      const settings = $.extend(true, {}, defaults, dataAttrOptions, options);
      const itemCount = {};
      let itemClass ="button-decrement__dimly"; 
      let totalItems = 0;

      function updateDisplay () {
        $selection.html(settings.setSelectionText(itemCount, totalItems,type));
      }

      function setItemSettings (id, $item) {
        const minCount = Number($item.data('mincount'));
        const maxCount = Number($item.data('maxcount'));

        settings.items[id] = {
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
        };
      }

      function addControls (id, $item, lastItem) {  
        const $controls = $('<div />').addClass(settings.controls.controlsCls);
        const $decrementButton = $(`
          <button class="button-decrement button-decrement__dimly">
            
          </button>
        `);        
        const $incrementButton = $(`
          <button class="button-increment">
            
          </button>
        `);
        const $applyButton = $(`
          <div  class="button">
            <button>
              ПРИМЕНИТЬ
            </button>
          </div>
          `);
        const $clearButton = $(`
        <div class="button">
          <button class="clearButton">
            ОЧИСТИТЬ
          </button>
        </div>
        `);
        $clearButton.invisible();

        const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);

        $item.children('div').addClass(settings.controls.displayCls);
        $controls.append($decrementButton, $counter, $incrementButton);
        if(lastItem.value===true&&defaults.buttons){          
          $control.append($clearButton, $applyButton);          
        } else {
          $control.toggleClass('iqdropdown-menu-control--close');
        }
        
        if (settings.controls.position === 'right') {
          $item.append($controls);
        } else {
          $item.prepend($controls);
        }

        $decrementButton.click((event) => {
          const { items, minItems, beforeDecrement, onChange } = settings;
          const allowClick = beforeDecrement(id, itemCount);

          if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
            itemCount[id] -= 1;
            totalItems -= 1;
            if (totalItems==0) {
              $control.find('button.clearButton').invisible();
            } 
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }
          if (itemCount[id]==0) {
            $decrementButton.addClass(itemClass);
          } else {
            $decrementButton.removeClass(itemClass);
          }
          event.preventDefault();
        });

        $incrementButton.click((event) => {
          const { items, maxItems, beforeIncrement, onChange } = settings;
          const allowClick = beforeIncrement(id, itemCount);

          if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
            itemCount[id] += 1;
            totalItems += 1;
            $counter.html(itemCount[id]);
            $control.find('button.clearButton').visible();
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }
          if (itemCount[id]==0) {
            $decrementButton.addClass(itemClass);
          } else {
            $decrementButton.removeClass(itemClass);
          }
          event.preventDefault();
        });               

        $clearButton.click((event) => {          
          totalItems = 0;
          $items.each(function () {
            const $item = $(this);
            const id = $item.data('id');            
            const $span = $items.find('span.counter');                  
            itemCount[id] = 0;
            $span.html(itemCount[id]); 
            const $decr = $item.find('button.button-decrement'); 
            $decr.addClass(itemClass);
            $control.find('button.clearButton').invisible();              
            updateDisplay();
          });
                       
          
          updateDisplay();
          event.preventDefault();
        });

        $applyButton.click((event) => {
          //updateDisplay();
          event.preventDefault();          
          $this.toggleClass('menu-open');
          //action Input
        });

        $item.click(event => event.stopPropagation());
        $control.click(event => event.stopPropagation());

        return $item;
      }
      
      if (defaults.isExpanded) {
        $this.toggleClass('menu-open');
      } else {
        $this.click(() => {
          $this.toggleClass('menu-open');
        }); 
      }

      $items.each(function () {
        const $item = $(this);
        const id = $item.data('id');
        const defaultCount = Number($item.data('defaultcount') || '0');
        var lastItem = {value: false};
        itemCount[id] = defaultCount;
        totalItems += defaultCount;

        if($item[0]===$items.last()[0]){
          lastItem.value = true;                   
        }

        setItemSettings(id, $item);
        addControls(id, $item, lastItem);
        
      });

      updateDisplay();
    });

    return this;
  };
}(jQuery));
