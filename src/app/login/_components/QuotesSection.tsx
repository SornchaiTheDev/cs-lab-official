"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BG1 from "~/assets/bg-1.jpg";
import axios from "axios";

interface QuoteResponse {
  _id: string;
  // The quotation text
  content: string;
  // The full name of the author
  author: string;
  // The `slug` of the quote author
  authorSlug: string;
  // The length of quote (number of characters)
  length: number;
  // An array of tag names for this quote
  tags: string[];
}

function QuotesSection() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await axios.get<QuoteResponse>(
          "https://api.quotable.io/random?tags=technology&maxLength=200",
        );
        setQuote(res.data.content);
        setAuthor(res.data.author);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    getQuote();
  }, []);

  return (
    <div className="flex-1 relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-black/40 z-10">
        {!isLoading && (
          <div className="flex flex-col justify-center items-center h-full gap-4">
            <div className="px-10">
              <h1 className="text-5xl text-white tracking-wide leading-tight">&ldquo; {quote} &rdquo;</h1>
              <p className="mt-4 text-lg text-white self-start">- {author}</p>
            </div>
          </div>
        )}
      </div>
      <Image
        className="object-right object-cover"
        src={BG1}
        fill
        alt="Background Image 1"
      />
    </div>
  );
}

export default QuotesSection;
