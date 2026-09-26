"use client"

interface PlayerAvatarProps {
  username: string
  skinUsername?: string
  className?: string
}

export function PlayerAvatar({ username, skinUsername, className = "w-10 h-10" }: PlayerAvatarProps) {
  // Жестко приоритезируем skinUsername, а если его нет — обычный username
  const targetSkin = skinUsername || username
  const headUrl = `https://visage.surgeplay.com/bust/80/${targetSkin}`

  return (
    <div className={`relative rounded-lg overflow-hidden bg-gradient-to-b from-amber-500/10 to-transparent border border-zinc-800/80 flex items-center justify-center flex-shrink-0 select-none shadow-inner ${className}`}>
      <img
        src={headUrl}
        alt={username}
        className="h-[120%] object-contain transform hover:scale-110 transition-transform duration-200 translate-y-1 drop-shadow"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://visage.surgeplay.com/bust/80/MHF_Steve"
        }}
      />
    </div>
  )
}