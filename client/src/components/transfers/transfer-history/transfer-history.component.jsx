import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { getUsersTransfers } from '../../../store/actions/transfers.actions';
import { logout } from '../../../store/actions/user.actions';

// Components
import TransferItem from '../transfer-item/transfer-item.component';


const TransferHistory = () => {
  const transfers = useSelector(state => state.transfers)


	return (
		<div>
			{transfers.transfers &&
        transfers.transfers.map((transfer, index) => <TransferItem transfer={transfer} key={index}/>)}
		</div>
	);
};

export default TransferHistory;
