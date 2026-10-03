import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // In a real production app, you would log this to Sentry or LogRocket here.
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 font-mono text-center">
          <div className="w-12 h-12 mb-6 border border-red-500/30 flex items-center justify-center text-red-500 rounded-sm bg-red-500/10">
            !
          </div>
          <h2 className="text-red-500 text-xl tracking-[0.2em] mb-4">SYSTEM FAULT DETECTED</h2>
          <p className="text-gray-400 mb-8 max-w-md text-xs leading-relaxed tracking-wider">
            An unexpected error occurred in the application layer. The UI has been suspended to prevent instability.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="border border-white/20 px-8 py-4 text-xs tracking-widest hover:border-vdev-gold hover:text-vdev-gold transition-colors uppercase bg-black/50"
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
