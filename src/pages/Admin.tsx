import { useState } from "react";
import { motion } from "motion/react";
import { Settings, Image as ImageIcon, FileText, Plus, Trash2, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", label: "Post Management", icon: FileText },
    { id: "media", label: "Media Library", icon: ImageIcon },
    { id: "settings", label: "Customization", icon: Settings },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
          Admin Dashboard
        </h1>
        <p className="text-black/50 font-light tracking-widest uppercase text-sm">
          CHO DETAILING CMS
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium tracking-widest uppercase transition-colors rounded-md",
                    activeTab === tab.id
                      ? "bg-black text-white"
                      : "text-black/60 hover:bg-black/5 hover:text-black"
                  )}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-black/5 p-8 md:p-12 rounded-xl min-h-[500px]">
          {activeTab === "posts" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Portfolio Posts</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors">
                  <Plus size={16} /> New Post
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 text-xs font-medium tracking-widest uppercase text-black/50">
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: "Porsche 911 GT3", category: "Ceramic Coating", date: "2023-10-24" },
                      { title: "Mercedes-Benz G-Class", category: "Interior Detailing", date: "2023-10-20" },
                      { title: "BMW M4 Competition", category: "PPF", date: "2023-10-15" },
                    ].map((post, idx) => (
                      <tr key={idx} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                        <td className="p-4 font-medium">{post.title}</td>
                        <td className="p-4 text-black/60 text-sm">{post.category}</td>
                        <td className="p-4 text-black/60 text-sm">{post.date}</td>
                        <td className="p-4 text-right">
                          <button className="p-2 text-black/40 hover:text-black transition-colors inline-block">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-2 text-black/40 hover:text-red-500 transition-colors inline-block ml-2">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "media" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors">
                  <Plus size={16} /> Upload
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square bg-black/10 rounded-lg overflow-hidden relative group">
                    <img 
                      src={`https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=500&auto=format&fit=crop&sig=${i}`} 
                      alt="Media" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-2 text-white hover:text-red-400 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold tracking-tight">Site Customization</h2>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-black/5 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-widest uppercase text-black/60">Brand Name</h3>
                  <input 
                    type="text" 
                    defaultValue="CHO DETAILING"
                    className="w-full max-w-md bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors font-medium"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-widest uppercase text-black/60">Hero Subtitle</h3>
                  <input 
                    type="text" 
                    defaultValue="하이엔드 자동차 디테일링의 새로운 기준"
                    className="w-full max-w-md bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors font-medium"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-widest uppercase text-black/60">Theme Color (Accent)</h3>
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
                    <button className="w-10 h-10 rounded-full bg-zinc-800"></button>
                    <button className="w-10 h-10 rounded-full bg-neutral-900"></button>
                  </div>
                </div>

                <button className="px-8 py-3 bg-black text-white font-medium tracking-widest uppercase hover:bg-black/80 transition-colors mt-8">
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
