import MenuIcon from '@mui/icons-material/Menu';
import css from './Header.module.css';

const Header = () => {
	return (
		<div className={css.header}>
			{innerWidth < 1440 && (
				<div>
					<MenuIcon className={css.userIcon} />
				</div>
			)}
			<div className={css.homeImg}>
				<h1>Header1</h1>
				{/* <MenuIcon className={css.userIcon} /> */}
			</div>
		</div>
	);
};

export default Header;

// import css from './Header.module.css';

// const Header = () => {
// 	return (
// 		// <h1>Header1</h1>
// 		<div className={css.header}>
// 			<div>
// 				<div className={css.homeImg}>
// 					<img src="Logo-image/Image-phone.png" alt="User photo" />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Header;
