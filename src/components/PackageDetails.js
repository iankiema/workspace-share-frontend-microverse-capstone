// PackageDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './sidebar';

function PackageDetails() {
  const { slug } = useParams();
  const [packageDetails, setPackageDetails] = useState({});

  useEffect(() => {
    async function fetchPackageDetails() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/packages/${slug}`,
        );
        const data = await response.json();

        // Check if data property exists
        if (data.data) {
          setPackageDetails(data.data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    }

    fetchPackageDetails();
  }, [slug]);

  const handleBookNow = (selectedPackage) => {
    // Placeholder logic for handling the booking process
    console.log('Booking now:', selectedPackage);
  };

  return (
    <div className="container col-lg-12">
      <div className="row col-lg-12">
        <div className="col-lg-3">
          <Navbar />
        </div>

        <div className="col-lg-9 text-center">
          {/* <h2>Package Details</h2> */}
          <h2>{packageDetails.attributes?.name}</h2>
          <div className="row">
            <div className="col-md-8 mb-4 mx-auto ">
              <div className="card">
                <img
                  src={packageDetails.attributes?.image_url}
                  className="card-img-top"
                  alt={packageDetails.attributes?.name}
                />
                <div className="card-body">
                  <p className="card-text">
                    {packageDetails.attributes?.description}
                  </p>
                  <p className="card-text">
                    $
                    {packageDetails.attributes?.price}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleBookNow(packageDetails)}
                    className="btn btn-primary"
                  >
                    Book Now
                  </button>
                  <Link to="/packages" className="btn btn-secondary ml-2">
                    Back to Packages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
