export default function Footer() {
  return (
    <footer className="bg-shadedark max-w flex text-white shadow-md">
      <div className="container mx-auto text-center">
        <div className="pt-32">
          <h1 className="text-5xl">Don't be shy. Say hi 👋</h1>
          <p className="text-2xl  py-6">
            Lorem Ipsum Dolor Lit 
          </p>
        </div>
        <div className="flex justify-start items-start">
          <ul className="list-reset flex pt-16 pb-16">
            <li className="mr-8">
              <a href="#">
                <h2 className="text-3xl text-bold text-bgprimary hover:text-bgsecondary">AudioPitch</h2>
              </a>
            </li>
            <li className="mr-8 mt-2">
              <a
                className="text-textcolor hover:underline"
                href="#"
              >
                Terms of Use
              </a>
            </li>
            <li className="mr-8 mt-2">
              <a
                className="text-textcolor hover:underline"
                href="#"
              >
                Privacy
              </a>
            </li>
          </ul>

          <ul className="list-reset flex pt-16 pb-16 ml-auto">
            <li className="mr-8">
              <a
                className="text-textcolor hover:underline"
                href="#"
              >
                Instagram
              </a>
            </li>
            <li className="mr-8">
              <a
                className="text-textcolor hover:underline"
                href="#"
              >
                Mail
              </a>
            </li>
            <li className="mr-8">
              <a
                className="text-textcolor hover:underline"
                href="#"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
