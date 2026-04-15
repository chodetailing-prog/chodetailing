import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { getServiceById, Service } from "@/lib/store";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  
  const fallbacks: Record<string, Service> = {
    "interior": {
      id: "interior",
      title: "Interior Detailing",
      price: "₩290,000부터",
      description: "차량 내부 전체와 트렁크는 스팀 세척으로 꼼꼼하게 청소합니다. 가죽 시트는 pH 중성 가죽 세척제로 세척한 후 컨디셔너로 관리합니다. 카펫, 매트, 직물 시트는 딥 클리닝과 샴푸 추출 방식으로 세척합니다. 대시보드, 센터 콘솔, 도어 패널은 세척 후 보호제를 도포하여 원래의 모습을 복원합니다. 유리창은 얼룩 없이 깨끗하게 닦습니다.\n\n오염이 심하거나 개/고양이 털이 과도하게 많은 경우 추가 요금이 발생할 수 있습니다. 부담 없이 이메일로 문의하시거나 매장을 방문하셔서 견적을 받아보세요.",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop",
      order: 1,
      features: [],
      pricing: [
        {
          title: "실내 정밀 딥클리닝",
          price: "₩290,000",
          description: "대시보드, 센터콘솔, 도어 패널 세정 및 가죽/직물 시트 정밀 클리닝을 포함한 전체 실내 케어 서비스입니다.",
          features: [
            "대시보드, 센터 콘솔 및 도어 패널 청소",
            "가죽 시트 세척 및 관리",
            "직물 시트 세척(샴푸 추출 방식)",
            "차량 매트 및 카펫 청소 (샴푸 추출 방식)",
            "플라스틱 부품 처리 (자외선 차단, 새로운 외관)",
            "얼룩 없이 창문 닦기",
            "평균 소요 기간: 1일"
          ]
        },
        {
          title: "오존 살균 탈취",
          price: "₩50,000",
          description: "실내의 불쾌한 냄새를 근본적으로 제거하는 살균 탈취 서비스입니다. (실내 청소 후에만 가능)",
          features: [
            "차량 실내 냄새 제거",
            "악취 근원지 중화",
            "오존 가스가 구석구석까지 침투하여 살균",
            "실내 청소 후에만 가능"
          ]
        },
        {
          title: "천장(헤드라이너) 클리닝",
          price: "₩50,000",
          description: "특수 세정제를 사용하여 천장의 얼룩과 오염을 제거하는 서비스입니다. 가격은 오염도에 따라 상이할 수 있습니다.",
          features: [
            "전용 세정제를 이용한 얼룩 및 오염 제거",
            "오염도에 따라 가격 변동 가능"
          ]
        }
      ],
      comparisonImages: [
        {
          before: "https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=2071&auto=format&fit=crop",
          after: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop"
        },
        {
          before: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop",
          after: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop"
        }
      ]
    },
    "paint": {
      id: "paint",
      title: "Paint Correction",
      price: "₩450,000부터",
      description: "긁힘, 흠집, 광택을 잃은 페인트를 제거하여 흠집 없이 최적의 광택과 깊이감을 선사하는 마감 처리를 해드립니다! 플라스틱이나 고무와 같은 민감한 부위는 연마제와의 마찰을 방지하기 위해 전문적으로 보호 처리됩니다.\n\n저희는 광택 작업을 가벼운 작업과 강도 높은 작업, 두 단계로 나눕니다. 어떤 작업이 고객님의 차량에 적합한지는 도장면의 상태와 원하시는 결과에 따라 결정됩니다.\n\n견적 문의는 부담 없이 연락 주시고, 페인트 상태를 직접 확인하고 싶으시면 언제든지 저희 매장을 방문해 주세요.",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop",
      order: 2,
      features: [],
      pricing: [
        { 
          title: "라이트 폴리싱 (Light Polish)", 
          price: "₩450,000",
          description: "미세한 스크래치 제거 및 광택 복원", 
          features: [
            "1단계 광택 공정", 
            "미세한 스크래치 제거",
            "최적의 광택 부여",
            "신차 또는 미세한 사용감이 있는 차량에 권장",
            "SUV + 5만원",
            "RV + 10만원",
            "대형 차량은 별도 문의"
          ] 
        },
        { 
          title: "헤비 폴리싱 (Heavy Polish)", 
          price: "₩850,000",
          description: "깊은 스크래치 및 결함 제거", 
          features: [
            "다단계(3스텝) 광택 공정", 
            "중간 및 깊은 스크래치 제거",
            "산화물, 얼룩, 홀로그램 제거",
            "최적의 광택 부여",
            "사용감이 많은 차량에 권장",
            "SUV + 5만원",
            "RV + 10만원",
            "대형 차량은 별도 문의"
          ] 
        }
      ],
      featureSections: [
        {
          title: "카나우바 왁스 또는\n세라믹 코팅",
          description: "모든 광택 작업 후에는 도장면을 보호하기 위해 고품질 왁스로 마무리합니다. 차량 광택 작업 후 코팅으로 보호하고 싶으시다면 세라믹 코팅 시공을 살펴보세요. 세라믹 코팅은 광택 작업이 포함된 패키지 상품으로 제공됩니다.",
          image: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2000&auto=format&fit=crop",
          buttonText: "세라믹 코팅 알아보기"
        },
        {
          title: "헤드라이트 폴리싱",
          description: "샌딩 및 폴리싱 기술을 사용하면 흐릿해진 헤드라이트를 원래의 선명함으로 되돌릴 수 있습니다. 헤드라이트 폴리싱은 차량의 전조등이 불분명하여 기술 검사를 통과하지 못한 경우에도 적합한 방법입니다.",
          image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2000&auto=format&fit=crop",
          price: "헤드라이트 개당 ₩40,000부터"
        }
      ]
    },
    "ceramic": {
      id: "ceramic",
      title: "Ceramic Coating",
      price: "From ₩800,000",
      description: "최상급 세라믹 코팅제를 도포하여 도장면을 보호하고, 강력한 발수력과 방오성을 부여하여 차량 관리를 수월하게 합니다.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop",
      order: 3,
      features: ["9H 경도 프리미엄 세라믹 코팅", "휠 및 캘리퍼 코팅"],
      pricing: [
        { title: "신차 코팅 패키지", description: "최상의 상태 보존", features: ["세라믹 코팅 2레이어"] }
      ]
    },
    "signature": {
      id: "signature",
      title: "Premium Hand Wash",
      price: "From ₩250,000",
      description: "차량 내/외부의 오염을 안전하게 제거하고 본연의 색감과 광택을 끌어올리는 프리미엄 세차 서비스입니다.",
      image: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2000&auto=format&fit=crop",
      order: 4,
      features: ["프리워시 및 스노우폼 세차", "철분 및 타르 제거"],
      pricing: [
        { title: "프리미엄 핸드워시", price: "₩95,000", features: ["2버킷 방식 미트질"] }
      ]
    }
  };

  const [service, setService] = useState<Service | null>(id ? (fallbacks[id] || null) : null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const data = await getServiceById(id);
          if (data) {
            setService(data);
          }
        } catch (error) {
          console.error("ServiceDetail loadService error:", error);
        }
        setIsLoading(false);
      }
    };
    loadService();
    window.scrollTo(0, 0);
  }, [id]);

  if (!service && isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-black/30 tracking-widest uppercase">Loading Service...</div>
      </div>
    );
  }

  if (!service && !isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-xl text-black/50 tracking-widest uppercase">Service not found</p>
        <a href="/" className="px-8 py-3 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] lg:h-[70vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase text-white mb-6 leading-none">
              {service.title}
            </h1>
            <div className="w-16 md:w-24 h-1 md:h-1.5 bg-white mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Detailed Guide Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-black/30">Service Overview</h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight">
                  {service.id === 'interior' ? (
                    <>차량 내부 <span className="font-extrabold">꼼꼼한 청소</span></>
                  ) : service.id === 'paint' ? (
                    <>자동차 광택 · 폴리싱</>
                  ) : (
                    <>{service.title} 상세 안내</>
                  )}
                </h3>
              </div>
              <p className="text-lg md:text-xl text-black/60 leading-relaxed font-light break-keep whitespace-pre-line">
                {service.description}
              </p>
              
              {/* Features Grid */}
              {service.features && service.features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 md:gap-4">
                      <CheckCircle2 size={20} className="text-black shrink-0 mt-1 md:mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm md:text-base text-black/80 font-medium leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] sm:aspect-video lg:aspect-square overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 w-24 md:w-32 h-24 md:h-32 bg-black/5 rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Distinct Background */}
      {service.pricing && service.pricing.length > 0 && (
        <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-black/[0.02] border-y border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-20 space-y-3 md:space-y-4">
              <h2 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-black/30">Pricing & Plans</h2>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase text-black">
                {service.id === 'interior' ? '실내 세차 가격' : service.id === 'paint' ? '자동차 광택 · 폴리싱 가격' : `${service.title} 가격 안내`}
              </h3>
              <p className="text-sm md:text-base text-black/40 font-light max-w-xl mx-auto break-keep">모든 작업은 차량의 크기와 오염도에 따라 최종 견적이 변동될 수 있습니다.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
              {service.pricing.map((plan, pIdx) => (
                <motion.div 
                  key={pIdx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pIdx * 0.1, duration: 0.6 }}
                  className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 shadow-xl md:shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/5 flex flex-col hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group w-full md:w-[calc(50%-2rem)] xl:w-[calc(33.333%-2.5rem)] max-w-lg"
                >
                  <div className="mb-8 md:mb-10">
                    <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-4 md:mb-6 leading-tight">
                      {plan.title}
                    </h4>
                    
                    {plan.price && (
                      <div className="flex items-baseline flex-wrap gap-1 mb-4">
                        <span className="text-base md:text-xl font-light text-black">₩</span>
                        <span className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black">
                          {plan.price.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                        <span className="text-xs font-medium text-black/40 ml-1">incl. VAT</span>
                      </div>
                    )}

                    {plan.description && (
                      <p className="text-sm md:text-base text-black/50 font-light leading-relaxed break-keep">
                        {plan.description}
                      </p>
                    )}
                  </div>

                  <div className="flex-grow space-y-4 md:space-y-5 mb-10 md:mb-12">
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/20 mb-2">Included Features</div>
                    {plan.features && plan.features.map((feature, fIdx) => {
                      const isAdditionalInfo = feature.includes('SUV') || feature.includes('RV') || feature.includes('별도 문의');
                      const isPriceLine = feature.includes('+') && (feature.includes('만원') || feature.includes('원'));
                      
                      return (
                        <div key={fIdx} className={`flex items-start gap-3 md:gap-4 ${isAdditionalInfo ? 'pt-2 border-t border-black/5 mt-2' : ''}`}>
                          {!isAdditionalInfo ? (
                            <CheckCircle2 size={18} className="text-black shrink-0 mt-0.5" strokeWidth={1.5} />
                          ) : (
                            <div className="w-[18px] shrink-0" />
                          )}
                          <span className={`text-sm md:text-base leading-relaxed break-keep ${isAdditionalInfo ? 'text-black/80 font-medium' : 'text-black/60 font-light'}`}>
                            {isPriceLine ? (
                              <>
                                <span className="font-light">{feature.split('+')[0]}</span>
                                <span className="text-black font-bold">+{feature.split('+')[1]}</span>
                              </>
                            ) : feature}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-auto">
                    <a 
                      href="/contact"
                      className="w-full py-3 sm:py-4 md:py-6 bg-black text-white text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase rounded-full flex items-center justify-center hover:bg-black/80 transition-all active:scale-[0.97] shadow-lg shadow-black/10"
                    >
                      상담 문의하기
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature Sections (Split Layout) */}
      {service.featureSections && service.featureSections.length > 0 && (
        <section className="w-full overflow-hidden border-t border-black/5">
          {service.featureSections.map((section, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:h-[600px] bg-white`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-full overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="w-full h-full"
                >
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
              
              {/* Text Side */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 flex flex-col justify-center space-y-6 md:space-y-8 bg-white relative">
                <div className="absolute top-0 left-8 w-12 h-1 bg-black/10 lg:hidden" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/20">Feature {index + 1}</div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight break-keep">
                    {section.title.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className="text-base md:text-lg text-black/60 leading-relaxed font-light break-keep">
                    {section.description}
                  </p>
                  
                  {section.price && (
                    <p className="text-xl md:text-2xl font-bold text-black pt-4">
                      {section.price}
                    </p>
                  )}
                  
                  {section.buttonText && (
                    <div className="pt-6">
                      <a 
                        href="/services/ceramic" 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-black/80 transition-all group"
                      >
                        {section.buttonText}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Before / After Section */}
      {service.comparisonImages && service.comparisonImages.length > 0 && (
        <section className="w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 border-t border-black/5">
          <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
            <div className="text-center space-y-3 md:space-y-4">
              <h2 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-black/30">Results</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-black">
                전/후 결과
              </h3>
              <p className="text-sm md:text-base text-black/40 font-light max-w-xl mx-auto break-keep">
                파란색 선을 드래그하여 결과를 확인하세요.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {service.comparisonImages.map((pair, index) => (
                <div key={index} className="space-y-4">
                  <BeforeAfterSlider 
                    beforeImage={pair.before}
                    afterImage={pair.after}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
