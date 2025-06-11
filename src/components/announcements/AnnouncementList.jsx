import AnnouncementCard from './AnnouncementCard'

function AnnouncementList({ announcements, onEdit, onDelete }) {
  if (!announcements || announcements.length === 0) {
    return (
      <div className="empty-announcements">
        <div className="empty-icon">📭</div>
        <h3>Aucune annonce disponible</h3>
        <p>Soyez le premier à créer une annonce !</p>
      </div>
    )
  }

  return (
    <div className="announcements-list">
      <div className="announcements-grid">
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default AnnouncementList 