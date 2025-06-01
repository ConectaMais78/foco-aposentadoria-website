
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-xl border",
        "bg-gradient-to-b from-gray-50/80 to-white",
        "p-4 sm:p-6 text-start",
        "hover:from-gray-100/80 hover:to-gray-50",
        "min-w-[280px] sm:min-w-[320px] md:min-w-[350px] max-w-[320px] sm:max-w-[380px]",
        "transition-all duration-300",
        "border border-gray-200 shadow-sm",
        "relative overflow-hidden",
        "touch-manipulation", // Better touch performance on mobile
        className
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <Avatar className="h-10 w-10 sm:h-12 md:h-14 sm:w-12 md:w-14 ring-2 ring-orange/20 flex-shrink-0">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start min-w-0">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-tight text-gray-900 font-playfair truncate w-full">
            {author.name}
          </h3>
          <p className="text-xs sm:text-sm text-orange font-medium truncate w-full">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic line-clamp-4">
        "{text}"
      </p>
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-orange/20 text-2xl sm:text-3xl md:text-4xl font-bold">
        "
      </div>
    </Card>
  )
}
