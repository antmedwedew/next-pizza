'use client';

import { FC, useId } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface AddressSearchInputProps {
  onChange?: (value?: string) => void;
}

export const AddressSearchInput: FC<AddressSearchInputProps> = ({ onChange, ...props }) => {
  const id: string = useId();

  return (
    <div>
      <span className="font-medium block mb-1">
        Адрес <span className="text-red-500">*</span>
      </span>
      <AddressSuggestions
        token={process.env.NEXT_PUBLIC_DADATA_KEY}
        delay={200}
        onChange={(data) => onChange?.(data?.value)}
        uid={id}
      />
    </div>
  );
};
