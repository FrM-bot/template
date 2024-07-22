import { type ElementType, createElement } from 'react'

// type Props = AllHTMLAttributes<ElementType> & {
//   children: ReactNode[] | ReactNode
//   component?: ElementType
// }
// export function Card({ component, children, ...props }: Props) {
//   return createElement(
//     component || 'div',
//     {
//       ...props,
//       className: cn('rounded-lg border bg-white p-4 shadow-lg', props.className),
//     },
//     children
//   )
// }

import * as React from 'react'

import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { component?: ElementType }>(
  ({ className, component, ...props }, ref) =>
    createElement(
      component || 'div',
      {
        ...props,
        ref,
        className: cn('rounded-lg border bg-card text-card-foreground shadow-md', className),
      },
      props.children
    )
  // <div
  //   ref={ref}
  //   className={cn(
  //     "rounded-lg border bg-card text-card-foreground shadow-md",
  //     className
  //   )}
  //   {...props}
  // />
)

Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
