interface FormInputProps {
  name?: string;
  placeholder?: string;
  email?: boolean;
  textarea?: boolean;
  rows?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string | number | undefined;
  className?: string;
}

export default function FormInput(props: FormInputProps) {
  const input_classname =
    "px-3 py-2 rounded border border-brand-gray-400 bg-brand-gray-700 placeholder:text-brand-gray-300";

  return (
    <div className={`flex flex-col gap-y-2 ${props.className || ""}`}>
      {props.name && <p>{props.name}:</p>}

      {!props.textarea ? (
        <input
          type={props.email ? "email" : "text"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className={input_classname}
        />
      ) : (
        <textarea
          placeholder={props.placeholder}
          rows={props.rows}
          value={props.value}
          onChange={props.onChange}
          className={input_classname}
        />
      )}
    </div>
  );
}
