import _ from "lodash";

const Highlighted = ({ text = "", highlight = "" }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts
        .filter((part) => part)
        .map((part, i) =>
          regex.test(part) ? (
            <mark key={i}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
    </span>
  );
};

export const Card = (props) => {
  const { customId, name, address, query } = props;
  const queryFound =
    customId.includes(query) || name.includes(query) || address.includes(query);

  return (
    <div className="card-container">
      <h3 className="mt-0">{customId}</h3>
      <p className="text-light font-italic">
        {name.includes(query) ? (
          <Highlighted text={name} highlight={query} />
        ) : (
          name
        )}
      </p>
      {!queryFound && (
        <div className="text-light items">
          <span className="circle"></span>
          {`"${query}" found in items`}
        </div>
      )}
      <div className="text-light">
        {address.includes(query) ? (
          <Highlighted text={address} highlight={query} />
        ) : (
          address
        )}
      </div>
    </div>
  );
};
