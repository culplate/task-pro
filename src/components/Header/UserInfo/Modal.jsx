import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
	Modal,
	TextField,
	IconButton,
	InputAdornment,
	Avatar,
	Box,
	// FormControl,
	// FormHelperText,
} from '@mui/material';
import {
	// Person as UserIcon,
	Visibility,
	VisibilityOff,
	Add as AddIcon,
	Close as CloseIcon,
	// PaddingRounded,
	// BorderClear,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo } from '../../../redux/users/operation';
import { selectUserProfile } from '../../../redux/users/selectors';
// import { TextField, FormControl, FormHelperText } from '@material-ui/core';

import css from './Modal.module.css';
import clsx from 'clsx';
import { selectTheme } from '../../../redux/theme/selectors';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	name: yup.lazy(value => {
		if (value !== undefined && value !== '') {
			return yup
				.string()
				.min(2, 'Name must be at least 2 characters')
				.lowercase();
		}
		return yup.string().nullable().optional();
	}),
	email: yup.lazy(value => {
		if (value !== undefined && value !== '') {
			return yup.string().email('Invalid email').lowercase();
		}
		return yup.string().nullable().optional();
	}),
	password: yup.lazy(value => {
		if (value !== undefined && value !== '') {
			return yup.string().min(8).lowercase();
		}
		return yup.string().nullable().optional();
	}),
});

