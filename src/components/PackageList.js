import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import Navbar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PackageList.css';

function PackageList() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function getPackages() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/packages');
        const responseData = await response.json();
        if (responseData.data && Array.isArray(responseData.data)) {
          setPackages(responseData.data);
        } else {
          console.error('Invalid data format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    }

    getPackages();
  }, []);

  return (
    <div className="container-fluid col-lg-12">
      <div className="row col-lg-12">
        <div className="col-lg-3">
          <Navbar />
        </div>

        <div className="col-lg-9 text-center">
          <h2>Our Packages</h2>
          <p>The best packages in the market</p>

          {packages.map((packaged) => (
            <div key={packaged.attributes.slug} className="col-md-4 mb-4">
              <div
                className="card clickable"
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <Link
                  to={`/packages/${packaged.attributes.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  className="card-link"
                >
                  <img
                    src={packaged.attributes.image_url}
                    className="card-img-top"
                    alt={packaged.attributes.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{packaged.attributes.name}</h5>
                    <p className="card-text">
                      {packaged.attributes.description}
                    </p>
                    <p className="card-text">
                      $
                      {packaged.attributes.price}
                    </p>
                  </div>
                </Link>

                <div className="social-icons-container mx-auto">
                  <button
                    className="icon-button"
                    type="button"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label="Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PackageList;
