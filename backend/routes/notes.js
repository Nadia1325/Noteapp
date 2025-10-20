const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /api/notes/tags/all - Get all unique tags (must be before /:id route)
router.get('/tags/all', async (req, res) => {
  try {
    const tags = await Note.distinct('tags');
    res.json(tags.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/notes - Get all notes with pagination and search
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      tags = '',
      sortBy = 'updatedAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    let query = {};
    
    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const notes = await Note.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Note.countDocuments(query);
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      notes,
      pagination: {
        current: pageNum,
        pages: totalPages,
        total,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/notes/:id - Get single note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/notes - Create new note
router.post('/', async (req, res) => {
  try {
    const { title, content, tags = [] } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Process tags - remove duplicates and empty strings
    const processedTags = [...new Set(
      tags
        .filter(tag => tag && tag.trim())
        .map(tag => tag.trim().toLowerCase())
    )];

    const note = new Note({
      title,
      content,
      tags: processedTags
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/notes/:id - Update note
router.put('/:id', async (req, res) => {
  try {
    const { title, content, tags = [] } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Process tags
    const processedTags = [...new Set(
      tags
        .filter(tag => tag && tag.trim())
        .map(tag => tag.trim().toLowerCase())
    )];

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        tags: processedTags,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/notes/:id - Delete note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
