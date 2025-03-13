import React from "react";

const unescapeHtml = (str: string) => {
  if (!str) return "";

  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/& nbsp ؛/g, " ")
    .replace(/& amp ؛/g, " ")
    .replace(/؛ amp &/g, " ")
    .replace(/؛nbsp&/g, " ")
    .replace(/&nbsp؛/g, " ")
    .replace(/nbsp/g, " ")
    .replace(/ nbsp &/g, " ")
    .replace(/؛ &/g, " ")
    .replace(/& amp ؛/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/؛/g, ";")
    .replace(/& quot;/g, '"')
    .replace(/& Quot;/g, '"')
    .replace(/& QUOT;/g, '"')
    .replace(/& apos;/g, "'")
    .replace(/& Apos;/g, "'")
    .replace(/& APOS;/g, "'");
};

const removeInlineStyles = (str: string) => {
  return str.replace(/<[^>]+style="[^"]*"[^>]*>/g, "");
};

const removeUnwantedTags = (str: string) => {
  return str
    .replace(/<\/?span[^>]*>/g, "")
    .replace(/<\/?p[^>]*>/g, "")
    .replace(/<\/?h3[^>]*>/g, "")
    .replace(/<\/?blockquote[^>]*>/g, "");
};

export const SafeDescription = ({
  description,
  lang,
  color,
}: {
  description: string;
  lang: string;
  color: string;
}) => {
  const createDescription = () => {
    if (!description) return null;

    let unescapedDescription = unescapeHtml(description);

    // Remove inline styles and unwanted tags
    unescapedDescription = removeInlineStyles(unescapedDescription);
    unescapedDescription = removeUnwantedTags(unescapedDescription);

    // Remove unwanted HTML tags
    unescapedDescription = unescapedDescription
      .replace(/<br\s*\/?>/gi, "") // Remove <br> and <br/>
      .replace(/<\/?b\b[^>]*>/gi, "") // Remove all <b> tags
      .replace(/<\/?p\b[^>]*>/gi, ""); // Remove all <p> tags

    // Split the text into lines based on newlines
    const lines = unescapedDescription.split("\n");

    // Create React elements manually
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div
      className={`mb-4 leading-7 text-${color} w-full ${
        lang === "ar" ? "text-right text-medium" : "text-left"
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{ whiteSpace: "pre-line" }}
    >
      {createDescription()}
    </div>
  );
};
