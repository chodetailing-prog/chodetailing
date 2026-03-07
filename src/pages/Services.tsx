import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Signature Detailing",
      price: "From ₩250,000",
      description: "차량 내/외부의 오염을 안전하게 제거하고 본연의 색감과 광택을 끌어올리는 기본이자 가장 중요한 디테일링 케어입니다.",
      features: [
        "프리워시 및 스노우폼 세차",
        "철분 및 타르 제거",
        "프리미엄 카나우바 왁스 코팅",
        "실내 진공 청소 및 가죽 클리닝",
        "엔진룸 기본 클리닝"
      ]
    },
    {
      title: "Paint Correction",
      price: "From ₩600,000",
      description: "도장면의 스크래치, 스월마크, 워터스팟 등을 정밀하게 연마하여 신차 이상의 완벽한 도장 상태로 복원하는 폴리싱 작업입니다.",
      features: [
        "정밀 마스킹 및 전처리",
        "수성 광택 (1~3 Step)",
        "홀로그램 및 스월마크 완벽 제거",
        "도장면 탈지 및 검수",
        "프리미엄 실런트 코팅"
      ]
    },
    {
      title: "Ceramic Coating",
      price: "From ₩800,000",
      description: "최상급 세라믹 코팅제를 도포하여 도장면을 보호하고, 강력한 발수력과 방오성을 부여하여 차량 관리를 수월하게 합니다.",
      features: [
        "Paint Correction 공정 포함",
        "9H 경도 프리미엄 세라믹 코팅",
        "휠 및 캘리퍼 코팅",
        "유리 전체 발수 코팅",
        "플라스틱 트림 코팅"
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
          Services
        </h1>
        <p className="text-xl text-black/50 font-light max-w-2xl mx-auto">
          차량의 상태와 고객의 니즈에 맞춘 세분화된 프리미엄 케어 솔루션.
          최고의 결과물을 위해 타협하지 않는 공정을 거칩니다.
        </p>
      </motion.div>

      <div className="space-y-24">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
              <div className="aspect-[4/3] bg-black/5 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${idx === 0 ? '1601362840469-82e058f82400' : idx === 1 ? '1580273916550-e323be2ae537' : '1552689486-f6773047d19f'}?q=80&w=2000&auto=format&fit=crop`}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{service.title}</h2>
              <p className="text-xl font-light tracking-widest text-black/40 mb-8">{service.price}</p>
              <p className="text-lg text-black/70 leading-relaxed mb-10">
                {service.description}
              </p>
              
              <ul className="space-y-4">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-4 text-black/80">
                    <CheckCircle2 size={24} className="text-black shrink-0" strokeWidth={1.5} />
                    <span className="text-lg font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
