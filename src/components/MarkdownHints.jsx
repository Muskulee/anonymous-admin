import React, { useEffect, useRef } from "react";

const mdRules = [
  {
    title: " From h1 to h6",
    rule: "# Heading -> ###### Heading",
  },
  {
    title: " Blockquote",
    rule: "> Your Quote",
  },
  {
    title: " Image",
    rule: "![image alt](http://image_url.com)",
  },
  {
    title: " Link",
    rule: "[Link Text](http://your_link.com)",
  },
];

export default function MarkdownHints() {
  const container = useRef();

  useEffect(() => {
    container.current?.classList.remove("-translate-y-5", "opacity-0");
    container.current?.classList.add("translate-y-0", "opacity-1");
  }, []);

  return (
    <div ref={container} className="bg-white  top-1/2 px-2 py-4 rounded 
    -translate-y-5 opacity-0 transition">
      <h1 className="font-semibold text-center">General Markdown Rules</h1>

      <ul className="space-y-2">
        {mdRules.map(({ title, rule }) => {
          return (
            <li key={title}>
              <p className="font-semibold  text-gray-500"> {title}</p>
              <p className="font-semibold  text-gray-700 pl-2 font-mono">
                {rule}
              </p>
            </li>
          );
        })}
        <li className="text-center text-teal-500">
          <a href="https://www.markdownguide.org/basic-syntax/" taget="_blank">
            Find Out More
          </a>
        </li>
      </ul>
    </div>
  );
}