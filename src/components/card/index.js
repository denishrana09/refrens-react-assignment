export const Card = (props) => {
  const { key, name, address } = props;

  return (
    <div className="card-container">
      <p>{key}</p>
      <h3>{name}</h3>
      <div>{address}</div>
    </div>
  );
};
