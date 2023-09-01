	// import './MapPage.css'
	//  import { useState, useRef, useEffect } from 'react'
	//  import mapboxgl, { Map as MapGl } from 'mapbox-gl';
	//  import 'mapbox-gl/dist/mapbox-gl.css';
	import './MapPage.css'
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { useRef, useEffect, useState } from 'react';
	import mapboxgl, { Map as MapGl } from 'mapbox-gl';

	 mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2Jqb2gwOCIsImEiOiJjbGx6M2pqMXYwZTZ5M2NvNzNscm5rZWtuIn0.C2QkVLDoLFvrae_e65EGpg';
	// import.meta.env.VITE_MAPBOX_TOKEN as string
	// console.log('Kontrollera att access token hittas: ', import.meta.env.VITE_MAPBOX_TOKEN);

	function MapPage() {

	 const mapContainer = useRef(null)
	 const mapRef = useRef<MapGl | null>(null)
	 const [lat, setLat] = useState<number>(57.7)
	 const [lng, setLng] = useState<number>(11.89)
	 const [zoom, setZoom] = useState<number>(10)

	 useEffect(() => {
	 	if( mapRef.current || !mapContainer.current ) return

	 	mapRef.current = new MapGl({
	 		container: mapContainer.current,
	 		style: 'mapbox://styles/mapbox/streets-v12',
	 		center: [lng, lat],
	 		zoom: zoom
	 	});
	 	const map: MapGl = mapRef.current

	 	map.on('move', () => {
	 		interface Position {
	 			lng: number;
	 			lat: number;
	 		}
	 		const position: Position = map.getCenter()
	 		setLat(Number(position.lat.toFixed(4)))
	 		setLng(Number(position.lng.toFixed(4)))
	 		setZoom(map.getZoom());
	 	})
	 }, [lat, lng, zoom])

	return (
		<div>
			<header> Mapbox demo </header>
			<main>

				 <div ref={mapContainer} className="map-container" />

				<p> Center position: {lat} lat, {lng} lng </p>
			 </main>
		</div>
	)
	}

	export default MapPage