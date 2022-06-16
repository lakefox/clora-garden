var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 30.42026, lng: -86.81950 },
        zoom: 20
    });
    var drawingManager = new google.maps.drawing.DrawingManager({
        polygonOptions: {
            editable: true,
        },
        polylineOptions: {
            editable: true,
        }
    });
    drawingManager.setMap(map);
    map.setMapTypeId('satellite');
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        console.log(event);
        pathGen(event);
    });
}

function pathGen(e) {
    let points = e.overlay.getPath().getArray();
    let pointsLL = [];
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        pointsLL.push([point.lat(), point.lng()]);
    }
    console.log(pointsLL);
    console.log(rightOrLeft(pointsLL));
}

function dist(points, output = "ft") {
    return (Math.sqrt(Math.pow(temp1[1][0] - temp1[0][0], 2) + Math.pow(temp1[1][1] - temp1[0][1], 2)) * 111000) * (output == "ft" ? 3.281 : output == "m" ? 1 : 0);
}

function rightOrLeft(points) {

    return right > left ? "right" : "left";
}