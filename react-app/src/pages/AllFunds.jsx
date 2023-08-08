import React, {useState, useEffect} from "react";
import "../custom.css";
import { Button, Row } from "react-bootstrap";
import Navbar from "../navigation/NavBar";
import axios from "axios";

function AllFundraisersPage() {
    const temp = [];
    const [fundraisersArr, setFundraisersArr] = useState([]);
    

    useEffect(() => {
		(async function getFundraisers() {
			const fundraisers = await axios.get(
				"http://localhost:5000/get-fundraisers"
			);
			// console.log("fundraisers: " + fundraisers);
            // console.log("fundraisers data: " + fundraisers.data[0].title);
			// console.log(JSON.stringify(fundraisers.data, null, 2))
            fundraisers.data.forEach((e) => {
                console.log(e.address);
                temp.push(e);
            })
            setFundraisersArr(temp);
            console.log(temp);
            console.log(temp.length);
		})();
	}, []);

	return (
		<div>
			<Navbar></Navbar>
			<br />
			<div className="bg-glass-4">
				<h2 className="center-text" style={{ paddingTop: 10 }}>
					Welcome to 
				</h2>
				<h1 className="ln-ht-2">CryptoRaiser</h1>
			</div>
            <br></br>
            <br></br>
            <br></br>
            <div className="card-wide">
                <div className="card-body">
                    <div>
                        <h4 className="card-title-4">
                            Active Fundraisers
                        </h4>
                    </div>
                    <div className="scrollable-3">
                        {fundraisersArr.length > 0 &&
                            fundraisersArr.map((d, index) => (
                                <Row className="txn-data">
                                    <p className="first-line ln-ht">
                                        <span>
                                            Title:{" "}
                                            {d.title}
                                        </span>
                                    </p>
                                    <p className="ln-ht">
                                        Description:{" "}
                                        <br></br>
                                        <br></br>
                                        <p>{d.description}</p>
                                    </p>
                                    <p className="ln-ht">
                                        Goal:{" "}
                                        {d.goal}
                                    </p>
                                    <p className="ln-ht">
                                        Raised Amount:{" "}
                                        {d.raisedAmount}
                                    </p>
                                    <Button href={`/fundraiserDetails/${d.address}`} >Learn more</Button>
                                    <br></br>
                                    <br></br>
                                </Row>
                            ))}
                    </div>
                </div>
            </div>
		</div>
	);
}

export default AllFundraisersPage;