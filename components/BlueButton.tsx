"use client";
export default function BlueButton(props: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const { children, href, onClick } = props;
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
      onClick={() => {
        if (href) {
          window.open(href);
          return;
        }
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