const ModalForm = ({ open, handleClose }) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUserProfile);
	const theme = useSelector(selectTheme);
	const [showPassword, setShowPassword] = useState(false);
	const [userAvatar, setUserAvatar] = useState(user.avatarURL);

	useEffect(() => {
		setUserAvatar(user.avatarURL);
	}, [user.avatarURL]);

	const {
		handleSubmit,
		control,
		register,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			name: user.name || '',
			email: user.email || '',
			password: user.password || '',
			avatarURL: '',
		},
	});

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleAvatarChange = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setUserAvatar(reader.result);
			};
			reader.readAsDataURL(file);
			register('avatarURL').onChange(e); // Реєстрація зміни файлу
			trigger('avatarURL');
		}
	};

	const onSubmit = data => {
		const formData = new FormData();
		// formData.append('name', data.name);
		// formData.append('email', data.email);
		// formData.append('password', data.password);
		if (data.name) {
			formData.append('name', data.name);
		}
		if (data.email) {
			formData.append('email', data.email);
		}
		if (data.password) {
			formData.append('password', data.password);
		}
		if (data.avatarURL && data.avatarURL[0]) {
			formData.append('avatar', data.avatarURL[0]);
		}

		dispatch(editUserInfo({ formData }))
			.unwrap()
			.then(response => {
				if (response.error) {
					console.error('Error updating user:', response.error);
				} else {
					handleClose();
				}
			})
			.catch(error => {
				console.error('Error dispatching editUser:', error);
			});
	};

	const InputField = styled(TextField)({
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor:
					theme === 'violet'
						? 'rgba(82, 85, 188, 0.5)'
						: 'rgba(157, 200, 136, 0.5)',
				borderWidth: '1px',
				borderRadius: '8px',
				height: '55px',
				fontFamily: ['Poppins', 'Arial'].join(','),
				fontSize: 14,
				fontWeight: 400,
				paddingLeft: '0',
				paddingRight: '18px',
			},
			'& .MuiOutlinedInput-input': {
				color:
					theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(22, 22, 22, 1)',
			},
			'&:hover fieldset': {
				borderColor:
					theme === 'violet'
						? 'rgba(82, 85, 188, 1)'
						: 'rgba(157, 200, 136, 1)',
				borderWidth: '1px',
			},
			'&.Mui-focused fieldset': {
				borderColor:
					theme === 'violet'
						? 'rgba(82, 85, 188, 1)'
						: 'rgba(157, 200, 136, 1)',
				borderWidth: '1px',
				color:
					theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(22, 22, 22, 1)',
			},
		},
		'& .MuiInputBase-input': {
			fontSize: 14,
			fontFamily: ['Poppins', 'Arial'].join(','),
		},
		'& .MuiInputBase-input:-webkit-autofill': {
			WebkitBoxShadow:
				theme === 'dark'
					? '0 0 0 1000px rgba(21, 21, 21, 1) inset'
					: '0 0 0 1000px rgb(246, 246, 247, 0.8) inset',
			WebkitTextFillColor:
				theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(22, 22, 22, 1)',
		},
	});
	return (
		<Modal open={open} onClose={handleClose}>
			<Box className={clsx(css.modalBox, css[theme])}>
				<div className={clsx(css.wrap, css[theme])}>
					<IconButton onClick={handleClose}>
						<CloseIcon className={clsx(css.closeBtn, css[theme])} />
					</IconButton>
				</div>
				<h2 className={clsx(css.title, css[theme])}>Edit profile</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={clsx(css.form, css[theme])}
					noValidate
				>
					<div className={css.userBlock}>
						<div className={clsx(css.photoUpload, css[theme])}>
							<Avatar
								style={{
									width: '68px',
									height: '68px',
									borderRadius: '8px',
									backgroundColor: 'rgba(255, 255, 255, 0.5)',
								}}
								src={userAvatar}
								// className={clsx(css.userAvatar, css[theme])}
								// src={
								// 	userAvatar ||
								// 	`${icons}#${
								// 		theme === 'light' ? 'icon-user-light' : 'icon-user-violet'
								// 	}`
								// }
							>
								{/* {!userAvatar && <UserIcon />} */}
							</Avatar>
							<IconButton component="label">
								<input
									type="file"
									hidden
									accept="image/*"
									{...register('avatarURL')}
									onChange={handleAvatarChange}
								/>
								<AddIcon className={clsx(css.plusBtn, css[theme])} />
							</IconButton>
						</div>
					</div>
					<div className={clsx(css.formFields, css[theme])}>
						<div className={css.inputArea}>
							<Controller
								name="name"
								control={control}
								render={({ field }) => {
									return (
										<InputField
											// autoFocus
											fullWidth
											{...field}
											type="text"
											placeholder={user.name}
											// value={field.value}
											// onChange={e => {
											// 	field.onChange(e);

											// 	// trigger('name');
											// }}
											// onBlur={() => {
											// 	trigger('name');
											// 	// inputRef.current.focus();
											// }}
											error={!!errors.name}
											helperText={errors.name ? errors.name.message : ''}
										/>
									);
								}}
							/>
							{/* {errors.name && (
								<p className={css.errors}>{errors.name.message}</p>
							)} */}
						</div>
						<div className={css.inputArea}>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<InputField
										// autoFocus
										fullWidth
										{...field}
										type="email"
										placeholder={user.email}
										// onChange={e => {
										// 	field.onChange(e);
										// 	// trigger('email');
										// }}
										// error={!!errors.email}
										// helperText={errors.email?.message}
										error={!!errors.email}
										helperText={errors.email ? errors.email.message : ''}
									/>
								)}
							/>
							{/* {errors.email && (
								<p className={css.errors}>{errors.email.message}</p>
							)} */}
						</div>
						<div className={css.inputArea}>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<InputField
										// autoFocus
										fullWidth
										type={showPassword ? 'text' : 'password'}
										{...field}
										placeholder="Password"
										// onChange={e => {
										// 	field.onChange(e);
										// 	// trigger('password');
										// }}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleClickShowPassword}
														className={clsx(css.showPasswordBtn, css[theme])}
													>
														{showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
										// error={!!errors.password}
										// helperText={errors.password?.message}
										error={!!errors.password}
										helperText={errors.password ? errors.password.message : ''}
									/>
								)}
							/>
							{/* {errors.password && (
								<p className={css.errors}>{errors.password.message}</p>
							)} */}
						</div>
					</div>
					<button type="submit" className={clsx(css.submitBtn, css[theme])}>
						Send
					</button>
				</form>
			</Box>
		</Modal>
	);
};

export default ModalForm;
