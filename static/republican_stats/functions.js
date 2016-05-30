
$(document).ready(function (){
	
	$('select').material_select();

	console.log("jQuery Ready!");


	$("#loadInitialData").click(function(){

	    var apikey = $("#apikey").val();
	    

	    var request = $.ajax({
	      url:"/api/v1/republican_stats/loadInitialData?apikey="+apikey,
	      type:"GET"
	    
	    });

	    request.done(function (data){
	      console.log("Handling request (OK)");
	      console.log("Data received: ");
	     	loadTable();
	    });

	    request.always(function (jqXHR,status){
		    if(status=="error" && jqXHR.status==401 ){
		        alert('Unauthorized: Apikey not valid');
		    }else if(jqXHR.status==402){
					alert('Sorry, you have to pay to use our API');
			}else if(jqXHR.status==429){
					alert('Sorry, you have to pay again');
			}
	    });
	});

	$("#addButton").click(function(){
		  var apikey = $("#apikey").val();
		  var country = $("#newCountry").val();
		  var year = $("#newYear").val();
		  var gdppc = $("#newGdppc").val();
		  var population = $("#newPopulation").val();
		  


  		if(country && year && gdppc && population){

		  var request = $.ajax({
		    url:"/api/v1/republican_stats?apikey="+apikey,
		    type:"POST",
		    data: '{"country":"'+country+'","year":'+year+',"gdppc":'+gdppc+',"population":'+population+'}',
		    contentType : "application/json"
		  });

		  request.done(function (data){
		    console.log("Handling request (OK)");
		    console.log("Data received: ");
		    alert('Created');
		    
		    loadTable();
		    

		  });

		  request.always(function (jqXHR,status){
		    if(status=="error" && jqXHR.status==401){
		    	alert('Unauthorized: Apikey not valid');
		    	

		  	}else if(status=="error" && jqXHR.status==409){

		    	
		    	alert('Data already exists');

		    }
		    else if(jqXHR.status==402){
					 		alert('Sorry, you have to pay to use our API');
			}else if(jqXHR.status==429){
					alert('Sorry, you have to pay again');
			}
		  });

		}else{
			alert('There are empty fields');
		
		}
	});



	$("#updateButton").click(function(){
	  	var apikey = $("#apikey").val();
		var country = $("#newCountry").val();
		var year = $("#newYear").val();
		var gdppc = $("#newGdppc").val();
		var population = $("#newPopulation").val();
		

	  	if(country && year && gdppc && population){
//"/"+year+

		  var request = $.ajax({
		    url:"/api/v1/republican_stats/"+country+"?apikey="+apikey,
		    type:"PUT",
		    data: '{"country":"'+country+'","year":'+year+',"gdppc":'+gdppc+',"population":'+population+'}',
		    contentType : "application/json"
		  });

		  request.done(function (data){
		    console.log("Handling request (OK)");
		    console.log("Data received: ");
		    alert('Updated');
		  
		    loadTable();
		    

		  });

		  request.always(function (jqXHR,status){
		    if(status=="error" && jqXHR.status==401){

			    alert('Unauthorized: Apikey not valid');

		  	}else if(jqXHR.status==402){
					 		alert('Sorry, you have to pay to use our API');
			}
		  	if(status=="error" && jqXHR.status==405){

			    alert('Method not allowed');

		    }if(status=="error" && jqXHR.status==404){

			    alert('This is somewhat embarrassing, isn’t it? It seems we can’t find what you’re looking for.');

		    }else if(jqXHR.status==429){
					alert('Sorry, you have to pay again');
			}
		  });

		}else{

			alert('Empty fields');


		}

	});

	$('#deleteButton').click(function(){

					var apikey = $("#apikey").val();

					var request = $.ajax({

						  url: "/api/v1/republican_stats?apikey="+apikey,
						  type: "DELETE",
						  contentType: "application/json",
  
					});


					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					 
					 $("table").find("tr:gt(0)").remove();

					 alert("You have deleted all resources.");

					});

				request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if ( jqXHR.status==401) {
					 		alert('Apikey not valid');
					 	}else if(jqXHR.status==402){
					 		alert('Sorry, you have to pay to use our API');
					 	}else if(jqXHR.status==429){
							alert('Sorry, you have to pay again');
						}
					}

				});
	});
	
	$('#delete1Button').click(function(){

					var apikey = $("#apikey").val();
					var countryS=$("#countryS").val();
					//var yearS=$("yearS").val();
					if(countryS){
						var url = "/api/v1/republican_stats/"+countryS;
					}else{
						alert("What do you want delete?");
					}
					
					/*if(yearS && countryS){
						url=url+countryS+"/"+yearS;
					}
					if(countryS && !yearS){ 
						url=url+countryS;
					}*/
					var request = $.ajax({

						  url: url+"?apikey="+apikey,
						  type: "DELETE",
						  contentType: "application/json",
  
					});


					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					 
					 //$("table").find("tr:gt(0)").remove();

					 alert("You have deleted the resource.");
					 //loadTable();

					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status==401) {
					 		alert('Apikey not valid');
					 	}else if(jqXHR.status==402){
					 		alert('Sorry, you have to pay to use our API');
					 	}else if(jqXHR.status==429){
							alert('Sorry, you have to pay again');
						}
					}

					});
				});

	$("#getData").click(function(){
		var apikey = $("#apikey").val();
		var elements= $("#elements").val();
		var pages=$("#pages").val();
		var url="/api/v1/republican_stats/";
		
		url= url+"?apikey="+apikey+"&limit="+elements+"&offset="+elements*(pages-1);
  

		var request = $.ajax({
		    url:url,
		    type:"GET",
		    contentType : "application/json"
		});
		
		request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					var trHTML = '';

                	$("#dataTable tbody").remove();

       				$.each(data, function (i, item) {
            
            		trHTML += '<tr><td>' + data[i].country 
            				+ '</td><td>' + data[i].year 
            				+ '</td><td>' + data[i].gdppc 
            				+ '</td><td>' + data[i].population ;
       				 });
        
       				 $('#dataTable').append(trHTML);
       	});

		request.always(function (jqXHR,status){
		    if(status=="error"){
		      console.log("Status: "+jqXHR.status);
		      if(jqXHR.status==401){
		      	alert("You entered a wrong apikey");
		      }else if(jqXHR.status==402){
					 		alert('Sorry, you have to pay to use our API');
				}else if(jqXHR.status==429){
					alert('Sorry, you have to pay again');
				}

		    }

		});
	});


	$("#searchButton").click(function(){
		
					var apikey = $("#apikey").val();

					var countryS = $("#countryS").val();
					var yearS = $("#yearS").val();
					//var fromS=$("#fromS").val();
					//var to=$("#to").val();
					var elements= $("#elements").val();
					var pages=$("#pages").val();

					var range = $("#range_49");
					var fromS = $(range).data("from");
					var to = $(range).data("to");





					if(!countryS & !yearS & !fromS & !to){
						alert("What are you looking for?");
					}

					if (!elements)
						elements = 9999;
					if (!pages)
						pages = 1;

					var offset = elements*(pages-1);

					//var fromS = $("#fromS").val();

					//var to = $("#to").val();

					
					if (!fromS){
						fromS=0;
					}
					if (!to){
						to=9999;
					}

					if(countryS && !yearS){
						var request = $.ajax({

							  url: "/api/v1/republican_stats/"+countryS+"?apikey="+apikey+"&from="+fromS+"&to="+to+"&limit="+elements+"&offset="+offset,
							  type: "GET",
							  contentType: "application/json",
	  
						});
					}
					if (yearS && !countryS) {
						var request = $.ajax({

							  url: "/api/v1/republican_stats/"+yearS+"?apikey="+apikey+"&from="+fromS+"&to="+to+"&limit="+elements+"&offset="+offset,
							  type: "GET",
							  contentType: "application/json",
	  
						});

					}
					if(!countryS && !yearS){
						var request = $.ajax({

							  url: "/api/v1/republican_stats?apikey="+apikey+"&from="+fromS+"&to="+to+"&limit="+elements+"&offset="+elements*(pages-1),
							  type: "GET",
							  contentType: "application/json",
	  
						});

					}



					request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
						var trHTML = '';

	                	$("#dataTable").find("tr:gt(0)").remove();

	                	
	                	
	                	if (data.country==countryS) {
	            
	            			trHTML += '<tr><td>'+ data.country + '</td><td>' + data.year + '</td><td>' + data.gdppc + '</td><td>'
	            				+ data.population + '</td></tr>';
	           
	       				 	
	     				} else {
	     					$.each(data, function (i) {
	            
	            				trHTML += '<tr><td>'+ data[i].country + '</td><td>' + data[i].year + '</td><td>' + data[i].gdppc + '</td><td>'
	            				+ data[i].population + '</td></tr>';
	            				i++;
	       					 
	       				 	});
	     				}
	        
	       				 $('#dataTable').append(trHTML);


					});

					request.always(function(jqXHR, status) {
					  // Tratamiento en cualquier caso
					 if(status == "error") {
						$("#status").html(jqXHR.status);
					 	console.log(jqXHR.status);
					 	if (jqXHR.status==401 ) {
					 		alert('Apikey not valid');
					 	}else if(jqXHR.status==402){
					 		alert('Sorry, you have to pay to use our API');
					 	}else if(jqXHR.status==404){
					 		alert('This is somewhat embarrassing, isn’t it? It seems we can’t find what you’re looking for.	');

					 	}else if(jqXHR.status==429){
							alert('Sorry, you have to pay again');
					}
					}	

					});
				

		
	});


});

