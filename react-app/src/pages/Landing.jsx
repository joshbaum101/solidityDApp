import React from "react";
import "../custom.css";
import { Button } from "react-bootstrap";

function LandingPage() {
	return (
		<div>
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
            <div className="container-fluid">
                <div className="card-md-5">
                    <h2 className="center-text" >Let's raise some crypto!</h2>
                    <br></br>
                    <p style={{ marginLeft: 10 }}>Raising funds with CryptoRaiser is a breeze! After creating your account, you can start raising! After giving some details regarding your fundraiser, we deploy a smart contract that can recieve donations. From there, you just have to spread the word about your cause. Be sure to check out the other fundraisers and spread the love! </p>
                    <br></br>
                    <Button className="custom-btn-2"  >
						Start Fundraising
					</Button>
                </div>

            </div>
		</div>
	);
}

export default LandingPage;