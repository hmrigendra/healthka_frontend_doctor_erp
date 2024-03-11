import { useState } from "react";

// Define InputValidation as a custom hook
export default function useInputValidation(values: any) {
  // Define state for errors
  const [errors, setErrors] = useState({});

  // Regular expressions for validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  const phonePattern = /^\d{10}$/;

  // Validate input values
  if (values.patient_name === "") {
    // Update errors state for patient_name field
    setErrors((prevErrors) => ({
      ...prevErrors,
      patient_name: "Name is Required",
    }));
  }

  if (values.email === "") {
    setErrors((previous) => ({
      ...previous,
      email: "Email is Required",
    }));
  }
  if (!emailPattern.test(values.email)) {
    setErrors((previous) => ({
      ...previous,
      email: "Email is not correct",
    }));
  }
  if (!phonePattern.test(values.phone_number)) {
    setErrors((previous) => ({
      ...previous,
      phone_number: "Phone number must have 10 numbers",
    }));
  }
  if (values.password === "") {
    setErrors((previous) => ({
      ...previous,
      password: "Password is required",
    }));
  } else if (!passwordPattern.test(values.password)) {
    setErrors((previous) => ({
      ...previous,
      password:
        "Password needs at least 1 lowercase, 1 uppercase, 1 number, one symbol, and minimum 8 characters",
    }));
  }
  if (values.age === "") {
    setErrors((previous) => ({
      ...previous,
      age: "Age is required",
    }));
  }
  if (values.gender === "") {
    setErrors((previous) => ({
      ...previous,
      gender: "Gender is required",
    }));
  }

  return errors;
}
