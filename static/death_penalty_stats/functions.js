

$(document).ready(function(){
				console.log("JQuery ready!");

				$('#accordion').on('show.bs.collapse', function () {
    				$('#accordion .in').collapse('hide');
				});

				var id = 1;


				$('#button-ld-ini').click(function(){

					var apikey = $("#apikey").val();

					var request = $.ajax({

						  url: "http://sos-2016-12.herokuapp.com/api/v1/death_penalty_stats/loadInitialData?apikey="+apikey,
						  type: "GET",
						  contentType: "application/json",
  
					});

					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					  $("#status").html(jqXHR.status);
					  $("#log").html("You loaded the initial data successfully.");

					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					 if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status == 401) {
					 		$("#log").html("The apikey you entered is not valid");
					 		alert('Apikey not valid');
					 	}else{
					 		$("#log").html("error");
					 	}
					}	

					});
				});



				$('#button-get').click(function(){

					var apikey = $("#apikey").val();

					var items = $("#items").val();

					var page = $("#page").val();

					if (!items)
						items = 9999;
					if (!page)
						page = 1;

					var offset = items*(page-1);

					var request = $.ajax({

						  url: "http://sos-2016-12.herokuapp.com/api/v1/death_penalty_stats?apikey="+apikey+"&limit="+items+"&offset="+offset,
						  type: "GET",
						  contentType: "application/json",
  
					});

					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					var trHTML = '';

                	$("table").find("tr:gt(0)").remove();

                	id = 1;

       				$.each(data, function (i) {
            
            		trHTML += '<tr id="'+id+'"><td>' + id +'</td><td>'+ data[i].country + '</td><td>' + data[i].abolition_year + '</td><td>' + data[i].for_all_crimes + '</td><td>'
            			+ data[i].murder_rate_per_100k_people + '</td></tr>';
       				 id++;
       				 });
        
       				 $('#table').append(trHTML);
					 $("#status").html(jqXHR.status);
					 $("#log").html("done");

					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					 if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status == 401) {
					 		$("#log").html("The apikey you entered is not valid");
					 		alert('Apikey not valid');
					 	}else{
					 		$("#log").html("error");
					 	}
					}	

					});
				});



				$('#button-get-srch').click(function(){

					var apikey = $("#apikey").val();

					var country = $("#country-srch").val();

					if (!items)
						items = 9999;
					if (!page)
						page = 1;

					var offset = items*(page-1);

					var from = $("#from-srch").val();

					var to = $("#to-srch").val();

					if (!country)
						country = "";
					if (!from)
						from=0;
					if (!to)
						to=9999;


					var request = $.ajax({

						  url: "http://sos-2016-12.herokuapp.com/api/v1/death_penalty_stats/"+country+"?apikey="+apikey+"&from="+from+"&to="+to+"&limit="+items+"&offset="+offset,
						  type: "GET",
						  contentType: "application/json",
  
					});

					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					var trHTML = '';

                	$("#table").find("tr:gt(0)").remove();

                	id = 1;

                	if (country != "") {
            
            			trHTML += '<tr id="'+id+'"><td>' + id +'</td><td>'+ data.country + '</td><td>' + data.abolition_year + '</td><td>' + data.for_all_crimes + '</td><td>'
            				+ data.murder_rate_per_100k_people + '</td></tr>';
       				 	id++;
     				} else {
     					$.each(data, function (i) {
            
            				trHTML += '<tr id="'+id+'"><td>' + id +'</td><td>'+ data[i].country + '</td><td>' + data[i].abolition_year + '</td><td>' + data[i].for_all_crimes + '</td><td>'
            				+ data[i].murder_rate_per_100k_people + '</td></tr>';
       					 id++;
       				 	});
     				}
        
       				 $('#table').append(trHTML);
					 $("#status").html(jqXHR.status);
					 $("#log").html("done");

					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					 if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status == 401) {
					 		$("#log").html("The apikey you entered is not valid");
					 		alert('Apikey not valid');
					 	}else{
					 		$("#log").html("error");
					 	}
					}	

					});
				});



				$('#button-pst').click(function(){

					var apikey = $("#apikey").val();
					var country = $("#country-add").val();
					var year = $("#year-add").val();
		  			var for_all_crimes = $("#for-all-add").val();
		  			var murder_rate_per_100k_people = $("#rate-add").val();

					var request = $.ajax({

						  url: "http://sos-2016-12.herokuapp.com/api/v1/death_penalty_stats?apikey="+apikey,
						  type: "POST",
						  data: '{"country":"'+country+'","abolition_year":'+year+',"for_all_crimes":"'+for_all_crimes+'","murder_rate_per_100k_people":'+murder_rate_per_100k_people+'}',
						  contentType: "application/json"
  
					});


					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					 
					  	var trHTML = '';


       					$.each(data, function (i) {
            
            			trHTML += '<tr id="'+id+'"><td>'+ id +'</td><td>'+ country + '</td><td>' + abolition_year + '</td><td>' + for_all_crimes + '</td><td>'
            			+ murder_rate_per_100k_people + '</td></tr>';
       					 id++;
       					 });
        
       					$('#table').append(trHTML);
					 	$("#status").html(jqXHR.status);
					 	$("#log").html("You added a new resource successfully.");

					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					 if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status == 401) {
					 		$("#log").html("The apikey you entered is not valid");
					 		alert('Apikey not valid');
					 	}else if (jqXHR.status == 409){
					 		$("#log").html("The resource you entered already exists");
					 		alert('The resource you entered already exists.');
					 	}else{
					 		$("#log").html("error");					 		
					 	}
					}	

					});
				});





				$('#button-upd').click(function(){

					var apikey = $("#apikey").val();

					var country = $("#country-add").val();
					var year = $("#year-add").val();
		  			var for_all_crimes = $("#for-all-add").val();
		  			var murder_rate_per_100k_people = $("#rate-add").val();

					

					var request = $.ajax({

						  url: "http://sos-2016-12.herokuapp.com/api/v1/death_penalty_stats/"+country+"?apikey="+apikey,
						  type: "PUT",
						  data: '{"country":"'+country+'","abolition_year":'+year+',"for_all_crimes":"'+for_all_crimes+'","murder_rate_per_100k_people":'+murder_rate_per_100k_people+'}',
						  contentType: "application/json"
  
					});


					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					  
					 $("#status").html(jqXHR.status);
					 $("#log").html("done");

					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					 if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status == 401) {
					 		$("#log").html("The apikey you entered is not valid");
					 		alert('Apikey not valid');
					 	}else{
					 		$("#log").html("error");
					 	}
					}	

					});
				});




				$('#button-dlt').click(function(){

					var apikey = $("#apikey").val();

					var country = $("#country-srch").val();

					var request = $.ajax({

						  url: "http://sos-2016-12.herokuapp.com/api/v1/death_penalty_stats/"+country+"?apikey="+apikey,
						  type: "DELETE",
						  contentType: "application/json",
  
					});


					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					  
					 $("#status").html(jqXHR.status);
					 $("#log").html("done");

					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					 if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status == 401) {
					 		$("#log").html("The apikey you entered is not valid");
					 		alert('Apikey not valid');
					 	}else{
					 		$("#log").html("error");
					 	}
					}	

					});
				});


				$('#button-dlt-all').click(function(){

					var apikey = $("#apikey").val();

					var request = $.ajax({

						  url: "http://sos-2016-12.herokuapp.com/api/v1/death_penalty_stats?apikey="+apikey,
						  type: "DELETE",
						  contentType: "application/json",
  
					});


					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					 
					 $("table").find("tr:gt(0)").remove();

					 $("#status").html(jqXHR.status);
					 $("#log").html("You deleted all resources.");

					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status == 401) {
					 		$("#log").html("The apikey you entered is not valid");
					 		alert('Apikey not valid');
					 	}else{
					 		$("#log").html("error");
					 	}
					}

					});
				});

 			});