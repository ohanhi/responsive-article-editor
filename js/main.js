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

  var popup = function (url, width, height) {
    var params = 'height='+height
      +',width='+width
      +',screenX=400'
      +',screenY=200';
    var newWindow = window.open(url, 'popup', params);
    if (window.focus) {
      newWindow.focus();
    }
    return false;
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

  $(document).on('click', '.save-button', function (event) {
    window.alert("Clicking this would "
      +"\n1) Save your changes to the article structure ");
  });

  $(document).on('click', '.preview-button', function (event) {
    popup('http://localhost:8080/app/issue.html#/20141029/kotimaa/5961', 320, 550);
  });

  $(document).on('click', '.edit-button', function (event) {
    window.alert("Clicking this would \n1) Ask \"Save your changes?\" (Save / Discard)"
      +"\n2) Continue to Content editor");
  });
});
