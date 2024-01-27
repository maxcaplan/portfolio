import SectionHeader from "../SectionHeader";
import CharacterGrid from "./CharacterGrid";
import EmailForm from "./EmailForm";

export default function Contact() {
  return (
    <div className="flex flex-col gap-y-20 w-full max-w-6xl mx-auto px-6">
      <SectionHeader
        title="contact"
        number={3}
        className="decoration-brand-red"
      />

      <div className="w-full lg:grid lg:grid-cols-2 md:gap-x-8">
        <div className="hidden lg:block col-span-1">
          <CharacterGrid />
        </div>

        <div className="w-full lg:col-span-1">
          <div className="w-full h-full overflow-hidden rounded shadow border border-brand-gray-300">
            <div className="relative flex items-center justify-center p-2 border-b border-brand-gray-300 bg-brand-gray-700">
              {/* Mail icon */}
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
                className="absolute left-0 ml-2 stroke-brand-white"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>

              <p className="text-sm">~/contact/email.form</p>

              <div className="absolute right-0 flex flex-row items-center gap-x-4 mr-2">
                {/* Minus icon */}
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
                  className="stroke-brand-white"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>

                {/* Maximize icon */}
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
                  className="stroke-brand-white"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>

                {/* Close icon */}
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
                  className="stroke-brand-white"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>

            <div className="bg-brand-gray-800 p-4">
              <EmailForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
