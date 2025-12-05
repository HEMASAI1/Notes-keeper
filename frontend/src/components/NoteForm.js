import React, { useEffect, useState } from 'react';

export default function NoteForm({ onCreate, editing, onUpdate, onCancel }){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(()=>{
    if(editing){
      setTitle(editing.title || '');
      setContent(editing.content || '');
      setTags((editing.tags||[]).join(','));
    } else { setTitle(''); setContent(''); setTags(''); }
  }, [editing]);

  async function submit(e){
    e.preventDefault();
    const tagArr = tags.split(',').map(t=>t.trim()).filter(Boolean);
    const data = { title, content, tags: tagArr };
    if(editing) onUpdate(editing._id, data);
    else {
      // create note expected to return via backend - our optimistic UI in App handles it
      await onCreate(data);
      setTitle(''); setContent(''); setTags('');
    }
  }

  return (
    <div className="note-form card">
      <form onSubmit={submit}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} required />
        <input placeholder="tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} />
        <div style={{display:'flex', gap:8, marginTop:6}}>
          <button className="btn" type="submit">{editing ? 'Update' : 'Add'} note</button>
          {editing ? <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button> : null}
        </div>
      </form>

      <div className="preview" aria-live="polite">
        <strong style={{display:'block', marginBottom:6}}>{title || <span className="empty">Title preview</span>}</strong>
        <div style={{whiteSpace:'pre-wrap', color:'#333'}}>{content || <span className="empty">Content preview</span>}</div>
        <div className="chips" style={{marginTop:8}}>
          {(tags.split(',').map(t=>t.trim()).filter(Boolean)).map(t => <span key={t} className="chip">#{t}</span>)}
        </div>
      </div>
    </div>
  );
}

