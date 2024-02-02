import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import emailjs from "@emailjs/browser";

import FormInput from "../../common/FormInput";

export default function EmailForm() {
  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [message, set_message] = useState("");

  const [is_sending_email, set_is_sending_email] = useState(false);
  const [is_email_sent, set_is_email_sent] = useState(false);

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
  const handle_form_submit = async (
    event: MouseEvent,
    name: string,
    email: string,
    message: string,
  ) => {
    try {
      event.preventDefault();

      // Exit if email is being sent or was just sent
      if (is_sending_email || is_email_sent) return;

      if (!name || name.length <= 0) throw "the name field is required";
      if (!email || email.length <= 0) throw "the email field is required";
      if (!message || message.length <= 0)
        throw "the message field is required";

      set_is_form_error(false);

      await send_email(name, email, message);
    } catch (e) {
      throw_form_error(e);
    }
  };

  /**
   * Disaplays an error on the form UI and logs Error objects to console
   * @param error - The data to throw as an error
   */
  const throw_form_error = (error: unknown) => {
    let message = "";
    const no_message_message = "Unknown error :/";

    if (typeof error === "string") message = error;
    if (error instanceof Error) message = `${error.name}: ${error.message}`;

    set_form_error_message(message != "" ? message : no_message_message);
    set_is_form_error(true);

    // If error is not just text, also log it console as an error
    if (typeof error !== "string") console.error(error);
  };

  /**
   * Sends an email with email.js
   * @param name - The name of the sender
   * @param email - The reply to email of the sender
   * @param message - The message of the email
   */
  const send_email = async (name: string, email: string, message: string) => {
    try {
      const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const template_id = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const public_key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const template_params = {
        from_name: name,
        reply_to: email,
        message: message,
      };

      set_is_sending_email(true);

      await emailjs.send(service_id, template_id, template_params, public_key);

      set_is_sending_email(false);
      set_is_email_sent(true);
    } catch (e) {
      set_is_sending_email(false);
      throw e;
    }
  };

  /*
   * Returns status text for send button based on sending states
   */
  const send_button_text = () => {
    if (is_sending_email) return "sending";
    else if (is_email_sent) return "sent";
    return "send";
  };

  // Reset is_email_sent to false after 2 seconds of it being true
  useEffect(() => {
    let timeout: number;

    if (is_email_sent) {
      timeout = setTimeout(() => {
        set_is_email_sent(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [is_email_sent]);

  return (
    <div className="flex flex-col gap-4">
      <FormInput
        name="your name"
        placeholder="Arthur Dent"
        required={true}
        autocomplete="given-name"
        value={name}
        onChange={(event) => on_input_change(event, set_name)}
      />

      <FormInput
        name="your email"
        email={true}
        placeholder="arthurdent@hotmail.com"
        required={true}
        autocomplete={"email"}
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
        className={`w-full py-2 rounded border border-brand-red-900 bg-brand-red-400 overflow-x-scroll whitespace-nowrap opacity-0 transition-opacity duration-200 ${
          is_form_error && form_error_message != ""
            ? "block opacity-100"
            : "hidden"
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
            className="flex flex-row items-center gap-x-2 px-3 py-1 rounded bg-brand-green border border-brand-green-800 text-brand-green-950 font-bold enabled:hover:bg-brand-green-600"
            onClick={(event) => handle_form_submit(event, name, email, message)}
            disabled={is_sending_email || is_email_sent}
          >
            {/* Send icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`stroke-current ${
                is_sending_email || is_email_sent ? "hidden" : "inline"
              }`}
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>

            {/* Loader icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`stroke-current animate-spin ${
                is_sending_email ? "inline" : "hidden"
              }`}
            >
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>

            {/* Check icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`stroke-current ${
                is_email_sent && !is_sending_email ? "inline" : "hidden"
              }`}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>

            <p>{send_button_text()}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
