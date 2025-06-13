
import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

interface StarBorderProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  className?: string
  children: React.ReactNode
}

export function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button"
  const defaultColor = color || "#FF7F11"

  return (
    <Component 
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px]",
        className
      )} 
      {...props}
    >
      <div
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0",
          "opacity-60" 
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0",
          "opacity-60"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-1 text-white text-center text-lg font-medium py-4 px-8 rounded-[20px]",
        "bg-gradient-to-r from-orange to-orangeLight border border-orange/30",
        "transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      )}>
        {children}
      </div>
    </Component>
  )
}