function loadTable(){
		
		var apikey = $("#apikey").val();
		var countryS = $("#countryS").val();
		var year = $("#yearS").val();
		//var fromS= $("#fromS").val();
		//var to = $("#to").val();
		//+"&from="+fromS+"&to="+to
		var elements= $("#elements").val();
		var pages=$("#pages").val();
		var url="/api/v1/republican_stats/";
		//$( ".data" ).remove();

		if(countryS){
		        url= url+countryS;
		        console.log("pais cogido");
		}
		url= url+"?apikey="+apikey+"&limit="+elements+"&offset="+elements*(pages-1);
  

		var request = $.ajax({
		    url:url,
		    type:"GET",
		    contentType : "application/json"
		});
		
		request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					var trHTML = '';

                	$("#dataTable tbody").remove();

       				$.each(data, function (i, item) {
            
            		trHTML += '<tr><td>' + data[i].country 
            				+ '</td><td>' + data[i].year 
            				+ '</td><td>' + data[i].gdppc 
            				+ '</td><td>' + data[i].population ;
       				 });
        
       				 $('#dataTable').append(trHTML);
       	});
		

		request.always(function (jqXHR,status){
		    if(status=="error"){
		      console.log("Status: "+jqXHR.status);
		      if(jqXHR.status==401){
		      	alert("You entered a wrong apikey")
		      }else if(jqXHR.status==402){
					alert('Sorry, you have to pay to use our API');
				}else if(jqXHR.status==429){
					alert('Sorry, you have to pay again');
			}
		    }


		});

	



}




