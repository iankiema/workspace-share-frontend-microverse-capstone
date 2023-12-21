import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faTwitter,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PackageList.css";

function PackageList() {
	const [packages, setPackages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPackages() {
			try {
				const response = await fetch("http://localhost:3000/api/v1/packages");
				const responseData = await response.json();

				// Check if data property exists and is an array
				if (responseData.data && Array.isArray(responseData.data)) {
					setPackages(responseData.data);
				} else {
					console.error("Invalid data format:", responseData);
				}
			} catch (error) {
				console.error("Error fetching packages:", error);
			} finally {
				setLoading(false); // Set loading to false after data is fetched
			}
		}

		getPackages();
	}, []);

	return (
	);
}

export default PackageList;
