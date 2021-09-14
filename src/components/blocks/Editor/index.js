import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = ({ handleChange, initText }) => {
  const editorToolbar = [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    '|',
    'blockQuote',
    'undo',
    'redo'
  ];

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        placeholder: 'Start write here...',
        toolbar: [...editorToolbar]
      }}

      data={initText}
      onChange={(event, editor) => {
        const data = editor.getData();
        handleChange(data);
      }}
    />
  );
};

export default Editor;
