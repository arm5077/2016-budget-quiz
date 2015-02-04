app = angular.module("quizApp", ['ngAnimate']);
app.controller("quizController", ["$scope", function($scope){
	
	max_difference_ratio = 10000;
	min_difference_ratio = 1.1;
	$scope.correct = 0;
	$scope.total = 0;
	$scope.questions = [];
	$scope.progress = [];
	$scope.place = -1;
	for( i = 0; i < 15; i++ ){ $scope.progress.push({"answered": false}) };
	
	$scope.addQuestion = function(){
		
		// Scroll window to the top.
		window.scrollTo(0,0);
		
		// Increment place in timeline
		$scope.place++;
		
		console.log([max_difference_ratio,min_difference_ratio]);
		
		// Let's make sure we haven't topped out on difficulty
		min_difference_ratio = Math.min(700000, min_difference_ratio);
		
		// Let's get a random entry
		var interval = Math.floor(Math.random() * data.length -1 );
		
		while( true ){
			options = [];
			options.push(data[interval]);
			eligible_data = [];
			
			// Let's make a new array containing entries that are within the difference criteria of option1
			eligible_data  = data.filter(function(datum){ 
					if( 
						( datum["2016"] / options[0]["2016"] >= min_difference_ratio && datum["2016"] / options[0]["2016"] <= max_difference_ratio )
					||
						( options[0]["2016"] / datum["2016"] >= min_difference_ratio && options[0]["2016"] / datum["2016"] <= max_difference_ratio )
					) return true; 
			});
			
			if( eligible_data.length != 0 ) break;
			interval--;
			
			
		}
		// Grab option 2
		options.push(eligible_data[Math.floor(Math.random() * eligible_data.length)]);
	
		//$scope.$apply(function(){ questions.push(options); });
		$scope.questions.push({"answered": false, "correct": null, "options": options}); 
	};
	
	$scope.evaluateAnswer =  function(option, question){
		if( !question.answered ){
			option.clicked = true;
			guess = option["2016"];
		
			if( guess > question.options.filter(function(option){ return (guess != option["2016"] ? true : false ) })[0]["2016"] ) {
				question.correct = true;
				$scope.correct++;
				max_difference_ratio = Math.sqrt(max_difference_ratio);
				min_difference_ratio = Math.sqrt(min_difference_ratio);
				
			}
			else {
				question.correct = false;
				max_difference_ratio = Math.pow(max_difference_ratio,2);
				min_difference_ratio = Math.pow(min_difference_ratio,2);
			}
			
			$scope.total++;
			question.answered = true;
			
			$scope.progress[$scope.place].answered = true;
			$scope.progress[$scope.place].correct = question.correct;
			
			// Bring up "next" button
			setTimeout(function(){ 
				$scope.$apply(function(){
					question.readyForNext = true;
				});
			},500);
		}
	};


	// Reformat dollar amounts in data to type integer * 1000
	data.forEach(function(data){
		data["2016"] = parseInt(data["2016"].replace(/,/g, '')) * 1000;
	});

	$scope.addQuestion();
	
}]);

app.directive('center', function() {
    return {
        link: function(scope, element, attrs) {
			var options = element.parent().parent()[0].getElementsByClassName("option");
			if(options[1]){
				setInterval(function(){
					element[0].style.height = Math.min(options[0].offsetHeight, options[1].offsetHeight) + "px";
					element[0].style.lineHeight = Math.min(options[0].offsetHeight, options[1].offsetHeight) + "px";
				},100);
			}
        },
    }
});


// Thanks to Patrick Desjardins for this ever-useful snippet from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
 };