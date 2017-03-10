//TODO: set  today - 30 days as min for chart x axis
angular.module('historyUpdater', [])
.controller('chartController', function($scope, $http){
    $scope.historicData = {};
    $scope.chart= new CanvasJS.Chart("chart");

    $scope.chart.options.title = { text: "History", fontColor: '#177E89', fontFamily: 'Baloo Bhaina' }
    $scope.chart.options.axisX = {
        labelAngle: 45,
        labelFontFamily: 'Baloo Bhaina',
        labelFontWeight: 'lighter',
        labelFontSize: 30,
        valueFormatString: "DD/MM",
        intervalType: "day",
        interval: 1}
    $scope.chart.options.axisY = { minimum: 14, title: 'weight', labelFontFamily: 'Baloo Bhaina', labelColor: '696869', labelFontSize: 30, labelFontWeight: 'lighter', titleFontFamily: 'Baloo Bhaina', titleFontSize: 36, gridColor: '#D9D9D9', interval: 4 }
    $scope.chart.options.legend = { fontFamily: 'Baloo Bhaina', fontSize: 36, fontWeight: 'lighter', fontColor: '#696869' }

    let series1 = {
        type: "line",
        name: "Weight",
        color: "#177E89",
        markerType: "square",
        markerSize: 15,
        legendMarkerType: "none",
        showInLegend: true,
        dataPoints: []
    };

    let series2 = {
        type: "line",
        name: "Fat %",
        color: "#DB3A34",
        markerType: "circle",
        markerSize: 15,
        legendMarkerType: "none",
        showInLegend: true,
        dataPoints: []
    };

    $scope.chart.options.data = [];
    $scope.chart.options.data.push(series1);
    $scope.chart.options.data.push(series2);

    $http.get('/api/v1/logs/1')
         .success((result) => {
             console.log(result.data);
             $scope.historicData = result.data;
             console.log(result.data.length);
             for( let i=0; i< result.data.length; i++)
             {
                 series1.dataPoints.push({x:format(result.data[i].date),y:parseInt(result.data[i].weight)});
                 series2.dataPoints.push({x:format(result.data[i].date),y:parseInt(result.data[i].fatpercent)});
             }
              $scope.chart.render();
         })
         .error((error) => {
             console.log('Error: ' + error);
         });

    function format (dat){
        let temp = new Date(dat);
        return new Date(temp.getFullYear(), temp.getMonth(),  temp.getDate());
    };

});