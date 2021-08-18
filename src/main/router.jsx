import { useState, useEffect } from "react";
import {
  HashRouter as BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Layout, firebase, Login } from "@/main";
import { Category, Product, AboutUs, Contact } from "@/components";
import { AdminLayout } from "@/components/admin";

export default function Router() {
  const abortController = new AbortController(); // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(setCurrentUser);

    return function cleanup() {
      abortController.abort();
    };
  }, [abortController]);

  if (firebase.auth.currentUser) {
    console.log("yes");
  } else {
    console.log("no");
  }
  return (
    <>
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route path="/category" component={Category} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact" component={Contact} />
          <Route path="/product/:id" component={Product} />
          <Route path="/login" component={Login} />
          {currentUser !== null ? (
            <Route path="/admin" component={AdminLayout} />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}
