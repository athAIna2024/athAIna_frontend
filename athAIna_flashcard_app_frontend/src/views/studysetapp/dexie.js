import Dexie from 'dexie';


const studySetDb = new Dexie('StudySetDatabase');
studySetDb.version(1).stores({
   studysets: 'id, title, description, created_at, updated_at, flashcard_count'
});

export default studySetDb;