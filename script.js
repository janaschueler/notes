// global variabel

const BASE_URL = "https://eriks-wunschliste-default-rtdb.europe-west1.firebasedatabase.app/";

let allNotes = { notesTitle: [], notes: [] };

function renderAllNotes() {
  initializeNotes();
}

async function initializeNotes() {
  allNotes = await getData(); // Daten von Firebase laden
  renderNotes(); // erst rendern, wenn Daten verfügbar sind
}

function renderNotes() {
  let contentRef = document.getElementById("content"); // get div
  contentRef.innerHTML = ""; // clear div content

  for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
    const note = allNotes.notes[indexNote]; // define variabel
    const noteTitle = allNotes.notesTitle[indexNote];
    contentRef.innerHTML += getNoteTemplate(note, noteTitle, indexNote); // add arry to html
  }
}

function addNote() {
  let newTitleRef = document.getElementById("add__Title"); // get input
  let newTitle = newTitleRef.value; // get value of input

  let newNoteRef = document.getElementById("add__note"); // get input
  let newNote = newNoteRef.value; // get value of input

  allNotes.notesTitle.push(newTitle); // add new note to array
  allNotes.notes.push(newNote); // add new note to array
  renderNotes(); // show new note in arry
  saveNotesToLocalStorage();
  newTitleRef.value = ""; // clear input
  newNoteRef.value = ""; // clear input
}

function getNotesFromLocalStorage() {
  let myTitleArr = JSON.parse(localStorage.getItem("allNotes.notesTitle"));
  let myNoteArr = JSON.parse(localStorage.getItem("allNotes.notes"));
  if (myNoteArr === null) {
    renderNotes();
  } else {
    allNotes.notesTitle = myTitleArr;
    allNotes.notes = myNoteArr;
  }
}

function saveNotesToLocalStorage() {
  allNotes.notes.forEach((note, index) => {
    putData("notes", index, note);
  });

  allNotes.notesTitle.forEach((title, index) => {
    putData("notesTitle", index, title);
  });
}

async function putData(path = "", id = "", data = {}) {
  const url = BASE_URL + path + "/" + id + ".json";

  let response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function getData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();

  const notes = responseToJson.notes;
  const notesTitle = responseToJson.notesTitle;

  return { notes, notesTitle };
}

async function deleteDataFromFirebase(path, id) {
  const deleteUrl = `${BASE_URL}${path}/${id}.json`;

  let response = await fetch(deleteUrl, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log(`Fehler beim Löschen der Daten von Firebase für ${path}:`, response);
  } else {
    console.log(`${path} mit ID ${id} wurde gelöscht.`);
  }
}

async function deleteNote(id) {
  allNotes.notes.splice(id, 1);
  allNotes.notesTitle.splice(id, 1);

  await deleteDataFromFirebase("notes", id);
  await deleteDataFromFirebase("notesTitle", id);

  saveNotesToLocalStorage();
  renderAllNotes();
}
