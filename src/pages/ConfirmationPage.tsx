import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

interface BookingState {
  hostelName: string
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  total: number
  pricePerNight: number
}

function QRCode({ value }: { value: string }) {
  const size = 140
  const cells = 21
  const cellSize = size / cells

  const hash = value.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const pattern: boolean[][] = Array.from({ length: cells }, (_, row) =>
    Array.from({ length: cells }, (_, col) => {
      if (row < 7 && col < 7) return (row === 0 || row === 6 || col === 0 || col === 6 || (row >= 2 && row <= 4 && col >= 2 && col <= 4))
      if (row < 7 && col > cells - 8) return (row === 0 || row === 6 || col === cells - 7 || col === cells - 1 || (row >= 2 && row <= 4 && col >= cells - 5 && col <= cells - 3))
      if (row > cells - 8 && col < 7) return (row === cells - 7 || row === cells - 1 || col === 0 || col === 6 || (row >= cells - 5 && row <= cells - 3 && col >= 2 && col <= 4))
      return ((row * 7 + col * 13 + hash) % 3 === 0)
    })
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
      <rect width={size} height={size} fill="white" />
      {pattern.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1F2937"
            />
          ) : null
        )
      )}
    </svg>
  )
}

function formatDate(dateStr: string) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

export default function ConfirmationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as BookingState | null

  const booking = state || {
    hostelName: "Хостел «Студенческий»",
    checkIn: "2025-09-01",
    checkOut: "2025-09-05",
    guests: 1,
    nights: 4,
    total: 3000,
    pricePerNight: 750,
  }

  const bookingCode = `SH-${Date.now().toString(36).toUpperCase().slice(-6)}`
  const qrValue = `studhostel.ru/booking/${bookingCode}`

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      {/* NAV */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={16} className="text-white" />
            </div>
            <span className="font-bold text-[#1F2937]">СтудХостел</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* SUCCESS HEADER */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#10B981]/30">
              <Icon name="Check" size={36} className="text-white" strokeWidth={3} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-3">Бронирование подтверждено!</h1>
            <p className="text-gray-500 text-lg">
              Всё готово. Используйте QR-код для заселения.
            </p>
          </div>

          {/* BOOKING CARD */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden mb-6">
            {/* GREEN TOP BANNER */}
            <div className="bg-gradient-to-r from-[#2563EB] to-[#10B981] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-blue-100 text-sm mb-1">Номер брони</div>
                  <div className="text-2xl font-bold font-mono">{bookingCode}</div>
                </div>
                <div className="text-right">
                  <div className="text-blue-100 text-sm mb-1">Статус</div>
                  <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    Подтверждено
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* DETAILS */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#2563EB]/8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Building2" size={18} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Хостел</div>
                      <div className="font-semibold text-[#1F2937]">{booking.hostelName}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#2563EB]/8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Calendar" size={18} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Даты</div>
                      <div className="font-semibold text-[#1F2937]">
                        {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {booking.nights} {booking.nights === 1 ? "ночь" : booking.nights < 5 ? "ночи" : "ночей"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#2563EB]/8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Users" size={18} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Гостей</div>
                      <div className="font-semibold text-[#1F2937]">{booking.guests}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Wallet" size={18} className="text-[#10B981]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Стоимость</div>
                      <div className="font-bold text-xl text-[#1F2937]">{booking.total.toLocaleString()} ₽</div>
                      <div className="text-xs text-gray-400">{booking.pricePerNight.toLocaleString()} ₽ × {booking.nights} ночей</div>
                    </div>
                  </div>
                </div>

                {/* QR CODE */}
                <div className="flex flex-col items-center justify-center bg-[#F9FAFB] rounded-2xl p-6 border border-gray-100">
                  <QRCode value={qrValue} />
                  <div className="mt-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">QR-код для заселения</div>
                    <div className="font-mono text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
                      {qrValue}
                    </div>
                  </div>
                </div>
              </div>

              {/* CHECKIN INFO */}
              <div className="mt-6 bg-[#2563EB]/5 rounded-2xl p-4 flex gap-3">
                <Icon name="Info" size={18} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-[#1F2937]">Заезд с 14:00</strong>, выезд до 12:00. Покажите QR-код на стойке регистрации или в приложении хостела. Администратор проверит бронь за несколько секунд.
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="h-12 rounded-xl border-gray-200 text-[#1F2937] font-semibold hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              <Icon name="Download" size={18} className="mr-2" />
              Скачать чек
            </Button>
            <Button
              onClick={() => navigator.share?.({ title: "Бронирование СтудХостел", text: `Бронь ${bookingCode}: ${booking.hostelName}`, url: window.location.href })}
              variant="outline"
              className="h-12 rounded-xl border-gray-200 text-[#1F2937] font-semibold hover:border-[#10B981] hover:text-[#10B981] transition-colors"
            >
              <Icon name="Share2" size={18} className="mr-2" />
              Поделиться бронированием
            </Button>
          </div>

          {/* BACK */}
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-1.5 mx-auto"
            >
              <Icon name="ArrowLeft" size={14} />
              Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
