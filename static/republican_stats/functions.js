
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
	    var country = $("#country").val();
	    var year = $("#year").val();

	    if(country){
		  var request = $.ajax({
		    url:"/api/v1/republican_stats/"+country+"/"+year+"?apikey="+apikey,
		    type:"GET"
		  });
		}if(year){
			var request = $.ajax({
		    url:"/api/v1/republican_stats/"+year+"?apikey="+apikey,
		    type:"GET"
		  });
		}if(!country && !year){
			alert('What are you looking for?');
		}



	  request.done(function (data){
	    console.log("Handling request (OK)");
	    console.log("Data received: ");
	    


	  });


	  request.always(function (jqXHR,status){
	    if(status=="error" && jqXHR.status==401){

		   alert('Unauthorized: Apikey not valid');

	  }

	  });

	});


});

