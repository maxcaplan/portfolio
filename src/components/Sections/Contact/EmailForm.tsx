import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import FormInput from "../../common/FormInput";

export default function EmailForm() {
  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [message, set_message] = useState("");

  /**
   * Updates a state value on the input change event
   * @param event - The input change event
   * @param set_state - The state setter function
   */
  const on_input_change = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    set_state: Dispatch<SetStateAction<string>>,
  ) => {
    set_state(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormInput
        name="your name"
        placeholder="Arthur Dent"
        value={name}
        onChange={(event) => on_input_change(event, set_name)}
      />

      <FormInput
        name="your email"
        email={true}
        placeholder="arthurdent@hotmail.com"
        value={email}
        onChange={(event) => on_input_change(event, set_email)}
      />

      <FormInput
        name="message"
        textarea={true}
        rows={5}
        placeholder="Don't panic ..."
        value={message}
        onChange={(event) => on_input_change(event, set_message)}
      />

      <div className="w-full flex justify-end">
        <button className="flex flex-row items-center gap-x-2 px-3 py-1 rounded bg-brand-green border border-brand-green-800 text-brand-green-950 font-bold hover:bg-brand-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="stroke-current"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>

          <p>send</p>
        </button>
      </div>
    </div>
  );
}
