import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Settings, FileText, Plus, Trash2, Edit3, X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  PortfolioItem, 
  subscribePortfolioItems, 
  savePortfolioItem, 
  deletePortfolioItem, 
  fileToBase64,
  getSiteConfig,
  saveSiteConfig,
  Service,
  subscribeServices,
  saveService,
  deleteService
} from "@/lib/store";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("posts");
  const [siteConfig, setSiteConfig] = useState({
    heroImage: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
    brandName: "CHO DETAILING",
    heroSubtitle: "하이엔드 자동차 디테일링의 새로운 기준",
    aboutText: ""
  });
  
  const [posts, setPosts] = useState<PortfolioItem[]>([]);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<PortfolioItem>>({});

  const [services, setServices] = useState<Service[]>([]);
  const [isEditingService, setIsEditingService] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});

  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const postThumbnailInputRef = useRef<HTMLInputElement>(null);
  const postGalleryInputRef = useRef<HTMLInputElement>(null);
  const serviceImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    const loadConfig = async () => {
      const config = await getSiteConfig();
      setSiteConfig(config);
    };
    loadConfig();

    const unsubscribePosts = subscribePortfolioItems((items) => {
      setPosts(items);
    });

    const unsubscribeServices = subscribeServices((items) => {
      setServices(items);
    });

    return () => {
      unsubscribePosts();
      unsubscribeServices();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (password === "041018") {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setSiteConfig({ ...siteConfig, heroImage: base64 });
      await saveSiteConfig({ heroImage: base64 });
    }
  };

  const handleSaveSiteText = async () => {
    try {
      await saveSiteConfig({
        brandName: siteConfig.brandName,
        heroSubtitle: siteConfig.heroSubtitle,
        aboutText: siteConfig.aboutText
      });
      alert("변경사항이 저장되었습니다.");
    } catch (error) {
      alert("저장 실패: 권한이 없거나 오류가 발생했습니다.");
    }
  };

  const handlePostThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setCurrentPost({ ...currentPost, image: base64 });
    }
  };

  const handlePostGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...(currentPost.images || [])];
      for (let i = 0; i < files.length; i++) {
        const base64 = await fileToBase64(files[i]);
        newImages.push(base64);
      }
      setCurrentPost({ ...currentPost, images: newImages });
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = [...(currentPost.images || [])];
    newImages.splice(index, 1);
    setCurrentPost({ ...currentPost, images: newImages });
  };

  const handleSavePost = async () => {
    if (!currentPost.title || !currentPost.image) {
      alert("제목과 대표 이미지는 필수입니다.");
      return;
    }
    
    const postToSave: PortfolioItem = {
      id: currentPost.id || Date.now().toString(),
      title: currentPost.title || "",
      category: currentPost.category || "",
      image: currentPost.image || "",
      images: currentPost.images || [currentPost.image || ""],
      date: currentPost.date || new Date().toISOString().split('T')[0],
      description: currentPost.description || ""
    };
    
    try {
      await savePortfolioItem(postToSave);
      setIsEditingPost(false);
      setCurrentPost({});
    } catch (error) {
      alert("저장 실패: 권한이 없거나 오류가 발생했습니다.");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("정말 이 포스트를 삭제하시겠습니까?")) {
      try {
        await deletePortfolioItem(id);
      } catch (error) {
        alert("삭제 실패: 권한이 없거나 오류가 발생했습니다.");
      }
    }
  };

  const handleServiceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setCurrentService({ ...currentService, image: base64 });
    }
  };

  const handleSaveService = async () => {
    if (!currentService.title || !currentService.image) {
      alert("제목과 이미지는 필수입니다.");
      return;
    }

    const serviceToSave: Service = {
      id: currentService.id || Date.now().toString(),
      title: currentService.title || "",
      price: currentService.price || "",
      description: currentService.description || "",
      image: currentService.image || "",
      features: currentService.features || [],
      order: currentService.order || (services.length + 1)
    };

    try {
      await saveService(serviceToSave);
      setIsEditingService(false);
      setCurrentService({});
    } catch (error) {
      alert("저장 실패: 권한이 없거나 오류가 발생했습니다.");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm("정말 이 서비스를 삭제하시겠습니까?")) {
      try {
        await deleteService(id);
      } catch (error) {
        alert("삭제 실패: 권한이 없거나 오류가 발생했습니다.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-black/5 p-8 rounded-xl border border-black/10"
        >
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-center">Admin Login</h1>
          <p className="text-black/50 text-center mb-8">관리자 전용 페이지입니다.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full bg-white border border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors rounded-md text-center tracking-widest"
              />
              {loginError && <p className="text-red-500 text-sm mt-2 text-center">비밀번호가 일치하지 않습니다.</p>}
            </div>
            <button type="submit" className="w-full py-3 bg-black text-white font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "posts", label: "Post Management", icon: FileText },
    { id: "services", label: "Service Management", icon: Edit3 },
    { id: "settings", label: "Customization", icon: Settings },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex justify-between items-end"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
            Admin Dashboard
          </h1>
          <p className="text-black/50 font-light tracking-widest uppercase text-sm">
            CHO DETAILING CMS
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm font-medium tracking-widest uppercase text-black/50 hover:text-black transition-colors"
        >
          Logout
        </button>
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
                <button 
                  onClick={() => {
                    setCurrentPost({ images: [] });
                    setIsEditingPost(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md"
                >
                  <Plus size={16} /> New Post
                </button>
              </div>

              {isEditingPost ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-black/5 space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">{currentPost.id ? "Edit Post" : "New Post"}</h3>
                    <button onClick={() => setIsEditingPost(false)} className="text-black/50 hover:text-black"><X size={20} /></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60">Title</label>
                      <input 
                        type="text" 
                        value={currentPost.title || ""}
                        onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                        className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60">Category</label>
                      <input 
                        type="text" 
                        value={currentPost.category || ""}
                        onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                        className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60">Description</label>
                      <textarea 
                        value={currentPost.description || ""}
                        onChange={(e) => setCurrentPost({...currentPost, description: e.target.value})}
                        rows={3}
                        className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>
                    
                    {/* Thumbnail Upload */}
                    <div className="space-y-4 md:col-span-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60 block">Main Thumbnail</label>
                      <div className="flex items-start gap-6">
                        <div className="w-32 aspect-square bg-black/5 rounded-md overflow-hidden border border-black/10">
                          {currentPost.image ? (
                            <img src={currentPost.image} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-black/20">
                              <ImageIcon size={32} />
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => postThumbnailInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md"
                        >
                          <Upload size={14} /> Upload Thumbnail
                        </button>
                        <input 
                          type="file" 
                          ref={postThumbnailInputRef}
                          onChange={handlePostThumbnailUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Gallery Upload */}
                    <div className="space-y-4 md:col-span-2 pt-4 border-t border-black/5">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium tracking-widest uppercase text-black/60">Gallery Images</label>
                        <button 
                          onClick={() => postGalleryInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 bg-black/5 text-black text-xs font-medium tracking-widest uppercase hover:bg-black/10 transition-colors rounded-md"
                        >
                          <Plus size={14} /> Add Images
                        </button>
                        <input 
                          type="file" 
                          ref={postGalleryInputRef}
                          onChange={handlePostGalleryUpload}
                          multiple
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {currentPost.images?.map((img, idx) => (
                          <div key={idx} className="aspect-square bg-black/5 rounded-md overflow-hidden relative group border border-black/10">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <button 
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 flex gap-4 border-t border-black/5">
                    <button onClick={handleSavePost} className="px-8 py-3 bg-black text-white font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md">Save Post</button>
                    <button onClick={() => setIsEditingPost(false)} className="px-8 py-3 bg-black/5 text-black font-medium tracking-widest uppercase hover:bg-black/10 transition-colors rounded-md">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/10 text-xs font-medium tracking-widest uppercase text-black/50">
                        <th className="p-4 w-16">Image</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                          <td className="p-4">
                            <div className="w-12 h-12 bg-black/10 rounded overflow-hidden">
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          </td>
                          <td className="p-4 font-medium">{post.title}</td>
                          <td className="p-4 text-black/60 text-sm">{post.category}</td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => {
                                setCurrentPost(post);
                                setIsEditingPost(true);
                              }}
                              className="p-2 text-black/40 hover:text-black transition-colors inline-block"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-black/40 hover:text-red-500 transition-colors inline-block ml-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {posts.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-black/50">No posts found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Service Management</h2>
                <button 
                  onClick={() => {
                    setCurrentService({ features: [] });
                    setIsEditingService(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md"
                >
                  <Plus size={16} /> New Service
                </button>
              </div>

              {isEditingService ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-black/5 space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">{currentService.id ? "Edit Service" : "New Service"}</h3>
                    <button onClick={() => setIsEditingService(false)} className="text-black/50 hover:text-black"><X size={20} /></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60">Title</label>
                      <input 
                        type="text" 
                        value={currentService.title || ""}
                        onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                        className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60">Price</label>
                      <input 
                        type="text" 
                        value={currentService.price || ""}
                        onChange={(e) => setCurrentService({...currentService, price: e.target.value})}
                        className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors"
                        placeholder="From ₩000,000"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60">Description</label>
                      <textarea 
                        value={currentService.description || ""}
                        onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                        rows={3}
                        className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60">Features (One per line)</label>
                      <textarea 
                        value={currentService.features?.join("\n") || ""}
                        onChange={(e) => setCurrentService({...currentService, features: e.target.value.split("\n")})}
                        rows={5}
                        className="w-full bg-transparent border border-black/10 p-3 focus:outline-none focus:border-black transition-colors resize-none rounded-md"
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      />
                    </div>
                    
                    {/* Image Upload */}
                    <div className="space-y-4 md:col-span-2">
                      <label className="text-sm font-medium tracking-widest uppercase text-black/60 block">Service Image</label>
                      <div className="flex items-start gap-6">
                        <div className="w-32 aspect-square bg-black/5 rounded-md overflow-hidden border border-black/10">
                          {currentService.image ? (
                            <img src={currentService.image} alt="Service" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-black/20">
                              <ImageIcon size={32} />
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => serviceImageInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md"
                        >
                          <Upload size={14} /> Upload Image
                        </button>
                        <input 
                          type="file" 
                          ref={serviceImageInputRef}
                          onChange={handleServiceImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 flex gap-4 border-t border-black/5">
                    <button onClick={handleSaveService} className="px-8 py-3 bg-black text-white font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md">Save Service</button>
                    <button onClick={() => setIsEditingService(false)} className="px-8 py-3 bg-black/5 text-black font-medium tracking-widest uppercase hover:bg-black/10 transition-colors rounded-md">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/10 text-xs font-medium tracking-widest uppercase text-black/50">
                        <th className="p-4 w-16">Image</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                          <td className="p-4">
                            <div className="w-12 h-12 bg-black/10 rounded overflow-hidden">
                              <img src={service.image} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          </td>
                          <td className="p-4 font-medium">{service.title}</td>
                          <td className="p-4 text-black/60 text-sm">{service.price}</td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => {
                                setCurrentService(service);
                                setIsEditingService(true);
                              }}
                              className="p-2 text-black/40 hover:text-black transition-colors inline-block"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteService(service.id)}
                              className="p-2 text-black/40 hover:text-red-500 transition-colors inline-block ml-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {services.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-black/50">No services found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold tracking-tight">Site Customization</h2>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-black/5 space-y-12">
                {/* Hero Image Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold tracking-tight">Homepage Hero Image</h3>
                    <button 
                      onClick={() => heroFileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md"
                    >
                      <Upload size={16} /> Upload New Image
                    </button>
                    <input 
                      type="file" 
                      ref={heroFileInputRef}
                      onChange={handleHeroFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <div className="aspect-[21/9] w-full bg-black/10 rounded-lg overflow-hidden relative border border-black/10">
                    <img 
                      src={siteConfig.heroImage} 
                      alt="Current Hero" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <hr className="border-black/10" />

                <div className="space-y-8">
                  <h3 className="text-lg font-bold tracking-tight">Text & Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium tracking-widest uppercase text-black/60">Brand Name</h4>
                      <input 
                        type="text" 
                        value={siteConfig.brandName}
                        onChange={(e) => setSiteConfig({...siteConfig, brandName: e.target.value})}
                        className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors font-medium"
                      />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium tracking-widest uppercase text-black/60">Hero Subtitle</h4>
                      <input 
                        type="text" 
                        value={siteConfig.heroSubtitle}
                        onChange={(e) => setSiteConfig({...siteConfig, heroSubtitle: e.target.value})}
                        className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium tracking-widest uppercase text-black/60">About Us Description (Optional)</h4>
                    <textarea 
                      value={siteConfig.aboutText}
                      onChange={(e) => setSiteConfig({...siteConfig, aboutText: e.target.value})}
                      rows={6}
                      className="w-full bg-transparent border border-black/10 p-4 focus:outline-none focus:border-black transition-colors font-light leading-relaxed rounded-md"
                      placeholder="회사 소개 문구를 입력하세요..."
                    />
                  </div>

                  <button 
                    onClick={handleSaveSiteText}
                    className="px-8 py-3 bg-black text-white font-medium tracking-widest uppercase hover:bg-black/80 transition-colors mt-8 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
