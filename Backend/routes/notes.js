const express = require('express');
const router = express.Router();
const Note = require('../models/Note');


// GET /api/notes -> list notes, optional ?q=search
router.get('/', async (req, res) => {
try {
const q = req.query.q || '';
const filter = q ? { $or: [ { title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } } ] } : {};
const notes = await Note.find(filter).sort({ updatedAt: -1 });
res.json(notes);
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
});


// POST /api/notes -> create note
router.post('/', async (req, res) => {
try {
const { title, content, tags } = req.body;
if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
const note = new Note({ title, content, tags });
await note.save();
res.status(201).json(note);
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
});


// PUT /api/notes/:id -> update
router.put('/:id', async (req, res) => {
try {
const { id } = req.params;
const updates = req.body;
updates.updatedAt = Date.now();
const note = await Note.findByIdAndUpdate(id, updates, { new: true });
if (!note) return res.status(404).json({ error: 'Note not found' });
res.json(note);
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
});


// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
try {
const { id } = req.params;
const note = await Note.findByIdAndDelete(id);
if (!note) return res.status(404).json({ error: 'Note not found' });
res.json({ message: 'Deleted' });
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;