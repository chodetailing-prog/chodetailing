import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ArrowDown } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { subscribeServices, Service } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const { hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    return subscribeServices((items) => {
      setServices(items);
    });
  }, []);

  const shortDescriptions: Record<string, string> = {
    "interior": "실내 정밀 세정 및 가죽 보호 케어",
    "paint": "스크래치 제거 및 도장면 광택 최적화",
    "ceramic": "최상급 세라믹 코팅 보호막 형성",
    "signature": "전문적인 프리미엄 세차 서비스"
  };

  if (services.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-black/30 tracking-widest uppercase">Loading Services...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8">
            Our Services
          </h1>
          <p className="text-xl text-black/50 font-light max-w-2xl mx-auto leading-relaxed">
            차량의 가치를 보존하고 본연의 아름다움을 극대화하는 <br className="hidden md:block" />
            CHO DETAILING만의 하이엔드 케어 솔루션을 확인해 보세요.
          </p>
        </motion.div>
      </section>

      {/* Services Grid Navigation */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group relative h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl md:rounded-3xl block text-left shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
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
                  <h3 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 md:mb-3 tracking-tight drop-shadow-md">
                    {service.title}
                  </h3>
                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm lg:text-base text-white/90 font-light leading-relaxed transform translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 group-active:opacity-100 max-w-lg">
                      {shortDescriptions[service.id] || service.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mobile-only persistent gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
