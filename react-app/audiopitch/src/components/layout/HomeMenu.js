export default function HomeMenu() {
  return (
    <section className="container mx-auto px-6 p-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Artoo!</h2>
      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2 pr-10">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">Vortex</h4>
          <p className="text-gray-600 mb-8">
            Their primary target will be the power generators. Prepare to open
            the shield. Sir, Rebel ships are coming into our sector. Good. Our
            first catch of the day. Stand by, ion control....Fire! The first
            transport is away.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            className="rounded-lg"
            src="https://pbs.twimg.com/media/CR45LOXVEAADG5E.jpg"
            alt="Vortex"
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2">
          <img
            className="rounded-lg"
            src="https://www.thesun.co.uk/wp-content/uploads/2019/06/SWJFO-EAPlay-08-1.jpg"
            alt="use the force"
          />
        </div>
        <div className="w-full md:w-1/2 pl-10">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">Use the Force!</h4>
          <p className="text-gray-600 mb-8">
            We'll never get it out now. So certain are you. Always with you it
            cannot be done. Hear you nothing that I say? Master, moving stones
            around is one thing. This is totally different. No! No different!
          </p>
        </div>
      </div>
      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2 pr-10">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">Life creates it</h4>
          <p className="text-gray-600 mb-8">
            There is no try. I can't. It's too big. Size matters not. Look at
            me. Judge me by my size, do you? Hm? Mmmm. And well you should not.
            For my ally in the Force. And a powerful ally it is.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            className="rounded-lg"
            src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Ferikkain%2Ffiles%2F2018%2F01%2FRey-Luke.jpg"
            alt="Syncing"
          />
        </div>
      </div>
    </section>
  );
}
