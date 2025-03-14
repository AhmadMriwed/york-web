import sanitizeHtml from "sanitize-html";
import he from "he"; // Library to decode HTML entities

export const SafeDescription = ({
  description,
  lang,
  color,
}: {
  description: string;
  lang: string;
  color: string;
}) => {
  // Step 1: Decode HTML entities and remove non-breaking spaces
  const decodedDescription = he.decode(description).replace(/\u00A0/g, " ");

  // Step 2: Sanitize the description to allow specific HTML tags
  const sanitizedDescription = sanitizeHtml(decodedDescription, {
    allowedTags: [
      "br",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "a",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "target"],
      img: ["src", "alt", "class", "style"],
    },
  });

  // Step 3: Render the sanitized HTML
  return (
    <div
      className={`text-${color} mt-4 text-[14px]`}
      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
    />
  );
};

export default SafeDescription;
