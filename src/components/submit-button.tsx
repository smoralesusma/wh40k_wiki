import { Button, CircularProgress } from "@mui/material";
import { FC } from "react";

interface SubmitButtonProps {
  loading?: boolean;
  handleClick?: () => void;
}

const SubmitButton: FC<SubmitButtonProps> = ({ loading, handleClick }) => {
  return (
    <Button
      type={handleClick ? "button" : "submit"}
      onClick={handleClick ?? undefined}
      variant="outlined"
      startIcon={loading ? <CircularProgress size={24} /> : undefined}
    >
      Create
    </Button>
  );
};

export default SubmitButton;
