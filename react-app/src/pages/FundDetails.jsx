import React from "react";
import "../custom.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Row, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../navigation/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";

function FundraiserDetailsPage() {
	const { address } = useParams();
    const navigate = useNavigate()
    const [fundraiser, setFundraiser] = useState("");
    const [donation, setDonation] = useState("");
    const [loggedIn, setLoggedIn] = useState(
		secureLocalStorage.getItem("userId")
	);


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

    const donateFundraiser = async () => {
        const validNumber = /^\d+$/.test(donation);

        if (!validNumber) {
			toast.error("Invalid Amount!", {
				position: "top-right",
				theme: "light",
			});
			return;
		}

        if(Number(donation) + Number(fundraiser.raisedAmount) > Number(fundraiser.goal)){
            toast.error("Exceeding fundraising goal!", {
				position: "top-right",
				theme: "light",
			});
			return;
        }
        
        try{
            toast.success("Donation Pending", {
                position: "top-right",
                theme: "light",
            });
            console.log("sent");
            console.log(donation);
            console.log(typeof donation)
            const response = await axios.post(`http://localhost:5000/donate/${address}`, {
                amount: donation
            });   
            
            console.log("Response:" + response.data)
            console.log(response);
            toast.success("Successfully donated", {
                position: "top-right",
                theme: "light",
            });
            navigate(0);
        }catch (error){
            console.log("Fundraiser creation error: " + error)
        }
    }

    const removeFundraiser = async () => {
        if(fundraiser.goal !== fundraiser.raisedAmount){
            toast.error("Goal not reached!", {
				position: "top-right",
				theme: "light",
			});
			return;
        }
        try{
            toast.success("Completion Pending", {
                position: "top-right",
                theme: "light",
            });
            console.log("sent");
            const response = await axios.delete(`http://localhost:5000/remove-fundraiser/${address}`, {
            });   
            
            console.log("Response:" + response.data)
            console.log(response);
            toast.success("Successfully Removed Fundraiser", {
                position: "top-right",
                theme: "light",
            });
            navigate("/allFundraisers");
        }catch (error){
            console.log("Fundraiser creation error: " + error)
        }
    }

	return (
		<div>
            <Navbar></Navbar>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            />
			<br />
			<h1>Fundraiser Details</h1>
			<br></br>
			<div className="card-wide">
				<div>
					<br></br>
					<div>
						<div className="card-body-wide">
							{fundraiser && 
                                <>
                                <h1 className="center-text">{fundraiser.title}</h1>
                                <Row>
                                    <p>&nbsp;</p>
                                    <h4 className="center-text"> {`${fundraiser.description}`}</h4>
                                    <br></br>
                                    <br></br>
                                    <h3 className="center-text">Current Fundraiser Progress:</h3>
                                    <h3 className="center-text">{`${fundraiser.raisedAmount} out of ${fundraiser.goal} Sepolia Raised`}</h3>
                                    {fundraiser.owner === fundraiser.userAddress && 
                                    <InputGroup className="center-text">
                                    <div className="d-grid gap-2">
                                    <Button onClick={removeFundraiser} disabled={!loggedIn ? "disabled" : ""} className="float-right" variant="warning" size="lg">
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
                                        onChange={e => {
                                            setDonation(Number(e.target.value));
                                            console.log(e.target.value);
                                        }}
                                    />
                                    <Button onClick={donateFundraiser} disabled={!loggedIn ? "disabled" : ""} variant="warning" id="button-addon2">
                                      Donate
                                    </Button>
                                  </InputGroup>
                                    }
                                </Row>
                                </>
                            }
                            {!fundraiser && <h5 className="center-text">Please wait...</h5>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default FundraiserDetailsPage;
