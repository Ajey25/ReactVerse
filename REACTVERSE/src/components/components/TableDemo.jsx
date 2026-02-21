export default function TableDemo() {
  const users = [
    { id: 1, name: "Aj", role: "Admin" },
    { id: 2, name: "Sam", role: "User" },
    { id: 3, name: "Riya", role: "User" },
  ];

  return (
    <table className="border-collapse border w-72 text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="border text-black  p-2">Name</th>
          <th className="border text-black p-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td className="border p-2">{u.name}</td>
            <td className="border p-2">{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
