interface SectionProps {
  number: number;
  title: string;
  titleClassName?: string;
  className?: string;
  children?: JSX.Element | JSX.Element[];
  backgroundChildren?: JSX.Element | JSX.Element[];
  backgroundWrapperClassName?: string;
}

export default function Section(props: SectionProps) {
  return (
    <section
      className={`
	relative 
	w-full 
	${props.className}`}
      id={props.title}
    >
      <div
        className={`
		z-0 
		absolute 
		top-0 
		left-0 
		w-full 
		h-full 
		${props.backgroundWrapperClassName || ""}`}
      >
        {props.backgroundChildren}
      </div>
      <div className="z-50 relative w-full max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-20">
          {props.number}
          {". "}
          <span
            className={`
		decoration-brand-purple 
		decoration-wavy 
		decoration-2 
		underline
		${props.titleClassName || ""}
		`}
          >
            {props.title}
          </span>
        </h2>

        {props.children}
      </div>
    </section>
  );
}