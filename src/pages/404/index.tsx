import { Link } from "react-router-dom";
import { PageWrapperWithNavAndFooter } from "../../components/common/PageWrapperWithNavAndFooter";

export default function NotFound() {
  return (
    <PageWrapperWithNavAndFooter>
      <div className="w-full flex-grow p-6 flex flex-col justify-center items-center gap-y-8">
        <div className="text-center">
          <h1 className="text-7xl font-bold">404</h1>
          <h3 className="text-xl sm:text-3xl italic text-brand-gray-200">
            page not found :(
          </h3>
        </div>

        <Link
          to="/"
          className="flex flex-row justify-center gap-x-2 px-3 py-1 bg-brand-gray-800 hover:bg-brand-gray-700 border border-brand-gray-600 rounded transition duration-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="24"
            viewBox="0 0 18 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-current"
          >
            <polyline
              points="15 18 9 12 15 6"
              transform="translate(-3.0000207)"
            ></polyline>
          </svg>
          go home
        </Link>
      </div>
    </PageWrapperWithNavAndFooter>
  );
}
