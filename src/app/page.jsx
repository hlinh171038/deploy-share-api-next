import Feed from "@/components/Feed"

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="flex justify-center">
        <div>
          <p className="text-center text-slate-950 font-bold text-xl">Discover & Share</p>
          <br className="max-md:hidden"/>
          <span className="orange_gradient"> AI-Powered Prompts</span>
        </div>
      </h1>
      <p className="desc text-center">
        Proptopia is an open-source AI prompting tool for modern world to discover, 
        create and share creative prompts.
      </p>
      <Feed />
    </section>
  )
}
