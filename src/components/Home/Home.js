import React from 'react';
import './Home.css';
import Store from '../../services/Store';
import Transaction from '../Transaction/Transaction'
class Home extends React.Component{
	state = {
		transactions: []
	}
	getTransactions = async ()=>{
		const transactions = await Store.get('transactions');
		this.setState({transactions});
		console.log(transactions);
	}
	componentDidMount(){
		this.getTransactions();
	}
	render(){
		let {transactions} = this.state;
		return(
			<div className='Home'>
				{transactions.map(transaction=>(
					<Transaction key={transaction.id} transaction={transaction}/>
				))}
			</div>
		)
	}
}
export default Home
