import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';
import './style.scss';

let keyNumber = 0;
function generateKey() {
	keyNumber += 1;
	return keyNumber.toString();
}

const Slider = () => {
	const { data } = useData();
	const [index, setIndex] = useState(0);
	const byDateDesc = data?.focus.sort((evtA, evtB) =>
		/* renvoie un tableau trié qui compare année puis mois puis jour de old vers new
		ex: 2021-05-12 > 2022-11-25 > 2023-03-13  */
		new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
	);
	const nextCard = (length) => {
		setTimeout(() => setIndex(index === length - 1 ? 0 : index + 1), 5000);
	};
	useEffect(() => {
		nextCard(byDateDesc?.length);
	});
	return (
		<div className="SlideCardList">
			{byDateDesc?.map((event, id) => (
				<div key={generateKey()}>
					<div
						className={`SlideCard SlideCard--${
							index === id ? 'display' : 'hide'
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
									key={generateKey()}
									type="radio"
									name="radio-button"
									checked={index === radioIdx}
									readOnly
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
