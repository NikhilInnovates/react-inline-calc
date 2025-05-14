import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

export const ExpressionInput = ({ handleSubmit }) => {
  const [expression, setExpression] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitExpression();
    }
  };

  const submitExpression = () => {
    if (expression.trim()) {
      handleSubmit(expression.trim());
      setExpression(""); // Clear input after submission
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <TextField
          fullWidth
          label="Enter expression (e.g., 2+3*4)"
          variant="outlined"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyPress={handleKeyPress}
          inputProps={{ "data-testid": "expression-input" }}
        />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={submitExpression}
          disabled={!expression.trim()}
          data-testid="submit-button"
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};