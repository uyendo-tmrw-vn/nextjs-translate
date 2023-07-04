import React from "react";

import styles from "styles/TextInput.module.css";

interface TextInputProps {
  type: React.HTMLInputTypeAttribute;
  onChange: (input: string) => void;
  outline?: boolean;
  placeholder?: string;
}

function TextInput(props: TextInputProps) {
  const { outline, type, placeholder, onChange, ...rest } = props;

  return (
    <input
      type={type}
      className={`${styles.input} ${outline ? styles.outline : styles.normal}`}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

export default TextInput;
