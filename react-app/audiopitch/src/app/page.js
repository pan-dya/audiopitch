import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      {/* 
          TODO Hero text and image
          TODO HomeMenu text and image
          TODO Our story, about us section text
          TODO fix responsiveness of web for phone. (Samsung Galaxy S20 Ultra and lower on chrome inspect)
      */}
      {/* 
          TODO finish profile page (profile image, other stuff)
          TODO create admin functionality
          TODO curator and artists processes (how the message will be sent, how will the curatore receive payment, etc)
          TODO define what other pages are needed (terms of use, curator search page, coin transaction(kalo jadi pake) -> harus bikin cart, API buat payment, etc)
          TODO payment process
      */}
      <Header />
      <Hero />
      <HomeMenu />
      <section className="text-center py-16 bg-shade2">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem Ipsum asdfasd asd fasd fasd,a sdfa sdfkasdfa sdf,asd
            fasdkfasdfasd fasd fasdf,asd fasdkf a
          </p>
          <p>
            Lorem Ipsum asdfasd asd fasd fasd,a sdfa sdfkasdfa sdf,asd
            fasdkfasdfasd fasd fasdf,asd fasdkf a
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
