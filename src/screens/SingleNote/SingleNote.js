import React from 'react';
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import { updateNoteAction, deleteNoteAction } from "../../actions/notesActions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

function SingleNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`https://two-note-backend.herokuapp.com/api/notes/${id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    }
    fetching();
  }, [id, date, successDelete]);

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes");
  }

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) {
      return;
    }
    resetHandler();

    navigate("/mynotes");
  };

  return (
    <MainScreen title={"Edit Note"}>
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpdate}>
            {loadingDelete && <Loading size={50} />}
            {errorDelete && <ErrorMessage variant='warning'>{errorDelete}</ErrorMessage>}
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
              Update Note
            </Button>
            <Button className='mx-4' variant='warning'
              onClick={deleteHandler}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          Updated on - {dayjs(date).format('DD/MM/YYYY')}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
