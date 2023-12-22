import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero bg-darker1">
      <div className="py-16">
        <h1 className="text-4xl font-semibold leading-normal">
          Lorem Ipsum Dolor Lit&nbsp;
          <span className="text-primary">AudioPitch</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm">
          lorem ipsum dolor lit asdgasdfasodjfajsidojfoaisdjfasodifajsdf asdf
          asdfasdf asd fas dfas dfasdf
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary flex items-center gap-5 text-white px-4 py-2 rounded-full hover:bg-lighter1 transition-all">
            Get Started <Right />
          </button>
          <button className="text-gray-400 px-4 py-2">Learn More</button>
        </div>
      </div>

      <div className="relative">
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
