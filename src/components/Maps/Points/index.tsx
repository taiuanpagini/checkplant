import React from 'react';
import { PointsCompProps, PointsProps } from '../interface';
import iconPoint from '../../../images/CultureIcon.svg';

import './styles.scss';

const Points: React.FC<PointsCompProps> = (props) => {
  const { points, setPointSelected, setPoints, pointSelected } = props;

  const selectPoint = (point: PointsProps) => {
    const index = points.findIndex(x => x.id === point.id);
    const indexOld = points.findIndex(x => x.id === pointSelected?.id);

    if (points[index].selected === true) {
      points[index].selected = false;

      setPointSelected({});
    } else {
      if (indexOld !== - 1) {
        points[indexOld].selected = false;
      }

      points[index].selected = true;

      setPointSelected(points[index]);
    }
  };

  return (
    <div className="container-points">
      <h3>Listagem de pontos</h3>
      {
        points.length === 0 ? (
          <h4>Sem pontos de monitoramento para exibir no momento.</h4>
        ) : (
          <ul>
            {
              points.map((point) => (
                <li className={point.selected ? 'point-selected' : ''} onClick={() => selectPoint(point)}>
                  <h3><img src={iconPoint} alt="icon-point" /> Ponto nº {point.id}</h3>
                  <p>Criado em: {point.date}</p>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default Points;