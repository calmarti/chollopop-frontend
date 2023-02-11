import { useState } from "react";


export default function useForm(initialValue) {
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (ev) => {
    const type = ev.target.type;
    switch (type) {
      case "text":
      case "number":
      case "textarea":
      case "select":
      case "file":
        console.log(ev.target.type);
        console.log(ev.target.value);
        setFormValue((currentValue) => ({
          ...currentValue,
          [ev.target.name]: ev.target.value,
        }));
        break;
      case "select-multiple":
        let selected = Array.from(ev.target.selectedOptions);
        selected = selected.map((option) => option.value);
        setFormValue((currentValue) => ({
          ...currentValue,
          [ev.target.name]: selected,
        }));
        break;

      case "radio":
        if (ev.target.value === "all") {
          setFormValue((currentValue) => ({
            ...currentValue,
            [ev.target.name]: ev.target.value,
          }));
        } else {
          setFormValue((currentValue) => ({
            ...currentValue,
            [ev.target.name]: ev.target.value === "true" ? true : false,
          }));
        }
        break;
      case "checkbox":
        setFormValue((currentValue) => ({
          ...currentValue,
          [ev.target.name]: ev.target.value === "false" ? true : false,
        }));
        break;
      default:
        setFormValue((currentValue) => ({
          ...currentValue,
          [ev.target.name]: ev.target.value,
        }));
    }
  };

  return {
    formValue,
    setFormValue,
    handleChange,
  };
}
