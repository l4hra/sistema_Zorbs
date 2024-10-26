import React from 'react';
import { Alert } from '@mui/material';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para renderizar uma interface alternativa
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Exibir mensagem de erro do ErrorBoundary
      return (
        <Alert severity="error">
          {this.props.errorMessage || this.state.error?.message || "Ocorreu um problema inesperado. Tente novamente mais tarde."}
        </Alert>
      );
    }

    return this.props.children; 
  }
}
