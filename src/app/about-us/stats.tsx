"use client";

import { FolderCheck, Award, Smile, Globe } from "lucide-react";

export default function StatsBar() {
  return (
    <section className="bg-[#f5f7fb] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white rounded-2xl py-12 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center">
            {/* Stat 1 */}
            <div className="px-6 md:border-r md:border-indigo-400/40">
              <FolderCheck className="mx-auto mb-4 text-indigo-300" size={56} />
              <h3 className="text-3xl md:text-4xl font-bold">200+</h3>
              <p className="text-sm mt-2 text-indigo-200">Projects Delivered</p>
            </div>

            {/* Stat 2 */}
            <div className="px-6 md:border-r md:border-indigo-400/40">
              <Award className="mx-auto mb-4 text-indigo-300" size={56} />
              <h3 className="text-3xl md:text-4xl font-bold">13+</h3>
              <p className="text-sm mt-2 text-indigo-200">
                Years of Experience
              </p>
            </div>

            {/* Stat 3 */}
            <div className="px-6 md:border-r md:border-indigo-400/40">
              <Smile className="mx-auto mb-4 text-indigo-300" size={56} />
              <h3 className="text-3xl md:text-4xl font-bold">98%</h3>
              <p className="text-sm mt-2 text-indigo-200">
                Client Satisfaction
              </p>
            </div>

            {/* Stat 4 */}
            <div className="px-6">
              <Globe className="mx-auto mb-4 text-indigo-300" size={56} />
              <h3 className="text-3xl md:text-4xl font-bold">Global</h3>
              <p className="text-sm mt-2 text-indigo-200">Delivery Model</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
