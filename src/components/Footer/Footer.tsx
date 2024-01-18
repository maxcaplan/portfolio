export default function Footer() {
  return (
    <div
      className={`
	w-full 
	flex 
	justify-center 
	items-center
	p-4 
	border-t 
	border-brand-gray-700
	text-brand-gray-200
	italic
	`}
    >
      Copyleft
      <span className="mx-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="fill-current -scale-100"
        >
          <path d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2 2 6.579 2 12s4.579 10 10 10zm0-18c4.337 0 8 3.663 8 8s-3.663 8-8 8-8-3.663-8-8 3.663-8 8-8z"></path>
          <path d="M12 17c.901 0 2.581-.168 3.707-1.292l-1.414-1.416C13.85 14.735 12.992 15 12 15c-1.626 0-3-1.374-3-3s1.374-3 3-3c.993 0 1.851.265 2.293.707l1.414-1.414C14.582 7.168 12.901 7 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5z"></path>
        </svg>
      </span>
      2022 - {new Date().getUTCFullYear()}
    </div>
  );
}
