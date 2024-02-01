export default function BlueButton(props: { children: React.ReactNode; onClick?: () => void }) {
  const { children, onClick } = props;
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded" onClick={onClick}>
      {children}
    </button>
  );
}
