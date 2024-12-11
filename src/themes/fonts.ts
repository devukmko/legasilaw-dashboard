import { Bellefair, Gabarito } from 'next/font/google'

export const bellefair = Bellefair({
  subsets: ['latin'],
  display: 'swap',
  weight: "400",
  variable: '--font-family-bellefair',
})
 
export const gabarito = Gabarito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-gabarito',
})