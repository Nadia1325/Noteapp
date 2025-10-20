import React from 'react';

const NotesList = ({ 
  notes, 
  loading, 
  selectedNote, 
  onNoteSelect, 
  onNoteDelete 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const truncateContent = (content, maxLength = 60) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className="notes-list loading">
        <div className="loading-spinner">Loading notes...</div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="notes-list empty">
        <p>No notes found.</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div
          key={note._id}
          className={`note-item ${selectedNote?._id === note._id ? 'selected' : ''}`}
          onClick={() => onNoteSelect(note)}
        >
          <div className="note-item-header">
            <h3 className="note-item-title">{note.title}</h3>
            <button
              className="note-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onNoteDelete(note._id);
              }}
              title="Delete note"
            >
              🗑️
            </button>
          </div>
          
          <p className="note-item-preview">
            {truncateContent(note.content)}
          </p>
          
          {note.tags.length > 0 && (
            <div className="note-item-tags">
              {note.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="tag-small">{tag}</span>
              ))}
              {note.tags.length > 3 && (
                <span className="tag-small more">+{note.tags.length - 3}</span>
              )}
            </div>
          )}
          
          <div className="note-item-date">
            {formatDate(note.updatedAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;