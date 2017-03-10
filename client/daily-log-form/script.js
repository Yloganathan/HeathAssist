//TODO:redirect user to history page
angular.module('nodelogform',[])
.controller('nodelogformController', function($scope, $location, $http) {
    $scope.formData = {};
    $scope.formData.date = new Date();
   $scope.formData.time = getCurrentTime();
   // $scope.formData.weight = 90;
    $scope.createLog = () => {
        console.log($scope.formData);
        $http.post('/api/v1/log/1', $scope.formData)
             .success((data) => {
                 $scope.formData = {};
                 console.log(data);
                 $location.path('/').replace();
             })
             .error((error) => {
                 console.log('Error: ' + error);
             });
    };

    function getCurrentTime()
    {
        let d = new Date();
        return new Date(d.getFullYear(),d.getMonth(),d.getDay(),d.getHours(),d.getMinutes(),0);
    }
});