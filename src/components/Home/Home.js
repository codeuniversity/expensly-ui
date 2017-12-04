import React from 'react';
import './Home.css';
import Store from '../../services/Store';
class Home extends React.Component{
	state = {
		transactions: []
	}
	getTransactions = async ()=>{
		const transactions = await Store.get('transactions');
		this.setState({transactions});
	}
	componentDidMount(){
		this.getTransactions();
	}
	render(){
		return(
			<div className='Home'>

			</div>
		)
	}
}
export default Home
