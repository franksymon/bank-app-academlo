import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cleanTransfers } from '../../../store/actions/transfers.actions';
import { logout } from '../../../store/actions/user.actions';
import classes from './header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.setItem('id', '')
    dispatch(logout())
    dispatch(cleanTransfers())
  }

	return (
		<header className={classes.header}>
			<div className={classes.brand}>
				<a href="/">Academlo Bank</a>
			</div>

			<nav className={classes.navigation}>
				<ul>
					<li>
            <Link
              onClick={handleLogout}
              to="/login">Change account</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
