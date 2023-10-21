import React, { useEffect, useState } from "react";

function Quote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuotes = async () =>
      await fetch(`https://type.fit/api/quotes`)
        .then((res) => res.json())
        .then((data) => {
          const rand = Math.floor(Math.random() * data.length);

          setQuote(data[rand]);
        });

    getQuotes();
  }, []);

  return (
    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
      {quote.text} - <i>{quote.author}</i>
    </div>
  );
}

export default Quote;
