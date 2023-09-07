const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    const notes = await getNotes()
    
    const note= {
        title,
        id: Date.now().toString()
    };
    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGray('Note was added!'));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list notes:'));
    notes.forEach(note => {
        console.log(chalk.blue(note.id), chalk.blue(note.title));
    })
}

async function removeNote(id) {
    const notes = await getNotes();
    await fs.writeFile(notesPath, JSON.stringify(notes.filter(note => note.id !== id)));
    console.log(chalk.bgRed(`Note with id: ${id} deleted`));
}

async function updateNote(id, newContent) {
    const notes = await getNotes()
    notes.find(n => n.id === id).title = newContent
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgBlue(`Note with id: ${id} has been updated`))
  }

module.exports = {
    addNote, printNotes, removeNote, getNotes, updateNote
}