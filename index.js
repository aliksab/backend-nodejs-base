const yargs = require('yargs');
const pkg = require('./package.json');
const { addNote, printNotes, remove } = require('./notes.controller');

yargs.version(pkg.version);

yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    builder: {
        title: {
            type: 'string',
            discribe: 'Note title',
            demandOption: true
        }
    },
    async handler({ title }) {
        await addNote(title);
    }
});

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        const notes = await printNotes();
        console.log(notes);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    builder: {
        id: {
            type: 'string',
            discribe: 'Note id',
            demandOption: true
        }
    },
    async handler({ id }) {
        await remove(id);
    }
});

yargs.parse();