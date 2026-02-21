export default function CardDemo() {
  return (
    <div className="w-64 border rounded-lg shadow p-4 space-y-2">
      <h3 className="font-semibold text-lg">Product Card</h3>
      <p className="text-sm text-gray-600">
        This is a simple card used to show some information.
      </p>
      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
        View More
      </button>
    </div>
  );
}
