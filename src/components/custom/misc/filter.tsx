'use client';

import { useState } from 'react';
import { useFloating, offset, flip, shift } from '@floating-ui/react';
import ActionButton from '@/components/custom/misc/action-button/action-button';
import { ListFilter } from 'lucide-react';

interface FilterProps {
  form: React.ReactNode;
  onSubmit: (
    values: Record<string, string | number | null | undefined>,
  ) => void;
}

export default function Filter({ form, onSubmit }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { strategy, refs } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(10), flip(), shift()],
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());

    // Pfusch
    onSubmit(values as Record<string, string | number | null | undefined>);

    setIsOpen(false);
  };

  return (
    <div>
      <ActionButton
        label={'Filter'}
        icon={<ListFilter />}
        badgeCount={3}
        onClick={handleClick}
        ref={refs.setReference}
      />
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            zIndex: 1000,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '10px',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {form}
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: 'lightblue',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
