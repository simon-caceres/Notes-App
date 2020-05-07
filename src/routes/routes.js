const {Router} = require('express')
const router = Router();
const {
    renderNoteForm,
    createNuewNote,
    renderNotes,
    renderEditForm,
     updateNote, 
     deleteNote} = require('../controllers/notes.controllers');
const {isAut} = require('../helpers/validate')

router.get('/notes/add',isAut,  renderNoteForm)
router.post('/notes/new-note',isAut, createNuewNote)
//all notes
router.get('/notes',isAut, renderNotes)
//edit
router.get('/notes/edit/:id',isAut, renderEditForm)
router.put('/notes/edit/:id',isAut, updateNote)
//delete
router.delete('/notes/delete/:id',isAut, deleteNote)
module.exports= router;