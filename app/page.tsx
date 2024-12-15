import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full h-full flex justify-center bg-slate-900 mx-auto">
      <div className="w-full h-full flex justify-center relative">
        <Image
          src="/christmasGameBG.png"
          alt="/"
          width={1920}
          height={1000}
          unoptimized
          className="w-full lg:w-2/4 h-full"
        />
      </div>

      <div>
        <Image
          src="/houses/house1.png"
          alt="House1"
          width={600}
          height={400}
          className="w-[255px] top-[315px] -right-[35px] md:w-[525px] md:top-[660px] md:-right-[74px] lg:w-[585px] lg:top-[695px] lg:right-[380px] absolute hover:scale-110 duration-300 ease-in-out"
        />
      </div>
      <div>
        <Image
          src="/houses/house2.png"
          alt="House2"
          width={600}
          height={400}
          className="w-[300px] top-[403px] -left-[50px] md:w-[610px] md:top-[844px] md:-left-[98px] lg:w-[650px] lg:top-[900px] lg:left-[374px] absolute hover:scale-110 duration-300 ease-in-out"
        />
      </div>
    </section>
  );
}
