// global variabel
let notes = ['banana','apple', 'lemon'];

let archive = [];

// show notes 

function init() {

  getNotesFromLocalStorage ();
  getArchiveFromLocalStorage()

  renderNotes();
  renderArchiv();

}
function renderNotes() {
  let contentRef = document.getElementById('content'); // get div
  contentRef.innerHTML = ""; // clear div content

  for (let indexNote = 0; indexNote < notes.length; indexNote++) { 
    const note = notes[indexNote]; // define variabel
    contentRef.innerHTML += getNoteTemplate(note, indexNote); // add arry to html 
  }
 
}

function renderArchiv() {
  let archiveRef = document.getElementById('archiveContainer'); // get div
  archiveRef.innerHTML = ""; // clear div content

  for (let indexArchive = 0; indexArchive < archive.length; indexArchive++) { 
    const archiveNote = archive[indexArchive]; // define variabel
    archiveRef.innerHTML += getArchiveTemplate(archiveNote, indexArchive); // add arry to html 
  }
 
}

// add new note to arry
function addNote () {
  let newNoteRef = document.getElementById("add__note"); // get input
  let newNote =  newNoteRef.value; // get value of input

  notes.push(newNote); // add new note to array
  renderNotes(); // show new note in arry
  saveNotesToLocalStorage();
  newNoteRef.value =""; // clear input 
}

function deleteNote(id) {
  notes.splice(id ,1);
  renderNotes();
  saveNotesToLocalStorage()
}

function deleteArchiv(id) {
  archive.splice(id ,1);
  renderArchiv();
  saveArchiveToLocalStorage()
}

function archiveNote(note, indexNote) {
  archive.push(note);
  renderArchiv();
  saveArchiveToLocalStorage()

  notes.splice(indexNote ,1);
  renderNotes();
  saveNotesToLocalStorage()

}

function unarchive(previousNote, indexArchive) {
  notes.push(previousNote);
  renderNotes();
  saveNotesToLocalStorage()

  archive.splice(indexArchive ,1);
  renderArchiv();
  saveArchiveToLocalStorage()
}

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotesFromLocalStorage() {
  let myNoteArr = JSON.parse(localStorage.getItem("notes"));
  if (myNoteArr === null) {
    renderNotes();
  }
  else {
    notes = myNoteArr;
  }
}

function saveArchiveToLocalStorage() {
  localStorage.setItem("archive", JSON.stringify(archive));
}

function getArchiveFromLocalStorage() {
  let myArchiveArr = JSON.parse(localStorage.getItem("archive"));
  if (myArchiveArr === null) {
    renderNotes();
  }
  else {
    archive = myArchiveArr;
  }
}

// html Templates 
// show notes 
function getNoteTemplate (note, indexNote) {
return `<div class="noteUnit">
          <p class="noteStyle">+ ${note}</p> 
          <div class="iconUnit">
            <button onclick="deleteNote(${indexNote})" class="delete"></button>
            <button onclick="archiveNote('${note}', ${indexNote} )" class="archive"></button>
           </div>
        </div>`;

}

function getArchiveTemplate (archiveNote, indexArchive) {
  return `<div class="noteUnit">
            <p class="noteStyle">- ${archiveNote}</p> 
            <div class="iconUnit">
              <button onclick="deleteArchiv(${indexArchive})" class="delete"></button>
              <button onclick="unarchive('${archiveNote}', '${indexArchive}')" class="unarchive"></button>
             </div>
          </div>`;
  
  }



// notizen arichvieren




