import { useState, useEffect } from "react";
import Navbar from "./sidebar";
import { loginUser } from "../redux/loginSlice";

function BookReservation() {
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [selectedPackage, setSelectedPackage] = useState("");
	const [packages, setPackages] = useState([]);
}

export default BookReservation;
