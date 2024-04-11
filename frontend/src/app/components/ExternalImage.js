import Image from "next/image";

const ExternalImage = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={true}
      layout="fill"
      objectFit="cover"
    />
  );
};
export default ExternalImage;
