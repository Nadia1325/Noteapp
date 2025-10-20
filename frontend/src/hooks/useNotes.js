import { useState, useEffect, useCallback } from 'react';
import { notesAPI } from '../services/api';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchNotes = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await notesAPI.getAllNotes(params);
      setNotes(data.notes);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (noteData) => {
    try {
      setError(null);
      const newNote = await notesAPI.createNote(noteData);
      setNotes(prev => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create note');
      throw err;
    }
  }, []);

  const updateNote = useCallback(async (id, noteData) => {
    try {
      setError(null);
      const updatedNote = await notesAPI.updateNote(id, noteData);
      setNotes(prev => prev.map(note => 
        note._id === id ? updatedNote : note
      ));
      return updatedNote;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update note');
      throw err;
    }
  }, []);

  const deleteNote = useCallback(async (id) => {
    try {
      setError(null);
      await notesAPI.deleteNote(id);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete note');
      throw err;
    }
  }, []);

  return {
    notes,
    loading,
    error,
    pagination,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    setError
  };
};