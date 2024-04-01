import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ItemDetailsPage } from './pages/ItemDetailsPage';
import { CartPage } from './pages/CartPage';
import CheckoutSuccess from './pages/CheckoutSuccess';


export const Routes = () => {
    return (
        <Router>
                <Switch>
                    <Route path="/">
                        <ItemDetailsPage />
                    </Route>
                    <Route path="/details/:detailId">
                        <CartPage />
                    </Route>
                    <Route>
                        <CheckoutSuccess />
                    </Route>
                </Switch>
        </Router>
    )

}