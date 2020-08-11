import { useState, PureComponent } from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';

const Map = ({ data = [] }) => {
  const [viewport, setViewport] = useState({
    longitude: 106.816666,
    latitude: -6.37,
    zoom: 10,
    width: '100%',
    height: '100%',
    bearing: 0,
    pitch: 0,
  });
  const [popup, setPopup] = useState(null);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
      onViewportChange={viewport => setViewport(viewport)}
    >
      <div className="absolute" style={{ top: 5, right: 10 }}>
        <NavigationControl />
      </div>

      {popup && (
        <Popup
          tipSize={5}
          anchor="bottom"
          offsetTop={-32}
          latitude={popup.address.latitude}
          longitude={popup.address.longitude}
          closeOnClick={false}
          closeButton={false}
          dynamicPosition={false}
        >
          <div className="fon6 py-4t-bold text-sm mb-2">{popup.name}</div>
          <p className="text-gray-700 text-xs">{popup.address.street}</p>
        </Popup>
      )}

      {data.map(place => (
        <Marker
          latitude={place.address.latitude}
          longitude={place.address.longitude}
          key={place.name}
        >
          <svg
            height={30}
            viewBox="0 0 24 24"
            style={{
              cursor: 'pointer',
              fill: '#d00',
              stroke: 'none',
              transform: `translate(${-30 / 2}px,${-30}px)`,
            }}
            onMouseEnter={() => setPopup(place)}
            onMouseLeave={() => setPopup(null)}
          >
            <path
              d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
            />
          </svg>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
