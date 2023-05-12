import PropTypes from 'prop-types';
import { useState } from 'react';
import Icon from '../../components/Icon';
import './style.scss';

const Modal = ({ opened, Content, children }) => {
	const [isOpened, setIsOpened] = useState(opened);
	/* si je passe le state depuis react dev tool en true la modal s'ouvre bien
	donc je dois passer le state en true lorsque le formulaire est submit correctement */
	return (
		<>
			{children({ isOpened, setIsOpened })}
			{isOpened && (
				<div className="modal">
					<div className="content">
						{Content}
						<button
							type="button"
							data-testid="close-modal"
							onClick={() => setIsOpened(false)}
						>
							<Icon name="close" />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

Modal.defaultProps = {
	opened: false,
};

Modal.propTypes = {
	opened: PropTypes.bool,
	Content: PropTypes.node.isRequired,
	children: PropTypes.func.isRequired,
};

export default Modal;
