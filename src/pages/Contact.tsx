import React, { useState } from "react";
import { motion } from "motion/react";
import { Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mgonejqv", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
          Contact
        </h1>
        <p className="text-xl text-black/50 font-light max-w-2xl">
          차량 관리에 대한 모든 문의를 환영합니다. 
          최상의 서비스를 위해 100% 예약제로 운영됩니다.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-16"
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-8">STUDIO INFO</h2>
            <div className="space-y-6 text-lg font-light text-black/70">
              <p className="flex items-center gap-4">
                <MapPin size={24} className="text-black" />
                서울특별시 강남구 도산대로 123, 1층 CHO DETAILING
              </p>
              <p className="flex items-center gap-4">
                <Phone size={24} className="text-black" />
                02-1234-5678
              </p>
              <p className="flex items-center gap-4">
                <Mail size={24} className="text-black" />
                info@chodetailing.com
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-8">BUSINESS HOURS</h2>
            <div className="space-y-4 text-lg font-light text-black/70">
              <p className="flex justify-between border-b border-black/10 pb-4">
                <span>Mon - Fri</span>
                <span>10:00 - 20:00</span>
              </p>
              <p className="flex justify-between border-b border-black/10 pb-4">
                <span>Saturday</span>
                <span>10:00 - 18:00</span>
              </p>
              <p className="flex justify-between text-black/40">
                <span>Sunday</span>
                <span>Closed</span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-8">SOCIAL</h2>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-black/5 p-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-8">예약 문의</h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-widest uppercase text-black/60">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-black transition-colors"
                  placeholder="성함"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-widest uppercase text-black/60">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-black transition-colors"
                  placeholder="연락처"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-widest uppercase text-black/60">Car Model</label>
                <input 
                  type="text" 
                  name="car_model"
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-black transition-colors"
                  placeholder="차종"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-widest uppercase text-black/60">Service</label>
                <select 
                  name="service"
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-black transition-colors appearance-none"
                >
                  <option value="">서비스 선택</option>
                  <option value="signature">Signature Detailing</option>
                  <option value="paint">Paint Correction</option>
                  <option value="ceramic">Ceramic Coating</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium tracking-widest uppercase text-black/60">Message</label>
              <textarea 
                name="message"
                required
                rows={4}
                className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-black transition-colors resize-none"
                placeholder="문의 내용 (차량 상태, 원하시는 일정 등)"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-5 bg-black text-white font-medium tracking-widest uppercase hover:bg-black/80 transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
            </button>
            
            {status === "error" && (
              <p className="text-red-500 text-sm mt-2 text-center">
                메시지 전송에 실패했습니다. 다시 시도해주세요.
              </p>
            )}
            {status === "success" && (
              <p className="text-green-600 text-sm mt-2 text-center">
                성공적으로 전송되었습니다. 곧 연락드리겠습니다.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
