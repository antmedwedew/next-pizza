import { FC, InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { Textarea } from '@/shared/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

interface FormTextareaProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: FC<FormTextareaProps> = ({ name, label, required, className, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const handleClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={cn('', className)}>
      {label && (
        <span className="font-medium block mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}

      <div className="relative">
        <Textarea className="text-base h-12 text-md" {...register(name)} {...props} />

        {value && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 cursor-pointer transition-all"
            onClick={handleClear}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
