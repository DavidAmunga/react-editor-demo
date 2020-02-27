import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import htmlToDraft from 'html-to-draftjs';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4)
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  editor: {
    border: '1px solid black'
  }
}));


function App() {


  const classes = useStyles();

  const theme = useTheme();
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          onEditorStateChange={onEditorStateChange}
          editorStyle={{ border: `1px solid ${theme.palette.primary.light}`, padding: '1rem', borderRadius: '5px' }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          multiline
          rows={2}
          label="HTML Content"
          variant="outlined"
          filled
          fullWidth
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </Grid>
    </Grid>
  );
}

export default App;
