import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";
import { getQuote } from "@/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(
    null
  );

  const fetchQuote = async () => {
    const q = await getQuote();
    setQuote({ quote: q.quote, author: q.author });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  function handleNewQuote() {
    setQuote(null);
    fetchQuote();
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div
          id="quote-box"
          className="flex flex-col p-4 bg-white shadow-md rounded-lg w-96"
        >
          <p id="text" className="italic">
            {quote ? quote.quote : "Loading..."}
          </p>
          <p id="author" className="mt-4 text-right text-sm text-gray-600">
            {quote ? quote.author : "Loading..."}
          </p>
          <div className="flex justify-between w-full mt-4">
            <Button asChild variant={"outline"}>
              <a
                id="tweet-quote"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `"${quote?.quote}" - ${quote?.author}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tweet
              </a>
            </Button>
            <Button id="new-quote" onClick={handleNewQuote}>
              New quote
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <a
            href="https://github.com/feilvan/fcc-random-quote-machine"
            target="_blank"
            className="text-xs text-gray-800 hover:underline"
          >
            See source code ↗️
          </a>
        </div>
      </main>
    </>
  );
}
