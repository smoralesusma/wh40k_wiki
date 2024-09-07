"use client";

import { useEffect, useState } from "react";
import { DocumentNode, useMutation } from "@apollo/client";

import SnackbarAlert from "@/src/components/snackbar-alert";
import { GraphQLQueryNames } from "@/lib/graphql/graphql-query-enums";
import { FCC } from "@/lib/types/tools.types";
import SubmitButton from "./submit-button";

interface MutationProps {
  queryString: DocumentNode;
  queryName: GraphQLQueryNames;
  variables?: any;
  successMessage?: string;
  errorMessage?: string;
  handleData: (data: any) => void;
  handleError: () => void;
}

const Mutation: FCC<MutationProps> = ({
  children,
  queryString,
  queryName,
  variables,
  successMessage = "Done!",
  errorMessage = "Something went wrong! Please try again.",
  handleData,
  handleError,
}) => {
  const [open, setOpen] = useState(false);
  const [addTodo, { data, loading, error }] = useMutation(queryString);

  useEffect(() => {
    if (data) handleData(data[queryName]);
    if (error) handleError();
    if (data || error) setOpen(true);
  }, [data, error]);

  const handleMutation = async () => {
    try {
      await addTodo({ variables });
    } catch {}
  };

  return (
    <>
      {children ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMutation();
          }}
        >
          {children}
          <SubmitButton loading={loading} />
        </form>
      ) : (
        <SubmitButton loading={loading} handleClick={handleMutation} />
      )}

      <SnackbarAlert
        open={open}
        setOpen={setOpen}
        message={`${error ? errorMessage : successMessage}`}
        severity={error ? "error" : "success"}
      />
    </>
  );
};

export default Mutation;
