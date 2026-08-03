"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import Link from "next/link";

export const HeroButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
    >
      <Link href="/contact" className="w-full sm:w-auto">
        <motion.button
          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(255, 107, 0, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] text-white border-2 border-[#FF6B00] px-8 py-3 rounded-lg font-medium transition-all hover:bg-white hover:text-[#FF6B00] shadow-lg shadow-[#FF6B00]/30"
        >
          Talk to Our AI Expert
          <PhoneCall className="w-5 h-5" />
        </motion.button>
      </Link>
    </motion.div>
  );
};
