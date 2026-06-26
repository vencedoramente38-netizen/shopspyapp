import React from 'react';

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl text-center">
          <h2 className="text-red-600 dark:text-red-400 font-bold mb-2">Algo deu errado.</h2>
          <p className="text-gray-600 dark:text-white/60 text-sm">Por favor, recarregue a página ou tente novamente.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
