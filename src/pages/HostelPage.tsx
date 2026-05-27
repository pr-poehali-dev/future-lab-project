import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { hostels, amenityIcons } from "@/lib/hostels-data"

export default function HostelPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  const [activePhoto, setActivePhoto] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 0
  const total = nights * hostel.pricePerNight

  const handleBook = () => {
    if (!checkIn || !checkOut || nights < 1) return
    navigate("/confirmation", {
      state: {
        hostelId: hostel.id,
        hostelName: hostel.name,
        checkIn,
        checkOut,
        guests,
        nights,
        total,
        pricePerNight: hostel.pricePerNight,
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={16} className="text-white" />
            </div>
            <span className="font-bold text-[#1F2937] hidden sm:block">СтудХостел</span>
          </button>
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2563EB] ml-2 transition-colors">
            <Icon name="ArrowLeft" size={16} />
            Назад к результатам
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden mb-8 h-72 md:h-96">
          <div className="md:col-span-2 relative overflow-hidden">
            <img
              src={hostel.photos[activePhoto]}
              alt={hostel.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <div className="hidden md:flex flex-col gap-3">
            {hostel.photos.slice(1, 3).map((photo, i) => (
              <div
                key={i}
                className="flex-1 relative overflow-hidden cursor-pointer"
                onClick={() => setActivePhoto(i + 1)}
              >
                <img
                  src={photo}
                  alt=""
                  className={`w-full h-full object-cover transition-all duration-300 ${activePhoto === i + 1 ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mb-8 md:hidden">
          {hostel.photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`w-2 h-2 rounded-full transition-all ${activePhoto === i ? "bg-[#2563EB] w-5" : "bg-gray-300"}`}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT: Info */}
          <div className="md:col-span-2">
            {/* TITLE */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#10B981]/10 text-[#10B981] text-sm font-medium rounded-full px-3 py-1 flex items-center gap-1">
                  <Icon name="MapPin" size={13} />
                  {hostel.distanceText}
                </span>
                <span className="bg-[#2563EB]/10 text-[#2563EB] text-sm font-medium rounded-full px-3 py-1">
                  Хостел
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-2">{hostel.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={15} className="text-amber-400 fill-amber-400" />
                  <span className="font-bold text-[#1F2937]">{hostel.rating}</span>
                  <span>({hostel.reviewCount} отзывов)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={13} />
                  {hostel.address}
                </div>
              </div>
            </div>

            {/* AMENITIES */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-[#1F2937] text-lg mb-4">Удобства</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hostel.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <div className="w-9 h-9 bg-[#2563EB]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={amenityIcons[a] || "Check"} fallback="Check" size={17} className="text-[#2563EB]" />
                    </div>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-[#1F2937] text-lg mb-3">О хостеле</h2>
              <p className="text-gray-500 leading-relaxed">{hostel.description}</p>
            </div>

            {/* REVIEWS */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-bold text-[#1F2937] text-lg">Отзывы гостей</h2>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 rounded-full px-3 py-1 text-sm font-semibold">
                  <Icon name="Star" size={14} className="fill-amber-400 text-amber-400" />
                  {hostel.rating}
                </div>
              </div>
              <div className="space-y-4">
                {hostel.reviews.map((review, i) => (
                  <div key={i} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                          <span className="text-[#2563EB] font-bold text-sm">{review.author[0]}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-[#1F2937] text-sm">{review.author}</div>
                          <div className="text-xs text-gray-400">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, j) => (
                          <Icon key={j} name="Star" size={13} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Booking */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-24">
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#1F2937]">{hostel.pricePerNight.toLocaleString()} ₽</span>
                <span className="text-gray-400 text-sm ml-1">/ ночь</span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Заезд</label>
                  <input
                    type="date"
                    value={checkIn}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Выезд</label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Гостей</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                    >
                      <Icon name="Minus" size={16} />
                    </button>
                    <span className="flex-1 text-center font-semibold text-[#1F2937]">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {nights > 0 && (
                <div className="bg-[#F9FAFB] rounded-xl p-4 mb-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>{hostel.pricePerNight.toLocaleString()} ₽ × {nights} {nights === 1 ? "ночь" : nights < 5 ? "ночи" : "ночей"}</span>
                    <span>{(hostel.pricePerNight * nights).toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Сервисный сбор</span>
                    <span>0 ₽</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-[#1F2937]">
                    <span>Итого</span>
                    <span>{total.toLocaleString()} ₽</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleBook}
                disabled={nights < 1}
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl h-12 font-semibold text-base"
              >
                {nights < 1 ? "Выберите даты" : `Забронировать за ${total.toLocaleString()} ₽`}
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                <Icon name="Shield" size={13} className="text-[#10B981]" />
                Бесплатная отмена за 24 часа до заезда
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
