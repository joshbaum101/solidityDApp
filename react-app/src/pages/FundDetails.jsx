import React from "react";
import "../custom.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Row, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function FundraiserDetailsPage() {
	const { address } = useParams();
    const [fundraiser, setFundraiser] = useState("");
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
		(async function getFundraisers() {
			const fundraiserDetail = await axios.get(
				`http://localhost:5000/get-fundraiser/${address}`
			);
			
            console.log(fundraiserDetail.data);
            setFundraiser(fundraiserDetail.data);
            console.log(fundraiser)

		})();
	}, []);

	return (
		<div>
			<br />
			<h1>Fundraiser Details</h1>
			<br></br>
			<div className="card-wide">
				<div>
					<br></br>
					<div>
						<div className="card-body-wide">
							{/* <Container fluid> */}
                            <h1 className="center-text">{fundraiser.title}</h1>
							<Row>
								<p>&nbsp;</p>
								<h4 className="center-text"> {`${fundraiser.description}`}</h4>
                                <br></br>
                                <br></br>
								<h3 className="center-text">Current Fundraiser Progress:</h3>
                                <br></br>
								<h3 className="center-text">{`${fundraiser.raisedAmount} out of ${fundraiser.goal} Sepolia Raised`}</h3>
                                {fundraiser.owner === fundraiser.userAddress && 
                                <InputGroup className="center-text">
                                <div className="d-grid gap-2">
                                <Button className="float-right" variant="warning" size="lg">
                                    Complete Fundraiser
                                </Button>
                                </div>
                              </InputGroup>
                                }
                                {fundraiser.owner !== fundraiser.userAddress && 
                                <InputGroup className="center-text">
                                 <Form.Control
                                    style={{width: "16rem"}}
                                    className="float-right"
                                    type="text"
                                    placeholder="Donation amount"
                                    aria-label="Input group example"
                                    aria-describedby="btnGroupAddon"
                                />
                                <Button  variant="warning" id="button-addon2">
                                  Button
                                </Button>
                              </InputGroup>
                                }
							</Row>
							{/* </Container> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default FundraiserDetailsPage;
