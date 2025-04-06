import { convertFromHTML, EditorState, ContentState } from "draft-js";

export const convertHTMLtoDraftState = (html: string | null | undefined) => {
  if (!html) {
    return EditorState.createEmpty();
  }

  const htmlString = String(html);
  
  try {
    const blocksFromHTML = convertFromHTML(htmlString);
    
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    return EditorState.createWithContent(state);
  } catch (error) {
    console.error("Error converting HTML to Draft state:", error);
    return EditorState.createEmpty();
  }
};