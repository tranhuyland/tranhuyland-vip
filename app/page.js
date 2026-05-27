export const dynamic = 'force-dynamic';

import { getGoogleSheetData } from './utils';
import Link from 'next/link'; 

export default async function Home() {
  const data = await getGoogleSheetData();
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">Trần Huy Land</h1>
        <p className="text-slate-500 font-medium mt-2">Kho Nhà Đất Chính Chủ Hải Châu - Cẩm Lệ - Đà Nẵng</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => {
          // BẮT LỖI CHÍ MẠNG: Kiểm tra nếu cột 'anh' tồn tại thì mới cắt chuỗi, nếu không thì cho mảng rỗng
          const danhSachAnh = (item && item.anh && typeof item.anh === 'string') 
            ? item.anh.split(',').map(url => url.trim()).filter(url => url !== '') 
            : [];
          
          // Nếu không có ảnh nào thì dùng một ảnh mặc định siêu đẹp làm đại diện
          const anhDauTien = danhSachAnh.length > 0 
            ? danhSachAnh[0] 
            : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80';
          
          const slugUrl = `/${item.slug || item.id}`;

          return (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col">
              <div className="relative aspect-[16/10] bg-slate-100">
                <img src={anhDauTien} alt={item.tieude || 'Nhà đất Đà Nẵng'} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white font-black px-3 py-1 rounded-xl text-sm">
                  {item.gia || 'Thỏa thuận'}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-2 text-sm sm:text-base leading-snug">{item.tieude || 'Chưa cập nhật tiêu đề'}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase mt-2">📍 {item.khuVucFull || 'Đà Nẵng'}</p>
                </div>
                <Link href={slugUrl} className="mt-5 block w-full text-center bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 font-bold py-2.5 rounded-xl text-sm transition">
                  Xem Chi Tiết
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
