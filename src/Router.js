import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home/Home';
class Router extends React.Component{
    render(){
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                    <Route path='/'>
                        <Navigation>
                            <Switch>
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
