import React, { useEffect, useState } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote } from './services/api';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import useDebounce from './hooks/useDebounce';

export default function App(){
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const debQuery = useDebounce(query, 400);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tagFilter, setTagFilter] = useState('');

  async function loadNotes(q = '') {
    try {
      setLoading(true);
      const data = await fetchNotes(q);
      setNotes(data || []);
    } catch(err){ console.error(err) } finally { setLoading(false) }
  }

  useEffect(()=>{ loadNotes(debQuery); }, [debQuery]);

  async function handleCreate(note){
    // optimistic UI (add locally then reload)
    setNotes(prev => [note, ...prev]);
    await createNote(note);
    await loadNotes(debQuery);
  }

  async function handleUpdate(id, updates){
    await updateNote(id, updates);
    setEditing(null);
    await loadNotes(debQuery);
  }

  async function handleDelete(id){
    // optimistic remove
    setNotes(prev => prev.filter(n=>n._id !== id));
    await deleteNote(id);
  }

  function handleTagClick(tag){
    if(tagFilter === tag) setTagFilter('');
    else setTagFilter(tag);
  }

  const visibleNotes = tagFilter ? notes.filter(n => (n.tags||[]).includes(tagFilter)) : notes;

  return (
    <div className="app">
      <div className="header"><h1>Notes Keeper</h1></div>
      <div className="grid">
        <div className="card">
          <NoteForm onCreate={handleCreate} editing={editing} onUpdate={handleUpdate} onCancel={()=>setEditing(null)} />
          <div style={{marginTop:12}}>
            <div className="search">
              <input placeholder="Search notes..." value={query} onChange={e=>setQuery(e.target.value)} />
              <button className="btn ghost small" onClick={()=>{ setQuery(''); setTagFilter(''); }}>Clear</button>
            </div>
          </div>

          <div style={{marginTop:12}}>
            {loading ? <p className="empty">Loading…</p> :
              <div className="notes-list">
                <NoteList notes={visibleNotes} onEdit={(n)=>setEditing(n)} onDelete={handleDelete} onTagClick={handleTagClick} />
              </div>
            }
          </div>
        </div>

        <aside>
          <div className="card">
            <h3 style={{marginTop:0}}>Tag browser</h3>
            <TagBrowser notes={notes} active={tagFilter} onClick={handleTagClick} />
          </div>

          <div style={{height:18}} />

          <div className="card">
            <h3 style={{marginTop:0}}>Tips</h3>
            <ul style={{marginTop:8, paddingLeft:18, color:'var(--muted)'}}>
              <li>Click a tag to filter</li>
              <li>Inline edit notes with Edit button</li>
              <li>Search is debounced to reduce requests</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* small TagBrowser inside same file for convenience */
function TagBrowser({notes = [], active, onClick}){
  const set = new Set();
  notes.forEach(n => (n.tags||[]).forEach(t=>set.add(t)));
  const tags = Array.from(set).sort();
  if(tags.length === 0) return <p className="empty">No tags yet</p>;
  return <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
    <button className={`chip ${!active ? 'active':''}`} onClick={()=>onClick('')}>All</button>
    {tags.map(t => <button key={t} className="chip" onClick={()=>onClick(t)} style={{border: active===t? '1px solid var(--accent)':''}}>{t}</button>)}
  </div>
}
