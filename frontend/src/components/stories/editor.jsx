import React from 'react'
import ReactQuill, { Quill } from "react-quill";
import PropTypes from 'prop-types';

class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editorHtml: '',
            theme: 'snow'
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(html){
        this.setState({
            editorHtml: html
        })
    };

    handleThemeChange(newTheme) {
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme })
    }

    render(){
        return (
            <div>
                <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    placeholder={this.props.placeholder}/>
                
                <div className="themeSwitcher">
                    <label>Theme</label>
                    <select onChange={e => 
                        this.handleThemeChange(e.target.value)}>
                            <option value="snow">Snow</option>
                            <option value="bubble">Bubble</option>
                    </select>
                </div>
            </div>
        )
    }

}



/*
* Quill modules to attach to editor
* See https://quilljs.com/docs/modules/ for complete options
*/

Editor.modules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'font': []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/*
 * PropType validation
 */
Editor.propTypes = {
    placeholder: PropTypes.string,
}

export default Editor;