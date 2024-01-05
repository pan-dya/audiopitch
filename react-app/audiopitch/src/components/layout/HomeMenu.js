import Image from "next/image";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  return (
    <section className="container mx-auto px-32 py-24 max-w-max bg-shade">
      <div className="text-center mb-4 pb-10">
        <SectionHeaders subHeader={"Our"} mainHeader={"Features"} />
      </div>
      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2 pr-10">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">
            Kickstart Your Music Career
          </h4>
          <p className="text-gray-600 mb-8">
            Take your music to the next level by reaching out to top playlist
            owners. Share your songs directly with influential curators to get
            your music noticed and appreciated by more people. This is your
            chance to make your music stand out and get the recognition it
            deserves.
          </p>
        </div>
        <div className="w-full md:w-1/2 px-10">
          <Image
            src="https://images.unsplash.com/photo-1593698054589-8c14bb66d2d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg"
            width={2000}
            height={2000}
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2 px-10">
          <Image
            src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg"
            width={2000}
            height={2000}
          />
        </div>
        <div className="w-full md:w-1/2 pl-10">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">
            Connect With Artists in the Industry
          </h4>
          <p className="text-gray-600 mb-8">
            Build your ultimate playlist and connect with other musicians and
            industry insiders. Join our community of music lovers to discover
            new songs and expand your network. It's about more than just music;
            it's a chance to meet people who
          </p>
        </div>
      </div>
      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2 pr-10">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">
            Find the Best Deals
          </h4>
          <p className="text-gray-600 mb-8">
            Promote your music at affordable prices and get your name out there
            without spending too much. Our platform offers reasonable rates so
            that you can reach a wider audience without emptying your wallet.
            It's your opportunity to get noticed without paying a fortune.
          </p>
        </div>
        <div className="w-full md:w-1/2 px-10">
          <Image
            src="https://images.unsplash.com/photo-1574540346054-8a91eb807cfb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg"
            width={1200}
            height={1200}
          />
        </div>
      </div>
    </section>
  );
}
