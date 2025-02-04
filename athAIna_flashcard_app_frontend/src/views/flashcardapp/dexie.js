import Dexie from 'dexie';


const flashcardsDB = new Dexie('FlashcardDatabase');
flashcardsDB.version(1).stores({
    flashcards: 'id, question, answer, image, studyset_id, created_at, updated_at, is_ai_generated'
});

export default flashcardsDB;