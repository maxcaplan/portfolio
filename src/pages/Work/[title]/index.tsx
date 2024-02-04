import PageWrapper from "../../../components/common/PageWrapper";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

export default function Work() {
  return (
    <PageWrapper>
      <div className="flex flex-col w-full h-full min-h-full">
        <Navbar />

        <div className="flex-grow"></div>

        <Footer />
      </div>
    </PageWrapper>
  );
}
