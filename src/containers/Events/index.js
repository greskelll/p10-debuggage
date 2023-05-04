import { useState } from 'react';
import EventCard from '../../components/EventCard';
import Select from '../../components/Select';
import { useData } from '../../contexts/DataContext';
import Modal from '../Modal';
import ModalEvent from '../ModalEvent';

import './style.css';

const PER_PAGE = 9;

const EventList = () => {
	const { data, error } = useData();
	const [type, setType] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	/* le filtre renvoi bien un tableau filtrer */
	const eventFilter = type
		? data?.events.filter((event) => event.type === type)
		: data?.events;

	/* on génére la page avec pagination et on utlise les datas filtrés ou non */
	const filteredEvents = ((type ? eventFilter : data?.events) || []).filter(
		(event, index) => {
			if (
				(currentPage - 1) * PER_PAGE <= index &&
				PER_PAGE * currentPage > index
			) {
				return event;
			}
			return false;
		}
	);
	const GetData = (value) => {
		setType(value);
		setCurrentPage(1);
	};

	const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
	const typeList = new Set(data?.events.map((event) => event.type));
	/* premier pb de key */
	/*  renvoi les events disponible dans le selecteur */

	console.log(typeList);
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
								key={event.id}
								Content={<ModalEvent event={event} />}
							>
								{({ setIsOpened }) => (
									<EventCard
										onClick={() => setIsOpened(true)}
										imageSrc={event.cover}
										title={event.title}
										date={new Date(event.date)}
										label={event.type}
										/* Toute les périodes insique 24-25-26 février ??? dans le JSON */
									/>
								)}
							</Modal>
						))}
					</div>
					<div className="Pagination">
						{[...Array(pageNumber || 0)].map((_, n) => (
							// eslint-disable-next-line react/no-array-index-key
							<a
								key={n.index}
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
