const notesCtrl = {};
const Note = require('../models/note');

notesCtrl.renderNoteForm = (req,res)=>{
    console.log(req.user.id)
    res.render('notes/newnote')
}

notesCtrl.createNuewNote= async (req,res)=>{
    try {
        const {title, description} = req.body;
        const newNote = new Note({title , description})
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note add Successfully')
        res.redirect('/notes')
    } catch (error) {
        console.log(error)
    }
}

notesCtrl.renderNotes = async (req,res)=>{
   try {
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'});
    res.render('notes/all-notes', {notes})
   } catch (error) {
       console.log(error)
   }
    
}

notesCtrl.renderEditForm = async (req,res)=>{
    try {
        const note = await Note.findById(req.params.id)
        if (note.user != req.user.id) {
            req.flash('error_msg', 'not Authorize')
            return res.redirect('/notes')
        } 
        res.render('notes/edit-notes', {note})
    } catch (error) {
        console.log(error)
    }
}

notesCtrl.updateNote = async (req,res)=>{
    try {
        console.log(req.body)
        const {title, description} = req.body 
        await Note.findByIdAndUpdate(req.params.id, {title, description})
        req.flash('success_msg', 'Note Update')
        res.redirect('/notes')
    } catch (error) {
        console.log(error)
    }
}

notesCtrl.deleteNote = async (req,res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (note.user != req.user.id) {
            req.flash('error_msg', 'not Authorize')
            return res.redirect('/notes')
        } 
      await Note.findByIdAndDelete(req.params.id)
      req.flash('success_msg', 'Note Delete')
      res.redirect('/notes');
    } catch (error) {
        console.log(error)
    }
    
}
module.exports= notesCtrl;