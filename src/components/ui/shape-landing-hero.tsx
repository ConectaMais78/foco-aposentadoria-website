"use client";

import { motion } from "framer-motion";
import { Circle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarBorder } from "@/components/ui/star-border";
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]"
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return <motion.div initial={{
    opacity: 0,
    y: -150,
    rotate: rotate - 15
  }} animate={{
    opacity: 1,
    y: 0,
    rotate: rotate
  }} transition={{
    duration: 2.4,
    delay,
    ease: [0.23, 0.86, 0.39, 0.96],
    opacity: {
      duration: 1.2
    }
  }} className={cn("absolute", className)}>
            <motion.div animate={{
      y: [0, 15, 0]
    }} transition={{
      duration: 12,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut"
    }} style={{
      width,
      height
    }} className="relative">
                <div className={cn("absolute inset-0 rounded-full", "bg-gradient-to-r to-transparent", gradient, "backdrop-blur-[2px] border-2 border-white/[0.15]", "shadow-[0_8px_32px_0_rgba(255,127,17,0.15)]", "after:absolute after:inset-0 after:rounded-full", "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,127,17,0.2),transparent_70%)]")} />
            </motion.div>
        </motion.div>;
}
function HeroGeometric({
  badge = "Direito Previdenciário",
  title1 = "Seu direito à aposentadoria",
  title2 = "é nossa prioridade"
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };
  const handleContactClick = () => {
    window.open('https://wa.me/5583991034305?text=Olá%2C%20tudo%20bem%3F', '_blank');
  };
  return <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-deepNavy">
            <div className="absolute inset-0 bg-gradient-to-br from-orange/[0.05] via-transparent to-orangeLight/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-orange/[0.15]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />

                <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-orangeLight/[0.15]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />

                <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-navy/[0.15]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />

                <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-orange/[0.15]" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />

                <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-orangeLight/[0.15]" className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12">
                        <Circle className="h-2 w-2 fill-orange/80" />
                        <span className="text-sm text-white/60 tracking-wide font-medium">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair font-bold mb-6 md:mb-8 tracking-tight leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                {title1.replace('aposentadoria', '')}
                            </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange via-white/90 to-orangeLight whitespace-nowrap">
                                aposentadoria
                            </span>
                            <br />
                            <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-orange via-white/90 to-orangeLight")}>
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                        <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">Ajudamos nossos clientes a conquistar seus benefícios previdenciários com segurança jurídica e eficiência.</p>
                    </motion.div>

                    <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex justify-center">
                        <StarBorder onClick={handleContactClick} color="#FF7F11" speed="4s" className="cursor-pointer">
                            <div className="flex items-center">
                                <MessageSquare className="mr-2 h-5 w-5" />
                                Fale Conosco Agora
                            </div>
                        </StarBorder>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-deepNavy via-transparent to-deepNavy/80 pointer-events-none" />
        </div>;
}
export { HeroGeometric };