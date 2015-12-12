angular
	.module('app', ['ngModal', 'ngRest'])
	.controller('ModalAPIController', [
		'$scope',
		'$modal',
		'$rest',
		function($scope, $modal, $rest){

			var gitRecords = $rest('https://api.github.com/users?per_page=1000');

			gitRecords.get().then(successCallback, errorCallback);

			$scope.showPopup = function(index) {

				$modal.open({
					scope: $scope,
					templateUrl: 'popup.html',
					appendElement: 'container'
				}).then(function(response){

					response.scope.git = $scope.gits[index];
				});
			};

			/*$scope.getBadge = function(value) {

				if(value === true) {

					return "alert-success";
				} else {

					return "alert-danger";
				}
			}; */

			function successCallback(data) {

				$scope.gits = data;
			}

			function errorCallback(error) {

				console.log(error);
			}
		}]);

angular.element(document).ready(function(){

	angular.bootstrap(document, ['app']);
});