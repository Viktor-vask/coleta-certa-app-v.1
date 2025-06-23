// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import './HomePage.css';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function RecenterButton() {
	const map = useMap();
	const handleRecenter = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			map.flyTo([latitude, longitude], 15);
		});
	};
	return <button onClick={handleRecenter} className="recenter-button">Me Localize</button>;
}

function HomePage() {
	const [reports, setReports] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [mapCenter, setMapCenter] = useState([-14.235, -51.925]);

	useEffect(() => {
		const fetchReports = async () => {
			setIsLoading(true);
			try {
				const reportsQuery = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
				const querySnapshot = await getDocs(reportsQuery);
				const reportsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				setReports(reportsData);
			} catch (error) {
				console.error("Erro ao buscar denúncias: ", error);
			} finally {
				setIsLoading(false);
			}
		};
		
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			setMapCenter([latitude, longitude]);
		}, () => {
			console.log("Permissão de localização negada.");
		});

		fetchReports();
	}, []);

	const handleUpdateStatus = async (reportId, newStatus) => {
		const reportDocRef = doc(db, 'reports', reportId);
		try {
			await updateDoc(reportDocRef, { status: newStatus });
			setReports(prevReports =>
				prevReports.map(report =>
					report.id === reportId ? { ...report, status: newStatus } : report
				)
			);
		} catch (error) {
			console.error("Erro ao atualizar status: ", error);
			alert("Não foi possível atualizar o status.");
		}
	};

	if (isLoading) {
		return <div className="loading-message">Carregando denúncias...</div>;
	}

	return (
		<div className="homepage-container">
			<div className="map-section">
				<h2>Mapa de Ocorrências</h2>
				<MapContainer center={mapCenter} zoom={mapCenter[0] === -14.235 ? 4 : 14} className="map-view">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{reports.map(report => (
						report.location && (
							<Marker key={report.id} position={[report.location.lat, report.location.lng]}>
								<Popup>
									<div className="popup-content">
										{/* A imagem foi REMOVIDA daqui */}
										<p>{report.description}</p>
									</div>
								</Popup>
							</Marker>
						)
					))}
					<RecenterButton />
				</MapContainer>
			</div>

			<hr className="section-divider" />

			<h1>Últimas Denúncias Registradas</h1>
			<div className="report-list-container">
				{reports.length > 0 ? (
					reports.map(report => (
						<div key={report.id} className="report-card">
							{/* A imagem foi REMOVIDA daqui */}
							<div className="report-content-full"> {/* Nova classe para ocupar espaço total */}
								<p>{report.description}</p>
								<span>Status: <strong className={`status-${report.status.toLowerCase().replace(' ', '-')}`}>{report.status}</strong></span>
								<div className="admin-actions">
									<button onClick={() => handleUpdateStatus(report.id, 'Em verificação')}>Verificar</button>
									<button onClick={() => handleUpdateStatus(report.id, 'Resolvido')} className="btn-resolved">Resolver</button>
								</div>
							</div>
						</div>
					))
				) : (
					<p>Nenhuma denúncia registrada ainda.</p>
				)}
			</div>
		</div>
	);
}

export default HomePage;