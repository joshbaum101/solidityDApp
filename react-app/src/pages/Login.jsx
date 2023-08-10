import React, {useState} from "react";
import "../custom.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import Navbar from "../navigation/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = async () => {
        const validUsername = /^[a-zA-Z0-9_]{3,16}$/.test(userName);
        const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password);

        if(!userName || !password){
            toast.error("Both Username and Password Required!", {
				position: "top-right",
				theme: "light",
			});
			return;
        }

        if (!validUsername) {
			toast.error("Invalid Username!", {
				position: "top-right",
				theme: "light",
			});
			return;
		}

		if (!validPassword) {
			toast.error("Invalid Password!", {
				position: "top-right",
				theme: "light",
			});
			return;
		}

        
        try{
            const response = await axios.post("http://localhost:5000/login", {
                userName,
                password
            });   
            
            console.log(response.data.message)

            const userIdResponse = await axios.get(`http://localhost:5000/getID/${userName}`);
            console.log("userIdResponse: " + userIdResponse.data.userId)
            // console.log(JSON.stringify(userIdResponse))
            const userId = userIdResponse.data.userId;
            secureLocalStorage.setItem("userId", userId);
            toast.success("Successful Login", {
                position: "top-right",
                theme: "light",
            });
            navigate("/");
        }catch (error){
            console.log("Login error: " + error)
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
					Already a CryptoRaiser?
				</h1>
			</div>
            <br></br>
            <br></br>
            <br></br>
            <div className="container-fluid">
                <div className="card-md-5">
                    <h2 className="center-text" >Let's get you logged in!</h2>
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
                    <Button onClick={loginUser}  className="custom-btn-2"  >
						Login
					</Button>
                </div>
            </div>
		</div>
	);
}

export default LoginPage;