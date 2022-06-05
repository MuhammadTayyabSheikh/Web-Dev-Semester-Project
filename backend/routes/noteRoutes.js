const express = require('express');
const
  {
    getNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote
  } = require('../controllers/notecontroller');
  
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getNotes);
router.route('/create').post(protect, createNote);


router.route('/:id')
  .get(getNoteById)
  .delete(protect, deleteNote)
  .put(protect, updateNote)

module.exports = router;