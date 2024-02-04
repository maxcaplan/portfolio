/** Wrapper component for pages */
export default function PageWrapper({
	children,
}: {
	children?: React.ReactNode;
}) {
	return (
		<div className="relative bg-brand-gray-950 text-brand-white font-mono w-full h-screen">
			<div className="w-full h-fit xl:max-w-[200vh]  mx-auto bg-brand-gray-900">
				{children}
			</div>
		</div>
	);
}
