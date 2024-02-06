import PageWrapper from "../PageWrapper";
import Navbar from "../../Navbar";
import Footer from "../../Footer";

interface PageWrapperWithNavAndFooterInterface {
  children?: React.ReactNode;
}

export function PageWrapperWithNavAndFooter({
  children,
}: PageWrapperWithNavAndFooterInterface) {
  return (
    <PageWrapper>
      <div className="w-full h-full min-h-screen flex flex-col">
        <Navbar />

        {children}

        <Footer />
      </div>
    </PageWrapper>
  );
}
