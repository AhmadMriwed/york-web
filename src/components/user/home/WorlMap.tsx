"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { feature } from "topojson-client";

const WorldMap = () => {
  // Define the regions and their colors
  const regions = [
    { name: "Switzerland", color: "#49BC00" },
    { name: "Netherlands", color: "#FA4444" },
    { name: "Canada", color: "#4CAAE6" },
    { name: "Germany", color: "#0CCCBA" },
    { name: "Saudi Arabia", color: "#A9FF00" },
    { name: "Morocco", color: "#C351FD" },
  ];

  // Define marker data
  const markers = [
    {
      name: "Netherlands",
      coordinates: [4.895168, 52.370216], // Amsterdam
      info: "📍 Address: Amsterdam\n📞 Phone: +3197005033557",
    },
    {
      name: "Canada",
      coordinates: [-79.3832, 43.6532], // Ontario
      info: "📍 Address: Ontario\n📞 Phone: +13438000033",
    },
    {
      name: "Saudi Arabia",
      coordinates: [46.7386, 24.7743], // Jeddah
      info: "🏢 Name: Al-Nawras Al-Fourati EST\n📍 Address: Jeddah - AL Faisaliyah Dist - Ar Rawdah\n📞 Phone: +966 55 535 5264",
    },
  ];

  // Use a CDN link for the world map data
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const [geoData, setGeoData] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(310); // Default scale for larger devices
  const [zoomCount, setZoomCount] = useState(0); // Counter for zoom actions

  useEffect(() => {
    // Set initial scale based on screen width
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setScale(150); // Smaller scale for small devices
      } else {
        setScale(180); // Larger scale for larger devices
      }
    };

    handleResize();

    // Update scale on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => {
        //@ts-ignore
        setGeoData(feature(data, data.objects.countries));
      });
  }, []);

  const memoizedGeoData = useMemo(() => geoData, [geoData]);

  const handleZoomIn = () => {
    if (zoomCount < 4) {
      setScale(scale * 1.2);
      setZoomCount(zoomCount + 1);
    }
  };

  const handleZoomOut = () => {
    if (zoomCount > -4) {
      setScale(scale / 1.2);
      setZoomCount(zoomCount - 1);
    }
  };

  return (
    <div style={{ width: "100%", height: "480px", position: "relative" }} className="-mb-240">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: scale,
          center: [10, 30],
        }}
        style={{ position: "relative" }}
        className="max-h-full w-full"
      >
        {memoizedGeoData && (
          <Geographies geography={memoizedGeoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const region = regions.find(
                  (r) => r.name === geo.properties.name
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={region ? region.color : "#DDDDDD"}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    onMouseEnter={(e) => {
                      setTooltip({
                        visible: true,
                        text: geo.properties.name,
                        x: e.clientX, // Use mouse X coordinate relative to viewport
                        y: e.clientY, // Use mouse Y coordinate relative to viewport
                      });
                    }}
                    onMouseLeave={() =>
                      setTooltip({ ...tooltip, visible: false })
                    }
                  />
                );
              })
            }
          </Geographies>
        )}

        {markers.map((marker, index) => (
          <Marker
            key={marker.name}
            //@ts-ignore
            coordinates={marker.coordinates}
            onMouseEnter={(e) =>
              setTooltip({
                visible: true,
                text: marker.info,
                x: e.clientX,
                y: e.clientY,
              })
            }
            onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
          >
            <circle
              r={6}
              fill={hoveredMarker === index ? "#FF0000" : "#FF5722"}
              stroke="#FFF"
              strokeWidth={2}
              style={{ transition: "0.2s" }}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip for country name */}
      {tooltip.visible && (
          <div
          style={{
            position: "fixed", // Changed from 'absolute' to 'fixed'
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#FFF",
            padding: "8px",
            borderRadius: "6px",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {tooltip.text}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <button
          onClick={handleZoomIn}
          disabled={zoomCount >= 4} // Disable zoom in after 4 times
          style={{
            backgroundColor: zoomCount >= 4 ? "#ccc" : "#037f85",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: zoomCount >= 4 ? "not-allowed" : "pointer",
          }}
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          disabled={zoomCount <= -4} // Disable zoom out after 4 times
          style={{
            backgroundColor: zoomCount <= -4 ? "#ccc" : "#f44336",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: zoomCount <= -4 ? "not-allowed" : "pointer",
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default WorldMap;