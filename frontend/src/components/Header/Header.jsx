import {
	Container,
	Form,
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	const { userInfo } = userLogin;
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<Navbar
			expand='lg'
			className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'
		>
			<Container>
				<Navbar.Brand>
					<Link to='/' className='d-flex gap-2'>
						<img src='../../../public/favicon2.png' alt='' />
						twoNote
					</Link>
				</Navbar.Brand>
				{userInfo ? (
					<>
						<Navbar.Toggle aria-controls='navbarScroll' />
						<Navbar.Collapse id='navbarScroll'>
							<Nav className='m-auto'>
								<Form className='d-flex'>
									<FormControl
										type='search'
										placeholder='Search'
										className='me-2'
										aria-label='Search'
										onChange={(e) => setSearch(e.target.value)}
									/>
								</Form>
							</Nav>
							<Nav
								className=' my-2 my-lg-0'
								style={{ maxHeight: "100px" }}
								navbarScroll
							>
								<Nav.Link>
									<Link to='/mynotes'>My Notes</Link>
								</Nav.Link>
								<NavDropdown
									title={userInfo?.name}
									id='navbarScrollingDropdown'
								>
									<NavDropdown.Item href='/profile '>
										My Profile
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={handleLogout}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</>
				) : (
					<Nav>
						<Nav.Link>
							<Link to='/login'>Login</Link>
						</Nav.Link>
					</Nav>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
