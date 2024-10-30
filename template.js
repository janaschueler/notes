function getNoteTemplate (note, noteTitle, indexNote) {
    return `<div class="noteUnit">
              <p class="titleStyle"> ${noteTitle}</p> 
              <p class="noteStyle"> ${note}</p> 
              <div class="iconUnit">
                <button onclick="deleteNote(${indexNote})" class="delete"></button>
                <button onclick="moveNote(${indexNote}, 'notes', 'archive')" class="archive"></button>
               </div>
            </div>`;
    
    }
    
    function getArchiveTemplate (archiveNote, archiveNoteTitle, indexArchive) {
      return `<div class="noteUnit">
                <p class="titleStyle">${archiveNoteTitle}</p> 
                <p class="noteStyle">${archiveNote}</p> 
                <div class="iconUnit">
                  <button onclick="deleteArchiv(${indexArchive})" class="delete"></button>
                <button onclick="moveNote(${indexArchive}, 'archive', 'notes')" class="archive"></button>
                 </div>
              </div>`;
      
      }