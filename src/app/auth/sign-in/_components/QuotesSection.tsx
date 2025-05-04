"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BG1 from "~/assets/quotes_bg/bg1.jpeg";
import BG2 from "~/assets/quotes_bg/bg2.jpeg";
import BG3 from "~/assets/quotes_bg/bg3.jpeg";
import BG4 from "~/assets/quotes_bg/bg4.jpeg";
import BG5 from "~/assets/quotes_bg/bg5.jpeg";
import BG6 from "~/assets/quotes_bg/bg6.jpeg";
import BG7 from "~/assets/quotes_bg/bg7.jpeg";
import BG8 from "~/assets/quotes_bg/bg8.jpeg";
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
  const [quote, setQuote] = useState(
    'Every developer starts their journey with "Hello World"',
  );
  const [author, setAuthor] = useState("SornchaiTheDev");
  const [isLoading, setIsLoading] = useState(true);
  const [imageIdx, setImageIdx] = useState<number | null>(null);
  const [images, _] = useState([BG1, BG2, BG3, BG4, BG5, BG6, BG7, BG8]);

  const isStateEmpty = quote === "" || author === "";
  const isNoQuote = isLoading || isStateEmpty;

  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await axios.get<QuoteResponse>(
          "https://api.quotable.io/random?tags=technology&maxLength=120",
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

  useEffect(() => {
    const randIdx = Math.max(Math.floor(Math.random() * images.length) - 1, 0);
    setImageIdx(randIdx);
  }, [images]);

  return (
    <div className="flex-1 max-h-[300px] md:max-h-[450px] lg:max-h-full relative rounded-3xl overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-black/40 z-10">
        {!isNoQuote && (
          <div className="flex flex-col justify-end pb-10 items-center h-full gap-4">
            <div className="px-10">
              <h1 className="text-2xl lg:text-4xl font-medium text-white lg:leading-[3rem]">
                {quote}
              </h1>
              <p className="mt-4 text-lg text-white self-start">- {author}</p>
            </div>
          </div>
        )}
      </div>
      {imageIdx !== null && (
        <Image
          className="object-right object-cover"
          src={images[imageIdx]}
          fill
          alt="Background Image 1"
        />
      )}
    </div>
  );
}

export default QuotesSection;
