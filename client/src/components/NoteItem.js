import React from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
  // Couleurs des badges
  const getCategoryStyle = (cat) => {
    switch(cat) {
      case 'Urgent': return { bg: '#fee2e2', text: '#ef4444' };
      case 'Travail': return { bg: '#dbeafe', text: '#3b82f6' };
      case 'Idée': return { bg: '#f3e8ff', text: '#a855f7' };
      default: return { bg: '#d1fae5', text: '#10b981' };
    }
  };
  const style = getCategoryStyle(note.category);

  return (
    <div className="note-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
        <span className="category-tag" style={{ backgroundColor: style.bg, color: style.text }}>
          {note.category}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Bouton Éditer */}
          <button 
            onClick={() => onEdit(note)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '2px', transition: 'transform 0.2s' }} 
            title="Modifier"
          >
            ✏️
          </button>
          {/* Bouton Supprimer */}
          <button 
            onClick={() => onDelete(note._id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, fontSize: '1.2rem', padding: '2px' }}
            title="Supprimer"
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', fontWeight: '600' }}>{note.title}</h3>
      
      <p style={{ lineHeight: '1.6', fontSize: '0.95rem', whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
        {note.content}
      </p>

      <div style={{ borderTop: '1px solid rgba(150,150,150,0.1)', paddingTop: '15px', fontSize: '0.8rem', opacity: 0.7, display: 'flex', alignItems: 'center' }}>
        🕒 {new Date(note.createdAt).toLocaleDateString('fr-FR')}
      </div>
    </div>
  );
};

export default NoteItem;