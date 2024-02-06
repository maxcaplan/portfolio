import { PageWrapperWithNavAndFooter } from "../../components/common/PageWrapperWithNavAndFooter";

export default function Resume() {
  return (
    <PageWrapperWithNavAndFooter>
      <div className="flex-grow flex flex-col gap-y-6 w-full max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">/Resume</h1>

        <hr className="border-brand-gray-700" />
      </div>
    </PageWrapperWithNavAndFooter>
  );
}
