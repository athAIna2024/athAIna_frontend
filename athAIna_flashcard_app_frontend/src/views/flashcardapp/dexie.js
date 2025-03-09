import Dexie from 'dexie';

const flashcardsDB = new Dexie('FlashcardDatabase');
flashcardsDB.version(1).stores({
    flashcards: 'id, question, answer, image, studyset_id, created_at, updated_at, is_ai_generated'
});

const testModeDB = new Dexie('TestModeDatabase');
testModeDB.version(1).stores({
    test_field: 'id++, batch_id, flashcard_id, created_at, learner_answer, is_correct, corrected_at'
});

export default flashcardsDB;
export { testModeDB };