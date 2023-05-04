import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
	const { data } = useData();
	const [index, setIndex] = useState(0);
	const byDateDesc = data?.focus.sort((evtA, evtB) =>
		/* renvoie un tableau trié qui compare année puis mois puis jour de old vers new
		ex: 2021-05-12 > 2022-11-25 > 2023-03-13  */
		new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
	);
	/* pb byDateDesc undefined au premier changement de state */
	const nextCard = (length) => {
		setTimeout(
			/* il faut comparer l'index a la longueur du tableau d'image -1 puisque l'index commence à zéro */
			() => setIndex(index === length - 1 ? 0 : index + 1),
			5000
		);
	};
	useEffect(() => {
		nextCard(byDateDesc?.length);
	});
	console.log(byDateDesc);
	return (
		<div className="SlideCardList">
			{byDateDesc?.map((event, idx) => (
				<div key={event.id}>
					<div
						className={`SlideCard SlideCard--${
							index === idx ? 'display' : 'hide'
						}`}
					>
						<img src={event.cover} alt="forum" />
						<div className="SlideCard__descriptionContainer">
							<div className="SlideCard__description">
								<h3>{event.title}</h3>
								<p>{event.description}</p>
								<div>{getMonth(new Date(event.date))}</div>
							</div>
						</div>
					</div>
					<div className="SlideCard__paginationContainer">
						<div className="SlideCard__pagination">
							{byDateDesc?.map((_, radioIdx) => (
								<input
									key={event.Date}
									/* changement key pour corriger key non unique ? p-e */
									type="radio"
									name="radio-button"
									/* changement comparaison index === radioIdx plutot que idx === radioIdx */
									checked={index === radioIdx}
									readOnly /* pas de nature à naviguer */
								/>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Slider;
