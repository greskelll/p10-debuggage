import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Field, { FIELD_TYPES } from '../../components/Field';
import Select from '../../components/Select';
import Button, { BUTTON_TYPES } from '../../components/Button';

const mockContactApi = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 1000);
		console.log('bien envoyé');
	});

const Form = ({ onSuccess, onError }) => {
	const [sending, setSending] = useState(false);
	const sendContact = useCallback(
		async (evt) => {
			evt.preventDefault();
			setSending(true);
			// We try to call mockContactApi
			try {
				await mockContactApi();
				setSending(false);
				onSuccess();
				/* il manquait le onSuccess a effectué en cas de réussite */
			} catch (err) {
				setSending(false);
				onError(err);
				console.log('non envoyé');
			}
		},
		[onSuccess, onError]
		/* dependency array, valeur que React surveille , si elle change la fonction est rerender, sinon on utilise la version memoisé
		le but est de rerender la fonction uniquement si on a fait un envoi ou reçu une erreur
		ici donc onSuccess et onError */
	);
	return (
		<form onSubmit={sendContact}>
			<div className="row">
				<div className="col">
					<Field placeholder="" label="Nom" required />
					<Field placeholder="" label="Prénom" required />
					<Select
						selection={['Personel', 'Entreprise']}
						onChange={() => null}
						label="Personel / Entreprise"
						type="large"
						titleEmpty
					/>
					<Field placeholder="" label="Email" required />
					<Button
						type={BUTTON_TYPES.SUBMIT}
						disabled={sending === true}
						/* modif faites ici , est bien disabled lorsque l'envoi est en cours */
					>
						{sending ? 'En cours' : 'Envoyer'}
					</Button>
				</div>
				<div className="col">
					<Field
						placeholder="message"
						label="Message"
						type={FIELD_TYPES.TEXTAREA}
					/>
				</div>
			</div>
		</form>
	);
};

Form.propTypes = {
	onError: PropTypes.func,
	onSuccess: PropTypes.func,
};

Form.defaultProps = {
	onError: () => null,
	onSuccess: () => null,
};

export default Form;
