import { Link, useLoaderData } from "react-router-dom";
import MarkdownIt from "markdown-it";

import { Work } from "../../../types";

import { PageWrapperWithNavAndFooter } from "../../../components/common/PageWrapperWithNavAndFooter";

import { addLeadingZeros } from "../../../utils/numberFormatting";
import SkillIcon from "../../../components/common/SkillIcon";
import ContentLinks from "../../../components/common/ContentLinks";

export default function WorkPage() {
  const work = useLoaderData() as Work;

  const md = MarkdownIt({ html: true, typographer: true });

  const body = md.render(work.body);

  return (
    <PageWrapperWithNavAndFooter>
      <div className="flex-grow flex flex-col gap-y-6 w-full max-w-4xl mx-auto p-6">
        <div className="flex flex-col gap-y-2">
          <div itemScope itemType="https://schema.org/Article" className="flex flex-col-reverse sm:flex-row gap-4 sm:items-center">
            <h1 itemScope itemType="https://schema.org/BreadcrumbList" className="flex-grow text-2xl sm:text-3xl font-bold">
              <Link itemProp="itemListElement" to="/#work">/work</Link>
              <br className="sm:hidden" />
              <Link itemProp="itemListElement" to={`/work/${work.id}`}>/{work.title}</Link>
            </h1>

            <div className="flex justify-end w-full md:w-auto">
              <Link
                to="/"
                className="flex flex-row gap-2 px-2 py-1 rounded border border-brand-gray-400 bg-brand-gray-800 hover:bg-brand-gray-700 transition duration-100"
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
          </div>

          <h2 className="text-xl text-brand-gray-300 italic">{`${addLeadingZeros(work.date.month)}/${work.date.year}`}</h2>
        </div>

        <hr className="border-brand-gray-700" />

        <div className="flex justify-center w-full relative">
          <picture>
            <source
              media="(min-width: 580px)"
              srcSet={`${work.coverImage}cover_lg.webp`}
              type="image/webp"
            />
            <source
              media="(min-width: 380px)"
              srcSet={`${work.coverImage}cover_md.webp`}
              type="image/webp"
            />
            <source
              srcSet={`${work.coverImage}cover_sm.webp`}
              type="image/webp"
            />

            <source
              media="(min-width: 580px)"
              srcSet={`${work.coverImage}cover_lg.png`}
              type="image/png"
            />
            <source
              media="(min-width: 380px)"
              srcSet={`${work.coverImage}cover_md.png`}
              type="image/png"
            />
            <source
              srcSet={`${work.coverImage}cover_sm.png`}
              type="image/png"
            />

            <img
              src={`${work.coverImage}cover_sm.png`}
              width="580"
              height="337"
              alt={`${work.title}`}
              className="w-full max-w-4xl rounded shadow border border-brand-gray-400"
            />
          </picture>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-y-3 items-start">
          <div className="flex gap-x-3 flex-grow">
            <ContentLinks sourceHref={work.source} demoHref={work.demo} />
          </div>
          <div className="flex sm:justify-end">
            <div className="flex flex-grow sm:flex-grow-0 gap-2 items-center p-2 sm:p-3 rounded border border-brand-gray-600 shadow">
              <p className="flex-grow sm:flex-grow-0">skills:</p>

              <div className="flex flex-row gap-2">
                {work.skills.map((skill, idx) => (
                  <SkillIcon key={idx} skill={skill} className="p-2" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: body }}
          className="prose prose-brand font-sans prose-headings:font-mono prose-li:marker:font-mono"
        ></div>
      </div>
    </PageWrapperWithNavAndFooter>
  );
}
