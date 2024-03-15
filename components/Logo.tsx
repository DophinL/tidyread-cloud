import Image from "next/image";

export default function Logo(props: { withText?: boolean }) {
  const { withText = true } = props;
  return (
    <span className="flex align-middle">
      <Image src="/images/logo_with_text.svg" alt="" width={148} height={36} />
      {withText && <span className="font-slab mt-3 ml-3 text-lg">For Raycast</span>}
    </span>
  );
}
