import React from "react";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";

export const CustomSeo = () => {
  const { pathname } = useRouter();
  return (
    <DefaultSeo
      title="Manchester United Gallery"
      description="Manchester United Gallery. Twitter collection of free manchester united's family content. "
      openGraph={{
        type: "website",
        locale: "en",
        url: pathname,
        siteName: "Manchester United Gallery",
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
};
