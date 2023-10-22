import { useState } from "react";
import LoadingLogo from "../assets/LoadingLogo.png";

interface PropType {
  dataCheck: boolean;
  url: string;
  alt: string;
}

export default function ImageLazyLoading({ dataCheck, url, alt }: PropType) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <img
      src={dataCheck ? (isLoading ? LoadingLogo : url) : LoadingLogo}
      alt={alt}
      onLoad={() => setIsLoading(false)}
      loading="lazy"
    />
  );
}
