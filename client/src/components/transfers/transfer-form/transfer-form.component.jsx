import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { newTransfer } from '../../../store/actions/transfers.actions';

// Components
import Modal from '../../ui/modal/modal.component';
import Input from '../../ui/input/input.component';
import Button from '../../ui/button/button.component';

import classes from './transfer-form.module.css';
import { getUserById } from '../../../store/actions/user.actions';

const TransferForm = ({ onHideModal }) => {
	const dispatch = useDispatch();
  const user = useSelector(state => state.users);

  const [formData, setFormData] = useState({
    recipientAccount: '',
    amount: ''
  })
  
  const handleChange = (e) => {
    
    const {name, value} = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const submitHandler = e => {

		e.preventDefault();
    const transferInfo = {
      ...formData,
      senderAccount: user.user?.accountNumber
    }
    dispatch(newTransfer(transferInfo))
    dispatch(getUserById(localStorage.getItem('id')));
		onHideModal();
	};

	return (
		<Modal onClick={onHideModal}>
			<h3 className={classes.title}>
				To make a transfer, please enter the following information
			</h3>
      <form
        onSubmit={submitHandler}
        className={classes['transfer-form']}>
				<Input
          label='Account number'
          type={'number'}
					name='recipientAccount'
          dataFunction={handleChange}
          inputData={formData}
				/>
				<Input
          label='Amount'
          type={'number'}
					name='amount'
          dataFunction={handleChange}
          inputData={formData}
				/>

				<Button>Transfer!</Button>
			</form>
		</Modal>
	);
};

export default TransferForm;
