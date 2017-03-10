angular.module('historyUpdater', [])
.controller('historyController', function($scope, $http){
    window.dispatchEvent(new Event('resize'));
    $scope.historicData = {};
    let values1 = [];
    let values2 = [];

    $http.get('/api/v1/logs/3')
         .success((result) => {
             console.log(result.data);
             $scope.historicData = result.data;
             console.log(result.data.length);
             for( let i=0; i< result.data.length; i++)
             {
                 values1.push({x:format(result.data[i].date),y:parseInt(result.data[i].weight)});
                 values2.push({x:format(result.data[i].date),y:parseInt(result.data[i].fatpercent)});
             }
             console.log(values1);
             console.log(values2);
         })
         .error((error) => {
             console.log('Error: ' + error);
         });

    function format (dat){
        let temp = new Date(dat);
        return new Date(temp.getFullYear(), temp.getMonth(),  temp.getDate());
    };

    $scope.chart= new CanvasJS.Chart("chart");

    $scope.chart.options.title = { text: "History", fontColor: '#177E89', fontFamily: 'Baloo Bhaina' }
    $scope.chart.options.axisX = { labelAngle: 45, labelFontFamily: 'Baloo Bhaina', labelFontWeight: 'lighter', labelFontSize: 30, valueFormatString: "DD/MM" }
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
        xValueType: "date",
        dataPoints: values1
    };

    let series2 = {
        type: "line",
        name: "Fat %",
        color: "#DB3A34",
        markerType: "circle",
        markerSize: 15,
        legendMarkerType: "none",
        xValueType: "date",
        showInLegend: true,
        dataPoints: values2
    };

    $scope.chart.options.data = [];
    $scope.chart.options.data.push(series1);
    $scope.chart.options.data.push(series2);


    // series1.dataPoints = [
    //     { x: new Date(2017,0,1), y: 18 },
    //     { x: new Date(2017,0,2), y: 29 },
    //     { x: new Date(2017,0,3), y: 40 },
    //     { x: new Date(2017,0,4), y: 34 },
    //     { x: new Date(2017,0,5), y: 24 }
    // ];
    //
    //
    console.log(series1.dataPoints);
    //
    // series2.dataPoints = [
    //     { x: new Date(2017,0,1), y: 23 },
    //     { x: new Date(2017,0,2), y: 22 },
    //     { x: new Date(2017,0,3), y: 18 },
    //     { x: new Date(2017,0,4), y: 19 },
    //     { x: new Date(2017,0,5), y: 22 }
    // ];

    $scope.chart.render();



});