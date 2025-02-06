function MyComponent() {
  const handleClick = (event) => {
    event.preventDefault();
    alert("Form submit");
  };

  return (
    <>
      <form onSubmit={handleClick}>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
export default MyComponent;
