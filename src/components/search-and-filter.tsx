import React, { useCallback, useEffect } from 'react';
import InputField from './input-field';
import SelectField from './select-field';
import CheckboxField from './check-box';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
interface SelectOption<T = string> {
    value: T;
    label: string;
}
type Field<T = string> =
    | {
        type: 'search';
        name: string;
        label: string;
        value: string;
        onChange: (val: string) => void;
        placeholder?: string;
    }
    | {
        type: 'select';
        name: string;
        label: string;
        value: string;
        onChange: (val: string) => void;
        options: SelectOption<T>[];
    } | {
        type: 'checkbox';
        name: string;
        label: string;
        checked: boolean;
        onChange: (val: boolean) => void;
    } | {
        type: "range";
        name: string;
        label: string;
        value: [number, number];
        min: number;
        max: number;
        step?: number;
        onChange: (val: [number, number]) => void;
    }


type Props = {
    fields: Field[];
};

const SearchAndFilter: React.FC<Props> = ({ fields }) => (
    <div className="w-full border border-gray-200 rounded-md lg:rounded-xl p-3 lg:p-5">
        <div className='w-full flex flex-wrap flex-col sm:flex-row justify-start items-center gap-2 lg:gap-6'>
            {fields.map((field) => {
                if (field.type === 'search') {
                    return (
                        <div key={field.name} className="flex flex-col flex-1 lg:max-w-1/2">
                            <InputField
                                type="text"
                                name=""
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                placeholder={field.placeholder}
                                className='min-w-[120px]'
                            />
                        </div>
                    );
                }

                if (field.type === 'select') {
                    return (
                        <div key={field.name} className="flex flex-col">
                            <SelectField
                                key={field.name}
                                name={field.name}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                options={field.options}
                            />
                        </div>
                    );
                }



                return null;
            })}
        </div>
        <div className='mt-2 md:mt-4 w-full flex flex-wrap flex-col sm:flex-row justify-start items-center gap-2 lg:gap-6'>
            {fields.map((field) => {
                if (field.type === "range") {
                    return (
                        <div key={field.name} className="mb-4 w-full sm:w-1/2 md:w-1/3">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>₹{field.value[0]}</span>
                                <span>₹{field.value[1]}</span>
                            </div>
                            <RangeSlider
                                min={field.min}
                                max={field.max}
                                step={field.step || 1}
                                value={field.value}
                                onInput={field.onChange}
                            />
                        </div>
                    );

                } if (field.type === 'checkbox') {
                    return (
                        <div key={field.name} className="flex items-center gap-2">
                            <CheckboxField
                                checked={field.checked}
                                label={field.label}
                                name={field.name}
                                onChange={(e) => field.onChange(e.target.checked)}
                            />
                        </div>
                    );
                }
                return null;
            })}
        </div>

    </div>
);

export default SearchAndFilter;
