import { QuillEditor } from '@/components/ui/text-editor'
import * as React from 'react'

export interface TextEditorInputProps {
  label?: string
  hint?: string
  info?: string
  error?: string
  required?: boolean
  'data-testid'?: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

// Use React.forwardRef to pass the ref down to Input
export const TextEditorInput = React.forwardRef<
  HTMLInputElement,
  TextEditorInputProps
>(
  (
    {
      label,
      hint,
      info,
      error,
      required,
      value,
      onChange,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div data-testid={props['data-testid']} className="grid">
        {label && (
          <label
            data-testid="label"
            className="text-sm font-medium text-utility-gray-700 mb-1.5"
          >
            {label}
            {required && '*'}
          </label>
        )}
        <QuillEditor
          value={value}
          onChange={onChange}
          data-testid="input-editor-field"
          placeholder={placeholder}
        />
        {hint && !error && (
          <p
            className="text-sm font-light text-utility-gray-600 p-0 m-0 mt-1.5"
            data-testid="hint-text"
          >
            {hint}
          </p>
        )}
        {error && (
          <p
            className="text-sm font-light text-utility-error-600 p-0 m-0 mt-1.5"
            data-testid="error-text"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

TextEditorInput.displayName = 'TextInput'
