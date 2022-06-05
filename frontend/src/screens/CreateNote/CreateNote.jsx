import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import { createNoteAction } from "../../actions/notesActions";
import { useNavigate } from "react-router-dom";

function CreateNote() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const noteCreate = useSelector((state) => state.noteCreate);
	const { loading, error, note } = noteCreate;

	const resetHandler = () => {
		setTitle("");
		setContent("");
		setCategory("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createNoteAction(title, content, category));
		if (!title || !content || !category) {
			return;
		}
		resetHandler();

		navigate("/mynotes");
	};

	return (
		<MainScreen title={"Create a Note"}>
			<Card>
				<Card.Header>Create a new Note</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit}>
						{error && <ErrorMessage variant='warning'>{error}</ErrorMessage>}
						<Form.Group controlId='title' className='mb-2'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								value={title}
								placeholder='Enter the Title'
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId='content' className='mb-2'>
							<Form.Label>Content</Form.Label>
							<Form.Control
								as='textarea'
								value={content}
								placeholder='Enter the Content'
								rows={4}
								onChange={(e) => setContent(e.target.value)}
							/>
						</Form.Group>
						{content && (
							<Card className='mb-2' bg='light'>
								<Card.Header className='text-dark'>Note Preview</Card.Header>
								<Card.Body>
									<ReactMarkdown className='text-dark'>{content}</ReactMarkdown>
								</Card.Body>
							</Card>
						)}

						<Form.Group controlId='category' className='mb-4'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								value={category}
								placeholder='Enter the Category'
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>
						{loading && <Loading size={50} />}
						<Button variant='success' type='submit'>
							Create Note
						</Button>
						<Button className='mx-4' variant='warning' onClick={resetHandler}>
							Reset Fields
						</Button>
					</Form>
				</Card.Body>
				<Card.Footer>
					Creating on - {new Date().toLocaleDateString()}
				</Card.Footer>
			</Card>
		</MainScreen>
	);
}

export default CreateNote;
