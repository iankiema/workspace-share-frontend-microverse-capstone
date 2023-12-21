import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./sidebar";

function ReservationsList() {
	const [reservations, setReservations] = useState([]);

	useEffect(() => {
		async function getReservations() {
			try {
				const response = await fetch(
					"http://localhost:3000/api/v1/reservations"
				);
				const responseData = await response.json();

				// Check if data property exists and is an array
				if (responseData.data && Array.isArray(responseData.data)) {
					setReservations(responseData.data);
				} else {
					console.error("Invalid data format:", responseData);
				}
			} catch (error) {
				console.error("Error fetching reservations:", error);
			}
		}
		getReservations();
	}, []);

	const handleDelete = async (id) => {
		try {
			// Logic to delete reservation
			await fetch(`http://localhost:3000/api/v1/reservations/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			// After successful deletion, update the reservations state
			setReservations((prevReservations) =>
				prevReservations.filter((res) => res.id !== id)
			);
		} catch (error) {
			console.error("Error deleting reservation:", error);
		}
	};

	return (
	);
}

export default ReservationsList;
