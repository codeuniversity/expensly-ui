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
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
class NameStep extends React.Component{

	onNameChange = (name)=>{
		let {index, item} = this.props;
		let newItem = Object.assign(this.props.item, {article: name});
		this.props.onChange(newItem, index);
	}
	valid = ()=>{
		let {item} = this.props;
		return !item.article;
	}
	handleNext = ()=>{
		let {articles, item, index} = this.props;
		let knownArticle = articles.filter(a=>a.name === item.article);
		if (knownArticle.length >= 1) {
			let knowInfo = {category_id: knownArticle[0].category.id, article_id: knownArticle[0].id};
			let newItem = Object.assign(item, knowInfo);
			this.props.onChange(newItem, index);
			this.props.handleNext(2);
		}else{
			this.props.handleNext(1);
		}
	}
	render(){
		let {articles, item, children} = this.props;

		return(
			<div>
				<AutoComplete
					hintText="Item Name"
					searchText={item.article}
					onUpdateInput={this.onNameChange}
					dataSource={articles.map(a=>a.name)}
					filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
					openOnFocus={true}/>
					<div>
						{/* <RaisedButton label="back" onClick={this.props.handlePrev}/> */}
						<RaisedButton label="next" onClick={this.handleNext} primary={true} disabled={this.valid()}/>
					</div>
			</div>
		)
	}
}

class CategoryStep extends React.Component{
	onCategoryChange = (category)=>{
		let {index, item} = this.props;
		let newItem = Object.assign(this.props.item, {category});
		this.props.onChange(newItem, index);
	}
	valid = ()=>{
		let {item} = this.props;
		return !item.category;
	}
	handleNext = ()=>{
		let {categories, item, index} = this.props;
		let knownCategory = categories.filter(c=>c.name === item.category);
		if (knownCategory.length >= 1) {
			let knowInfo = {category_id: knownCategory[0].id};
			let newItem = Object.assign(item, knowInfo);
			this.props.onChange(newItem, index);
		}
		this.props.handleNext();
	}
	render(){
		let {item, categories, children} = this.props;
		return(
			<div>
				<AutoComplete
					hintText="Item Category"
					searchText={item.category}
					onUpdateInput={this.onCategoryChange}
					dataSource={categories.map(c=>c.name)}
					filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
					openOnFocus={true}/>
					<div>
						<RaisedButton label="back" onClick={this.props.handlePrev}/>
						<RaisedButton label="next" onClick={this.handleNext} primary={true} disabled={this.valid()}/>
					</div>
			</div>
		)
	}
}

class PriceStep extends React.Component{
	onChange = (e)=>{
		let {index, item} = this.props;
		let obj = {}
		obj[e.target.name] = e.target.value;
		let newItem = Object.assign(item, obj);
		this.props.onChange(newItem, index);
	}
	valid = ()=>{
		let {item} = this.props;
		return !(item.price && item.amount);
	}

