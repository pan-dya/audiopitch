import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero bg-shade2">
      <div className="py-16">
        {/* TODO change lorem ipsum... to motto / other text */}
        <h1 className="text-4xl font-semibold leading-normal">
          Empowering Musicians
          <br />
          with&nbsp;
          <span className="text-primary">AudioPitch</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm">
          Discover a collaborative space dedicated to supporting artists on
          their musical journeys. Join us today and elevate your music career!
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary flex justify-center items-center uppercase gap-3 w-auto text-textcolor px-4 py-2 rounded-full hover:bg-primarylighter hover:text-textcolorl transition-all">
            Get Started <Right />
          </button>
          <button className=" border-none text-gray-400 w-auto px-4 py-2 hover:text-gray-600">
            Learn More
          </button>
        </div>
      </div>

      <div className="relative">
        <Image
          src={"/imagehero.png"}
          layout={"fill"}
          objectFit="contain"
          // width={400}
          // height={400}
          alt={"Hero Image"}
          priority={true}
        />
      </div>
    </section>
  );
}
