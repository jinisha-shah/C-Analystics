import { useEffect, useState } from "react";

/**
 * custom form handle along with validation
 * @param {Function} callback
 * @param {Function} validate
 * @returns {{ handleSubmit: Function, handleChange: Function, values: Object, errors: Object, setValues: Function, imageChangeHandler: Function, openFileSystem: Function }}
 */
const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      validate && setErrors(validate(values));
      validate ? setIsSubmitting(true) : callback();
    }
  };
  const handleChange = (event) => {

    // console.log("handle change", event.target.name)
    setValues((preValues) => ({
      ...preValues,
      [event.target.name]: event.target.value,
    }));
    setErrors((preErrors) => ({ ...preErrors, [event.target.name]: "" }));
  };
  const imageChangeHandler = (event, value, info) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        value &&
          setValues((preValues) => ({
            ...preValues,
            [value]: e.target.result,
          }));
        info &&
          setValues((preValues) => ({
            ...preValues,
            [info]: event.target.files[0],
          }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const openFileSystem = (event, ref) => {
    event.preventDefault();
    ref.click();
  };
  return {
    handleSubmit,
    handleChange,
    values,
    setValues,
    errors,
    setErrors,
    openFileSystem,
    imageChangeHandler,
  };
};
export default useForm;
