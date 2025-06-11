import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function FilterBar({ filters, onFilterChange }) {
  const badmintonTypes = [
    'Simple',
    'Double',
    'Mixte'
  ]

  const levels = [
    'Débutant',
    'Intermédiaire', 
    'Avancé',
    'Expert'
  ]

  const [localFilters, setLocalFilters] = useState({
    location: '',
    level: '',
    type: '',
    date: ''
  })

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value
    }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      location: '',
      level: '',
      type: '',
      date: ''
    }
    setLocalFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="type-filter">Type de jeu</label>
        <select
          id="type-filter"
          value={localFilters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les types</option>
          {badmintonTypes.map(type => (
            <option key={type} value={type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="level-filter">Niveau</label>
        <select
          id="level-filter"
          value={localFilters.level}
          onChange={(e) => handleFilterChange('level', e.target.value)}
          className="filter-select"
        >
          <option value="">Tous niveaux</option>
          {levels.map(level => (
            <option key={level} value={level.toLowerCase()}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location-filter">Localisation</label>
        <input
          type="text"
          id="location-filter"
          value={localFilters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          placeholder="Ville, quartier..."
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="date-filter">Date</label>
        <input
          type="date"
          id="date-filter"
          value={localFilters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-actions">
        <button
          type="button"
          onClick={clearFilters}
          className="btn btn-outline btn-sm"
        >
          Effacer
        </button>
      </div>
    </div>
  )
}

FilterBar.propTypes = {
  filters: PropTypes.shape({
    location: PropTypes.string,
    level: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
}

export default FilterBar 