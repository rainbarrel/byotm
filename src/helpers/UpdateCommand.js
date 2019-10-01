import Firebase from 'firebase/app';
import 'firebase/firestore';

const updateCommand = (command, button) => {
  const db = Firebase.firestore();

  db.collection('commands').doc('current')
    .set({
      command: command,
      updatedAt: new Date(),
    })
    .then(() => {
      console.log(`Command '${command}' updated successfully`);
    })
    .catch((error) => {
      console.error(`Error updating command: ${error}`);
    });
}

export { updateCommand };
