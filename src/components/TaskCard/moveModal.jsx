// import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/theme/selectors';
import css from './moveModal.module.css';
import sprite from '../../assets/icons.svg';
import clsx from 'clsx';

// MoveModal Component
export const MoveModal = ({ show, handleClose, handleMove }) => {
	const theme = useSelector(selectTheme);
	if (!show) return null;

	return (
		<div className={css.modalOverlay} onClick={handleClose}>
			<div
				className={clsx(css.modalContent, css[`modalContent_${theme}`])}
				onClick={e => e.stopPropagation()}
			>
				<div className={css.buttonContainer}>
					<button
						className={clsx(css.btnSt, css[`btnSt_${theme}`])}
						onClick={() => handleMove('InProgress')}
					>
						In Progress
						<svg className={clsx(css.iconMoove, css[`iconMoove_${theme}`])}>
							<use href={`${sprite}#icon-arrow-circle-broken-right`} />
						</svg>
					</button>
					<button
						className={clsx(css.btnSt, css[`btnSt_${theme}`])}
						onClick={() => handleMove('Done')}
					>
						Done
						<svg className={clsx(css.iconMoove, css[`iconMoove_${theme}`])}>
							<use href={`${sprite}#icon-arrow-circle-broken-right`} />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

MoveModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleMove: PropTypes.func.isRequired,
};

// EditeModal Component
export const EditModal = ({ show, handleClose, content }) => {
	if (!show) return null;

	return (
		<div className={css.modal}>
			<div className={css.modalContent}>
				<h2>Edit Task</h2>
				{content}
				<button onClick={handleClose}>Close</button>
			</div>
		</div>
	);
};

EditModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	content: PropTypes.node.isRequired,
};
