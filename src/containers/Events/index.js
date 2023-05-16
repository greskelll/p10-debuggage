import { useState } from 'react';
import EventCard from '../../components/EventCard';
import Select from '../../components/Select';
import { useData } from '../../contexts/DataContext';
import Modal from '../Modal';
import ModalEvent from '../ModalEvent';

import './style.css';

const PER_PAGE = 9;

let keyNumber = 0;
function generateKey() {
	keyNumber += 1;
	return keyNumber.toString();
}

const EventList = () => {
	const { data, error } = useData();
	const [type, setType] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	/* le filtre renvoi un tableau filtrer */
	const eventFilter = type
		? data?.events.filter((event) => event.type === type)
		: data?.events;

	/* on génére la page avec pagination et on utilise les datas filtrés ou non */
	const filteredEvents = (eventFilter || []).filter((event, index) => {
		if (
			(currentPage - 1) * PER_PAGE <= index &&
			PER_PAGE * currentPage > index
		) {
			return event;
		}
		return false;
	});
	const GetData = (value) => {
		setType(value);
		setCurrentPage(1);
	};

	const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
	const typeList = new Set(data?.events.map((event) => event.type));

	return (
		<>
			{error && <div>An error occured</div>}
			{data === null ? (
				'loading'
			) : (
				<>
					<h3 className="SelectTitle">Catégories</h3>
					<Select
						onChange={GetData}
						selection={Array.from(typeList)}
					/>
					<div id="events" className="ListContainer">
						{filteredEvents.map((event) => (
							<Modal
								key={generateKey()}
								Content={<ModalEvent event={event} />}
							>
								{({ setIsOpened }) => (
									<EventCard
										onClick={() => setIsOpened(true)}
										imageSrc={event.cover}
										title={event.title}
										date={new Date(event.date)}
										label={event.type}
									/>
								)}
							</Modal>
						))}
					</div>
					<div key={pageNumber} className="Pagination">
						{[...Array(pageNumber || 0)].map((_, n) => (
							// eslint-disable-next-line react/no-array-index-key
							<a
								key={generateKey()}
								href="#events"
								onClick={() => setCurrentPage(n + 1)}
							>
								{n + 1}
							</a>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default EventList;
