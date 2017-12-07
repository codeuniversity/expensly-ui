import React from 'react';
import './Transaction.css';
import utils from '../../utils';
import {Divider} from 'material-ui'
class Transaction extends React.Component{
	render(){
		let {transaction, className} = this.props;
		return(
			<div className='Transaction'>

				<h3>{transaction.name} <span className="light">{transaction.category}</span></h3>
				<p className="expense marginless">{utils.moneyFormat(transaction.cost)}</p>
				{transaction.item_count > 1 ?
					<span>{transaction.item_count}</span> : ''}
				<h6 className="Transaction-time light marginless">{new Date(transaction.created_at).toLocaleString()}</h6>
				<Divider />
			</div>
		)
	}
}
export default Transaction
