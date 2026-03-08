import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  getDoc
} from "firebase/firestore";
import { db } from "@/firebase";

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string; // Main thumbnail
  images: string[]; // Gallery images
  date: string;
  description?: string;
  admin_key?: string; // For security rules validation
}

// Collection references
const portfolioCol = collection(db, "portfolio");
const configDoc = doc(db, "config", "main");

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const q = query(portfolioCol, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    delete data.admin_key; // Hide key from frontend
    return { ...data, id: doc.id } as PortfolioItem;
  });
}

export function subscribePortfolioItems(callback: (items: PortfolioItem[]) => void) {
  const q = query(portfolioCol, orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.admin_key; // Hide key from frontend
      return { ...data, id: doc.id } as PortfolioItem;
    });
    callback(items);
  });
}

export async function savePortfolioItem(item: PortfolioItem) {
  const itemDoc = doc(portfolioCol, item.id);
  await setDoc(itemDoc, { ...item, admin_key: "041018" });
}

export async function deletePortfolioItem(id: string) {
  const itemDoc = doc(portfolioCol, id);
  await deleteDoc(itemDoc);
}

export async function getHeroImage(): Promise<string> {
  const snapshot = await getDoc(configDoc);
  if (snapshot.exists()) {
    return snapshot.data().heroImage;
  }
  return "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop";
}

export async function saveHeroImage(url: string) {
  await setDoc(configDoc, { heroImage: url, admin_key: "041018" }, { merge: true });
}

export async function seedPortfolioItems() {
  const snapshot = await getDocs(portfolioCol);
  if (snapshot.empty) {
    const examples: PortfolioItem[] = [
      {
        id: "1",
        title: "Porsche 911 GT3 - Full Detail & Ceramic Coating",
        category: "Ceramic Coating",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop"
        ],
        date: "2024-03-01",
        description: "포르쉐 911 GT3 차량의 전체 디테일링 및 최상급 세라믹 코팅 시공 사례입니다. 도장면의 광택을 극대화하고 장기적인 보호를 위해 3레이어 코팅이 적용되었습니다."
      },
      {
        id: "2",
        title: "Mercedes-Benz G-Wagon - Interior Restoration",
        category: "Interior Detail",
        image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop"
        ],
        date: "2024-02-15",
        description: "G-바겐 차량의 실내 가죽 복원 및 딥 클리닝 작업입니다. 세월의 흔적을 지우고 신차 수준의 실내 컨디션을 회복하는 데 중점을 두었습니다."
      },
      {
        id: "3",
        title: "BMW M4 - Paint Correction & PPF",
        category: "Paint Correction",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop"
        ],
        date: "2024-01-20",
        description: "BMW M4 차량의 도장면 결함 제거(광택) 및 프론트 패키지 PPF 시공입니다. 스톤칩 방지와 깊은 색감 구현을 목표로 작업되었습니다."
      }
    ];

    for (const item of examples) {
      await savePortfolioItem(item);
    }
  }
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

