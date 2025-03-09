
import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, helperText, error, className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", wrapperClassName)}>
        <Label htmlFor={props.id}>{label}</Label>
        <Input
          ref={ref}
          className={cn(error && "border-destructive", className)}
          {...props}
        />
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);
InputField.displayName = 'InputField';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, helperText, error, className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", wrapperClassName)}>
        <Label htmlFor={props.id}>{label}</Label>
        <Textarea
          ref={ref}
          className={cn(error && "border-destructive", className)}
          {...props}
        />
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);
TextareaField.displayName = 'TextareaField';

interface SelectFieldProps {
  label: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  wrapperClassName?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  helperText,
  error,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled,
  wrapperClassName,
}) => {
  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={cn(error && "border-destructive")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
