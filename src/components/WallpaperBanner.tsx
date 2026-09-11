import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WallpaperBannerProps {
  onOpenWallpaperModal?: () => void;
  className?: string;
}

export const WallpaperBanner: React.FC<WallpaperBannerProps> = ({
  onOpenWallpaperModal,
  className = ''
}) => {
  return (
    <div
      onClick={onOpenWallpaperModal}
      className={`group relative bg-gradient-to-r from-[#FCECEF]/40 via-slate-50 to-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#80142A]/50 transition-all duration-300 cursor-pointer overflow-hidden ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5">
        
        {/* Left Thumbnail & Text */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#DDBF78]/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
            <img 
              src="/images/wallpaper/wallpaper_thumb.jpg" 
              alt="一子一木4K高清壁纸" 
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-xs text-[9px] text-[#DDBF78] font-extrabold px-1.5 py-0.2 rounded-md">
              4K原图
            </span>
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#80142A] to-[#9B1B36] text-white text-[10px] font-extrabold shadow-2xs">
                🎁 学员美学福利
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#29354A] group-hover:text-[#80142A] transition">
                一子一木 4K 伴学治愈壁纸屋
              </h3>
            </div>
            <p className="text-xs text-[#29354A]/80 leading-relaxed font-medium">
              精选法式浪漫氛围感手机/iPad 高清学习壁纸 · 免费下载 · 每日打卡参与微信小程序积分抽大奖！
            </p>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#29354A]/70 font-mono">
              <span className="bg-white/80 px-2 py-0.5 rounded-md border border-slate-200 font-semibold text-[#80142A]">
                #小程序://一子一木/0JPDrt84ecI5Gwd
              </span>
              <span>微信扫码 / 口令秒开</span>
            </div>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="w-full sm:w-auto shrink-0 flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenWallpaperModal) onOpenWallpaperModal();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#80142A] to-[#9B1B36] hover:from-[#680E20] hover:to-[#80142A] text-white font-bold text-xs shadow-xs active:scale-98 transition flex items-center justify-center gap-1.5 group-hover:translate-x-0.5 cursor-pointer"
          >
            <span>🎁 免费领取壁纸 / 抽奖</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
