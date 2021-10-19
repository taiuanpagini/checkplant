import { LatLngExpression } from 'leaflet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, useMapEvent } from 'react-leaflet';
import { PointsProps } from './interface';
import { talhao } from '../../services/talhao';
import Points from '../Maps/Points';
import ActionButton from '../ActionButton';
import Toast from '../Toast';
import iconNewPoint from '../../images/Pin.svg';
import iconTrashPoint from '../../images/Trash.svg';
import iconMarker from '../../images/Marker.svg';
import iconMarkerSelected from '../../images/MarkerSelected.svg';
import Leaflet from "leaflet";

import './styles.scss';

const Maps: React.FC = () => {
  const center: LatLngExpression = [-15.185309410095217, -53.58890914916992];
  const [points, setPoints] = useState<PointsProps[]>([]);
  const [pointSelected, setPointSelected] = useState<PointsProps>();
  const [newPoint, setNewPoint] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteUnique, setDeleteUnique] = useState(true);
  const [messageAlert, setMessageAlert] = useState('');

  const purpleOptions = { color: 'purple' };
  const polygon: any = talhao.features[0].geometry.coordinates[0];
  const markerRef = useRef(null);

  const AddMarkerClick = () => {
    useMapEvent('click', (e) => {
      const { latlng } = e;
      setPoints([
        ...points,
        {
          id: points.length + 1,
          date: new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }),
          latLng: latlng,
          selected: false
        }
      ]);
    });

    return null;
  };

  const mapPinIcon = Leaflet.icon({
    iconUrl: iconMarker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  const mapPinIconSelected = Leaflet.icon({
    iconUrl: iconMarkerSelected,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  useEffect(() => {
    if (points.length === 0) {
      setNewPoint(false);
      setShowModal(false);
    }
  }, [points]);

  const editMarker = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          // setPosition(marker.getLatLng())
          console.log(marker._latlng);
        }
      },
    }),
    [],
  );

  const deletePoint = () => {
    const newPoints = points.filter(x => x.id !== pointSelected?.id);

    setPoints(newPoints);
    setShowModal(!showModal);
  };

  const deleteAllPoints = () => {
    setPoints([]);
    setShowModal(!showModal);
  };

  const handleDeletePoint = (unique: boolean) => {
    setShowModal(!showModal);
    setMessageAlert(
      unique ? `Tem certeza que deseja remover o Ponto nº ${pointSelected?.id}` : 'Tem certeza que deseja remover todos os pontos?'
    );
    setDeleteUnique(unique);
  };

  useEffect(() => {
    if (pointSelected) {
      const index = points.findIndex(x => x.id === pointSelected?.id);

      if (index !== -1) {
        setNewPoint(false);
      }
    }
  }, [pointSelected]);

  return (
    <>
      <Points
        points={points}
        setPoints={setPoints}
        pointSelected={pointSelected}
        setPointSelected={setPointSelected} />
      <MapContainer center={center} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon pathOptions={purpleOptions} positions={polygon} />
        {
          points.map((point: PointsProps) => (
            <Marker
              eventHandlers={editMarker}
              ref={markerRef}
              draggable={point.selected}
              icon={point.selected ? mapPinIconSelected : mapPinIcon}
              position={point.latLng} />
          ))
        }

        {newPoint && <AddMarkerClick />}
      </MapContainer>

      <div className="container-buttons">
        {pointSelected?.id && points.length > 0 && (
          <ActionButton
            title="Deletar Pin"
            background="#D20200"
            border="#D20200"
            color="#ffffff"
            icon={iconTrashPoint}
            action={() => handleDeletePoint(true)}
          />
        )}

        <ActionButton
          title="Adicionar Novo"
          background="#ffffff"
          border="#C8CED8"
          color="#1f2729"
          icon={iconNewPoint}
          selected={newPoint}
          action={() => setNewPoint(!newPoint)}
        />

        {points.length > 0 && <ActionButton
          title="Deletar Todos"
          background="#D20200"
          border="#D20200"
          color="#ffffff"
          icon={iconTrashPoint}
          action={() => handleDeletePoint(false)}
        />}
      </div>

      <Toast
        title="Atenção"
        description={messageAlert}
        showModal={showModal}
        setShowModal={setShowModal}
        action={deleteUnique && pointSelected?.id ? () => deletePoint() : () => deleteAllPoints()}
      />
    </>
  );
};

export default Maps;