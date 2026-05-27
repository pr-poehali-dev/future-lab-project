import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Icon from "@/components/ui/icon"
import { hostels, universities, amenityIcons, type Hostel } from "@/lib/hostels-data"

const ALL_AMENITIES = ["Wi-Fi", "Кухня", "Стиральная машина", "Парковка", "Кондиционер", "Завтрак", "24/7"]

export default function ResultsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const uniQuery = searchParams.get("university") || ""

  const [maxDistance, setMaxDistance] = useState(5)
  const [priceRange, setPriceRange] = useState([500, 5000])
  const [minRating, setMinRating] = useState(3.5)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedHostel, setSelectedHostel] = useState<string | null>(null)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const filteredHostels = hostels.filter((h) => {
    if (h.distanceKm > maxDistance) return false
    if (h.pricePerNight < priceRange[0] || h.pricePerNight > priceRange[1]) return false
    if (h.rating < minRating) return false
    if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => h.amenities.includes(a))) return false
    return true
  })

  const toggleAmenity = (a: string) => {
    setSelectedAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]))
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 mr-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={16} className="text-white" />
            </div>
            <span className="font-bold text-[#1F2937] hidden sm:block">СтудХостел</span>
          </button>
          <div className="flex-1 relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              defaultValue={uniQuery}
              className="w-full pl-9 pr-4 h-10 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
              placeholder="Вуз или адрес"
              onKeyDown={(e) => e.key === "Enter" && navigate(`/results?university=${(e.target as HTMLInputElement).value}`)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="md:hidden flex items-center gap-2 rounded-xl border-gray-200 text-[#1F2937]"
          >
            <Icon name="SlidersHorizontal" size={16} />
            Фильтры
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* FILTERS SIDEBAR */}
          <aside className={`${isMobileFiltersOpen ? "block" : "hidden"} md:block w-full md:w-72 flex-shrink-0`}>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-[#1F2937] text-lg">Фильтры</h2>
                <button
                  onClick={() => {
                    setMaxDistance(5)
                    setPriceRange([500, 5000])
                    setMinRating(3.5)
                    setSelectedAmenities([])
                  }}
                  className="text-xs text-[#2563EB] hover:underline"
                >
                  Сбросить
                </button>
              </div>

              {/* Distance */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-[#1F2937]">Расстояние до вуза</span>
                  <span className="text-sm text-[#2563EB] font-medium">до {maxDistance} км</span>
                </div>
                <Slider
                  min={0.5}
                  max={5}
                  step={0.5}
                  value={[maxDistance]}
                  onValueChange={(v) => setMaxDistance(v[0])}
                  className="[&_[role=slider]]:bg-[#2563EB] [&_[role=slider]]:border-[#2563EB]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0 км</span>
                  <span>5 км</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-[#1F2937]">Цена за ночь</span>
                  <span className="text-sm text-[#2563EB] font-medium">{priceRange[0]}–{priceRange[1]} ₽</span>
                </div>
                <Slider
                  min={500}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="[&_[role=slider]]:bg-[#2563EB] [&_[role=slider]]:border-[#2563EB]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>500 ₽</span>
                  <span>5 000 ₽</span>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-[#1F2937]">Минимальный рейтинг</span>
                  <span className="text-sm text-[#2563EB] font-medium">{minRating}★</span>
                </div>
                <div className="flex gap-2">
                  {[3.5, 4.0, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                        minRating === r
                          ? "bg-[#2563EB] text-white border-[#2563EB]"
                          : "bg-white text-gray-500 border-gray-200 hover:border-[#2563EB]/50"
                      }`}
                    >
                      от {r}★
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="text-sm font-semibold text-[#1F2937] mb-3">Удобства</div>
                <div className="space-y-2">
                  {ALL_AMENITIES.map((a) => (
                    <label key={a} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => toggleAmenity(a)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedAmenities.includes(a)
                            ? "bg-[#2563EB] border-[#2563EB]"
                            : "border-gray-300 group-hover:border-[#2563EB]/50"
                        }`}
                      >
                        {selectedAmenities.includes(a) && <Icon name="Check" size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-gray-600">{a}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RESULTS */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                {uniQuery && (
                  <span className="inline-flex items-center gap-1 bg-[#2563EB]/10 text-[#2563EB] rounded-full px-3 py-1 mr-2 font-medium">
                    <Icon name="GraduationCap" size={13} />
                    {uniQuery}
                  </span>
                )}
                <span>Найдено хостелов: <strong className="text-[#1F2937]">{filteredHostels.length}</strong></span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <Icon name="SlidersHorizontal" size={14} />
                По рейтингу
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 h-56 mb-6 bg-[#e8f0fe]">
              <iframe
                src={`https://yandex.ru/map-widget/v1/?ll=38.9727%2C45.0355&z=13&l=map&pt=${filteredHostels
                  .slice(0, 8)
                  .map((h) => `${h.lng},${h.lat},pm2gnm`)
                  .join("~")}`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта хостелов"
              />
            </div>

            {/* HOSTEL CARDS */}
            {filteredHostels.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Ничего не нашлось</p>
                <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHostels.map((hostel) => (
                  <HostelCard
                    key={hostel.id}
                    hostel={hostel}
                    isSelected={selectedHostel === hostel.id}
                    onSelect={() => setSelectedHostel(hostel.id === selectedHostel ? null : hostel.id)}
                    onClick={() => navigate(`/hostel/${hostel.id}`)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function HostelCard({
  hostel,
  isSelected,
  onSelect,
  onClick,
}: {
  hostel: Hostel
  isSelected: boolean
  onSelect: () => void
  onClick: () => void
}) {
  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
        isSelected ? "border-[#2563EB] ring-2 ring-[#2563EB]/20" : "border-gray-100"
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          <img src={hostel.photos[0]} alt={hostel.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-[#10B981] text-white text-xs font-bold rounded-full px-2 py-1">
            {hostel.distanceText}
          </div>
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-[#1F2937] text-lg leading-tight">{hostel.name}</h3>
              <div className="flex items-center gap-1 bg-[#F9FAFB] rounded-xl px-3 py-1 flex-shrink-0">
                <Icon name="Star" size={14} className="text-amber-400 fill-amber-400" />
                <span className="font-bold text-[#1F2937] text-sm">{hostel.rating}</span>
                <span className="text-gray-400 text-xs">({hostel.reviewCount})</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
              <Icon name="MapPin" size={13} />
              {hostel.address}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {hostel.amenities.slice(0, 4).map((a) => (
                <span key={a} className="flex items-center gap-1 bg-[#F9FAFB] text-gray-500 text-xs rounded-lg px-2.5 py-1 border border-gray-100">
                  <Icon name={amenityIcons[a] || "Check"} fallback="Check" size={11} />
                  {a}
                </span>
              ))}
              {hostel.amenities.length > 4 && (
                <span className="bg-[#F9FAFB] text-gray-400 text-xs rounded-lg px-2.5 py-1 border border-gray-100">
                  +{hostel.amenities.length - 4}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-2xl font-bold text-[#1F2937]">{hostel.pricePerNight.toLocaleString()} ₽</span>
              <span className="text-gray-400 text-sm ml-1">/ ночь</span>
            </div>
            <Button
              onClick={onClick}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl px-6 h-10 text-sm font-semibold"
            >
              Подробнее
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
