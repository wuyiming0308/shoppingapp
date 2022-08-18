import styles from "./input.module.css";

const InputType = {
  INPUT: 1,
  TEXTAREA: 2,
};

const Input = (props) => {
  const { htmlFor, label, errorMessage, width, inputType } = props;

  const getInputType = (type) => {
    switch (type) {
      case InputType.INPUT:
        return <TextInput {...props} />;
      case InputType.TEXTAREA:
        return <TextArea {...props} />;
      default:
        return <div></div>;
    }
  };

  return (
    <div className={styles.InputContainer} style={{ width: width }}>
      <label htmlFor={htmlFor} className={styles.InputLable}>
        {label}
      </label>

      {getInputType(inputType)}
      <span className={styles.ErrorMsg}>
        {errorMessage !== "" ? errorMessage : undefined}
      </span>
    </div>
  );
};

const TextInput = (props) => {
  const { placeholder, onChange, value, type } = props;

  return (
    <input
      type={type}
      className={styles.InputBox}
      placeholder={placeholder}
      onChange={onChange}
      value={value || ""}
    />
  );
};
const TextArea = (props) => {
  const { placeholder, onChange, value } = props;
  return (
    <textarea
      type="text"
      className={styles.TextArea}
      onChange={onChange}
      placeholder={placeholder}
      value={value || ""}
    />
  );
};
const InputButton = (props) => {
  const { label, placeholder, onChange, value, width, button, onClick } = props;
  return (
    <div className={styles.InputContainer} style={{ width: width }}>
      <label className={styles.InputLable}>{label}</label>
      <div className={styles.InputButton}>
        <input
          className={styles.InputButtonText}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value || ""}
        />
        <button onClick={onClick}>{button}</button>
      </div>
    </div>
  );
};

export { Input, InputType, InputButton };
