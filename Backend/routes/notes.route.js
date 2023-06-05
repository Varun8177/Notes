const express = require("express")
const NoteModel = require("../models/note.model")
const NotesRouter = express.Router()
const jwt = require('jsonwebtoken');


NotesRouter.get("/", async (req, res) => {
    const { userId } = req.body
    const query = req.query
    const subjectQuery = {}
    if (query.sub) {
        subjectQuery["subject"] = query.sub
    }
    // console.log("subject", subjectQuery)
    // console.log("query", query)
    try {
        const notes = await NoteModel.find({ $and: [{ userId }, subjectQuery] })
        // console.log("notes", notes)
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})

NotesRouter.post("/add", async (req, res) => {
    try {
        const new_note = new NoteModel(req.body)
        await new_note.save()
        res.status(200).send({
            "message": "Note successfully created"
        })
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})

NotesRouter.patch("/update/:nodeId", async (req, res) => {
    const id = req.params.nodeId
    const changes = req.body
    try {
        const new_note = await NoteModel.findByIdAndUpdate({ _id: id }, changes)
        res.status(200).send({
            "message": "Note successfully updated"
        })
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})

NotesRouter.delete("/delete/:nodeId", async (req, res) => {
    const id = req.params.nodeId
    const token = req.headers.auth.split(" ")[1]
    const note = await NoteModel.findOne({ _id: id })
    if (token) {
        const decoded = jwt.verify(token, process.env.keyword);
        if (decoded.userId === note.userId) {
            try {
                const new_note = await NoteModel.findByIdAndDelete({ _id: id })
                res.status(200).send({
                    "message": "Note successfully deleted"
                })
            } catch (error) {
                res.status(400).send({
                    "message": error.message
                })
            }
        } else {
            res.status(400).send({
                "message": "Authorization Failed"
            })
        }
    } else {
        res.status(400).send({
            "message": "Authorization Failed"
        })
    }
})

module.exports = NotesRouter