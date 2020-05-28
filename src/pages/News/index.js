import React, { Component } from 'react'
import { Card, Button, BackTop } from 'antd'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };

class DraftDemo extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    contentState: content
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  uploadImageCallBack = () => {

  }
  render() {
    const { editorState } = this.state;
    return (
      <div id="cards" style={{ padding: '15px' }}>
        <Card tittle="景区通知" className='card-item'  extra={<Button type="primary" >发布</Button>} >
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            localization={{ locale: 'zh' }}
            toolbar={{
              image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
          />
        </Card>
        <BackTop visibilityHeight={200} style={{ right: 50 }} />
      </div>
    )
  }
}
export default DraftDemo