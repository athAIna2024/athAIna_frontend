import Dexie from 'dexie';


const flashcardsDB = new Dexie('FlashcardDatabase');
flashcardsDB.version(1).stores({
    flashcards: 'id, title, description, created_at, updated_at, flashcard_count'
});

export default flashcardsDB;