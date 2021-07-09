import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
import OrderCheckout from "./components/OrderCheckout";
import Test from "./components/Test";
import * as sessionActions from "./store/session";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/products/:id'>
            <ProductPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/orders/:id">
            <ShoppingCart />
          </Route>
          <Route path="/checkout">
            <OrderCheckout />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
