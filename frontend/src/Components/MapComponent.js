import React, { useEffect, useRef } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';

const MapComponent = () => {
    return (
        <div style={{ height: '870px', width: '1700px', marginTop: "60px"}}>
            <iframe
                src="Map.html" 
                style={{ height: '100%', width: '100%', border: 'none'}}
                title="ArcGIS Map"
            ></iframe>
        </div>
    );
};

export default MapComponent;
