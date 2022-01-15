import { useEffect, useRef, useCallback } from "react";
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
  const { customId, name, address, query, focus, index, setFocus } = props;
  const queryFound =
    customId.includes(query) || name.includes(query) || address.includes(query);

  const ref = useRef(null);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      ref.current.focus();
    }
  }, [focus]);

  const handleSelect = useCallback(() => {
    alert(`${name}`);
    // setting focus to that element when it is selected
    setFocus(index);
  }, [name, index, setFocus]);

  return (
    <div
      className="card-container"
      tabIndex={focus ? 0 : -1}
      role="button"
      ref={ref}
      onClick={handleSelect}
      onKeyPress={handleSelect}
    >
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
