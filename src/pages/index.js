import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Lightbox } from "react-modal-image";
import FOGS from "vanta/dist/vanta.fog.min";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function getStaticProps() {
  const { data } = await supabaseAdmin
    .from("images")
    .select("*")
    .order("id", { ascending: false });
  return {
    props: {
      images: data,
    },
  };
}

export default function Gallery({ images }) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOGS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xff0000,
          midtoneColor: 0x917575,
          lowlightColor: 0x505050,
          baseColor: 0x0,
          speed: 0.5,
          zoom: 1.3,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={myRef} className="py-6">
      <div className="mx-auto max-w-2xl py-8 px-8 sm:py-8 sm:px-8 lg:max-w-7xl lg:px-8 glassbox">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <BlurImage key={image.id} image={image} />
          ))}
        </div>
      </div>
      <p className="text-center my-4 text-xs text-gray-200">
        built with ❤️ by Muhammad Elvan Rafif - 2023
      </p>
    </div>
  );
}

function BlurImage({ image }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const toggleModal = () => setIsOpen((p) => !p);

  const imgAnimate = isLoading
    ? "scale-110 blur-2xl grayscale"
    : "scale-100 blur-0 grayscale-0";
  const imgClassName = `duration-700 ease-in-out bg-black group-hover:opacity-70 shadow-xl ${imgAnimate}`;

  return (
    <div className="group">
      <div
        onClick={toggleModal}
        className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
      >
        <Image
          alt=""
          src={image.imageSrc}
          fill
          style={{ objectFit: "cover", cursor: "zoom-in" }}
          className={imgClassName}
          onLoadingComplete={() => setLoading(false)}
        />
        {isOpen && (
          <Lightbox
            large={image.imageSrc}
            onClose={toggleModal}
            hideZoom
          />
        )}
      </div>
      <a href={image.href} target="_blank" rel="noreferrer">
        <h3 className="mt-4 text-xs text-gray-200">@{image?.username}</h3>
        <p className="text-md font-bold text-gray-200">{image?.name}</p>
      </a>
    </div>
  );
}
