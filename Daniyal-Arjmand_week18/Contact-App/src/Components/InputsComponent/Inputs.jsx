import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContacts } from "../../context/Context";
import { contactSchema } from "../../utils/validationSchema";

import FormBanner from "./FormBanner";
import FormFields from "./FormFields";
import FormActions from "./FormActions";

const INITIAL_FORM_STATE = {
  Name: "",
  LastName: "",
  Email: "",
  Phone: "",
  Category: "",
  Gender: "",
};

const Inputs = () => {
  const { state, dispatch, saveContact } = useContacts();
  const { contactEdit } = state;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitted },
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (contactEdit) {
      reset(contactEdit);
    } else {
      reset(INITIAL_FORM_STATE);
    }
  }, [contactEdit, reset]);

  const onSubmit = async (data) => {
    const payload = { ...data, id: contactEdit ? contactEdit.id : undefined };
    await saveContact(payload);
    setTimeout(() => reset(INITIAL_FORM_STATE), 2500);
  };

  const closeHandler = () => {
    dispatch({ type: "TOGGLE_FORM" });
  };

  return (
    <div>
      <FormBanner
        isSubmitSuccessful={isSubmitSuccessful}
        errors={errors}
        isValid={isValid}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormFields
          register={register}
          errors={errors}
          watch={watch}
          isSubmitted={isSubmitted}
        />
        <FormActions onClose={closeHandler} />
      </form>
    </div>
  );
};

export default Inputs;
