import { useState } from "react";

// Este hook altera os inputs do form e seta os valores do form conforme os inputs.

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  return { form, onChange };
};

export default useForm;
