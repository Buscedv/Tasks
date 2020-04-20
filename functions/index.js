const functions = require('firebase-functions');

exports.createBall = functions.firestore
  .document('tasks/{taskId}')
  .onCreate(event => {
    let createdMessage = event.data.get('task');
    return event.data.ref.set({
      message: createdMessage + ', yo!'
    }, {merge: true});
});
