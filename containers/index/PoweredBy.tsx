import Image from "next/image";

export default function PoweredBy() {
  return (
    <div className="flex flex-wrap gap-8">
      <Image className="mr-4" src="/images/raycast_logo.png" width={123 * 1.3} height={32 * 1.3} alt="" />
      <Image src="/images/openai_logo.png" width={130 * 1.3} height={32 * 1.3} alt="" />
      <Image src="/images/moonshot_logo.png" width={180 * 1.3} height={32 * 1.3} alt="" />
    </div>
  );
}
