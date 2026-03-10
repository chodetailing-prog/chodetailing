import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioItem, getPortfolioItems, getHeroImage } from "@/lib/store";

export default function Home() {
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop");
  const [recentWorks, setRecentWorks] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const image = await getHeroImage();
      setHeroImage(image);
      
      const items = await getPortfolioItems();
      setRecentWorks(items.slice(0, 2));
    };
    
    loadData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
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
      <section className="py-32 px-6 bg-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
            타협하지 않는 완벽함
          </h2>
          <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed">
            CHO DETAILING은 단순한 세차를 넘어, 차량 본연의 가치를 복원하고 극대화하는 하이엔드 디테일링 스튜디오입니다. 
            최고급 케미컬과 검증된 공정, 그리고 장인정신을 바탕으로 당신의 차량에 숨결을 불어넣습니다.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">CAR DETAILING SERVICES</h2>
            <p className="text-black/50 max-w-2xl mx-auto font-light">
              최상의 결과물을 위해 엄선된 제품과 정밀한 기술력을 결합합니다.<br />
              각 차량의 상태에 최적화된 맞춤형 디테일링 솔루션을 경험해 보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "interior", title: "Interior Detailing", desc: "실내 정밀 세정 및 가죽 보호 케어", img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop" },
              { id: "paint", title: "Paint Correction", desc: "스크래치 제거 및 도장면 광택 최적화", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop" },
              { id: "ceramic", title: "Ceramic Coating", desc: "최상급 세라믹 코팅 보호막 형성", img: "https://images.unsplash.com/photo-1552689486-f6773047d19f?q=80&w=2000&auto=format&fit=crop" },
              { id: "signature", title: "Premium Hand Wash", desc: "전문적인 프리미엄 세차 서비스", img: "https://images.unsplash.com/photo-1601362840469-82e058f82400?q=80&w=2000&auto=format&fit=crop" }
            ].map((service) => (
              <Link 
                key={service.id} 
                to={`/services/${service.id}`}
                className="group relative h-[240px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl md:rounded-3xl block shadow-lg"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Base dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  
                  {/* Consistent Pastel Blue Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-400/60 via-sky-200/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8 text-white">
                  <div className="relative z-20">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 tracking-tight drop-shadow-md">
                      {service.title}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm lg:text-base text-white font-medium leading-snug transform translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 group-active:opacity-100">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile-only persistent gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/services" 
              className="inline-block px-10 py-4 bg-black text-white text-sm font-bold tracking-[0.3em] uppercase hover:bg-black/80 transition-all rounded-full"
            >
              View All Services
            </Link>
          </div>
        </div>
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
            {recentWorks.map((item) => (
              <Link to={`/portfolio/${item.id}`} key={item.id} className="group block overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-black/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                  <p className="text-black/50 mt-2">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
