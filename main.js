// var app = angular.module('routeEx', ['ngRoute']);

// app.config(function($routeProvider){
//   $routeProvider.when('/', {
//     templateUrl: 'view1.html',
//     controller: 'view1ctrl'
//   });
  
//   $routeProvider.when('/view2', {
//     templateUrl: 'view2.html',
//     controller: 'view2ctrl'
//   });

//   $routeProvider.otherwise({ redirectTo: '/' });
// });

var app = angular.module("rowsCols", ["ui.bootstrap"]);



app.controller("rowsColsCtrl", function($scope,$uibModal){

	$scope.chosenItem = "";



	$scope.open = function(selectedSeat){
		$scope.selectedSeat = selectedSeat;
		var popUp = $uibModal.open({
			templateUrl: "view1.html",
			controller: "newModalCtrl",
			resolve: {
				seat: function(){
					return $scope.selectedSeat;
				}
			}

		})
		popUp.result.then(function(seat){
			$scope.seat = seat;

		})

	};

	var container = [];
	for (var i = 0; i < 24; i++){
		if(i % 6 === 0){
			var row_arr = [];
			container.push(row_arr);
		}
		var newObj = { 
			name: "", 
			email: ""
		};
		row_arr.push(newObj);
	}
	$scope.container = container;
	$scope.chosenItem = "";

	$scope.selectSeat = function(chosenItem){
		console.log(chosenItem.target);
		console.log($scope.chosenItem);
	}
	$scope.row = "rowz";
	// $scope.seat = "seatz";
});

app.controller("newModalCtrl", function($scope, $uibModalInstance, seat){
	$scope.seat = seat;
	$scope.ok = function(){
		$scope.seat.name = $scope.input1;
		$scope.seat.email = $scope.input2;
		$uibModalInstance.close($scope.seat)
	}

});



app.directive("seat", function($compile){
	return{
		restrict: "E",
		// template: "HTML HARDLINE CODE HERE" "<div></div>",
		link: function(scope, elem, attrs){
		elem.addClass("seat")
		elem.bind("click", function(){
			scope.$apply(function(){
				var newInput = angular.element("");
				var content = $compile(newInput);
				elem.parent().append(content);
			});
			});
		}
	}
	
})

app.directive("row", function(){
	return{
		restrict: "A",
		link: function(scope, elem, attrs){
		elem.addClass("row")
		}
	}
	
	
})

app.directive("container", function(){
	return{
		restrict: "A",
		link: function(scope, elem, attrs){
		elem.addClass("cont")
	}
}
	
	
})