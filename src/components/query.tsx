"use client";

import { FC, useEffect, useState } from "react";
import { ApolloError, DocumentNode, useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";

import { GraphQLQueryNames } from "../../lib/graphql/graphql-query-enums";
import SnackbarAlert from "@/src/components/snackbar-alert";

interface QueryProps {
  queryString: DocumentNode;
  queryName: GraphQLQueryNames;
  variables?: any;
  successMessage?: string;
  errorMessage?: string;
  handleData: (data: any) => void;
  handleError: (error: ApolloError) => void;
}

const Query: FC<QueryProps> = ({
  queryString,
  queryName,
  variables,
  successMessage = "Done!",
  errorMessage = "Something went wrong! Please try again.",
  handleData,
  handleError,
}) => {
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(queryString, { variables });

  useEffect(() => {
    if (data) handleData(data[queryName]);
    if (error) handleError(JSON.parse(JSON.stringify(error)));
    if (data || error) setOpen(true);
  }, [data, error]);

  if (loading) return <CircularProgress />;

  return (
    <SnackbarAlert
      open={open}
      setOpen={setOpen}
      message={`${error ? errorMessage : successMessage}`}
      severity={error ? "error" : "success"}
    />
  );
};

export default Query;
