import React from 'react';
import './Navigation.css';
import Store from '../../services/Store';
import {NavLink,withRouter} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Categories from '../Categories/Categories'


class Navigation extends React.Component{
   constructor(props) {
    super(props);
    this.state = {open: false};
  }
    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

	onLogout = ()=>{
		console.log('force')
		Store.deauthenticate();
		window.location.reload();

	}

  handleClose = () =>{
     this.setState({open: false})
  }

	render(){
		return(
			<div className='Navigation'>

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
              <div className="menu-item">
                <NavLink
                  to="/"
                  exact={true}
                  activeClassName="mobile-active-link"
                  className="nav-link Profile"
                  onClick={this.handleClose}>
                  Home
                </NavLink>
              </div>
              <div className="menu-item">
              <NavLink
                to="/add"
                exact={true}
                activeClassName="mobile-active-link"
                className="nav-link Profile"
                onClick={this.handleClose}>
                Add an Expense
              </NavLink>
            </div>
            <div className="menu-item">
                <NavLink
                  to="/categories"
                  exact={true}
                  activeClassName="mobile-active-link"
                  className="nav-link Profile"
                  onClick={this.handleClose}>
                  Categories
                </NavLink>
              </div>
              <div className="menu-item">
              <NavLink
                to="/logout"
                exact={true}
                activeClassName="mobile-active-link"
                className="nav-link Profile"
                onClick={this.handleClose}>
                <div onClick={this.onLogout}>Logout</div>
              </NavLink>
              </div>
        </Drawer>

				<div className='app-header'>
          <div className="hamburger" onClick={this.handleToggle}> <span> </span> <span> </span> <span> </span> </div>
          <div className= "container">
  					<nav className="header-nav">
              <NavLink to="/" exact={true} activeClassName="active-link" className="nav-link Profile">
                Home
              </NavLink>
              <NavLink to="/add" exact={true} activeClassName="active-link" className="nav-link Profile">
                Add an Expense
              </NavLink>
              <NavLink to="/categories" exact={true} activeClassName="active-link" className="nav-link Profile">
                Categories
              </NavLink>
              <NavLink to="/logout" exact={true} activeClassName="active-link" className="nav-link Profile">
                <div onClick={this.onLogout}>Logout</div>
              </NavLink>
            </nav>
          </div>
				</div>

				<div className='main-body'>
          <div className='container'>
					{this.props.children}
          </div>
				</div>
			</div>
		)
	}
}
export default withRouter(Navigation);
