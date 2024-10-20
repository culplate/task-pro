import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import icons from '/src/assets/icons.svg';
import css from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email')
		.required('Email is required')
		.trim(),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
});

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		trigger,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onBlur',
		reValidateMode: 'onChange',
	});

	// const navigate = useNavigate();

	const onSubmit = data => {
		dispatch(logIn(data))
			.unwrap()
			.then()
			.catch(() => {
				toast.error('Invalid login or password! :(');
			});
		// navigate('/home');
	};

	const toggleShowPassword = () => {
		setShowPassword(prevState => !prevState);
	};

	return (
		<form className={css.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={css.formTitle}>
				<NavLink className={css.link} to="/auth/register">
					Registration
				</NavLink>
				<h1>Log in</h1>
			</div>
			<div className={css.inputWrap}>
				<input
					className={`${css.formInput} ${errors.email ? css.error : ''}`}
					type="text"
					name="email"
					placeholder="Enter your email"
					{...register('email', {
						onBlur: () => trigger('email'),
						onChange: () => trigger('email'),
					})}
				/>
				{errors.email && <p className={css.errors}>{errors.email.message}</p>}
			</div>
			<div className={css.inputWrap}>
				<input
					className={`${css.formInput} ${errors.password ? css.error : ''}`}
					type={showPassword ? 'text' : 'password'}
					{...register('password', {
						onBlur: () => trigger('password'),
						onChange: () => trigger('password'),
					})}
					placeholder="Enter your password"
				/>
				<svg
					className={css.icon}
					width="20"
					height="20"
					onClick={toggleShowPassword}
				>
					<use
						xlinkHref={`${icons}#${showPassword ? 'icon-eye' : 'icon-eye-off'}`}
					></use>
				</svg>
				{errors.password && (
					<p className={css.errors}>{errors.password.message}</p>
				)}
			</div>
			<button className={css.formBtn} type="submit" disabled={!isValid}>
				Log in Now
			</button>
		</form>
	);
};

export default LoginForm;
