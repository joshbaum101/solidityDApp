import React from "react";
import { Link } from "react-router-dom";
import "../custom.css";

const Navbar = () => {
	return (
		<div class=".navbar-expand{-sm|-md|-lg|-xl|-xxl}">
			<div class="d-inline-flex p-2">
				<nav class="navbar navbar-toggleable-sm navbar-expand-lg bg-body-tertiary">
					<div class="container-fluid">
						<div className="border-rounded" class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav me-auto mb-2 mb-lg-0 list-unstyled">
								<li  class="nav-item">
                                    <Link className="navbar-text" to="/explorer">Log In</Link>
                                </li>
								<li class="nav-item">
									<Link className="navbar-text" to="/nodes">Nodes</Link>
								</li>

								<li class="nav-item">
									<Link className="navbar-text" to="/wallet">Wallet</Link>
								</li>

								<li class="nav-item">
									<Link className="navbar-text" to="/faucet">Faucet</Link>
								</li>

								<li class="nav-item">
									<Link className="navbar-text" to="/mine">Mine</Link>
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
