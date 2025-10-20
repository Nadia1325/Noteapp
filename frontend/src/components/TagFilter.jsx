import React from 'react';

const TagFilter = ({ availableTags, selectedTags, onChange }) => {
  const handleTagToggle = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    onChange(newSelectedTags);
  };

  const clearAllTags = () => {
    onChange([]);
  };

  if (availableTags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <div className="tag-filter-header">
        <h3>Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button 
            className="btn btn-link btn-small"
            onClick={clearAllTags}
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="tag-list">
        {availableTags.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
            {selectedTags.includes(tag) && (
              <span className="tag-remove">×</span>
            )}
          </button>
        ))}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="selected-tags-count">
          {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
};

export default TagFilter;