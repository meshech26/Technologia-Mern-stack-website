import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// A simple function to get coordinates for major cities.
// In a real app, you might use a geocoding API.
const getCityCoordinates = (cityName) => {
    const cities = {
        'Colombo': [6.9271, 79.8612],
        'Batticaloa': [7.7167, 81.7000],
        'Jaffna': [9.6615, 80.0255],
        'Kilinochchi': [9.3999, 80.4000],
        'Trincomalee': [8.5874, 81.2152],
    };
    // Handle common misspellings if necessary
    if (cityName === 'Batticalo') {
        return cities['Batticaloa'];
    }
    return cities[cityName] || null;
};

const GeoChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">No location data available to display.</p>;
    }

    return (
        // Centered on Sri Lanka with an appropriate zoom level
        <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: '100%', width: '100%', borderRadius: '12px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map(location => {
                const position = getCityCoordinates(location.city);
                if (!position) return null;

                return (
                    <CircleMarker
                        key={location.city}
                        center={position}
                        radius={Math.log(location.count) * 3 + 5} // Radius based on order count
                        pathOptions={{ color: '#3b82f6', fillColor: '#60a5fa', fillOpacity: 0.7 }}
                    >
                        <Popup>
                            <div className="font-semibold">{location.city}</div>
                            <div>Orders: {location.count}</div>
                        </Popup>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
};

export default GeoChart;