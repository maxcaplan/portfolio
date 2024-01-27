import { ChangeEventHandler } from "react";

interface FormInputProps {
  name?: string;
  placeholder?: string;
  required?: boolean;
  email?: boolean;
  textarea?: boolean;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string | number | undefined;
  className?: string;
}

export default function FormInput(props: FormInputProps) {
  const input_classname =
    "px-3 py-2 rounded border border-brand-gray-400 bg-brand-gray-700 placeholder:text-brand-gray-300";

  return (
    <div className={`flex flex-col gap-y-2 ${props.className || ""}`}>
      {props.name && (
        <p>
          {props.name}
          {props.required && (
            <span className="text-brand-red align-super text-sm"> *</span>
          )}
        </p>
      )}

      {!props.textarea ? (
        <input
          type={props.email ? "email" : "text"}
          placeholder={props.placeholder}
          required={props.required}
          value={props.value}
          onChange={props.onChange}
          className={input_classname}
        />
      ) : (
        <textarea
          placeholder={props.placeholder}
          required={props.required}
          rows={props.rows}
          value={props.value}
          onChange={props.onChange}
          className={`resize-none ${input_classname}`}
        />
      )}
    </div>
  );
}
