$(function(){
  $('#editor ul').sortable({
    connectWith: '#drawer ul'
  });

  $('#drawer ul').sortable({
    connectWith: '#editor ul'
  });
});
