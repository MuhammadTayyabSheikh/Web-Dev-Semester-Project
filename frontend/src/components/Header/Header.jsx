import {
	Container,
	Form,
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";

const Header = () => {
	return (
		<Navbar expand='lg' className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Container>
				<Navbar.Brand href='#'>twoNote</Navbar.Brand>
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
						<Nav.Link href='#action1'>My Notes</Nav.Link>
						<NavDropdown title='Muhammad Tayyab' id='navbarScrollingDropdown'>
							<NavDropdown.Item href='#action3'>My Profile</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href='#action5'>Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
