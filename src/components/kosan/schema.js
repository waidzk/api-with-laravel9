import * as Yup from "yup";

export const kosanSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Minimal 4 character')
      .max(254, 'Maximum 254 character')
      .required('Name is required'),
    description: Yup.string()
      .min(10, 'Minimal 10 character')
      .max(300, 'Maximum 300 character')
      .required('Description is required'),
    place: Yup.string()
      .required('place is required'),
  });
