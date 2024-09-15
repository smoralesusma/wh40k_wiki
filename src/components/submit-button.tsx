import { Button, CircularProgress } from "@mui/material";
import { FC } from "react";

interface SubmitButtonProps {
  buttonText?: string;
  loading?: boolean;
  handleClick?: () => void;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  loading,
  buttonText = "Create",
  handleClick,
}) => {
  return (
    <Button
      type={handleClick ? "button" : "submit"}
      onClick={handleClick ?? undefined}
      variant="outlined"
      startIcon={loading ? <CircularProgress size={24} /> : undefined}
    >
      {buttonText}
    </Button>
  );
};

export default SubmitButton;
