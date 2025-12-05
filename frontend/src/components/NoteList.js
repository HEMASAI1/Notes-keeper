import React from 'react';
import NoteItem from './NoteItem';

export default function NoteList({ notes = [], onEdit, onDelete, onTagClick }){
  if(!notes.length) return <p className="empty">No notes yet.</p>;
  return <div>
    {notes.map(n => <NoteItem key={n._id} note={n} onEdit={()=>onEdit(n)} onDelete={()=>onDelete(n._id)} onTagClick={onTagClick} />)}
  </div>;
}

