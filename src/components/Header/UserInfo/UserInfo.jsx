import { useState } from 'react';
import { Avatar } from '@mui/material';
import { Person as UserIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ModalForm from './Modal';
import {selectUser} from '../../../redux/auth/selectors';
import css from './UserInfo.module.css'

const UserInfo = () => {
	const { name, avatarUrl } = useSelector(selectUser);
	console.log('Avatar URL:', avatarUrl);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div className={css.wrap}>
		<div className={css.userinfo}>
			<span className={css.name}>{name}</span>
			<Avatar style={{
				width: '32px',
				height: '32px',
				borderRadius: '4px',
				cursor: 'pointer'
			}} onClick={handleOpen} src={avatarUrl || ''}>
				{!avatarUrl && <UserIcon />}
			</Avatar>
			<ModalForm
				open={open}
				handleClose={handleClose}
				user={{ name, avatarUrl }}
			/>
		</div>
		</div>
	);
};

export default UserInfo;
