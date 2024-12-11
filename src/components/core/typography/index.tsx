import { forwardRef, HTMLAttributes } from "react"
// https://github.com/creativetimofficial/material-tailwind/blob/main/packages/material-tailwind-react/src/components/Typography/index.tsx

import { mergeStyle } from "../../../utils/styles"

import { bellefair, gabarito } from '@/themes/fonts'

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle'
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}

export const Typography = forwardRef<HTMLHeadingElement, Props>(
  ({ children, variant, className, fontWeight = 'normal', ...rest }, ref) => {
    let Element: keyof JSX.IntrinsicElements = 'p'
    let style

    const fontWeightStyle = `font-${fontWeight}`
    
    switch (variant) {
      case 'h1':
        Element = 'h1'
        style = `text-5xl ${gabarito.className}`
        break
      case 'h2':
        Element = 'h2'
        style = `text-3xl ${gabarito.className}`
        break
      case 'h3':
        Element = 'h3'
        style = "text-2xl"
        break
      case 'h4':
        Element = 'h4'
        style = "text-xl"
        break
      case 'h5':
        Element = 'h5'
        style = "text-lg"
        break
      case 'h6':
        Element = 'h6'
        style = "text-base"
        break
      case 'subtitle': 
        Element = 'h3'
        style = `text-3xl ${gabarito.className} `

        break
      case 'body1':
        style = `text-base ${gabarito.className}`
        break
      case 'body2':
        style = `text-sm ${gabarito.className}`
        break
      default:
        break
    }

    return (
      <Element ref={ref} {...rest} className={mergeStyle('text-black', style, fontWeightStyle, className)}>
        {children}
      </Element>
    )
  }
)

Typography.displayName = 'Typography'

export default Typography