import React from 'react';
import './Transaction.css';
import utils from '../../utils';
import Divider from 'material-ui/Divider'
import Store from '../../services/Store';
import Item from '../Item/Item';
class Transaction extends React.Component{
	state = {
		items: [],
		showingItems: false,
	}
	getItems = async ()=>{
		let transaction = this.props.transaction;
		let items = await Store.get(`transactions/${transaction.id}/items`);
		this.setState({items})
	}
	toggleShow = ()=>{
		let {showingItems} = this.state;
		if (!showingItems){
			this.getItems();
		}
		this.setState({showingItems:!showingItems});
	}
	render(){

		let {transaction, className} = this.props;
		let {showingItems, items} = this.state;
		console.log(items);
		console.log(showingItems);
		return(
			<div className={`Transaction ${className || ''}`}>

				<h3>{transaction.name} <span className="light">{transaction.category}</span></h3>

				{!showingItems ?
				<div>
					<p className="expense marginless">{utils.moneyFormat(transaction.cost)}</p>
					<span className="link-like" onClick={this.toggleShow}>{transaction.item_count} items</span>
				</div>
					:
					<div className="Transaction-Itemlist">
						{items.map(item=>(
							<Item key={item.id} item={item}/>
						))}
						<p className="expense marginless right">{utils.moneyFormat(transaction.cost)}</p>
					<div className="clear">	<span className="link-like" onClick={this.toggleShow}>show less</span> </div>

					</div>}
				<h6 className="Transaction-time light marginless">{new Date(transaction.created_at).toLocaleString()}</h6>
				<Divider />
			</div>
		)
	}
}
export default Transaction
