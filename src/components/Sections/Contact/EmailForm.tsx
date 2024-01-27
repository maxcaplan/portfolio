import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import FormInput from "../../common/FormInput";

export default function EmailForm() {
  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [message, set_message] = useState("");

  const [is_form_error, set_is_form_error] = useState(false);
  const [form_error_message, set_form_error_message] = useState("");

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

  /**
   * Handles the form submit event
   * @param name - The name input value
   * @param email - The email input value
   * @param message - The message input value
   */
  const handle_form_submit = (name: string, email: string, message: string) => {
    try {
      if (!name || name.length <= 0) throw "the name field is required";
      if (!email || email.length <= 0) throw "the email field is required";
      if (!message || message.length <= 0)
        throw "the message field is required";

      set_is_form_error(false);
    } catch (e) {
      throw_form_error(e);
    }
  };

  const throw_form_error = (error: unknown) => {
    let message = "";
    const no_message_message = "Unknown error :/";

    if (typeof error === "string") message = error;
    if (error instanceof Error) message = `${error.name}: ${error.message}`;

    set_form_error_message(message != "" ? message : no_message_message);
    set_is_form_error(true);

    if (typeof error !== "string") console.error(error);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormInput
        name="your name"
        placeholder="Arthur Dent"
        required={true}
        value={name}
        onChange={(event) => on_input_change(event, set_name)}
      />

      <FormInput
        name="your email"
        email={true}
        placeholder="arthurdent@hotmail.com"
        required={true}
        value={email}
        onChange={(event) => on_input_change(event, set_email)}
      />

      <FormInput
        name="message"
        textarea={true}
        rows={5}
        placeholder="Don't panic ..."
        required={true}
        value={message}
        onChange={(event) => on_input_change(event, set_message)}
      />

      <div
        className={`w-full py-2 rounded border border-brand-red-900 bg-brand-red-400 overflow-x-scroll whitespace-nowrap ${
          is_form_error && form_error_message != "" ? "block" : "hidden"
        }`}
      >
        <p className="inline text-brand-red-950 italic px-2">
          {form_error_message}
        </p>
      </div>

      <hr className="border-brand-gray-700" />

      <div className="w-full flex flex-row">
        <p className="text-brand-gray-400 text-sm italic">
          required field <span className="text-sm align-super">*</span>
        </p>

        <div className="flex-grow flex justify-end">
          <button
            className="flex flex-row items-center gap-x-2 px-3 py-1 rounded bg-brand-green border border-brand-green-800 text-brand-green-950 font-bold hover:bg-brand-green-600"
            onClick={() => handle_form_submit(name, email, message)}
          >
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
    </div>
  );
}
