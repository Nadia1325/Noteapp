import React, { useState, useEffect } from 'react';
import { useNotes } from '../hooks/useNotes';
import { notesAPI } from '../services/api';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import Pagination from './Pagination';

const NotesApp = () => {
  const { 
    notes, 
    loading, 
    error, 
    pagination, 
    fetchNotes, 
    createNote, 
    updateNote, 
    deleteNote 
  } = useNotes();

  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch notes on component mount and when filters change
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 10,
      search: searchQuery,
      tags: selectedTags.join(','),
      sortBy,
      sortOrder
    };
    fetchNotes(params);
  }, [fetchNotes, currentPage, searchQuery, selectedTags, sortBy, sortOrder]);

  // Fetch available tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await notesAPI.getAllTags();
        setAvailableTags(tags);
      } catch (err) {
        console.error('Failed to fetch tags:', err);
      }
    };
    fetchTags();
  }, [notes]); // Refetch when notes change

  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await createNote(noteData);
      setSelectedNote(newNote);
      setIsEditing(false);
      // Reset to first page to see the new note
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      const updatedNote = await updateNote(id, noteData);
      setSelectedNote(updatedNote);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update note:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        if (selectedNote?._id === id) {
          setSelectedNote(null);
          setIsEditing(false);
        }
      } catch (err) {
        console.error('Failed to delete note:', err);
      }
    }
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditing(true);
  };

  const handleEditNote = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (!selectedNote) {
      // If we were creating a new note, clear selection
      setSelectedNote(null);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
  };

  const handleTagFilter = (tags) => {
    setSelectedTags(tags);
    setCurrentPage(1); // Reset to first page
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="notes-app">
      <header className="app-header">
        <h1>📝 My Notes</h1>
        <button className="btn btn-primary" onClick={handleNewNote}>
          + New Note
        </button>
      </header>

      <div className="app-content">
        <div className="sidebar">
          <SearchBar 
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search notes..."
          />
          
          <TagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onChange={handleTagFilter}
          />

          <div className="sort-controls">
            <select 
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                handleSortChange(newSortBy, newSortOrder);
              }}
            >
              <option value="updatedAt-desc">Latest Updated</option>
              <option value="updatedAt-asc">Oldest Updated</option>
              <option value="createdAt-desc">Latest Created</option>
              <option value="createdAt-asc">Oldest Created</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <NotesList
            notes={notes}
            loading={loading}
            selectedNote={selectedNote}
            onNoteSelect={handleNoteSelect}
            onNoteDelete={handleDeleteNote}
          />

          {pagination && (
            <Pagination
              current={pagination.current}
              total={pagination.pages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <div className="main-content">
          {isEditing ? (
            <NoteEditor
              note={selectedNote}
              onSave={selectedNote ? 
                (noteData) => handleUpdateNote(selectedNote._id, noteData) :
                handleCreateNote
              }
              onCancel={handleCancelEdit}
            />
          ) : selectedNote ? (
            <div className="note-viewer">
              <div className="note-header">
                <h2>{selectedNote.title}</h2>
                <button className="btn btn-secondary" onClick={handleEditNote}>
                  ✏️ Edit
                </button>
              </div>
              <div className="note-meta">
                <span>Created: {new Date(selectedNote.createdAt).toLocaleDateString()}</span>
                <span>Updated: {new Date(selectedNote.updatedAt).toLocaleDateString()}</span>
              </div>
              {selectedNote.tags.length > 0 && (
                <div className="note-tags">
                  {selectedNote.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              <div className="note-content">
                {selectedNote.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <h2>Welcome to My Notes</h2>
              <p>Select a note from the sidebar or create a new one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;