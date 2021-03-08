const airports = require('./airports.json');
var geojson = {
    type: "FeatureCollection",
    features: []
}

geojson.features = airports.map(airport => {
    let {_geoloc, ...rest} = airport;
    return ({
    type: "Feature",
    geometry: {
        type: "Point",
        coordinates: [_geoloc.lng, _geoloc.lat]
    },
    properties: rest
})});

const fs = require('fs');
fs.writeFile(__dirname + '/geoairports.json', JSON.stringify(geojson), 'utf8', () => {
    console.log("Done");
})