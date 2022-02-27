import Layout from "./components/layout/Layout";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Redirect to="/books/1" />
        </Route>
        <Route path="/books/:page">
          <Books />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
