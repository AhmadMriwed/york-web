import { convertFromHTML, EditorState, ContentState } from "draft-js";

export const convertHTMLtoDraftState = (html: any) => {
  const blocksFromHTML = convertFromHTML(html);

  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return EditorState.createWithContent(state);
};
