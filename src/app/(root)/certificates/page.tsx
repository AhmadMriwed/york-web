import CertificateSearch from "@/components/forms/CertificateSearch";

const page = () => {
  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div className="certificates-bg h-[80vh] flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-5xl w-full md:max-w-[60%] mx-auto text-white font-bold text-center">
          SEARCH FOR CERTIFICATES ACCREDITED
        </h1>
        <div className="w-full md:w-[60%] mx-auto mt-16">
          <CertificateSearch />
        </div>
      </div>
    </main>
  );
};

export default page;
