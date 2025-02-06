function MyComponent() {
  const handleClick = () => {
    alert("Button clicked");
  };

  return (
    <div>
      <button onClick={handleClick}>Press me</button>
    </div>
  );
}
export default MyComponent;
