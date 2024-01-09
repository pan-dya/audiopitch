export default function Footer() {
  return (
    <footer className="bg-shadedark text-white py-8">
      <div className="container mx-auto flex items-center justify-between h-full">
        <p className="text-sm ml-4">&copy; 2024 Audiopitch. All Rights Reserved.</p>
        <div className="mr-4">
          <a href="#" className="mx-2 hover:text-gray">
            Terms of Service
          </a>
          <a href="#" className="mx-2 hover:text-gray">
            Privacy
          </a>
          <a href="#" className="mx-2 hover:text-gray">
            Contact Us
          </a>
          <a href="#" className="mx-2 hover:text-gray">
            Our Services
          </a>
        </div>
      </div>
    </footer>
  );
}
