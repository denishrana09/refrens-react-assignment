export const Card = (props) => {
  const { customId, name, address } = props;

  return (
    <div className="card-container">
      <div>{customId}</div>
      <h3>{name}</h3>
      <div>{address}</div>
      {/* todo: john found in items */}
    </div>
  );
};
