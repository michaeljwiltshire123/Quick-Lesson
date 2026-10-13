import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class GridlockErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Gridlock error caught:', error, errorInfo);
  }

  private handleReset = () => {
    sessionStorage.removeItem('attached_gridlock_game');
    this.setState({ hasError: false, errorMessage: '' });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 space-y-3 my-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="font-black text-sm uppercase">GridLock Ready to Initialise</h3>
          </div>
          <p className="text-xs text-amber-800">
            A temporary layout issue occurred while rendering the 5x5 hexagon board.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="py-2 px-4 bg-[#2D2A26] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-black"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset 5x5 Board</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
