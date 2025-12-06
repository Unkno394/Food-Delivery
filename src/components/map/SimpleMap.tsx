// components/SimpleMap.tsx
"use client";

export default function SimpleMap({ coordinates, onCoordinatesChange }: any) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#8B23CB]/20 to-[#A020F0]/20 rounded-xl overflow-hidden">
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          onCoordinatesChange([
            55.7558 + (y / rect.height - 0.5) * 0.1,
            37.6173 + (x / rect.width - 0.5) * 0.1
          ]);
        }}
      >
        <div className="text-center">
          <div className="text-white text-lg mb-2">Кликните на карту для выбора адреса</div>
          <div className="text-white/70 text-sm">
            Координаты: {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}