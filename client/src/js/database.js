import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created v1');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //put content in the database
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};
;

// logic for a method that gets all the content from the database
export const getDb = async () => {
  //get content from the database
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  return result?.content;
};

// Start the database.

//to here

initdb();
