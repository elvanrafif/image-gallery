import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "react-modal-image";

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
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
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
  const imgClassName = `duration-700 ease-in-out group-hover:opacity-75 shadow-xl ${imgAnimate}`;

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
      </div>
      <a href={image.href} target="_blank" rel="noreferrer">
        <h3 className="font-fancy mt-4 text-xs text-gray-700">
          @{image?.username}
        </h3>
        <p className="font-fancy text-md font-bold text-gray-900">
          {image?.name}
        </p>
      </a>
      {isOpen && (
        <Lightbox
          small={image.imageSrc}
          large={image.imageSrc}
          onClose={toggleModal}
          hideZoom
        />
      )}
    </div>
  );
}
