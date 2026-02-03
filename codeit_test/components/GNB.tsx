import Image from "next/image";
import Link from "next/link";

const GNB = () => {
  return (
    <div className="mx-auto max-w-300 py-2 px-4 flex items-center">
      <Link href="/">
        <Image src="/images/logoLarge.png" alt="logo" width={151} height={40} />
      </Link>
    </div>
  );
};

export default GNB;
