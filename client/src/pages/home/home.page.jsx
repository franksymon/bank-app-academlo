import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import TransferForm from '../../components/transfers/transfer-form/transfer-form.component';
import TransferHistory from '../../components/transfers/transfer-history/transfer-history.component';
import Button from '../../components/ui/button/button.component';
import { getUsersTransfers } from '../../store/actions/transfers.actions';
import { getUserById } from '../../store/actions/user.actions';
import classes from './home.module.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.user?.id) {
      localStorage.setItem('id', users.user?.id)
    }
    const userId = localStorage.getItem('id')

    if (userId) {
      dispatch(getUsersTransfers(userId))
    }

    if (!users.user?.id && userId) {
      dispatch(getUserById(userId))
    }
    
  }, [dispatch, users])

	const hideModalHandler = () => {
		setShowModal(false);
	};

	const showModalHandler = () => {
		setShowModal(true);
	};

	return (
		<div className={classes.container}>
			<div className={classes['transaction-container']}>
				<p>Need to send money? Click this button!</p>
        <p>Available amount: ${users.user?.amount}</p>
				<Button onClick={showModalHandler}>New transfer</Button>
			</div>

			{showModal && <TransferForm onHideModal={hideModalHandler} />}

			<div className={classes['transfers-list']}>
				<p className={classes['transfers-list__header']}>
					Your most recents transfers
				</p>
        <TransferHistory/>
			</div>
		</div>
	);
};

export default Home;
