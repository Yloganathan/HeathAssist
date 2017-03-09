window.onload = function () {
    var chart = new CanvasJS.Chart("chart");

    chart.options.title = { text: "History", fontColor: '#177E89', fontFamily: 'Baloo Bhaina' }
    chart.options.axisX = { labelAngle: 45, labelFontFamily: 'Baloo Bhaina', labelFontWeight: 'lighter', labelFontSize: 30 }
    chart.options.axisY = { minimum: 14, title: 'weight', labelFontFamily: 'Baloo Bhaina', labelColor: '696869', labelFontSize: 30, labelFontWeight: 'lighter', titleFontFamily: 'Baloo Bhaina', titleFontSize: 36, gridColor: '#D9D9D9', interval: 4 }
    chart.options.legend = { fontFamily: 'Baloo Bhaina', fontSize: 36, fontWeight: 'lighter', fontColor: '#696869' }

    var series1 = {
        type: "line",
        name: "Weight",
        color: "#177E89",
        markerType: "square",
        markerSize: 15,
        legendMarkerType: "none",
        showInLegend: true
    };

    var series2 = {
        type: "line",
        name: "Fat %",
        color: "#DB3A34",
        markerType: "circle",
        markerSize: 15,
        legendMarkerType: "none",
        showInLegend: true
    };

    chart.options.data = [];
    chart.options.data.push(series1);
    chart.options.data.push(series2);


    series1.dataPoints = [
            { label: "3/1/17", y: 18 },
            { label: "3/2/17", y: 29 },
            { label: "3/3/17", y: 40 },
            { label: "3/4/17", y: 34 },
            { label: "3/5/17", y: 24 }
    ];

    series2.dataPoints = [
        { y: 23 },
        { y: 33 },
        { y: 48 },
        { y: 37 },
        { y: 20 }
    ];

    chart.render();
}
