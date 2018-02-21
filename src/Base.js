import React, { Component } from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Header from "./Header/Header";
import SubHeader from "./SubHeader/SubHeader";
import Footer from "./Footer/Footer";
import BountyResults from "./BountyResults/BountyResults";

class Base extends Component {
  constructor(props) {
		super(props);
		this.state = { };
	}
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <SubHeader />
          <div className="content">
            <Link to="/">Home</Link>
            <Link to="/results">Results</Link>
            {/* <Link to="/contact">Contact</Link>
            <Link to="/projects">Projects</Link> */}

            {/* <Route exact path="/" component={Welcome} /> */}
            <Route path="/results" component={BountyResults} />
            {/* <Route path="/login" component={Login} />
            <Route path="/bounty" component={Bounty} /> */}
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
 
export default Base;