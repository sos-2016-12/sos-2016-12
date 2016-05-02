
$("body").ready(function (){

	console.log("jQuery Ready!");
	//$('input#input_text, textarea#textarea1').characterCounter();


	$("#loadInitialData").click(function(){

	    var apikey = $("#apikey").val();

	    var request = $.ajax({
	      url:"/api/v1/republican_stats/loadInitialData?apikey="+apikey,
	      type:"GET"
	    
	    });

	    request.done(function (data){
	      console.log("Handling request (OK)");
	      console.log("Data received: ");
	      table(data);
	    });

	    request.always(function (jqXHR,status){
		    if(status=="error" && jqXHR.status==401){
		        alert('Unauthorized: Apikey not valid');
		    }else {

		      alert('Data loaded');

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
		    table();
		    

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
		    table();
		    

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


	$("#searchButton").click(function(){
	    console.log("Handling click");
	    var apikey = $("#apikey").val();
	    var countryS = $("#countryS").val();
	    var yearS = $("#yearS").val();

	    if(countryS){
		  var request = $.ajax({
		    url:"/api/v1/republican_stats/"+countryS+"/"+yearS+"?apikey="+apikey,
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
	    table();


	  });


	  request.always(function (jqXHR,status){
	    if(status=="error" && jqXHR.status==401){

		   alert('Unauthorized: Apikey not valid');

	  }

	  });

	});

});

function table(){
		var apikey = $("#apikey").val();
		var countryS = $("#countryS").val();
		/*var year = $("#year").val();
		var gdppc = $("#gdppc").val();
		var population = $("#population").val();*/

		var url = "/api/v1/republican_stats";

		if(countryS){
		   	url = url+"/"+countryS+"?apikey="+apikey;;
		}
		else{
			url = url +"?apikey="+apikey;
		}

		var request = $.ajax({
		    url:url,
		    type:"GET",
		    contentType : "application/json"
		});




		request.done(function(data,status,jqXHR) {
					var trHTML = '';
                	$("idtable").find("tr:gt(0)").remove();
       				$.each(data, function (i, item) {
            
            		trHTML += '<tr><td>' + data[i].country + '</td><td>' + data[i].year + '</td><td>' + data[i].gdppc + '</td><td>'
            			+ data[i].population + '</td></tr>';
       				});
        
       				$('#idtable').append(trHTML);
       				console.log("tabla creada");
		})
		/*
		request.done(function (data){
		    console.log("Handling request (OK)");
		    console.log("Data received: ");
		    console.log(JSON.stringify(data));
		    
		    loadtable = $('<tbody></tbody>');
		    for (i=0;i<data.length;i++){
		      var clase = "data"+i;
		      var row = $('<tr id='+clase+'></tr>').appendTo(loadtable);
		      $('<td class="data"></td>').text(data[i].country).appendTo(row);
		      $('<td class="data"></td>').text(data[i].year).appendTo(row);
		      $('<td class="data"></td>').text(data[i].gdppc).appendTo(row);
		      $('<td class="data"></td>').text(data[i].population).appendTo(row);
		    }
		    console.log("Table:"+loadtable.html());
		    loadtable.appendTo("#idtable");
		});
		*/

		request.always(function (jqXHR,status){
		    if(status=="error"){
		      console.log("Status: "+jqXHR.status);
		      if(jqXHR.status==401)
		      alert("You entered a wrong APIkey")
		    }

		});





}




