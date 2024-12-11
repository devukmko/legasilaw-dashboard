import React from 'react';
import { ColorsNames } from '../../../themes/type'

export type ButtonVariant = 'contained' | 'outlined' | 'text'
export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonColor = 'primary' | 'secondary' | ColorsNames

export interface Props {
  /** Add description for children */
  children: React.ReactNode;
  /** Add description for Variant */
  variant?: ButtonVariant;
  /** Size for button */
  size?: ButtonSize;
  /** Add description for onClick */
  onClick?: () => void;
  /** Add description for disabled */
  disabled?: boolean;
  /** Add description for color */
  color?: ButtonColor;
  /** Add custom className */
  className?: React.ComponentProps<'div'>['className'];
  type?: React.ComponentProps<'button'>['type'];
}