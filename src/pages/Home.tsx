import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop"
            alt="Luxury Car Detailing"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6"
          >
            Perfection <br /> in Details
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl font-light tracking-widest uppercase text-white/80 max-w-2xl mx-auto"
          >
            하이엔드 자동차 디테일링의 새로운 기준
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-12"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium tracking-widest uppercase hover:bg-black hover:text-white border border-white transition-all duration-300"
            >
              View Portfolio <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
          타협하지 않는 완벽함
        </h2>
        <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed">
          CHO DETAILING은 단순한 세차를 넘어, 차량 본연의 가치를 복원하고 극대화하는 하이엔드 디테일링 스튜디오입니다. 
          최고급 케미컬과 검증된 공정, 그리고 장인정신을 바탕으로 당신의 차량에 숨결을 불어넣습니다.
        </p>
      </section>

      {/* Featured Portfolio */}
      <section className="py-24 bg-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">RECENT WORK</h2>
            <Link to="/portfolio" className="text-sm font-medium tracking-widest uppercase hover:text-black/60 transition-colors flex items-center gap-2">
              All Works <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Porsche 911 GT3",
                desc: "Paint Correction & Ceramic Coating",
                img: "https://images.unsplash.com/photo-1503376713259-8bbaf0118c58?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "Mercedes-Benz G-Class",
                desc: "Premium Interior Detailing",
                img: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1974&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <Link to="/portfolio" key={idx} className="group block overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-black/10">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                  <p className="text-black/50 mt-2">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
