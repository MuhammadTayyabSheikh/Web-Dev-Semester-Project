import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import notes from "../../data/notes";

const MyNotes = () => {
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
		}
	};

	return (
		<MainScreen title={"Welcome Back Tayyab"}>
			<Link to='createnote'>
				<Button variant='success'>Create new Note</Button>
			</Link>
			{notes.map((note) => (
				<Accordion>
					<Card className='my-3'>
						<Card.Header className='d-flex'>
							<span
								style={{
									color: "#fff",
									textDecoration: "none",
									flex: 1,
									cursor: "pointer",
									alignSelf: "center",
									fontsize: "1.5rem",
								}}
							>
								<Accordion.Toggle as={Card.Text} variant='link' eventKey='0'>
									{note.title}
								</Accordion.Toggle>
							</span>
							<div>
								<Button href={`/note/${note._id}`} variant='info'>
									Edit
								</Button>
								<Button
									variant='warning'
									className='mx-2'
									onClick={() => deleteHandler(note._id)}
								>
									Delete
								</Button>
							</div>
						</Card.Header>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								<h6>
									<Badge bg='primary'>Category - {note.category}</Badge>
								</h6>
								<blockquote className='blockquote mb-0'>
									<p className='text-light'>{note.content}</p>
									<footer className='blockquote-footer'>
										Created on - date
									</footer>
								</blockquote>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			))}
		</MainScreen>
	);
};

export default MyNotes;
