const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Note')
const { body, validationResult, matchedData } = require('express-validator');
const router = express.Router()
// ROute 1: get all the notes usin get "/api/notes/fetchallnotes".Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // const userId = req.user.id
        // const notes = await Note.find( {userId });
    
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal  some error has occured")
        
    }  
})

// Route 2: adding notes using Post "/api/notes/addnotes".Login Required"
router.post('/addnotes', fetchuser,
    [
        body('title', 'Title cannot be empty').notEmpty(),
        body('description', 'Description cannot be blank').notEmpty(),
    ]
    , async (req, res) => {
        try {
            const {title,description,tag}=req.body;
            // if there are error return bad request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note= new Notes({
                title,description,tag,user:req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote);



        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal  some error has occured")

        }
    })
// Route 3: updating notes using Put "/api/notes/updatenotes/id:".Login Required" Updating a node
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
   try{
       const{title,description,tag}=req.body;
    //    create a newNote
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    // Find the note to be updated and update it
    // let user = await Note.find({ user: req.user.id })

    let note =await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
   }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal  some error has occured")
      }
    
     
})
// Route 4: Deleting notes using Delete "/api/notes/deletenotes/id:".Login Required" Updating a node
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try{
     // Find the note to be deleted and update it
 
     let note =await  Notes.findById(req.params.id);
     if(!note){
        return res.status(404).send("Not Found")
    }
     if(note.user.toString()!== req.user              .id){
        return res.status(401).send("Not Allowed")
    }
 
     note= await Notes.findByIdAndDelete(req.params.id)
     res.json({"Success":"your node has been deleted",note:note})
    }
     catch (error) {
         console.error(error.message)
         res.status(500).send("Internal  some error has occured")
       }
     
      
 })


module.exports = router;

