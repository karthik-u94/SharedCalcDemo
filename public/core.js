var calculator = angular.module('calculator', []);

function mainController($scope, $http) {
	setInterval(function() {
        $scope.$apply() 
	}, 500);
	
	
	$scope.formData = {};
	var socket = io();
    // receive broadcast message from server that a new calculation has been added
    socket.on('message', addCalc)

    function addCalc(message){
        $scope.calcList=message;
    }
	
	$http.get('/api/getlogs')
		.success(function (data) {
			$scope.calcList = data;
		})
		.error(function (data) {
			console.log('Error: ' + data);
		});

	//Function to calculate based on 2 given number inputs and operator
	$scope.calculate = function () {
		$scope.result = null

		if ($scope.op == '+') {
			$scope.result = $scope.a + $scope.b;
		}
		else if ($scope.op == '-') {
			$scope.result = $scope.a - $scope.b;
		}
		else if ($scope.op == '*') {
			$scope.result = $scope.a * $scope.b;
		}
		else if ($scope.op == '/') {
			$scope.result = $scope.a / $scope.b;
		}
		// format string to log
		$scope.formData.text = String($scope.a) + " " + $scope.op + " " + String($scope.b) + " = " + $scope.result;
		// call API to log calculation
		$http.post('/api/addlog', $scope.formData)
			.success(function (data) {
				$scope.formData = {}; 
				//empty form after response
				$scope.a=null;
				$scope.b=null;
				$scope.op=null
				// $scope.calcList = data;
				console.log(data);
			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
	}

}
