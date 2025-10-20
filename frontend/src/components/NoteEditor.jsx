import React, { useState, useEffect } from 'react';

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags.join(', '));
    } else {
      setTitle('');
      setContent('');
      setTags('');
    }
  }, [note]);

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please provide a title');
      return;
    }
    
    if (!content.trim()) {
      alert('Please provide content');
      return;
    }
    
    if (title.trim().length > 200) {
      alert('Title must be less than 200 characters');
      return;
    }
    
    if (content.trim().length > 10000) {
      alert('Content must be less than 10,000 characters');
      return;
    }

    try {
      setSaving(true);
      
      // Parse tags from comma-separated string
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await onSave({
        title: title.trim(),
        content: content.trim(),
        tags: tagsArray
      });
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    // Save with Ctrl+S (or Cmd+S on Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave(e);
    }
    // Cancel with Escape
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="note-editor">
      <form onSubmit={handleSave}>
        <div className="editor-header">
          <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
          <div className="editor-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={saving || !title.trim() || !content.trim()}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="editor-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              maxLength={200}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated):</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3..."
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={20}
              maxLength={10000}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="editor-footer">
          <div className="character-count">
            {content.length}/10,000 characters
          </div>
          <div className="keyboard-shortcuts">
            <small>
              💡 Press Ctrl+S to save • Esc to cancel
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;