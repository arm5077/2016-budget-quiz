var max_difference_ratio = 1000;
var min_difference_ratio = 2;


$(document).ready(function(){
	
	// Reformat dollar amounts in data to type integer * 1000
	data.forEach(function(data){
		data["2016"] = parseInt(data["2016"].replace(/,/g, '')) * 1000;
	});
	
	addQuestion();
	
});

function addQuestion(){
	
	// Let's get a random entry
	option1 = (data[Math.floor(Math.random() * data.length)]);
	
	
	
	
	console.log(option1);
	// Let's make a new array containing entries that are within the difference criteria of option1
	eligible_data  = data.filter(function(datum){ 
			if( 
				( (datum["2016"] - option1["2016"]) / option1["2016"] >= min_difference_ratio && (datum["2016"] - option1["2016"]) / option1["2016"] <= max_difference_ratio )
				||
				( (option1["2016"] - datum["2016"]) / datum["2016"] >= min_difference_ratio && (option1["2016"] - datum["2016"]) / datum["2016"] <= max_difference_ratio )
			) return true; 
	});
	
	// Grab option 2
	option2 = (eligible_data[Math.floor(Math.random() * eligible_data.length)]);
	
	console.log([option1, option2]);

}