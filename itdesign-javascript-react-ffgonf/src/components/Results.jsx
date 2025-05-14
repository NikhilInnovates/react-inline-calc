import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export const Results = ({ currentResult, history, onClearHistory }) => (
  <Card sx={{ marginTop: 2 }}>
    <CardContent>
      {/* Main result output - now contains all testable content */}
      <Typography 
        variant="h5" 
        gutterBottom
        data-testid="results"  // Move test ID here
      >
        {currentResult || "No calculation yet"}
      </Typography>
      
      {/* History section (separate from main result) */}
      {history.length > 0 && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Calculation History
          </Typography>
          <Button 
            variant="outlined" 
            onClick={onClearHistory}
            sx={{ mb: 2 }}
          >
            Clear History
          </Button>
          <List dense>
            {history.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </CardContent>
  </Card>
);