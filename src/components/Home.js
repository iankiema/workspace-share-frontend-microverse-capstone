import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <Navbar />
        </div>
        <div className="col-lg-9 mx-auto my-auto">
          <div className="jumbotron mx-auto my-auto">
            <h1 className="display-4">Welcome to Executive Workspaces</h1>
            <p className="lead">
              Discover a new level of productivity in our premium executive
              workspaces.
            </p>
            <hr className="my-4" />
            <p>
              Our workspaces are designed with your success in mind. From
              comfortable offices to state-of-the-art meeting rooms, we've got
              everything you need to thrive in the business world.
            </p>
            <p className="lead">
              <Link
                to="/packages"
                className="btn btn-primary btn-lg"
                role="button"
              >
                Explore Packages
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
