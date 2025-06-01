
import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { Button } from "@/components/ui/button"

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
      "py-16 sm:py-32 md:py-40 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-8 text-center sm:gap-20">
        <div className="flex flex-col items-center gap-6 px-4 sm:gap-10">
          <h2 className="max-w-[720px] text-4xl sm:text-6xl font-playfair font-bold text-navy leading-tight">
            {title}
          </h2>
          <p className="text-lg max-w-[600px] font-medium text-gray-600 sm:text-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
          <div className="group flex overflow-hidden p-4 [--gap:2rem] [gap:var(--gap)] flex-row [--duration:80s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(8)].map((_, setIndex) => (
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
              {[...Array(8)].map((_, setIndex) => (
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

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-white via-white/80 to-transparent sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-white via-white/80 to-transparent sm:block" />
        </div>

        <div className="flex flex-col items-center gap-6 px-4 sm:gap-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Button 
              className="bg-orange hover:bg-orange/90 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Solicite Sua Consulta Gratuita
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Fale Conosco Agora
            </Button>
          </div>
          <p className="text-sm text-gray-500 max-w-md text-center">
            Não perca mais tempo. Entre em contato conosco hoje mesmo e descubra como podemos ajudá-lo a conquistar seus direitos previdenciários.
          </p>
        </div>
      </div>
    </section>
  )
}
