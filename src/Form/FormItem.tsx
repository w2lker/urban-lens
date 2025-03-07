import React from 'react';

type FormItemProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const FormItem: React.FC<FormItemProps> = ({ label, value, onChange }) => {
  return (
    <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-full">
      <legend className="fieldset-legend">{label}</legend>
      <label className="fieldset-label">
        <input
          type="checkbox"
          className="checkbox"
          checked={value !== 0}
          onChange={() => onChange(value === 0 ? 50 : 0)}
        />
        Rate
        {value !== 0 && (
          <input
            type="range"
            min={1}
            max={100}
            value={value}
            className="range"
            onChange={(e) => onChange(Number(e.target.value))}
          />
        )}
      </label>
    </fieldset>
  );
};

export default FormItem;
