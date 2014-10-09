$(function(){
  var VALID_PROPS = ['pos'],
    PREFIX = "option--";

  var removeWordsByPrefix = function(sentence, prefix) {
    if (typeof sentence === "string" || typeof prefix === "string") {
      return sentence.split(' ').filter(function(className) {
        return (className.indexOf(prefix) < 0);
      }).join(' ');
    }
  };


  $('#editor ul').sortable({
    connectWith: '#drawer ul'
  });

  $('#drawer ul').sortable({
    connectWith: '#editor ul'
  });

  $(document).on('click', '.toolbox__dropdown a', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();

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
});
