import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup, Layer, Source} from "react-map-gl";
import * as parkDate from "./data/skateboard-parks.json";
import airports from "./data/geoairports.json";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 5,
    'circle-color': '#007cbf'
  }
};

function App() {
  const [viewport, setViewport] = useState({
    latitude: 16.4667,
    longitude: 107.6,
    width: '100vw',
    height: '100vh',
    zoom: 4,
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);
  }, []);

  return (
    <div>
      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/chgsuphub1/ckfpfj4g1099j1atj22h1n46q"
        onViewportChange={viewport=> {
          setViewport(viewport)
        }}
      >
        <Source id="airport_loc" type="geojson" data={airports}>
          <Layer {...layerStyle}/> 
        </Source>
        {/* {airports.map(airport => (
          <Marker key={airport.objectID}
            latitude={airport._geoloc.lat}
            longitude={airport._geoloc.lng}
          >
            <button>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </Marker>
        ))} */}

        {/* {selectedPark && (
          <Popup
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
          onClose={() => {
            setSelectedPark(null)
          }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        )} */}
      </ReactMapGL>
    </div>
  );
}

export default App;
