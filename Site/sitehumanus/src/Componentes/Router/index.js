import React from "react";
import Principal from '../../Paginas/Principal/principal'
import Blog from '../../Paginas/Blog/blog'

import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

export default () =>
   <Router>
      <div>
         <Switch>
            <Route exact path="/" component={Principal} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/home" component={Principal} />
         </Switch>
      </div>
   </Router>