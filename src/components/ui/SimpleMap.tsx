import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface SimpleMapProps {
  center: [number, number];
  zoom?: number;
  className?: string;
}

export default function SimpleMap({ center, zoom = 14, className = "" }: SimpleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    try {
      const isDark = document.documentElement.classList.contains("dark");
      const style = isDark
        ? "https://tiles.openfreemap.org/styles/dark-matter"
        : "https://tiles.openfreemap.org/styles/positron";

      const map = new maplibregl.Map({
        container: containerRef.current,
        style,
        center,
        zoom,
      });

      map.addControl(new maplibregl.NavigationControl(), "bottom-right");
      mapRef.current = map;

      map.on("error", (e) => {
        console.error("Map error:", e);
        setError("Error al cargar el mapa");
      });
    } catch (err) {
      console.error("Map initialization error:", err);
      setError("Error al inicializar el mapa");
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
    />
  );
}
