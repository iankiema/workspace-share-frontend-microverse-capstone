import { useState, useEffect } from "react";
import Navbar from "./sidebar";
import { loginUser } from "../redux/loginSlice";

function BookReservation() {
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [selectedPackage, setSelectedPackage] = useState("");
	const [packages, setPackages] = useState([]);

	useEffect(() => {
		async function getPackages() {
			try {
				const response = await fetch("http://localhost:3000/api/v1/packages");
				const responseData = await response.json();

				if (responseData.data && Array.isArray(responseData.data)) {
					setPackages(responseData.data);
				} else {
					console.error("Invalid data format:", responseData);
				}
			} catch (error) {
				console.error("Error fetching packages:", error);
			}
		}

		getPackages();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = loginUser.data.token;
			console.log("token:", token);
			const response = await fetch(
				"http://localhost:3000/api/v1/reservations",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ location, date, package: selectedPackage }),
				}
			);

			const responseData = await response.json();

			console.log("Reservation created:", responseData);
		} catch (error) {
			console.error("Error creating reservation:", error);
		}
	};

	return (
	);
}

export default BookReservation;
