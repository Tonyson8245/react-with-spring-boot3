function MyTable() {
  const data = [
    { id: 1, name: "Ford", model: "Mustang" },
    { id: 2, name: "VW", model: "Beetel" },
    { id: 3, name: "Tesla", model: "Model S" },
  ];
  return (
    <>
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.model}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default MyTable;
