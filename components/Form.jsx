import { Box, Button } from "@mui/material";

export default function Form({
  children, action, id, buttonText, onSubmit, method = "POST", renderSubmitButton = true
}) {
  return (
    <form action={action} method={method} encType="multipart/form-data" onSubmit={onSubmit} id={id}>

      {children}
      {renderSubmitButton && (
        <Button fullWidth type="submit" color="success" aria-label="login" variant="contained" size="large">
          {buttonText}
        </Button>
      )}
    </form>
  );
}
