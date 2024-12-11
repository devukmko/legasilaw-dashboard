import { ComponentType } from "react"
import { mergeStyle } from '../../../utils/styles'
import { ButtonSize, ButtonVariant, Props } from "./type"

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  'contained': 'btn font-semibold rounded-lg border border-transparent text-white',
  'outlined': 'btn btn-outline font-semibold disabled:opacity-50 disabled:pointer-events-none',
  'text': 'btn btn-link font-semibold disabled:opacity-50 disabled:pointer-events-none',
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  'small': 'btn btn-sm',
  'medium': 'btn',
  'large': 'btn btn-lg',
}

const Button: ComponentType<Props> = ({
  children,
  onClick,
  disabled,
  size = 'medium',
  variant = 'contained',
  color = 'primary',
  type = 'button',
  className,
}) => {
  let colorStyle = '';
  if (color && variant === 'contained') {
    colorStyle = `btn btn-${color}`
  } else if (color && variant === 'outlined') {
    colorStyle = `btn-${color} text-${color}-600 btn:hover:bg-${color}-100 btn:hover:text-${color}-800`
  } else if (color && variant === 'text') {
    colorStyle = `hover:border-${color}-600 text-${color}-500 hover:text-${color}-400`
  }

  return (
    <button
      className={mergeStyle(VARIANT_STYLES[variant], SIZE_STYLES[size], colorStyle, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
