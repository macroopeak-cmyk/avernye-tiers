"use client"

import { useState, useEffect } from "react"
import { HelpCircle, Disc as Discord, X, Palette } from "lucide-react"

export function HeaderActions() {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isGradient, setIsGradient] = useState(false)

  // Управление переключением класса градиента на теге body
  useEffect(() => {
    if (isGradient) {
      document.body.classList.add("animate-bg-gradient")
    } else {
      document.body.classList.remove("animate-bg-gradient")
    }
  }, [isGradient])

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Кнопка информации (Как работают поинты) */}
      <button
        onClick={() => setIsInfoOpen(true)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#212838] via-[#1a2130] to-[#141a26] hover:from-[#2a3449] hover:to-[#1d2636] border border-zinc-600/70 hover:border-zinc-500 text-zinc-200 hover:text-white transition text-xs font-semibold shadow-md"
      >
        <HelpCircle className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
        <span>Как работают поинты</span>
      </button>

      {/* Кнопка переключения Градиента */}
      <button
        onClick={() => setIsGradient(!isGradient)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all text-xs font-semibold shadow-md ${
          isGradient
            ? "bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
            : "bg-gradient-to-r from-[#212838] via-[#1a2130] to-[#141a26] hover:from-[#2a3449] hover:to-[#1d2636] border-zinc-600/70 hover:border-zinc-500 text-zinc-200 hover:text-white"
        }`}
      >
        <Palette className={`w-4 h-4 ${isGradient ? "text-amber-400 animate-spin" : "text-zinc-400"}`} style={{ animationDuration: '6s' }} />
        <span>Градиент</span>
      </button>

      {/* Кнопка Discord канала */}
      <a
        href="https://discord.gg/Y8e2REfz3A"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 border border-[#5865F2]/40 text-[#8ea4f8] hover:text-white transition text-xs font-semibold shadow-md"
      >
        <Discord className="w-4 h-4 text-[#5865F2] drop-shadow-[0_0_8px_rgba(88,101,242,0.6)]" />
        <span>Discord</span>
      </a>

      {/* Модальное окно с правилами поинтов на русском */}
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Плавное появление темного фона */}
          <div
            onClick={() => setIsInfoOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          />

          {/* Плавное появление карточки с легким приближением */}
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1c2333] via-[#161d2a] to-[#111722] border border-zinc-600/70 rounded-2xl p-6 shadow-2xl text-white z-10 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2 drop-shadow">
              <HelpCircle className="w-5 h-5" />
              Как работают тиры и поинты
            </h3>

            <div className="space-y-4 text-sm text-zinc-300 max-h-[60vh] overflow-y-auto pr-2">
              <p>
                Поинты начисляются автоматически на основе занятых игроком мест (тиров) в различных соревновательных режимах. Высокие тиры (HT) дают значительно больше очков, чем низкие (LT).
              </p>

              <div className="bg-[#121824] border border-zinc-700/60 rounded-xl p-4 space-y-2 shadow-inner">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Таблица начисления очков</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>HT1:</span> <strong className="text-white">60 очков</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>LT1:</span> <strong className="text-white">45 очков</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>HT2:</span> <strong className="text-white">30 очков</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>LT2:</span> <strong className="text-white">20 очков</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>HT3:</span> <strong className="text-white">10 очков</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>LT3:</span> <strong className="text-white">6 очков</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>HT4:</span> <strong className="text-white">4 очка</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>LT4:</span> <strong className="text-white">3 очка</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>HT5:</span> <strong className="text-white">2 очка</strong></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1"><span>LT5:</span> <strong className="text-white">1 очко</strong></div>
                </div>
              </div>

              <p className="text-xs text-zinc-400">
                Общее количество поинтов игрока равно сумме очков за все его зарегистрированные тиры по всем игровым режимам.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}