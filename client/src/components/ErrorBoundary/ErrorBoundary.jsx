import React from 'react';
import { Alert } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para renderizar uma interface alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Exibir mensagem de erro do ErrorBoundary
      return (
        <Alert severity="error">
          {this.props.errorMessage || "Ocorreu um problema inesperado. Tente novamente mais tarde."}
        </Alert>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;