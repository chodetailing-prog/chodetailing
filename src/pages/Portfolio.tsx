import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PortfolioItem, getPortfolioItems } from "@/lib/store";

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const items = await getPortfolioItems();
      setPortfolioItems(items);
    };
    loadItems();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
          Portfolio
        </h1>
        <p className="text-xl text-black/50 font-light max-w-2xl">
          CHO DETAILING이 완성한 완벽함의 기록. 각 차량의 특성을 고려한 맞춤형 디테일링 솔루션을 제공합니다.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {portfolioItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group"
          >
            <Link to={`/portfolio/${item.id}`} className="block">
              <div className="aspect-[4/5] overflow-hidden bg-black/5 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-medium tracking-widest uppercase flex items-center gap-2">
                    View Details <ArrowRight size={16} />
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="text-black/50 mt-2 text-sm uppercase tracking-widest">{item.category}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
