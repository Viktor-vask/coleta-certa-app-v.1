// src/pages/ReportPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
// AQUI ESTÁ A CORREÇÃO: O caminho agora é 'firebase/firestore'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ReportPage.css';

// Importações do mapa
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';

// Componente para o botão de "Me Localize"
function FindMeButton({ setMarkerPosition }) {
	const map = useMap();

	const handleFindMe = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				const newPos = { lat: latitude, lng: longitude };
				setMarkerPosition(newPos);
				map.flyTo(newPos, 16);
			},
			() => {
				alert("Não foi possível obter sua localização. Verifique as permissões do seu navegador.");
			}
		);
	};

	return (
		<button type="button" onClick={handleFindMe} className="find-me-button">
			Me Localize
		</button>
	);
}

// Componente para lidar com os eventos do mapa
function LocationMarker({ markerPosition, setMarkerPosition }) {
	const map = useMapEvents({
		click(e) {
			setMarkerPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});
	return markerPosition === null ? null : <Marker position={markerPosition}></Marker>;
}

function ReportPage() {
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [mapCenter, setMapCenter] = useState([-15.793889, -47.882778]);
	const [markerPosition, setMarkerPosition] = useState(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			setMapCenter([latitude, longitude]);
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!markerPosition) {
			alert('Por favor, marque no mapa o local exato da denúncia.');
			return;
		}
		if (!description) {
			alert('Por favor, preencha a descrição.');
			return;
		}

		setIsLoading(true);
		try {
			const locationData = {
				lat: markerPosition.lat,
				lng: markerPosition.lng,
			};

			const reportsCollectionRef = collection(db, 'reports');
			await addDoc(reportsCollectionRef, {
				description: description,
				status: 'Registrado',
				createdAt: serverTimestamp(),
				location: locationData,
			});

			alert('Denúncia enviada com sucesso!');
			setDescription('');
			setMarkerPosition(null);

		} catch (error) {
			console.error("Erro no envio: ", error);
			alert('Ocorreu um erro ao enviar sua denúncia.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="report-container">
			<h1>Registrar Nova Denúncia</h1>
			<p>Clique no mapa para marcar o local ou use o botão "Me Localize".</p>

			<form className="report-form" onSubmit={handleSubmit}>
				<label>Local da Ocorrência:</label>
				<div className="form-map-container">
					<MapContainer center={mapCenter} zoom={13} className="form-map-view">
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<LocationMarker
							markerPosition={markerPosition}
							setMarkerPosition={setMarkerPosition}
						/>
						<FindMeButton setMarkerPosition={setMarkerPosition} />
					</MapContainer>
				</div>

				<label htmlFor="description">Descrição do Problema:</label>
				<textarea
					id="description"
					rows="4"
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				
				<button type="submit" className="submit-button" disabled={isLoading}>
					{isLoading ? 'Enviando...' : 'Enviar Denúncia'}
				</button>
			</form>
		</div>
	);
}

export default ReportPage;