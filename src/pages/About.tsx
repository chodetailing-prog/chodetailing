import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Sparkles, Clock } from "lucide-react";
import { getSiteConfig, SiteConfig } from "@/lib/store";

export default function About() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadConfig = async () => {
      const config = await getSiteConfig();
      setSiteConfig(config);
    };
    loadConfig();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop"
            alt="About CHO DETAILING"
            className="w-full h-full object-cover opacity-40 md:opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 md:hidden" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-8xl font-bold tracking-tighter uppercase mb-4 md:mb-6"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-2xl font-light tracking-widest uppercase text-white/90 md:text-white/80"
          >
            하이엔드 자동차 디테일링의 <br className="md:hidden" /> 새로운 기준
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-black/30 mb-6">Our Philosophy</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-10 leading-tight">
              자동차를 향한 <br /> 진심 어린 집착
            </h3>
            <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed">
              {siteConfig?.aboutText ? (
                <div className="whitespace-pre-wrap">{siteConfig.aboutText}</div>
              ) : (
                <>
                  <p>
                    대한민국에 위치한 CHO DETAILING에서는 전문적인 프리미엄 차량 케어 서비스를 제공합니다. 
                    꼼꼼한 세척, 광택, 그리고 보호(왁스 또는 세라믹 코팅)를 포함한 모든 서비스를 통해 
                    고객님의 차량을 전시장 수준의 완벽한 상태로 복원해 드립니다.
                  </p>
                  <p>
                    기존의 일반적인 세차 업체와는 달리, 저희는 양보다 질을 최우선으로 생각합니다. 
                    그렇기 때문에 한 대의 차량을 작업하더라도 최고의 정성과 시간을 들여 관리해 드릴 것을 약속드립니다.
                  </p>
                  <p>
                    최고급 자재와 검증된 제품, 그리고 숙련된 기술을 사용하여 타협하지 않는 최상의 결과를 만들어냅니다. 
                    차량 코팅, 광택, 실내 디테일링 등 어떤 서비스를 선택하시든, CHO DETAILING에서는 
                    고객님의 차량을 가장 빛나는 완벽한 상태로 되돌려 드립니다!
                  </p>
                </>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2000&auto=format&fit=crop"
              alt="Ceramic Coating Process"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-zinc-50 text-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-black/30 mb-6">Our Core Values</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">우리가 지키는 원칙</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Shield size={40} strokeWidth={1} />,
                title: "정직한 공정",
                desc: "타협하지 않는 정석 공정만을 고집합니다. 눈속임 없는 진실된 작업으로 신뢰를 쌓습니다."
              },
              {
                icon: <Award size={40} strokeWidth={1} />,
                title: "최상급 품질",
                desc: "전 세계적으로 검증된 프리미엄 케미컬과 장비를 사용하여 최상의 결과물을 보장합니다."
              },
              {
                icon: <Sparkles size={40} strokeWidth={1} />,
                title: "디테일의 완성",
                desc: "보이지 않는 틈새, 손이 닿지 않는 곳까지 정밀하게 케어하여 완벽한 디테일을 구현합니다."
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-10 border border-black/5 bg-white rounded-3xl hover:shadow-xl transition-all duration-500"
              >
                <div className="mb-8 text-black/40">{value.icon}</div>
                <h4 className="text-2xl font-bold mb-4">{value.title}</h4>
                <p className="text-black/60 font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10">당신의 차량을 위한 <br /> 최고의 선택</h2>
          <p className="text-xl text-black/50 font-light mb-12">
            지금 바로 CHO DETAILING의 하이엔드 서비스를 경험해 보세요. <br />
            상담을 통해 차량 상태에 최적화된 솔루션을 제안해 드립니다.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white text-sm font-bold tracking-[0.3em] uppercase hover:bg-black/80 transition-all rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
