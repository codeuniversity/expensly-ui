import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home/Home';
import AddTransaction from './components/AddTransaction/AddTransaction'
import Categories from './components/Categories/Categories'
import Category from './components/Category/Category'
import Article from './components/Article/Article'
class Router extends React.Component{
    render(){
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                    <Route path='/'>
                        <Navigation>
                            <Switch>
                            <Route path="/add" component={AddTransaction}/>
                            <Route path="/categories/:category_id" component={Category}/>
                            <Route path="/categories" component={Categories}/>
                            <Route path="/articles/:article_id" component={Article}/>
                            <Route path="/" component={Home}/>
                            </Switch>
                        </Navigation>
                    </Route>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}
export default Router;
