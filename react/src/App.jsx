// import Index from "./views/login"
// import home from "./views/home"
import Layout from "./views/layout"
import React from 'react';
import "./App.less"
 import { BrowserRouter as Router} from 'react-router-dom';
function App() {
    return (
        // <Router>
        //     <div className="App">
        //         <Redirect to="About"></Redirect>
        //         <Link to="/">home</Link>
        //         <Link to="/About">About</Link>
        //         <Link to="/Product">Product</Link>
        //         <hr/>
        //         <Route path="/" component={Layout} ></Route>
        //         <Switch>
        //         <Route path="/about" component={Index}></Route>
        //         <Route path="/product"component={home} ></Route>
        //         </Switch>
        //     </div>
        // </Router>
        // <div className={"app"}>
<Router>
            <Layout></Layout>
</Router>
        // </div>

    )
}
export default App;
