import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import Paper from "@mui/material/Paper";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import htmlToDraft from "html-to-draftjs";
// import draftToHtml from 'draftjs-to-html'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "25px",
  boxShadow:
    "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
  minHeight: "133px",
  padding: "16px",
  ".toolbar-class": {
    border: 0,
    marginLeft: "-10px",
    ".rdw-option-wrapper": {
      border: 0,
    },
    ".rdw-dropdown-wrapper": {
      border: 0,
    },
  },
}));
const toolBarOptions = {
  options: [
    "inline",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "remove",
    "history",
  ],
  inline: {
    options: ["italic", "bold", "underline", "strikethrough"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
  textAlign: {
    options: ["left", "center", "right", "justify"],
  },
};

export default function TextEditor({ value, type, title, onInputCHange }) {
  const i18n = locale.en;

  const getInitialState = (value) => {
    if (value) {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  };

  const [editorState, setEditorState] = useState(getInitialState(value));

  const onEditorStateChange = (text) => {
    const value = text.getCurrentContent().getPlainText();
    onInputCHange(value, type);
    setEditorState(text);
  };

  useEffect(() => {
    setEditorState(getInitialState(value));
  }, [value]);

  return (
    <StyledPaper>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 400,
        }}
      >
        {title}
      </Typography>
      <Editor
        // wrapperClassName="demo-wrapper"
        // editorClassName="demo-editor"
        toolbarClassName="toolbar-class"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={toolBarOptions}
      />
    </StyledPaper>
  );
}
