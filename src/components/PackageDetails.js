// PackageDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./sidebar";

function PackageDetails() {
	const { slug } = useParams();
	const [packageDetails, setPackageDetails] = useState({});

	useEffect(() => {
		async function fetchPackageDetails() {
			try {
				const response = await fetch(
					`http://localhost:3000/api/v1/packages/${slug}`
				);
				const data = await response.json();

				// Check if data property exists
				if (data.data) {
					setPackageDetails(data.data);
				} else {
					console.error("Invalid data format:", data);
				}
			} catch (error) {
				console.error("Error fetching package details:", error);
			}
		}

		fetchPackageDetails();
	}, [slug]);

	const handleBookNow = (selectedPackage) => {
		// Placeholder logic for handling the booking process
		console.log("Booking now:", selectedPackage);
	};

	return (
	);
}

export default PackageDetails;
