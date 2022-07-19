import axios from "axios";
import { NOTES_CREATE_FAILURE, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAILURE, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_LIST_FAILURE, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_UPDATE_FAILURE, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS } from "../constants/notesConstants";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_LIST_REQUEST });
    const { userLogin: { userInfo }, } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get("https://two-note-backend.herokuapp.com/api/notes/", config);
    dispatch({ type: NOTES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTES_LIST_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const createNoteAction = (title, content, category) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_CREATE_REQUEST });

    const { userLogin: { userInfo }, } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      "https://two-note-backend.herokuapp.com/api/notes/create/",
      { title, content, category },
      config
    );

    dispatch({
      type: NOTES_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: NOTES_CREATE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const updateNoteAction = (id, title, content, category) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_UPDATE_REQUEST });

    const { userLogin: { userInfo }, } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `https://two-note-backend.herokuapp.com/api/notes/${id}`,
      { id, title, content, category },
      config
    );
    
    dispatch({
      type: NOTES_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: NOTES_UPDATE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_DELETE_REQUEST });

    const { userLogin: { userInfo }, } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(
      `https://two-note-backend.herokuapp.com/api/notes/${id}`,
      config
    );

    dispatch({
      type: NOTES_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: NOTES_DELETE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}