	render(){
		let {item, children} = this.props;
		let numberInputStyle = {
			maxWidth: 100
		}
		return(
			<div>
					<TextField
						type="number"
						name="price"
						floatingLabelText="Price"
						value={item.price}
						onChange={this.onChange}
						style={numberInputStyle}/>
					<TextField
						type="number"
						name="amount"
						floatingLabelText="Amount"
						value={item.amount}
						onChange={this.onChange}
						style={numberInputStyle}/>
					<div>
						<RaisedButton label="back" onClick={this.props.handlePrev}/>
						{/* <RaisedButton label="save" onClick={this.props.handleSave} primary={true} disabled={this.valid()}/> */}
					</div>
				</div>
		)
	}
}
class ItemForm extends React.Component{
	state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = (steps = 1) => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + steps,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
	};

	getStepContent(stepIndex) {

    switch (stepIndex) {
      case 0:
        return <NameStep {...this.props} handleNext={this.handleNext}/>
      case 1:
			return <CategoryStep {...this.props} handleNext={this.handleNext} handlePrev={this.handlePrev}/>
      case 2:
			return <PriceStep {...this.props} handlePrev={this.handlePrev}/>
      default:
        return 'You\'re a long way from home sonny jim!';
    }
	}

	onChange = (e)=>{
		let {index, item} = this.props;
		let obj = {}
		obj[e.target.name] = e.target.value;
		let newItem = Object.assign(this.props.item, obj);
		this.props.onChange(newItem, index);
	}

	destroy = ()=>{
		this.props.onDestroy(this.props.index);
	}
	render(){
		let {item, articleNames} = this.props;
		let stepIndex = this.state.stepIndex;
		return (
			<div className="ItemForm">
				<img src={Minus} alt='' onClick={this.destroy} className="ItemForm-destroy"/>
				{/* <TextField name="name" floatingLabelText="Item Name" value={item.name} onChange={this.onChange}/> */}

				<div>
					<Stepper activeStep={stepIndex}>
						<Step>
							<StepLabel>Name</StepLabel>
						</Step>
						<Step>
							<StepLabel>Category</StepLabel>
						</Step>
						<Step>
							<StepLabel>Price</StepLabel>
						</Step>
					</Stepper>
					{this.getStepContent(stepIndex)}
				</div>

				<Divider/>
			</div>
		)
	}
}

class ItemFormAdder extends React.Component{
	onItemAdd = ()=>{
		let emptyItem = {name:'', amount:1, price: '', article:'', category: ''}
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
		categories:[],
		isSaving: false,
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
			if(item.article && item.price && item.amount){
				hasValid = true;
			}
		});
		return hasValid;
	}

	getArticles = async ()=>{
		let articles = await Store.get('articles');
		this.setState({articles});
	}
	getCategories = async ()=>{
		let categories = await Store.get('categories');
		this.setState({categories})
	}

	componentDidMount(){
		this.getArticles();
		this.getCategories();
	}
	handleSave = async ()=>{
		this.setState({isSaving: true});
		let {items, transactionName} = this.state;
		let transaction = await Store.post('transactions',{name:transactionName});
		let savedItemPromises =  items.map(async (item)=>{
			let category;
			if (item.category_id) {
				category = {id:item.category_id};
			}else{
				category = await Store.post('categories', {name: item.category});
			}

			let article;
			if(item.article_id){
				article = {id: item.article_id};
			}else{
				article = await Store.post('articles', {name: item.article, category_id: category.id});
			}

			let itemToSave = {price:item.price,amount:item.amount, article_id:article.id};
			return Store.post(`transactions/${transaction.id}/items`, itemToSave);
		});
		await Promise.all(savedItemPromises);
		this.props.history.push('/');
		this.props.history.goForward();
	}
	isSaveable = ()=>{
		return (this.hasValidItems() && this.state.transactionName && !this.isSaving)
	}
	render(){
		let {items, transactionName, articles, categories} = this.state;
		return(
			<div className='AddTransaction'>
				<Subheader style={{minHeight:80, height:'auto'}}>
					<div style={{float:'right'}}>
						<TextField
							floatingLabelText="Transaction name"
							value={transactionName}
							onChange={(e)=>{this.setState({transactionName:e.target.value})}}/>
						<span style={{marginRight:10}}>{utils.moneyFormat(this.totalPrice())}</span>
						<RaisedButton disabled={!this.isSaveable()} label="save expense" primary={true} onClick={this.handleSave}/>
					</div>
				</Subheader>
				{items.map((item, index)=>(
					<ItemForm
						key={index}
						item={item}
						index={index}
						onChange={this.onItemChange}
						onDestroy={this.destroyItem}
						articles={articles}
						categories={categories}/>
				))}
				<ItemFormAdder onAdd={this.addItem}/>
				<br/>
			</div>
		)
	}
}
export default AddTransaction
