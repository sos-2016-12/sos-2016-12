
$("body").ready(function (){

	console.log("jQuery Ready!");
	$('input#input_text, textarea#textarea1').characterCounter();


	$("#loadInitialData").click(function(){

	    var apikey = $("#apiKey").val();
	    var dir = "";

	    var request = $.ajax({
	      url:"/api/v1/republican_stats/loadInitialData?apikey="+apikey,
	      type:"GET"
	    
	    });

	    request.done(function (data){
	      console.log("Handling request (OK)");
	      console.log("Data received: ");
	      table(dir);

	    });

	    request.always(function (jqXHR,status){
		    if(status=="error" && jqXHR.status==401){
		        swal("Unauthorized: Apikey not valid");
		    }else {

		      swal("Data Loaded");

		    }
	    });
	});

	$("#addButton").click(function(){
		  var apikey = $("#apiKey").val();
		  var country = $("#newCountry").val();
		  var year = $("#newYear").val();
		  var gdppc = $("#newGdppc").val();
		  var population = $("#newPopulation").val();
		  var dir = "";


  		if(country && year && gdppc && population){

		  var request = $.ajax({
		    url:"/api/v1/oil?apikey="+apikey,
		    type:"POST",
		    data: '{"country":"'+country+'","year":'+year+',"gdppc":'+gdppc+',"population":'+population+'}',
		    contentType : "application/json"
		  });

		  request.done(function (data){
		    console.log("Handling request (OK)");
		    console.log("Data received: ");
		    swal("Data Created!");
		    table(dir);

		  });

		  request.always(function (jqXHR,status){
		    if(status=="error" && jqXHR.status==401){

		    	swal("Unauthorized: Apikey No Valid");

		  	}else if(status=="error" && jqXHR.status==409){

		    	swal("Data Already Exists");

		    }
		  });

		}else{
			//Materialize.toast('There are empty fields', 4000)
		  swal("Empty fields");

		}
	});



	$("#updateButton").click(function(){
	  	var apikey = $("#apiKey").val();
		var country = $("#newCountry").val();
		var year = $("#newYear").val();
		var gdppc = $("#newGdppc").val();
		var population = $("#newPopulation").val();
		var dir = "";

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
	    swal("Data Update!");
	    table(dir);

	  });

	  request.always(function (jqXHR,status){
	    if(status=="error" && jqXHR.status==401){

	    swal("Unauthorized: Apikey not valid");

	  	}else{

	    swal("Data Updated");

	    }
	  });

		}else{

		  swal("Fill in all fields");

		}

	});

































	$("#searchButton").click(function(){
	    console.log("Handling click");
	    var apikey = $("#apiKey").val();
	    var country = $("#country").val();
	    var year = $("#year").val();
	    var item = $("#item").val();
	    var page = $("#page").val();
	    var dir = "";

	  var request = $.ajax({
	    url:"/api/v1/republican_stats?apikey="+apikey,
	    type:"GET"
	  });



	  request.done(function (data){
	    console.log("Handling request (OK)");
	    console.log("Data received: ");
	    table(dir);


	  });


	  request.always(function (jqXHR,status){
	    if(status=="error" && jqXHR.status==401){

	      swal("Unauthorized: Apikey not valid");

	  }

	  });

	});






});

