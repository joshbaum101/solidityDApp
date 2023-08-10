import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../custom.css";
import secureLocalStorage from "react-secure-storage";

const Navbar = () => {

	const [loggedIn, setLoggedIn] = useState(false);
	var iD = secureLocalStorage.getItem("userId");

	useEffect(() => {
		let userId = secureLocalStorage.getItem("userId");
		console.log("loggedIn: " + userId)
		if(userId){
			setLoggedIn(true);
		}
	}, [setLoggedIn, iD]);

	const handleLogout = async () => {
		secureLocalStorage.removeItem("userId");
		setLoggedIn(false);
	}

	return (
		<div class=".navbar-expand{-sm|-md|-lg|-xl|-xxl}">
			<div class="d-inline-flex p-2">
				<nav class="navbar navbar-toggleable-sm navbar-expand-lg bg-body-tertiary">
					<div class="container-fluid">
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav border-rounded me-auto mb-2 mb-lg-0 list-unstyled">
								<li  class="nav-item">
                                    <Link className="navbar-text" to="/">Home</Link>
                                </li>
								{!loggedIn && (
									<>
										<li  class="nav-item">
											<Link className="navbar-text" to="/register">Register</Link>
										</li>
										<li  class="nav-item">
											<Link className="navbar-text" to="/login">Log in</Link>
										</li>
									</>
								)}
                                {loggedIn && (
									<>
										<li  class="nav-item">
											<Link onClick={handleLogout} className="navbar-text" to="/">Log out</Link>
										</li>
										<li class="nav-item">
											<Link className="navbar-text" to="/myFundraisers">My Fundraisers</Link>
										</li>
									</>
								)}
								<li class="nav-item">
									<Link className="navbar-text" to="/allFundraisers">All Fundraisers</Link>
								</li>

								<li class="nav-item">
									<Link className="navbar-text" to="/createFundraiser">Start a Fundraiser</Link>
								</li>

								
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};
export default Navbar;
