// global variabel

let allNotes = {
  'notesTitle' : ['Vegetables','Dairy', 'Meat'],
  'notes' : ['cucumber','milk', 'minced beef'],
  'archiveTitle' : [],
  'archive' : [],
}


function renderAllNotes () {
  renderNotes();
  saveNotesToLocalStorage()
  renderArchiv();
  saveArchiveToLocalStorage()
}


function moveNote (indexNote, startKey, destinationKey) {  
  let notesTitle = allNotes[startKey + "Title"].splice(indexNote, 1);
  allNotes[destinationKey + "Title"].push(notesTitle[0])
  
  let note = allNotes[startKey].splice(indexNote,  1);
  allNotes[destinationKey].push(note[0]);

  renderAllNotes ();
}


function renderNotes() {
  let contentRef = document.getElementById('content'); // get div
  contentRef.innerHTML = ""; // clear div content

  for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) { 
    const note = allNotes.notes[indexNote]; // define variabel
    const noteTitle = allNotes.notesTitle[indexNote];
    contentRef.innerHTML += getNoteTemplate(note, noteTitle, indexNote); // add arry to html 
  }
}


function renderArchiv() {
  let archiveRef = document.getElementById('archiveContainer'); // get div
  archiveRef.innerHTML = ""; // clear div content

  for (let indexArchive = 0; indexArchive < allNotes.archive.length; indexArchive++) { 
    const archiveNote = allNotes.archive[indexArchive]; // define variabel
    const archiveNoteTitle = allNotes.archiveTitle[indexArchive]; // define variabel
    archiveRef.innerHTML += getArchiveTemplate(archiveNote, archiveNoteTitle, indexArchive); // add arry to html 
  }
}


function addNote () {
  let newTitleRef = document.getElementById("add__Title"); // get input
  let newTitle =  newTitleRef.value; // get value of input

  let newNoteRef = document.getElementById("add__note"); // get input
  let newNote = newNoteRef.value; // get value of input

  allNotes.notesTitle.push(newTitle); // add new note to array
  allNotes.notes.push(newNote); // add new note to array
  renderNotes(); // show new note in arry
  saveNotesToLocalStorage();
  newTitleRef.value =""; // clear input 
  newNoteRef.value =""; // clear input 
}


function deleteNote(id) {
  allNotes.notes.splice(id ,1);
  allNotes.notesTitle.splice(id ,1);
  renderAllNotes ()
}

function deleteArchiv(id) {
  allNotes.archiveTitle.splice(id ,1);
  allNotes.archive.splice(id ,1);
  renderAllNotes ()
}

// function archiveNote(note, indexNote) {
//   allNotes.archive.push(note);
//   renderArchiv();
//   saveArchiveToLocalStorage()

//   allNotes.notes.splice(indexNote ,1);
//   renderNotes();
//   saveNotesToLocalStorage()

// }

// function unarchive(previousNote, indexArchive) {
//   allNotes.notes.push(previousNote);
//   renderNotes();
//   saveNotesToLocalStorage()

//   allNotes.archive.splice(indexArchive ,1);
//   renderArchiv();
//   saveArchiveToLocalStorage()
// }

function saveNotesToLocalStorage() {
  localStorage.setItem("allNotes.notesTitle", JSON.stringify(allNotes.notesTitle));
  localStorage.setItem("allNotes.notes", JSON.stringify(allNotes.notes));
}

function getNotesFromLocalStorage() {
  let myTitleArr = JSON.parse(localStorage.getItem("allNotes.notesTitle"));
  let myNoteArr = JSON.parse(localStorage.getItem("allNotes.notes"));
  if (myNoteArr === null) {
    renderNotes();
  }
  else {
    allNotes.notesTitle = myTitleArr;
    allNotes.notes = myNoteArr;
  }
}

function saveArchiveToLocalStorage() {
  localStorage.setItem("allNotes.archiveTitle", JSON.stringify(allNotes.archiveTitle));
  localStorage.setItem("allNotes.archive", JSON.stringify(allNotes.archive));
}


function getArchiveFromLocalStorage() {
  let myArchiveTitleArr = JSON.parse(localStorage.getItem("allNotes.archiveTitle"));
  let myArchiveArr = JSON.parse(localStorage.getItem("allNotes.archive"));
  if (myArchiveArr === null) {
    renderNotes();
  }
  else {
    allNotes.archiveTitle =  myArchiveTitleArr;
    allNotes.archive = myArchiveArr;
  }
}