import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ locations }) => {
  // Dynamically set the center to the first location
  const center =
    locations.length > 0 ? locations[0] : { lat: 37.7749, lng: -122.4194 };

  return (
    <LoadScript googleMapsApiKey="API KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
