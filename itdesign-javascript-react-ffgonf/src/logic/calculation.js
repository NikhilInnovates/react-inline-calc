export default class Calculation {
    constructor(expression) {
      this.expression = expression || "";
    }
  
    calculate(inputExpression) {
      try {
        const expression = inputExpression || this.expression;
        const trimmedExpr = expression.trim();
        if (!trimmedExpr) return undefined;
  
        if (!/^[\d\s+\-*/.]+$/.test(trimmedExpr)) return undefined;

  
        const tokens = trimmedExpr.split(/([+\-*/])/).filter(token => token.trim() !== '');
        
        if (tokens.length === 1) {
          const num = parseFloat(tokens[0]);
          return isNaN(num) ? undefined : num; 
        }
  
        if (tokens.length < 3 || tokens.length % 2 === 0) return undefined;
  
        const firstPass = [];
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          
          if (token === '*' || token === '/') {
            const prev = parseFloat(firstPass.pop());
            const next = parseFloat(tokens[++i]);
            if (isNaN(prev) || isNaN(next)) return undefined;
            
            const result = token === '*' ? prev * next : prev / next;
            firstPass.push(result);
          } else {
            firstPass.push(token);
          }
        }
  
        let result = parseFloat(firstPass[0]);
        if (isNaN(result)) return undefined;
        
        for (let i = 1; i < firstPass.length; i += 2) {
          const op = firstPass[i];
          const num = parseFloat(firstPass[i + 1]);
          if (isNaN(num)) return undefined;
          
          switch (op) {
            case '+': result += num; break;
            case '-': result -= num; break;
            default: return undefined;
          }
        }
  
        if (!isFinite(result)) return undefined;
        return result; 
      } catch (error) {
        return undefined;
      }
    }
  }