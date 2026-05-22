import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

interface InputFormProps {
  text: string;
  placeHolder?: string;
  type: string;
  id: string;
  value: string;
  onChange: (valeur: string) => void; // <-- La fonction magique pour parler au parent
}

export function InputForm({ text, placeHolder, type, id, value, onChange }: InputFormProps) {

    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setInputType(showPassword ? "password" : "text");
    };

    return (
        <div className="w-3/4 p-4 flex flex-col ">
            <p className="p-2 font-montserrat font-semibold text">{text}</p>
            <span className="w-full flex">
                <input 
                placeholder={placeHolder} 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                className="ml-4 p-2 w-9/10 border border-brown rounded-md" 
                type={inputType} 
                id={id} 
                name={id} />
                {type === "password" && (
                    <button
                        className="relative right-8"
                        onClick={togglePasswordVisibility}
                        type="button"
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                )}
            </span>

        </div>

    );
}