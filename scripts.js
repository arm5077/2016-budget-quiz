app = angular.module("quizApp", []);

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
	options = [];
	options.push(data[Math.floor(Math.random() * data.length)]);
	
	// Let's make a new array containing entries that are within the difference criteria of option1
	eligible_data  = data.filter(function(datum){ 
			if( 
				( (datum["2016"] - options[0]["2016"]) / options[0]["2016"] >= min_difference_ratio && (datum["2016"] - options[0]["2016"]) / options[0]["2016"] <= max_difference_ratio )
				||
				( (options[0]["2016"] - datum["2016"]) / datum["2016"] >= min_difference_ratio && (options[0]["2016"] - datum["2016"]) / datum["2016"] <= max_difference_ratio )
			) return true; 
	});
	
	// Grab option 2
	options.push(eligible_data[Math.floor(Math.random() * eligible_data.length)]);
	
	options.forEach(function(){
		
		
	})	

}