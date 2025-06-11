import { useState, useRef } from 'react'
import Button from '../ui/Button'

function PhotoUpload({ currentPhoto, onPhotoUpload }) {
  const [preview, setPreview] = useState(currentPhoto)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef()

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validation du fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError('La taille du fichier ne doit pas dépasser 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Créer un preview local
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)

      // Simuler l'upload (à remplacer par une vraie API)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simuler une URL de retour
      const photoUrl = URL.createObjectURL(file)
      onPhotoUpload?.(photoUrl)
      
    } catch (err) {
      setError('Erreur lors de l\'upload de la photo')
      setPreview(currentPhoto)
    } finally {
      setUploading(false)
    }
  }

  const handleRemovePhoto = () => {
    setPreview(null)
    onPhotoUpload?.(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="photo-upload">
      <div className="photo-preview">
        {preview ? (
          <div className="current-photo">
            <img 
              src={preview} 
              alt="Photo de profil" 
              className="photo-image"
            />
            <div className="photo-overlay">
              <Button
                variant="ghost"
                size="small"
                onClick={handleFileSelect}
                disabled={uploading}
              >
                Changer
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={handleRemovePhoto}
                disabled={uploading}
              >
                Supprimer
              </Button>
            </div>
          </div>
        ) : (
          <div className="no-photo">
            <div className="photo-placeholder">
              <div className="placeholder-icon">📷</div>
              <p>Aucune photo</p>
            </div>
          </div>
        )}
      </div>

      <div className="photo-actions">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        {!preview && (
          <Button
            variant="primary"
            onClick={handleFileSelect}
            disabled={uploading}
            loading={uploading}
          >
            {uploading ? 'Upload en cours...' : 'Ajouter une photo'}
          </Button>
        )}

        {error && (
          <div className="upload-error">
            {error}
          </div>
        )}

        <div className="upload-help">
          <small>
            Formats acceptés : JPG, PNG, GIF. Taille max : 5MB
          </small>
        </div>
      </div>
    </div>
  )
}

export default PhotoUpload 