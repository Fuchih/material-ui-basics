import { Container } from '@material-ui/core'
import React from 'react'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'

export default function Notes() {
  const url = 'http://localhost:3004/notes'

  const [notes, setNotes] = React.useState([])

  React.useEffect(() => {
    dataFetch()
  }, [])

  const dataFetch = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setNotes(data))
  }

  const handleDelete = async (id) => {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
    dataFetch()
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes?.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={() => handleDelete(note.id)} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
