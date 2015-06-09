$(document).ready(function(){

  function init(){
    var params = getUrlVars();
    if (params.length > 0 && params.ai && !isNaN(params.ai)){
      initDetails();
    }
    else{
      $('h3').html('Search Accounts');
      initQuery();
    }
  }

  function initDetails(){
    $('h3').before('<a class="btn btn-default" id="return-home" href="/">Return to Search Accounts</a>');
    $('h3').html('Account Details');
    $('#dynamic-content').html("");
    getAccountDetails();
  }

  function getRandomNumber(max, min){
    if (typeof(min) == "undefined" || isNaN(min)){
      min = 0;
    }
    if (isNaN(max)){
      max = Math.floor(Math.random() * 10);
    }
    return randomnumber = min + Math.floor(Math.random() * max)
  }

  function getFakePhoneNumber(){
    var phone = '(';
    for (var i = 0; i < 3; i++){
      phone += getRandomNumber(10);
    }
    phone += ') ';
    for (var i = 0; i < 3; i++){
      phone += getRandomNumber(10);
    }
    phone += '-';
    for (var i = 0; i < 4; i++){
      phone += getRandomNumber(10);
    }
    return phone;
  }

  function getAccountDetails(){
    var params = getUrlVars();
    var query_string = "";
    if (params && params.ai){
      query_string += "?";
      query_string += "ai=" + params.ai;
    }
    $.ajax({
      url: "/2085772195/contact/_search" + query_string,
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      success: function(data, textStatus, jqXHR){
        console.log(data);
        var html = '';
        if (data.hits.hits.length > 0){
          html += '<div class="row">';
          html += '<div class="col-md-4">';
          html += '&nbsp;';
          html += '</div>';
          html += '<div class="col-md-4">';
          html += '<div id="company-card">';
          html += '<h4>Company: ' + data.hits.hits[0]._source.c_company + '</h4>';
          $('h3').html('Account Details: ' + data.hits.hits[0]._source.c_company);
          html += '<div>';
          html += 'Annual Revenue: $';
          if (data.hits.hits[0]._source.c_company_revenue1 != ""){
            html += data.hits.hits[0]._source.c_company_revenue1;
          }
          else{
            html += accounting.formatNumber(getRandomNumber(100000000, 10000));
          }
          html += '</div>';
          html += '<div>';
          html += 'Company Size: ';
          if (data.hits.hits[0]._source.c_company_size1 != ""){
            html += data.hits.hits[0]._source.c_company_size1;
          }
          else{
            html += accounting.formatNumber(getRandomNumber(50000, 1000));
          }
          html += '</div>';
          html += '</div>';
          html += '</div>';
          html += '<div class="col-md-4">';
          html += '&nbsp;';
          html += '</div>';
          html += '</div>';
          html += '<h4>Top Contacts</h4>';
          html += '<table class="table table-striped table-hover">';
          html += '<tr>';
          html += '<th>';
          html += '<div class="row">';
          html += '<div class="col-md-2">';
          html += 'Contact Name';
          html += '</div>';
          html += '<div class="col-md-2">';
          html += 'Recent Events';
          html += '</div>';
          html += '<div class="col-md-2">';
          html += 'Lead Score';
          html += '</div>';
          html += '<div class="col-md-2">';
          html += 'Office Number';
          html += '</div>';
          html += '<div class="col-md-2">';
          html += 'Mobile Number';
          html += '</div>';
          html += '<div class="col-md-2">';
          html += 'Email Address';
          html += '</div>';
          html += '</div>';
          html += '</th>';
          html += '</tr>';
          for (var i = 0; i < data.hits.hits.length; i++){
            html += '<tr>';
            html += '<td>';
            html += '<div class="row">';
            html += '<div class="col-md-2">';
            html += data.hits.hits[i]._source.c_firstname;
            if (data.hits.hits[i]._source.c_firstname != "" && data.hits.hits[i]._source.c_lastname != ""){
              html += ' ';
            }
            if (data.hits.hits[i]._source.c_lastname != ""){
              html += data.hits.hits[i]._source.c_lastname;
            }
            html += '</div>';
            html += '<div class="col-md-2">';
            send_numbers = getRandomNumber(30);
            html += 'Send Email: ' + send_numbers + '<br />';
            open_numbers = getRandomNumber(send_numbers);
            html += 'Open Email: ' + open_numbers + '<br />';
            html += 'Click Link: ' + getRandomNumber(open_numbers);
            html += '</div>';
            html += '<div class="col-md-2">';
            if (data.hits.hits[i]._source.c_lead_score == ""){
              html += getRandomNumber(80);
            }
            else{
              html += data.hits.hits[i]._source.c_lead_score;
            }
            html += '</div>';
            html += '<div class="col-md-2">';
            html += getFakePhoneNumber();
            //html += data.hits.hits[i]._source.c_busphone;
            html += '</div>';
            html += '<div class="col-md-2">';
            html += getFakePhoneNumber();
            // html += data.hits.hits[i]._source.c_mobilephone;
            html += '</div>';
            html += '<div class="col-md-2">';
            html += '<a class="email-link" href="mailto:'+data.hits.hits[i]._source.c_emailaddress+'">';
            html += data.hits.hits[i]._source.c_emailaddress;
            html += '</a>';
            html += '</div>';
            html += '</div>';
            html += '</td>';
            html += '</tr>';
          }
          html += '</table>';
        }
        else{
          html += 'Sorry, this account has no contacts.';
        }
        $('#dynamic-content').html(html);
      },
      error: function(){
        console.log('error');
      }
    });
  }

  function initQuery(){
    $('#account-query-form').on('submit', function(){
      getAccounts();
      return false;
    });
    $('#account-query').on('keyup', function(){
      getAccounts();
    });
  }

  function getAccounts(){
    if ($('#account-query').val().length > 2){
      var query_string = "";
      query_string += "?";
      query_string += "aq=" + $('#account-query').val();
      $.ajax({
        url: "/2085772195/contact/_search" + query_string,
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function(data, textStatus, jqXHR){
          var html = '';
          if (data.hits.hits.length > 0){
            html += '<table class="table table-striped table-hover">';
            html += '<tr>';
            html += '<th>';
            html += '<div class="row">';
            html += '<div class="col-md-6">';
            html += 'Account ID';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += 'Account Name';
            html += '</div>';
            html += '</div>';
            html += '</th>';
            html += '</tr>';
            for (var i = 0; i < data.hits.hits.length; i++){
              html += '<tr class="account-id" id="account-'+data.hits.hits[i]._id+'">';
              html += '<td>';
              html += '<div class="row">';
              html += '<a href="/?ai='+data.hits.hits[i]._id+'">';
              html += '<div class="col-md-6">';
              html += data.hits.hits[i]._id;
              html += '</div>';
              html += '<div class="col-md-6">';
              html += data.hits.hits[i]._source.c_company;
              html += '</div>';
              html += '</a>';
              html += '</div>';
              html += '</td>';
              html += '</tr>';
            }
            html += '</table>';
          }
          else{
            html += 'Sorry, no accounts match your search criteria. Please update your search criteria.';
          }
          $('#results-table').html(html);
        },
        error: function(){
          console.log('error');
        }
      });
    }
  }

  // Read a page's GET URL variables and return them as an associative array.
  function getUrlVars(){
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++){
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
  }
  init();
});