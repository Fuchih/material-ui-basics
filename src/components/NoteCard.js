import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { blue, green, pink, yellow } from '@material-ui/core/colors'
import { DeleteOutlined } from '@material-ui/icons'
import React from 'react'

export default function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note)

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{note.category[0]}</Avatar>}
        action={
          <IconButton onClick={handleDelete}>
            <DeleteOutlined />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor(note) {
      if (note.category === 'work') return yellow[700]
      if (note.category === 'money') return green[500]
      if (note.category === 'todos') return pink[500]
      return blue[500]
    },
  },
})
