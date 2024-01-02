export default function InfoBox({ children }) {
  return (
    <div className="text-center bg-cyan-100 p-4 rounded-lg border-4 border-cyan-200">
      {children}
    </div>
  );
}
