import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  MoveRight,
  Coins,
  Loader2,
  RefreshCw,
  CirclePlus,
  SquareArrowOutUpRight,
  RefreshCcwDot,
} from "lucide-react";
const baseUrl = "https://rewards.coinmaster.com/rewards/rewards.html?c=";
const params = [
  "pe_RICHBSDaKm_20240819",
  "pe_RICHkhMbjG_20240819",
  "pe_CHATBuReSLW_20240825",
  "pe_EMAILgtnKRA_20240820",
  "pe_FCBuWyuSi_20240825",
  "pe_LINEgKcIUv_20240825",
  "pe_INSZkPQNM_20240825",
  "pe_INSRGtdGF_20240824",
  "pe_RICHbYIAtH_20240819",
  "pe_CHATBuReSLW_20240825",
];

const GenerateLinkButton = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [clickedIndices, setClickedIndices] = useState<number[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  // Odczyt klikniętych indeksów z localStorage przy pierwszym renderze
  useEffect(() => {
    const storedClickedIndices = localStorage.getItem("clickedIndices");
    if (storedClickedIndices) {
      setClickedIndices(JSON.parse(storedClickedIndices));
    }
  }, []);

  // Funkcja zapisująca kliknięte indeksy do localStorage
  const saveClickedIndices = (indices: number[]) => {
    localStorage.setItem("clickedIndices", JSON.stringify(indices));
  };

  const handleNextLinkClick = () => {
    setIsGenerated(true); // Ustawienie flagi, że link został wygenerowany

    // Przejdź do następnego linku
    const nextIndex = (currentIndex + 1) % params.length;
    setCurrentIndex(nextIndex);
  };

  const handleLinkClick = () => {
    const updatedClickedIndices = [...clickedIndices, currentIndex];
    setClickedIndices(updatedClickedIndices);
    saveClickedIndices(updatedClickedIndices); // Zapis do localStorage
    handleNextLinkClick(); // Automatyczne przejście do następnego linku po kliknięciu
  };

  const currentParam = params[currentIndex];
  const displayText = currentParam.split("_")[1];
  const generatedLink = `${baseUrl}${currentParam}`;

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="outline"
        onClick={handleNextLinkClick}
        className="mb-1 animate-bounce rounded px-4 py-2 hover:bg-white"
      >
        Generate +25 Spins <RefreshCcwDot className="ml-1 h-5 w-5" />
        {/* <Coins className="ml-2" /> */}
      </Button>
      {isGenerated && (
        <>
          <p className="mb-2 mt-2 text-neutral-500">
            Click again to generate another code
          </p>

          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className={`ml-2 flex gap-2 ${
              clickedIndices.includes(currentIndex)
                ? "text-gray-500 line-through"
                : "text-blue-500"
            }`}
          >
            {displayText}
            <SquareArrowOutUpRight className="h-5 w-5" />
          </a>
        </>
      )}
    </div>
  );
};

export default GenerateLinkButton;
