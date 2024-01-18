const fs = require('fs');
const chalk = require('chalk')

const NOTES_JSON_FILE = "notes.json"

//#region Exported Methods

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.green.inverse('Your notes'));
        notes.forEach(note => {
            console.log(note.title);
        });
    } else {
        console.log(chalk.red.inverse('There are no notes to show!'));
    }
}

const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);

    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

//#endregion Exported Methods

//#region Private Methods

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(NOTES_JSON_FILE, dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(NOTES_JSON_FILE);
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

//#endregion Private Methods

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}