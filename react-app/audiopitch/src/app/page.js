import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* 
          TODO fix responsiveness of web for phone. (Samsung Galaxy S20 Ultra and lower on chrome inspect)
      */}
      {/* 
          TODO fix session for non google log in (Problem with the MongoDBAdapter)
          TODO fix profile page (profile image(need AWS))
          TODO create admin functionality
          TODO curator and artists processes (how the message will be sent, how will the curatore receive payment, etc)
          TODO define what other pages are needed (terms of use, curator search page, coin transaction(kalo jadi pake) -> harus bikin cart, stripe, etc)
          TODO payment process
      */}
      <Header />
      <Hero />
      <HomeMenu />
      <section className="text-center py-16 bg-shade2">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-4xl mx-auto mt-8 flex flex-col gap-4">
          <div className="flex-container">
            <Image
              src="https://images.unsplash.com/photo-1558172307-38630645e7f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-lg shadow-3xl-1"
              width={350}
              height={350}
              alt="About 1"
            />
            <div className="pl-6">
              <h4 className="text-2xl text-gray-800 font-bold mb-3">
                Our Mission to Empower Music Creators
              </h4>
              <p className="text-left">
                At AudioPitch, we are passionate about empowering musicians and
                creators. Our mission is to provide a platform where aspiring
                artists can connect with influential playlist owners, curators,
                and fellow musicians. We believe in democratizing music
                promotion, making it accessible and affordable for all talented
                individuals striving to make their mark in the industry. We're
                here to amplify voices, foster connections, and propel careers
                forward.
              </p>
            </div>
          </div>
          <div className="flex-container">
            <div className="pr-6">
              <h4 className="text-2xl text-gray-800 font-bold mb-3">
                This is What We Stand for
              </h4>
              <p className="text-right">
                Audiopitch thrives on fostering a vibrant community where music
                enthusiasts and industry professionals converge. We are more
                than just a platform; we're a collaborative space dedicated to
                supporting artists on their musical journeys. With a commitment
                to integrity and transparency, we offer a space where artists
                can showcase their talent, discover new opportunities, and
                cultivate lasting connections.Join us in celebrating the
                artistry and diversity of music while making meaningful strides
                in the industry.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1597884650717-b168711a68dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-lg shadow-3xl-2"
              width={350}
              height={350}
              alt="About 2"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
