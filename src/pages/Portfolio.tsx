import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      title: "Porsche 911 GT3",
      category: "Paint Correction & Ceramic Coating",
      image: "https://images.unsplash.com/photo-1503376713259-8bbaf0118c58?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Mercedes-Benz G-Class",
      category: "Premium Interior Detailing",
      image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "BMW M4 Competition",
      category: "Full PPF Installation",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Audi RS6 Avant",
      category: "Signature Detailing",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Ferrari F8 Tributo",
      category: "Paint Correction & Ceramic Coating",
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Lamborghini Huracán",
      category: "Track Prep Detailing",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2071&auto=format&fit=crop",
    },
  ];

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
            className="group cursor-pointer"
          >
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
