"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { profileNameSchema } from "../_data/profile-name.schema";
export function useProfileForm({
  user
}) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    resolver: zodResolver(profileNameSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name
    }
  });
  const startEdit = useCallback(() => {
    form.reset({
      name: user.name
    });
    setIsEditing(true);
  }, [form, user.name]);
  const cancelEdit = useCallback(() => {
    form.reset({
      name: user.name
    });
    setIsEditing(false);
  }, [form, user.name]);
  const onSubmit = useCallback(form.handleSubmit(data => {
    console.log("Profile form submitted:", data);
    setIsEditing(false);
  }), [form]);
  return {
    form,
    isEditing,
    startEdit,
    cancelEdit,
    onSubmit
  };
}