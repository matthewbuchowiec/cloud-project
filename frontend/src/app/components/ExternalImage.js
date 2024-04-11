import Image from "next/image";

const ExternalImage = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={true}
      // layout="fill"
      // objectFit="cover"
      width={600}
      height={400}
    />
  );
};
export default ExternalImage;
