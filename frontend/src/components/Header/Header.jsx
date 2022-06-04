import {
	Container,
	Form,
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
const navigate = useNavigate();

	return (
		<Navbar expand='lg' className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Container>
				<Navbar.Brand>
					<Link to='/'>twoNote</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav className='m-auto'>
						<Form className='d-flex'>
							<FormControl
								type='search'
								placeholder='Search'
								className='me-2'
								aria-label='Search'
							/>
						</Form>
					</Nav>
					<Nav
						className=' my-2 my-lg-0'
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href='/mynotes'>
							{/* <Link to='/mynotes'> */}
							My Notes
							{/* </Link> */}
						</Nav.Link>
						<NavDropdown title='Muhammad Tayyab' id='navbarScrollingDropdown'>
							<NavDropdown.Item href='#action3'>My Profile</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								onClick={() => {
									localStorage.removeItem("userInfo");
									navigate("/");
								}}
							>
								Logout
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
