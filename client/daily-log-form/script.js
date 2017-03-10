angular.module('nodelogform',[])
.controller('nodelogformController', function($scope, $http) {
    $scope.createLog = () => {
        $http.post('/api/v1/log/3', $scope.formData)
             .success((data) => {
                 $scope.formData = {};
                 console.log(data);
             })
             .error((error) => {
                 console.log('Error: ' + error);
             });
    };
});