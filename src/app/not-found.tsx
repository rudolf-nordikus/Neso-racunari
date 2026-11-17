import Image from "next/image";
import { Button, CallButton, WRAP } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="full-bleed relative overflow-hidden bg-navy-900">
      <Image src="/img/bg/hero.svg" alt="" aria-hidden fill unoptimized className="object-cover" />
      <div className={`${WRAP} relative grid items-center gap-6 pt-[110px] pb-12 md:min-h-[760px] md:grid-cols-[1.2fr_1fr]`}>
        <div className="flex flex-col items-start gap-5">
          <p className="text-[120px] leading-none text-white md:text-[200px]">404</p>
          <h1 className="max-w-[620px] text-[26px] leading-snug text-white md:text-[34px]">
            Ova stranica se pokvarila. Mi popravljamo samo računare.
          </h1>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <CallButton />
            <Button href="/" variant="dark">
              Na početnu
            </Button>
          </div>
        </div>
        <Image src="/img/3d/ekran.webp" alt="" width={380} height={380} className="mx-auto w-[60%] max-w-[380px]" />
      </div>
    </section>
  );
}
