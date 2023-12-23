import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero bg-shade2">
      <div className="py-16">
        {/* TODO change lorem ipsum... to motto / other text */}
        <h1 className="text-4xl font-semibold leading-normal">
          Lorem Ipsum
          <br />
          Dolor Lit&nbsp;
          <span className="text-primary">AudioPitch</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm">
          lorem ipsum dolor lit asdgasdfasodjfajsidojfoaisdjfasodifajsdf asdf
          asdfasdf asd fas dfas dfasdf
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary flex items-center gap-5 text-textcolor px-4 py-2 rounded-full hover:bg-primarylighter hover:text-textcolorl transition-all">
            Get Started <Right />
          </button>
          <button className="text-gray-400 px-4 py-2 hover:text-gray-600">Learn More</button>
        </div>
      </div>

      <div className="relative">
        {/* TODO change next.svg to another image */}
        <Image
          src={"next.svg"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"image"}
        />
      </div>
    </section>
  );
}
