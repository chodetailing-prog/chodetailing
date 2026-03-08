import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { PortfolioItem, getPortfolioItems } from "@/lib/store";

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      const items = await getPortfolioItems();
      const found = items.find((i) => i.id === id);
      if (found) {
        setItem(found);
      }
    };
    loadItem();
    window.scrollTo(0, 0);
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-bold mb-4">포트폴리오를 찾을 수 없습니다.</h2>
        <Link to="/portfolio" className="text-black/50 hover:text-black transition-colors underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <Link 
          to="/portfolio" 
          className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-black/40 hover:text-black transition-colors"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
              {item.title}
            </h1>
            <p className="text-lg text-black/60 font-light leading-relaxed">
              {item.description || "상세 설명이 없습니다."}
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-black/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <Tag size={18} />
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-black/40">Category</p>
                <p className="font-medium">{item.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-black/40">Date</p>
                <p className="font-medium">{item.date}</p>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <Link 
              to="/contact" 
              className="inline-block w-full py-4 bg-black text-white text-center font-medium tracking-widest uppercase hover:bg-black/80 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </motion.div>

        {/* Gallery */}
        <div className="lg:col-span-2 space-y-8">
          {item.images && item.images.length > 0 ? (
            item.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="w-full bg-black/5 overflow-hidden"
              >
                <img 
                  src={img} 
                  alt={`${item.title} gallery ${idx + 1}`} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full aspect-video bg-black/5 overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
