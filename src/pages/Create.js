import React from 'react'
import {
  Typography,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined'
import { useHistory } from 'react-router-dom'

export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = React.useState('')
  const [details, setDetails] = React.useState('')
  const [titleError, setTitleError] = React.useState(false)
  const [detailsError, setDetailsError] = React.useState(false)
  const [category, setCategory] = React.useState('money')

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title === '') {
      setTitleError(true)
    }

    if (details === '') {
      setDetailsError(true)
    }

    if (title && details) {
      fetch('http://localhost:3004/notes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push('/'))
    }
  }

  return (
    <Container>
      <Typography variant="h6" color="textSecondary">
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Title"
          variant="outlined"
          color="primary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="primary"
          multiline
          minRows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel control={<Radio />} label="Money" value="Money" />
            <FormControlLabel control={<Radio />} label="todos" value="todos" />
            <FormControlLabel
              control={<Radio />}
              label="reminder"
              value="reminder"
            />
            <FormControlLabel control={<Radio />} label="works" value="works" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<DoubleArrowOutlinedIcon />}
        >
          SUBMIT
        </Button>
      </form>
    </Container>
  )
}

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
})
