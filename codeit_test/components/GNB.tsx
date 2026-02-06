import Image from "next/image";

/**
 * 서비스 전역에서 사용되는 GNB 컴포넌트
 * 로고 클릭 시 홈 화면으로 이동한다.
 */
const GNB = () => {
  return (
    <div className="mx-auto max-w-300 py-2 px-4 flex items-center">
      <a href="/">
        <Image
          src="/images/logoSmall.png"
          alt="logo"
          width={70}
          height={40}
          className="block md:hidden"
        />

        <Image
          src="/images/logoLarge.png"
          alt="logo"
          width={151}
          height={40}
          className="hidden md:block"
        />
      </a>
    </div>
  );
};

export default GNB;
