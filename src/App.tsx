import { useEffect, useState } from 'react'
import './App.css'
import { getPhotos } from './componets/gallerySlice'
import { useAppDispatch, useAppSelector } from './redux/hooks'

function App() {
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const gallery = useAppSelector(state => state.gallery)

  useEffect(() => {
    dispatch(getPhotos(page))
  }, [page])


  return (
    <div className="App">
      <h1>Photos Gallery</h1>
      <hr />
      {gallery.photos.map((photo) => (
        <img
          src={photo.download_url}
          height={150}
          width={150}
          alt={photo.author}
        />
      ))}
      <hr />
      <button onClick={() => setPage(page + 1)}>{gallery.loading ? 'Cargando imagenes...' : 'Ver mas'}</button>
    </div>
  )
}

export default App
