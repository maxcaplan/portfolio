import { PageWrapperWithNavAndFooter } from "../../components/common/PageWrapperWithNavAndFooter";

export default function Resume() {
  return (
    <PageWrapperWithNavAndFooter>
      <div className="flex-grow flex flex-col gap-y-6 w-full max-w-4xl mx-auto p-6">
        <div className="flex flex-row items-center">
          <h1 className="flex-grow text-2xl sm:text-3xl font-bold">/resume</h1>

          <a
            href="/assets/resume.pdf"
            download
            className="flex flex-row items-center gap-2 px-2 py-1 rounded border border-brand-gray-600 hover:bg-brand-gray-700 transition duration-100"
          >
            {/* Download icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-current"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            download
          </a>
        </div>

        <hr className="border-brand-gray-700" />

        <object
          type="application/pdf"
          data="/assets/resume.pdf"
          width="500px"
          className="w-full aspect-[2/3] rounded shadow"
        />

        <p className="text-end italic text-brand-gray-300">
          updated 06/02/2024
        </p>
      </div>
    </PageWrapperWithNavAndFooter>
  );
}
