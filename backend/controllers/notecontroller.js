const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = expressAsyncHandler(
  async (req, res, next) => {
    const notes = await Note.find({ user: req.user._id });
    res.status(200).json(notes);
  }
);

const createNote = expressAsyncHandler(
  async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      res.status(400);
      throw new Error('Please Fill all the fields');
    } else {
      const note = await Note.create({ user: req.user._id, title, content, category });
      res.status(201).json(note);
    }

  }
);

const getNoteById = expressAsyncHandler(
  async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  }
);

const updateNote = expressAsyncHandler(
  async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Unauthorized! You are not allowed to edit this note');
    }

    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
      await note.save();
      res.status(200).json(note);
    } else {
      res.status(404);
      throw new Error('Note not found');
    }
  }
);

const deleteNote = expressAsyncHandler(
  async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Unauthorized! You are not allowed to delete this note');
    }

    if (note) {
      await note.remove();
      res.status(200).json({ message: "Note deleted successfully" });
    } else {
      res.status(404);
      throw new Error('Note not found');
    }
  }
);

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };