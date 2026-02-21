export default function BadgeDemo() {
  return (
    <div className="flex gap-2 flex-wrap">
      <span className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white">
        Primary
      </span>
      <span className="px-3 py-1 text-sm rounded-full bg-green-600 text-white">
        Success
      </span>
      <span className="px-3 py-1 text-sm rounded-full bg-red-600 text-white">
        Error
      </span>
    </div>
  );
}
