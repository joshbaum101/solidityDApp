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
            <br></br>
            <br></br>
            <br></br>
            <div className="card-wide">
                <div className="card-body">
                    <div>
                        <h4 className="center-text">
                            All Active Fundraisers
                        </h4>
                    </div>
                    <div className="scrollable-3">
                    {fundraisersArr.length === 0 && <h5 className="center-text">Please wait...</h5>}
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
                                    <Button variant="warning" href={`/fundraiserDetails/${d.address}`} >Learn more</Button>
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