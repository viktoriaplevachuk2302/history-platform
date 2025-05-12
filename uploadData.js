import { db } from './src/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

import comments from './src/data/comments.js';
import events from './src/data/events.js';
import questions from './src/data/questions.js';
import timeline from './src/data/Timeline.js';

const uploadArrayToFirestore = async (array, collectionName) => {
  for (const item of array) {
    try {
      await addDoc(collection(db, collectionName), item);
      console.log(`✅ Added to ${collectionName}:`, item);
    } catch (error) {
      console.error(`❌ Error adding to ${collectionName}:`, error);
    }
  }
};

const runUpload = async () => {
  await uploadArrayToFirestore(comments, 'comments');
  await uploadArrayToFirestore(events, 'events');
  await uploadArrayToFirestore(questions, 'questions');
  await uploadArrayToFirestore(timeline, 'timeline');
};

runUpload();
