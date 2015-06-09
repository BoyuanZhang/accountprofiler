$(document).ready(function(){

  // helps send only one XHR request at a time
  var send_in_progress = false;
  // helps delay the XHR request if user is still typing
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();
  function init(){
    var params = getUrlVars();
    if (params.length > 0 && params.pg && params.pg == "account-details"){
      initDetails();
    }
    else{
      $('h3').html('Search Accounts');
      initQuery();
    }
  }

  function initDetails(){
    $('h3').before('<a class="btn btn-default" id="return-home" href="/">Return to Search Accounts</a>');
    var title_string = 'Account Details:';
    $('h3').html(title_string);
    $('title').html(title_string);
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

  function getRevenueNumber(max){
    var revenue = 0;
    if (typeof(max) == "undefined" || isNaN(max)){
      max = 100;
    }
    revenue = getRandomNumber(max,1);
    var choose = getRandomNumber(3);
    if (choose == 0){
      choose = 1;
    }
    var revenue_marker = 'M';
    switch(choose){
      case 1:
        revenue_marker = 'M';
        break;
      case 2:
        revenue_marker = 'B';
        break;
    }
    return revenue + revenue_marker;
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
    if (!send_in_progress){
      var data_sent = {};
      if (params && params.aq){
        data_sent.aq = decodeURIComponent(params.aq).toLowerCase();
        data_sent.em = true;
      }
      $.ajax({
        url: "/2085772195/account/_search",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data_sent),
        dataType: "json",
        beforeSend: function(jqXHR){
          send_in_progress = true;
        },
        complete: function(jqXHR){
          send_in_progress = false;
        },
        success: function(data, textStatus, jqXHR){
          var html = '';
          if (data && data.hits && data.hits.hits && data.hits.hits.length > 0){
            html += '<div class="row">';
            html += '<div class="col-md-4">';
            html += '&nbsp;';
            html += '</div>';
            html += '<div class="col-md-4">';
            html += '<div id="company-card">';
            html += '<div>'; // parent holder
            html += '<img src="../images/ci-business.png" class="left" id="card-image" alt="company card" />';
            html += '<div class="left" id="company-name">';
            html += '<h4 class="text-capitalize">' + data.hits.hits[0]._source.c_company + '</h4>';
            var title_string = 'Account Details: ' + data.hits.hits[0]._source.c_company;
            $('h3').html('<span class="text-capitalize">' + title_string + '</span>');
            $('title').html(title_string);
            html += 'Los Angeles, California';
            html += '</div>';
            html += '<div class="clr"></div>';
            html += '</div>'; // end parent holder
            html += '<div>';
            html += 'Annual Revenue: $';
            if (data.hits.hits[0]._source.c_company_revenue1 != ""){
              html += data.hits.hits[0]._source.c_company_revenue1;
            }
            else{
              html += getRevenueNumber();
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
            html += '<div>';
            html += 'Total Contacts: ';
            html += getRandomNumber(30,11);
            html += '</div>';
            html += '<div>';
            html += 'Industry: ';
            html += 'Tech';
            html += '</div>';
            html += '<div>';
            html += 'Specialties: ';
            html += 'Artificial Intelligence';
            html += '</div>';
            html += '<div>';
            html += 'Website: ';
            html += '<a href="http://www.oracle.com/" target="_blank">http://www.oracle.com/</a>';
            html += '</div>';
            html += '</div>'; // end company-card
            html += '</div>'; // end col-md-4
            html += '<div class="col-md-4">';
            html += '&nbsp;';
            html += '</div>';
            html += '</div>'; // end row
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
              html += '<div class="col-md-2 text-capitalize">';
              html += data.hits.hits[i]._source.c_firstname;
              if (data.hits.hits[i]._source.c_firstname != "" && data.hits.hits[i]._source.c_lastname != ""){
                html += ' ';
              }
              if (data.hits.hits[i]._source.c_lastname != ""){
                html += data.hits.hits[i]._source.c_lastname;
              }
              html += '</div>';
              html += '<div class="col-md-2">';
              var send_numbers = getRandomNumber(30);
              html += 'Send Email: ' + send_numbers + '<br />';
              var open_numbers = getRandomNumber(send_numbers);
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
  }

  function initQuery(){
    getAccounts();
    $('#account-query-form').on('submit', function(){
      getSearchAccounts();
      return false;
    });
    $('#account-query').on('keyup', function(){
      delay(function(){
        getSearchAccounts();
      }, 500);
    });
  }

  function getAccounts(){
    if (!send_in_progress){
      $.ajax({
        url: "/2085772195/_search",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(jqXHR){
          send_in_progress = true;
          $('#loading').show();
          $('#results-table').hide();
        },
        complete: function(jqXHR){
          send_in_progress = false;
          $('#loading').hide();
          $('#results-table').show();
        },
        success: function(data, textStatus, jqXHR){
          var tables = genAccountTables(data);
          $('#results-table').html(tables);
        }
      });
    }
  }

  function genAccountTables(data){
      var html = '';
      console.log(data);
      if (data && data.hits && data.hits.hits && data.hits.hits.length > 0){
        html += '<table class="table table-striped table-hover">';
        html += '<tr>';
        html += '<th>';
        html += '<div class="row">';
        html += '<div class="col-md-2">';
        html += 'Account ID';
        html += '</div>';
        html += '<div class="col-md-2">';
        html += 'Account Name';
        html += '</div>';
        html += '<div class="col-md-2 text-center">';
        html += 'Annual Revenue';
        html += '</div>';
        html += '<div class="col-md-2 text-center">';
        html += 'Company Size';
        html += '</div>';
        html += '<div class="col-md-2 text-center">';
        html += 'Number of Contacts';
        html += '</div>';
        html += '<div class="col-md-2 text-center">';
        html += 'Total Events';
        html += '</div>';
        html += '</div>';
        html += '</th>';
        html += '</tr>';
        for (var i = 0; i < data.hits.hits.length; i++){
          html += '<tr class="account-id" id="account-'+data.hits.hits[i]._source.c_company+'">';
          html += '<td>';
          html += '<div class="row">';
          html += '<a href="/?pg=account-details&aq='+encodeURIComponent(data.hits.hits[i]._source.c_company)+'">';
          html += '<div class="col-md-2">';
          html += data.hits.hits[i]._id;
          html += '</div>';
          html += '<div class="col-md-2">';
          html += data.hits.hits[i]._source.c_company;
          html += '</div>';
          html += '<div class="col-md-2 text-center">$';
          if (data.hits.hits[0]._source.c_company_revenue1 != ""){
            html += data.hits.hits[0]._source.c_company_revenue1;
          }
          else{
            html += getRevenueNumber();
          }
          html += '</div>';
          html += '<div class="col-md-2 text-center">';
          if (data.hits.hits[0]._source.c_company_size1 != ""){
            html += data.hits.hits[0]._source.c_company_size1;
          }
          else{
            html += accounting.formatNumber(getRandomNumber(50000, 1000));
          }
          html += '</div>';
          html += '<div class="col-md-2 text-center">';
          html += getRandomNumber(10,3);
          html += '</div>';
          html += '<div class="col-md-2 text-center">';
          html += getRandomNumber(100,20);
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
      return html;
    }

  function getSearchAccounts(){
    if ($('#account-query').val().length > 2 || $('#account-query').val().length == 0){
      if (!send_in_progress){
        var data_sent = {
          aq: $('#account-query').val().toLowerCase()
        };
        $.ajax({
          url: "/2085772195/_search",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(data_sent),
          dataType: "json",
          beforeSend: function(jqXHR){
            send_in_progress = true;
            $('#loading').show();
            $('#results-table').hide();
          },
          complete: function(jqXHR){
            send_in_progress = false;
            $('#loading').hide();
            $('#results-table').show();
          },
          success: function(data, textStatus, jqXHR){
            var tables = genAccountTables(data);
            $('#results-table').html(tables);
          },
          error: function(){
            console.log('error');
          }
        });
      }
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