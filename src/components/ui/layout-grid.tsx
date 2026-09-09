"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: React.ReactNode;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-2 md:p-4 grid grid-cols-1 md:grid-cols-3 w-full mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={card.id || i} className={card.className}>
          <motion.div
            onClick={() => handleClick(card)}
            className={`relative overflow-hidden rounded-2xl cursor-pointer border border-zinc-200 transition-all duration-300 hover:shadow-xl ${
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-4 md:inset-10 z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white h-full w-full"
                : "bg-white h-full w-full"
            }`}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <BlurImage card={card} isSelected={selected?.id === card.id} />
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {selected?.id && (
          <motion.div
            onClick={handleOutsideClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 cursor-pointer"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const BlurImage = ({
  card,
  isSelected,
}: {
  card: Card;
  isSelected: boolean;
}) => {
  return (
    <div
      className={`w-full h-full transition-opacity duration-300 ${
        isSelected ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {typeof card.thumbnail === "string" ? (
        <img
          src={card.thumbnail}
          alt="thumbnail"
          className="object-cover object-center w-full h-full"
        />
      ) : (
        card.thumbnail
      )}
    </div>
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-slate-900/95 border border-zinc-700 h-full w-full flex flex-col justify-end rounded-2xl shadow-2xl relative z-[60] p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-50 text-white"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
