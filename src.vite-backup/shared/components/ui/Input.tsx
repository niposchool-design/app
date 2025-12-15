import React, { forwardRef, useState } from 'react'
import { useTheme, useRoleColors } from '../../contexts/ThemeContext'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

// 🎌 Tipos do sistema de inputs japonês
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'zen' | 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  role?: 'student' | 'professor' | 'admin'
  philosophy?: 'kaizen' | 'wabi-sabi' | 'zen' | 'none'
  label?: string
  description?: string
  error?: string
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showPasswordToggle?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    variant = 'default',
    size = 'md',
    role,
    philosophy = 'none',
    label,
    description,
    error,
    success = false,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    type = 'text',
    className = '',
    disabled,
    ...props
  }, ref) => {
    const { isDark } = useTheme()
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    // 🔐 Password toggle logic
    const isPasswordField = type === 'password' || showPasswordToggle
    const inputType = isPasswordField && showPassword ? 'text' : type

    // 📏 Size classes
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    }

    // 🎨 Variant styles
    const getVariantClasses = () => {
      const baseClasses = `
        w-full font-zen rounded-zen transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
      `

      // 🔴 Error state
      if (error) {
        return `
          ${baseClasses}
          border-2 border-red-300 dark:border-red-600
          bg-red-50 dark:bg-red-900/20
          text-red-900 dark:text-red-100
          placeholder:text-red-400 dark:placeholder:text-red-500
          focus:ring-red-500 focus:border-red-500
        `
      }

      // 🟢 Success state
      if (success) {
        return `
          ${baseClasses}
          border-2 border-green-300 dark:border-green-600
          bg-green-50 dark:bg-green-900/20
          text-green-900 dark:text-green-100
          placeholder:text-green-400 dark:placeholder:text-green-500
          focus:ring-green-500 focus:border-green-500
        `
      }

      // 👤 Role-based colors
      if (role) {
        const roleColorMap = {
          student: 'focus:ring-nipo-student-500 focus:border-nipo-student-500',
          professor: 'focus:ring-nipo-professor-500 focus:border-nipo-professor-500',
          admin: 'focus:ring-nipo-admin-500 focus:border-nipo-admin-500'
        }
        
        const roleColor = roleColorMap[role] || 'focus:ring-nipo-primary'
        
        return `
          ${baseClasses}
          border border-nipo-zen-300 dark:border-nipo-zen-600
          bg-white dark:bg-nipo-zen-800
          text-nipo-zen-900 dark:text-white
          placeholder:text-nipo-zen-500 dark:placeholder:text-nipo-zen-400
          ${roleColor}
        `
      }

      // 🎨 Variants
      switch (variant) {
        case 'zen':
          return `
            ${baseClasses}
            border-2 border-nipo-zen-300 dark:border-nipo-zen-600
            bg-gradient-to-r from-nipo-zen-50 to-white
            dark:from-nipo-zen-800 dark:to-nipo-zen-700
            text-nipo-zen-900 dark:text-white
            placeholder:text-nipo-zen-500 dark:placeholder:text-nipo-zen-400
            focus:ring-nipo-zen-500 focus:border-nipo-zen-500
            hover:shadow-zen
          `

        case 'outlined':
          return `
            ${baseClasses}
            border-2 border-nipo-zen-300 dark:border-nipo-zen-600
            bg-transparent
            text-nipo-zen-900 dark:text-white
            placeholder:text-nipo-zen-500 dark:placeholder:text-nipo-zen-400
            focus:ring-nipo-primary focus:border-nipo-primary
            hover:border-nipo-zen-400 dark:hover:border-nipo-zen-500
          `

        case 'filled':
          return `
            ${baseClasses}
            border border-transparent
            bg-nipo-zen-100 dark:bg-nipo-zen-700
            text-nipo-zen-900 dark:text-white
            placeholder:text-nipo-zen-600 dark:placeholder:text-nipo-zen-300
            focus:ring-nipo-primary focus:border-nipo-primary
            focus:bg-white dark:focus:bg-nipo-zen-800
          `

        case 'default':
        default:
          return `
            ${baseClasses}
            border border-nipo-zen-300 dark:border-nipo-zen-600
            bg-white dark:bg-nipo-zen-800
            text-nipo-zen-900 dark:text-white
            placeholder:text-nipo-zen-500 dark:placeholder:text-nipo-zen-400
            focus:ring-nipo-primary focus:border-nipo-primary
          `
      }
    }

    // 🧘 Philosophy animations
    const getPhilosophyClasses = () => {
      switch (philosophy) {
        case 'kaizen':
          return 'hover:animate-scale-gentle'
        case 'wabi-sabi':
          return 'hover:animate-wave-gentle'
        case 'zen':
          return 'hover:animate-zen-breath'
        default:
          return ''
      }
    }

    // 🎯 Final classes
    const finalClasses = `
      ${getVariantClasses()}
      ${sizeClasses[size]}
      ${getPhilosophyClasses()}
      ${leftIcon ? 'pl-12' : ''}
      ${rightIcon || isPasswordField ? 'pr-12' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ')

    return (
      <div className="w-full">
        {/* 🏷️ Label */}
        {label && (
          <label className={`
            block text-sm font-zen font-medium mb-2
            ${error ? 'text-red-700 dark:text-red-300' : ''}
            ${success ? 'text-green-700 dark:text-green-300' : ''}
            ${!error && !success ? 'text-nipo-zen-700 dark:text-nipo-zen-300' : ''}
          `}>
            {label}
          </label>
        )}

        {/* 📝 Input Container */}
        <div className="relative">
          {/* 👈 Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className={`
                w-5 h-5
                ${error ? 'text-red-400' : ''}
                ${success ? 'text-green-400' : ''}
                ${!error && !success ? 'text-nipo-zen-400' : ''}
              `}>
                {leftIcon}
              </div>
            </div>
          )}

          {/* 📝 Input Field */}
          <input
            ref={ref}
            type={inputType}
            className={finalClasses}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* 👉 Right Icon / Password Toggle */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {/* Password Toggle */}
            {isPasswordField && (
              <button
                type="button"
                className={`
                  w-5 h-5 transition-colors duration-200
                  ${error ? 'text-red-400 hover:text-red-600' : ''}
                  ${success ? 'text-green-400 hover:text-green-600' : ''}
                  ${!error && !success ? 'text-nipo-zen-400 hover:text-nipo-zen-600' : ''}
                `}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            )}

            {/* Status Icons */}
            {!isPasswordField && (error || success) && (
              <div className={`w-5 h-5 ${error ? 'text-red-400' : 'text-green-400'}`}>
                {error ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              </div>
            )}

            {/* Custom Right Icon */}
            {!isPasswordField && !error && !success && rightIcon && (
              <div className="w-5 h-5 text-nipo-zen-400">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* 📄 Description */}
        {description && !error && (
          <p className="mt-2 text-sm text-nipo-zen-600 dark:text-nipo-zen-400">
            {description}
          </p>
        )}

        {/* ❌ Error Message */}
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-zen">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// 🎌 Componentes especializados por role
export function StudentInput(props: Omit<InputProps, 'role'>) {
  return <Input {...props} role="student" philosophy="kaizen" />
}

export function ProfessorInput(props: Omit<InputProps, 'role'>) {
  return <Input {...props} role="professor" philosophy="zen" />
}

export function AdminInput(props: Omit<InputProps, 'role'>) {
  return <Input {...props} role="admin" philosophy="wabi-sabi" />
}

// 🎯 Input variants específicos
export function ZenInput(props: InputProps) {
  return <Input {...props} variant="zen" philosophy="zen" />
}

export function OutlinedInput(props: InputProps) {
  return <Input {...props} variant="outlined" />
}

export function FilledInput(props: InputProps) {
  return <Input {...props} variant="filled" />
}