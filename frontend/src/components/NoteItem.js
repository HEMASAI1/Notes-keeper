import React, { useState } from 'react';

export default function NoteItem({ note, onEdit, onDelete, onTagClick }){
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // show updated fields if backend sends fresh values
  React.useEffect(()=>{ setTitle(note.title); setContent(note.content); }, [note]);

  function saveInline(){
    // call parent's onEdit which sets App editing mode (we'll call it with updated content)
    onEdit({...note, title, content});
    setEditing(false);
  }

  return (
    <div className="note-item">
      <div className="note-meta">
        <div style={{flex:1}}>
          {!editing ? <h3 className="note-title">{note.title}</h3> :
            <input className="inline-input" value={title} onChange={e=>setTitle(e.target.value)} />}
          <div style={{color:'var(--muted)', fontSize:13}}>{new Date(note.updatedAt || note.createdAt).toLocaleString()}</div>
        </div>

        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <div style={{textAlign:'right'}}>
            {!editing ? <button className="btn small" onClick={()=>setEditing(true)}>Edit</button> :
              <>
                <button className="btn small" onClick={saveInline}>Save</button>
                <button className="btn small ghost" onClick={()=>{ setEditing(false); setTitle(note.title); setContent(note.content); }}>Cancel</button>
              </>
            }
            <div style={{height:6}} />
            <button className="btn small ghost" onClick={()=>onDelete(note._id)}>Delete</button>
          </div>
        </div>
      </div>

      {!editing ? <p style={{whiteSpace:'pre-wrap', marginTop:10}}>{note.content}</p> :
        <textarea className="inline-input" value={content} onChange={e=>setContent(e.target.value)} /> }

      <div className="chips">
        {(note.tags||[]).map(t => <button key={t} className="chip" onClick={()=>onTagClick && onTagClick(t)}>#{t}</button>)}
      </div>
    </div>
  );
}

