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
        success: function(data, textStatus, jqXHR){
          console.log('success');
          var html = '';
          html += '<table>';
          html += '<tr>';
          html += '<th>';
          html += 'Account ID';
          html += '</th>';
          html += '<th>';
          html += 'Account Name';
          html += '</th>';
          html += '</tr>';
          for (var i = 0; i < data.length; i++){
            html += '<tr>';
            html += '<td>';
            html += data[i].id;
            html += '</td>';
            html += '<td>';
            html += data[i].name;
            html += '</td>';
            html += '</tr>';            
          }
          html += '</table'>
          $('#results-table').html(html);
        },
        error: function(){
          console.log('error');
        }
      });
    }
  });
});