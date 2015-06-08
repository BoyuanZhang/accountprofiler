$(document).ready(function(){
  // $('#account-query').autocomplete({
  //   source: "",
  //   minLength: 2,
  //   delay: 500,
  //   select: function(event, ui){
  //     console.log(ui.item);
  //     console.log(this.value);
  //   }
  // });
  $('#account-query').on('keyup', function(){
    console.log('checking');
    if ($('#account-query').val().length > 2){
      console.log('correct');
      $.ajax({
        url: "/2085772195/contact/_search",
        type: "POST",
        contentType: "application/json", 
        dataType: "json",
        success: function(){
          console.log('success');
        },
        error: function(){
          console.log('error');
        }
      });
    }
  });
});