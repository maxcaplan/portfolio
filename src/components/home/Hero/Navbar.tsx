import logoDark from "../../../assets/logo/logo_dark.svg";
import logoSmDark from "../../../assets/logo/logo_sm_dark.svg";

import NavLinks from "../../common/NavLinks";

/** Hero section navbar component */
export function Navbar() {
	return (
		<div id="navbar" className="z-50 w-full">
			<div
				id="navbar-container"
				className="w-full h-full flex flex-row items-center"
			>
				<img
					src={logoDark}
					alt="Max Caplan"
					id="navbar-logo"
					className="hidden md:flex self-stretch h-8"
				/>
				<img
					src={logoSmDark}
					alt="Max Caplan"
					id="navbar-logo-sm"
					className="flex md:hidden self-stretch h-8"
				/>

				<div id="navbar-right" className="w-full flex flex-row justify-end">
					<NavLinks homePage={true} className="flex flex-col items-end gap-4" />
				</div>
			</div>
		</div>
	);
}

export default Navbar;
