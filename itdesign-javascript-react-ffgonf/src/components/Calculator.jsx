'use client';

import React, {useCallback, useState, useMemo} from "react";
import {ExpressionInput} from "./ExpressionInput";
import {Results} from "./Results";
import Calculation from "@/logic/calculation";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Calculator = () => {
  const [currentResult, setCurrentResult] = useState("");
  const [history, setHistory] = useState([]);
  const calculator = useMemo(() => new Calculation(), []);

  const calculateResult = useCallback((input) => {
    const trimmedInput = input.trim();
    const result = calculator.calculate(trimmedInput);
    
    if (result !== undefined) {
      const formattedExpr = trimmedInput
        .replace(/([+*/-])/g, ' $1 ')
        .replace(/\s+/g, ' ')
        .trim();
      
      const displayText = `${formattedExpr} = ${result.toFixed(2)}`;
      setCurrentResult(displayText);
      setHistory(prev => [displayText, ...prev]);
    } else {
      setCurrentResult("Wrong input!");
    }
  }, [calculator]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <Typography variant="h3">React Calculator</Typography>
      </Grid>
      <Grid item xs={12}>
        <ExpressionInput handleSubmit={calculateResult}/>
      </Grid>
      <Grid item xs={12}>
        <Results 
          currentResult={currentResult}
          history={history}
          onClearHistory={clearHistory}
        />
      </Grid>
    </Grid>
  );
};