$(function(){
  var VALID_PROPS = ['pos'],
    PREFIX = "option--",
    $body = $('body');

  var removeWordsByPrefix = function(sentence, prefix) {
    if (typeof sentence === "string" || typeof prefix === "string") {
      return sentence.split(' ').filter(function(className) {
        return (className.indexOf(prefix) < 0);
      }).join(' ');
    }
  };

  var start = function (event, ui) {
    $body.addClass('state-dragging');
  }, stop =  function (event, ui) {
    $body.removeClass('state-dragging');
  };


  $('#editor ul').sortable({
    connectWith: '#drawer ul',
    start: start,
    stop: stop,
    forcePlaceholderSize: true,
    placeholder: 'ui-placeholder'
  });

  $('#drawer ul').sortable({
    connectWith: '#editor ul',
    start: start,
    stop: stop,
    forcePlaceholderSize: true,
    placeholder: 'ui-placeholder'
  });

  $(document).on('click', '.toolbox__dropdown a', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var $this = $(this),
      $siblings = $(this).siblings(),
      $el = $this.closest('li'),
      option = $this.data('option');

    // Set checked icon
    $siblings.find('.state-icon').removeClass('fa-check-circle').addClass('fa-circle-o');
    $this.find('.state-icon').removeClass('fa-circle-o').addClass('fa-check-circle');

    VALID_PROPS.forEach(function (prop) {
      if (option.indexOf(prop) == 0) {
        var newClasses = removeWordsByPrefix($el.prop('class'), PREFIX + prop);
        $el.prop('class', newClasses);
        $el.addClass(PREFIX + option);
      }
    });
  });

  $(document).on('click', '#save-button', function (event) {
    window.alert("Saving and previewing would happen now!");
  });
});
