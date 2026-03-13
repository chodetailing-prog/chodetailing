import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioItem, getPortfolioItems, getServices, Service, getSiteConfig, SiteConfig } from "@/lib/store";

export default function Home() {
  const fallbackRecentWorks = [
    {
      id: "1",
      title: "Porsche 911 GT3 - Full Detail",
      category: "Ceramic Coating",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      images: [],
      date: "2024-03-01"
    },
    {
      id: "2",
      title: "Mercedes-Benz G-Wagon - Interior",
      category: "Interior Detail",
      image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop",
      images: [],
      date: "2024-02-15"
    }
  ];

  const fallbackServices = [
    { id: "interior", title: "Interior Detailing", description: "실내 정밀 세정 및 가죽 보호 케어", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop", price: "", order: 1, features: [] },
    { id: "paint", title: "Paint Correction", description: "스크래치 제거 및 도장면 광택 최적화", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop", price: "", order: 2, features: [] },
    { id: "ceramic", title: "Ceramic Coating", description: "최상급 세라믹 코팅 보호막 형성", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop", price: "", order: 3, features: [] },
    { id: "signature", title: "Premium Hand Wash", description: "전문적인 프리미엄 세차 서비스", image: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2000&auto=format&fit=crop", price: "", order: 4, features: [] }
  ];

  const [recentWorks, setRecentWorks] = useState<PortfolioItem[]>(fallbackRecentWorks);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    heroImage: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
    brandName: "CAR CLEANING & DETAILING",
    heroSubtitle: "하이엔드 자동차 디테일링의 새로운 기준"
  });

  const shortDescriptions: Record<string, string> = {
    "interior": "실내 정밀 세정 및 가죽 보호 케어",
    "paint": "스크래치 제거 및 도장면 광택 최적화",
    "ceramic": "최상급 세라믹 코팅 보호막 형성",
    "signature": "전문적인 프리미엄 세차 서비스"
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const config = await getSiteConfig();
        setSiteConfig(config);
        
        const items = await getPortfolioItems();
        if (items && items.length > 0) {
          setRecentWorks(items.slice(0, 2));
        }

        const fetchedServices = await getServices();
        if (fetchedServices && fetchedServices.length > 0) {
          setServices(fetchedServices.slice(0, 4));
        }
      } catch (error) {
        console.error("Home loadData error:", error);
      }
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
            src={siteConfig.heroImage}
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
            className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            {siteConfig.brandName.includes('&') ? (
              <>
                {siteConfig.brandName.substring(0, siteConfig.brandName.lastIndexOf(' '))}<br />
                {siteConfig.brandName.substring(siteConfig.brandName.lastIndexOf(' ') + 1)}
              </>
            ) : (
              <>
                {siteConfig.brandName.split(' ')[0]} <br /> 
                {siteConfig.brandName.split(' ').slice(1).join(' ')}
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-xl font-light tracking-widest uppercase text-white/80 max-w-2xl mx-auto break-keep"
          >
            {siteConfig.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-12"
          >
            <a
              href="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium tracking-widest uppercase hover:bg-black hover:text-white border border-white transition-all duration-300"
            >
              View Portfolio <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 break-keep">
            타협하지 않는 완벽함
          </h2>
          <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed break-keep">
            CHO DETAILING은 단순한 세차를 넘어, 차량 본연의 가치를 복원하고 극대화하는 하이엔드 디테일링 스튜디오입니다. 
            최고급 케미컬과 검증된 공정, 그리고 장인정신을 바탕으로 당신의 차량에 숨결을 불어넣습니다.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4 break-keep">CAR DETAILING SERVICES</h2>
            <p className="text-black/50 max-w-2xl mx-auto font-light break-keep">
              최상의 결과물을 위해 엄선된 제품과 정밀한 기술력을 결합합니다.<br />
              각 차량의 상태에 최적화된 맞춤형 디테일링 솔루션을 경험해 보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <a 
                key={service.id} 
                href={`/services/${service.id}`}
                className="group relative aspect-[3/2] md:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl block shadow-lg"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-[1100ms] ease-in-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Base dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  {/* Consistent Pastel Blue Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-400/60 via-sky-200/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-6 md:px-8 md:pb-8 text-white">
                  <div className="relative z-20 transform transition-all duration-[1100ms] ease-in-out group-hover:-translate-y-2 group-active:-translate-y-2">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight drop-shadow-lg">
                      {service.title}
                    </h3>
                    <div className="max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 group-active:max-h-16 group-active:opacity-100 transition-all duration-[1100ms] ease-in-out overflow-hidden">
                      <p className="text-xs md:text-sm lg:text-base text-white/90 font-light mt-3 leading-relaxed line-clamp-3 break-keep">
                        {shortDescriptions[service.id] || service.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile-only persistent gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              </a>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="/services" 
              className="inline-block px-10 py-4 bg-black text-white text-sm font-bold tracking-[0.3em] uppercase hover:bg-black/80 transition-all rounded-full"
            >
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-24 bg-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">RECENT WORK</h2>
            <a href="/portfolio" className="text-sm font-medium tracking-widest uppercase hover:text-black/60 transition-colors flex items-center gap-2">
              All Works <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentWorks.map((item) => (
              <a href={`/portfolio/${item.id}`} key={item.id} className="group block overflow-hidden">
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
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
