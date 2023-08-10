import React, {useState} from "react";
import "../custom.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import Navbar from "../navigation/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FundraiserCreationPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goal, setGoal] = useState("");
    const [loggedIn, setLoggedIn] = useState(
		secureLocalStorage.getItem("userId")
	);
    const navigate = useNavigate();

    const createFundraiser = async () => {
        console.log("sent");
        // const validTitle = /^[A-Za-z0-9\s]+$/.test(title);
        // const validDescription = /^[A-Za-z0-9\s.,!?()-]*$/.test(description);
        // const validNumber = /^[1-9]|10$/.test(goal);

        // if(!title || !description || !goal){
        //     toast.error("Title, Description, and Goal Required!", {
		// 		position: "top-right",
		// 		theme: "light",
		// 	});
		// 	return;
        // }

        // if (!validTitle) {
		// 	toast.error("Invalid Title!", {
		// 		position: "top-right",
		// 		theme: "light",
		// 	});
		// 	return;
		// }

        // if (!validDescription) {
		// 	toast.error("Invalid Description!", {
		// 		position: "top-right",
		// 		theme: "light",
		// 	});
		// 	return;
		// }

        // if (!validNumber) {
		// 	toast.error("Invalid Number!", {
		// 		position: "top-right",
		// 		theme: "light",
		// 	});
		// 	return;
		// }
        
        try{
            console.log("try")
            const response = await axios.post("http://localhost:5000/create-fundraiser", {
                title,
                description,
                goal
            });   
            
            console.log("Response:" + response.data)
            console.log(response)
            navigate("/");
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
			<div className="bg-glass-4">
				<h1 className="center-text" style={{ paddingTop: 10 }}>
					Let's Get Your Fundraiser Started!
				</h1>
			</div>
            <br></br>
            <br></br>
            <br></br>
            <div className="container-fluid">
                <div className="card-md-6">
                    <h2 className="center-text" >Give us some info about your cause</h2>
                    <>
                    <Form.Label >Title</Form.Label>
                    <Form.Control
                        type="title"
                        value={title}
						onChange={e => {
							setTitle(e.target.value);
							console.log(e.target.value);
						}}
                    />
                    <Form.Text id="passwordHelpBlock" >
                        Give your fundraiser a name.
                    </Form.Text>
                    <br></br>
                    <Form.Label >Description</Form.Label>
                    <Form.Control
                        type="description"
                        value={description}
                        onChange={e => {
							setDescription(e.target.value);
							console.log(e.target.value);
						}}
                        as="textarea" rows={3}
                    />
                    <Form.Text id="passwordHelpBlock" >
                        Tell us a little bit about your cause.
                    </Form.Text>
                    <br></br>
                    <Form.Label >Goal</Form.Label>
                    <Form.Control
                        type="goal"
                        value={goal}
                        onChange={e => {
							setGoal(e.target.value);
							console.log(e.target.value);
						}}
                    />
                    <Form.Text id="passwordHelpBlock" >
                        How much are you looking to raise? Must be between 1-10 units.
                    </Form.Text>
                    </>
                    <br></br>
                    <Button onClick={createFundraiser}  className="custom-btn-2"  >
						Create Fundraiser
					</Button>
                </div>
            </div>
		</div>
	);
}

export default FundraiserCreationPage;