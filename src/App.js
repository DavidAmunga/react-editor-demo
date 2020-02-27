import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import htmlToDraft from 'html-to-draftjs';
import './App.css'

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
  const [convertedEditorState, setConvertedEditorState] = useState(EditorState.createEmpty())


  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };


  const onConvertedEditorState = () => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setConvertedEditorState(editorState)
    }
  };



  useEffect(() => {
    if (editorState) {
      onConvertedEditorState()
    }
    // eslint-disable-next-line
  }, [editorState])

  return (
    <Grid container direction="row" spacing={4} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          onEditorStateChange={onEditorStateChange}
          editorStyle={{ border: `1px solid ${theme.palette.primary.light}`, padding: '1rem', borderRadius: '5px' }}
          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: [
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}
          hashtag={{}}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          multiline
          rows={2}
          label="HTML Content"
          variant="outlined"
          fullWidth
          name="htmlContent"
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />


        <Typography variant="body2">Converted HTML to Editor State</Typography>
        <Editor
          editorState={convertedEditorState}
          wrapperClassName="demo-wrapper"
          onEditorStateChange={onConvertedEditorState}
          editorStyle={{ border: `1px solid ${theme.palette.primary.light}`, padding: '1rem', borderRadius: '5px' }}
          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: [
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}
        />

      </Grid>
    </Grid>
  );
}

export default App;
