
import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-white text-gray-900",
      "py-12 sm:py-16 md:py-20 px-4",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-8 text-center">
        <div className="flex flex-col items-center gap-4 sm:gap-6 px-4">
          <h2 className="max-w-[720px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-navy leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg max-w-[600px] font-medium text-gray-600 md:text-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 sm:py-6">
          <div className="group flex overflow-hidden p-2 sm:p-4 [--gap:1rem] sm:[--gap:2rem] [gap:var(--gap)] flex-row [--duration:120s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(12)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                  />
                ))
              ))}
            </div>
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(12)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`duplicate-${setIndex}-${i}`}
                    {...testimonial}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 sm:w-1/4 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 sm:w-1/4 bg-gradient-to-l from-white via-white/80 to-transparent" />
        </div>
      </div>
    </section>
  )
}
