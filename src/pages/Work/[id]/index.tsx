import { Link, useLoaderData } from "react-router-dom";
import MarkdownIt from "markdown-it";

import PageWrapper from "../../../components/common/PageWrapper";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

import { Work } from "../../../types";

import { addLeadingZeros } from "../../../utils/numberFormatting";

export default function WorkPage() {
	const work = useLoaderData() as Work;

	const md = MarkdownIt({ html: true, typographer: true });

	const body = md.render(work.body);

	return (
		<PageWrapper>
			<div className="flex flex-col w-full h-full min-h-screen">
				<Navbar />

				<div className="flex-grow flex flex-col gap-y-6 w-full max-w-4xl mx-auto p-6">
					<div className="flex flex-col md:flex-row gap-4 sm:items-center">
						<div className="flex justify-end w-full md:w-auto">
							<Link
								to="/"
								className="flex flex-row gap-2 px-2 py-1 rounded border border-brand-gray-400 hover:bg-brand-gray-800 transition duration-200"
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
								Back
							</Link>
						</div>

						<div className="flex flex-col md:flex-row md:items-center w-full gap-y-4">
							<h1 className="text-3xl font-bold">
								/work
								<br className="md:hidden" />/{work.title}
							</h1>

							<div className="flex-grow flex flex-row md:justify-end">
								<h2 className="text-xl text-brand-gray-300 italic">{`${addLeadingZeros(work.date.month)}/${work.date.year}`}</h2>
							</div>
						</div>
					</div>

					<hr className="border-brand-gray-700" />

					<div className="flex justify-center w-full">
						<img
							src={work.coverImage}
							alt="work image"
							className="w-full max-w-4xl rounded shadow border border-brand-gray-400"
						/>
					</div>

					<div
						dangerouslySetInnerHTML={{ __html: body }}
						className="prose prose-brand font-sans prose-headings:font-mono prose-li:marker:font-mono"
					></div>
				</div>

				<Footer />
			</div>
		</PageWrapper>
	);
}
