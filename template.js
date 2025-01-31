function getNoteTemplate(note, noteTitle, indexNote) {
  return `
    <div class="noteUnit">
      <h3 class="titleStyle">${noteTitle}</h3>
      <p class="noteStyle">${note}</p>
      <div class="iconUnit">
        <button 
          onclick="deleteNote(${indexNote})" 
          class="delete" 
          aria-label="Notiz löschen">
        </button>
      </div>
    </div>
  `;
}

function getArchiveTemplate(archiveNote, archiveNoteTitle, indexArchive) {
  return `<div class="noteUnit">
                <p class="titleStyle">${archiveNoteTitle}</p> 
                <p class="noteStyle">${archiveNote}</p> 
                <div class="iconUnit">
                  <button onclick="deleteArchiv(${indexArchive})" class="delete"></button>
                <button onclick="moveNote(${indexArchive}, 'archive', 'notes')" class="archive"></button>
                 </div>
              </div>`;
}
