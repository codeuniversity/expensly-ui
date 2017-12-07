import React from 'react';
import './AddTransaction.css';
import Divider from 'material-ui/Divider';
import TextField  from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from '../Subheader/Subheader';
import utils from '../../utils';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Plus from './plus.svg';
import Minus from './minus.svg';
import Store from '../../services/Store';
import AutoComplete from 'material-ui/AutoComplete';
class ItemForm extends React.Component{
	onChange = (e)=>{
		let {index, item} = this.props;
		let obj = {}
		console.log(e)
		obj[e.target.name] = e.target.value;
		let newItem = Object.assign(this.props.item, obj);
		this.props.onChange(newItem, index);
	}
	onNameChange = (name)=>{
		let {index, item} = this.props;
		let newItem = Object.assign(this.props.item, {name});
		this.props.onChange(newItem, index);
	}
	destroy = ()=>{
		this.props.onDestroy(this.props.index);
	}
	valid = ()=>{
		let {name,price,amount} = this.props.item;
		return name && name.length > 0 && price > 0 && amount >= 1
	}
	render(){
		let {item, articleNames} = this.props;
		let numberInputStyle = {
			maxWidth: 100
		}
		return (
			<div className={`ItemForm ${this.valid() ? 'valid':'invalid'}`}>
				<img src={Minus} alt='' onClick={this.destroy} className="ItemForm-destroy"/>
				{/* <TextField name="name" floatingLabelText="Item Name" value={item.name} onChange={this.onChange}/> */}
				<AutoComplete
          hintText="Item Name"
          searchText={item.name}
					onUpdateInput={this.onNameChange}
					name='name'
          dataSource={articleNames}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
        />
				<div>
					<TextField type="number" name="price" floatingLabelText="Price" value={item.price} onChange={this.onChange} style={numberInputStyle}/>
					<TextField type="number" name="amount" floatingLabelText="Amount" value={item.amount} onChange={this.onChange} style={numberInputStyle}/>
				</div>

				<Divider/>
			</div>
		)
	}
}

class ItemFormAdder extends React.Component{
	onItemAdd = ()=>{
		let emptyItem = {name:'', amount:1, price: '', article_id: ''}
		this.props.onAdd(emptyItem);
	}

	render(){
		return(
		<img src={Plus} alt='' className="ItemFormAdder" onClick={this.onItemAdd}/>
		)
	}
}

class AddTransaction extends React.Component{
	state = {
		items:[{name:'', amount:1, price: '', article_id: ''}],
		transactionName:'',
		articles: [],
	}

	onItemChange = (newItem, index)=>{
		let items = this.state.items.slice();
		items[index] = newItem;
		this.setState({items});
	}

	addItem = (item)=>{
		let items = this.state.items.concat([item]);
		this.setState({items});
	}

	destroyItem = (index)=>{
		let items = this.state.items.slice();
		items.splice(index, 1);
		this.setState({items});
	}

	totalPrice = ()=>{
		let items = this.state.items;
		let total = 0;
		items.forEach(item=>{
			if(item.price && item.amount){
				total += Number(item.price) * item.amount;
			}
		})
		return total;
	}

	hasValidItems = ()=>{
		let items = this.state.items;
		let hasValid = false;
		items.forEach(item=>{
			if(item.name && item.price && item.amount){
				hasValid = true;
			}
		});
		return hasValid;
	}

	getArticles = async ()=>{
		let articles = await Store.get('articles');
		this.setState({articles});
	}

	getArticleNames = ()=>{
		return this.state.articles.map(a=>a.name);
	}

	componentDidMount(){
		this.getArticles();
	}
	render(){
		let {items, transactionName} = this.state;
		return(
			<div className='AddTransaction'>
				<Subheader>
					<div style={{float:'right'}}>
						<span style={{marginRight:10}}>{utils.moneyFormat(this.totalPrice())}</span>
						<RaisedButton disabled={!this.hasValidItems()} label="save expense" primary={true}/>
					</div>
				</Subheader>
				{items.map((item, index)=>(
					<ItemForm
						key={index}
						item={item}
						onChange={this.onItemChange}
						onDestroy={this.destroyItem}
						articleNames={this.getArticleNames()}/>
				))}
				<ItemFormAdder onAdd={this.addItem}/>
				<br/>
			</div>
		)
	}
}
export default AddTransaction
