
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
		    if(status=="error" && jqXHR.status==401){
		        alert('Unauthorized: Apikey not valid');
		    }else {

		      //alert('Data loaded');

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


		  var request = $.ajax({
		    url:"/api/v1/republican_stats/"+country+"/"+year+"?apikey="+apikey,
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

		  	}if(status=="error" && jqXHR.status==405){

			    alert('Method not allowed');

		    }if(status=="error" && jqXHR.status==404){

			    alert('Not found');

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

					 alert("You deleted all resources.");

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

					 alert("You deleted the resource.");
					 //loadTable();

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


	$("#getData").click(function(){
		loadTable();
		/*
		var apikey = $("#apikey").val();
		var url="/api/v1/republican_stats/";

		var request = $.ajax({

			url: url+"?apikey="+apikey,
			type: "GET",
			contentType: "application/json",
  
		});
		request.done(function(data,status,jqXHR) {
					  // Tratamiento en caso de exito
					var trHTML = '';

                	$("dataTable").find("tr:gt(0)").remove();

       				$.each(data, function (i, item) {
            
            		trHTML += '<tr><td>' + data[i].country 
            				+ '</td><td>' + data[i].year 
            				+ '</td><td>' + data[i].gdppc 
            				+ '</td><td>' + data[i].population ;
       				 });
        
       				 $('#dataTable').append(trHTML);
       	});
*/

	});

/*
	$("#searchButton").click(function(){
		loadTable();
	    /*console.log("Handling click");
	    var apikey = $("#apikey").val();
	    var countryS = $("#countryS").val();
	    var yearS = $("#yearS").val();
	    
	     if(countryS && yearS){
		  var request = $.ajax({
		    url:"/api/v1/republican_stats/"+countryS+"/"+yearS+"?apikey="+apikey,
		    type:"GET"
		  });
		}
	    if(countryS){
		  var request = $.ajax({
		    url:"/api/v1/republican_stats/"+countryS+"?apikey="+apikey,
		    type:"GET"
		  });
		}if(yearS){
			var request = $.ajax({
		    url:"/api/v1/republican_stats/"+yearS+"?apikey="+apikey,
		    type:"GET"
		  });
		}if(!countryS && !yearS){
			alert('What are you looking for?');
		}



	  request.done(function (data){
	    console.log("Handling request (OK)");
	    console.log("Data received: ");
	    loadTable();


	  });

	  request.always(function (jqXHR,status){
	    if(status=="error" && jqXHR.status==401){

		   alert('Unauthorized: Apikey not valid');

	  }

	  });


	});
*/

});

function loadTable(){
		
		var apikey = $("#apikey").val();
		var countryS = $("#countryS").val();
		var year = $("#yearS").val();
		var fromS= $("#from").val();
		var to = $("#to").val();
		var elements= $("#elements").val();
		var pages=$("#pages").val();
		var url="/api/v1/republican_stats/";
		//$( ".data" ).remove();

		if(countryS){
		        url= url+countryS;
		        console.log("pais cogido");
		}
		url= url+"?apikey="+apikey+"&limit="+elements+"&offset="+elements*(pages-1)+"&from="+fromS+"&to="+to;
  

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
		
		/*
		request.done(function (data){
		    console.log("Handling request (OK)");
		 		    
		    loadtable = $('<tbody></tbody>');
		    for (i=0;i<data.length;i++){
		      var row = $('<tr></tr>').appendTo(loadtable);
		      $('<td class="data"></td>').text(data[i].country).appendTo(row);
		      $('<td class="data"></td>').text(data[i].year).appendTo(row);
		      $('<td class="data"></td>').text(data[i].gdppc).appendTo(row);
		      $('<td class="data"></td>').text(data[i].population).appendTo(row);
		    }
		    console.log("Table:"+loadtable.html());
		    loadtable.appendTo("#dataTable");
		});
		*/

		request.always(function (jqXHR,status){
		    if(status=="error"){
		      console.log("Status: "+jqXHR.status);
		      if(jqXHR.status==401)
		      alert("You entered a wrong apikey")
		    }

		});

	



}




