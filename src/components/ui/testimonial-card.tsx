
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
        "p-6 text-start",
        "hover:from-gray-100/80 hover:to-gray-50",
        "min-w-[350px] max-w-[380px]",
        "transition-all duration-300",
        "border border-gray-200 shadow-sm",
        "relative overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-14 w-14 ring-2 ring-orange/20">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold leading-none text-gray-900 font-playfair">
            {author.name}
          </h3>
          <p className="text-sm text-orange font-medium">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="text-base text-gray-700 leading-relaxed italic">
        "{text}"
      </p>
      <div className="absolute top-4 right-4 text-orange/20 text-4xl font-bold">
        "
      </div>
    </Card>
  )
}
