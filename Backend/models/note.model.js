const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title: String,
    body: String,
    subject: String,
    userId: String
}, {
    versionKey: false
})

const NoteModel = mongoose.model("notes", noteSchema)

module.exports = NoteModel