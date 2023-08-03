import React, {useState} from "react";
import "../custom.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Navbar from "../navigation/NavBar";

function RegisterPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {
        try{
            const response = await axios.post("http://localhost:5000/register", {
                userName,
                password
            });   
            
            console.log(response.data.message)
        }catch (error){
            console.log("Registration error: " + error)
        }
    }

	return (
		<div>
            <Navbar></Navbar>
			<br />
			<div className="bg-glass-4">
				<h1 className="center-text" style={{ paddingTop: 10 }}>
					Become a CryptoRaiser
				</h1>
			</div>
            <br></br>
            <br></br>
            <br></br>
            <div className="container-fluid">
                <div className="card-md-5">
                    <h2 className="center-text" >Let's get you registered!</h2>
                    <>
                    <Form.Label >Username</Form.Label>
                    <Form.Control
                        type="username"
                        value={userName}
						onChange={e => {
							setUserName(e.target.value);
							console.log(e.target.value);
						}}
                    />
                    <Form.Text id="passwordHelpBlock" >
                        Your username must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                    <br></br>
                    <Form.Label >Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
						onChange={e => {
							setPassword(e.target.value);
							console.log(e.target.value);
						}}
                    />
                    <Form.Text id="passwordHelpBlock" >
                        Your password must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                    </>
                    <Button onClick={registerUser}  className="custom-btn-2"  >
						Register
					</Button>
                </div>
            </div>
		</div>
	);
}

export default RegisterPage;