import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return (
      <>
        {this.state.hasError ? (
          <>
            <h1>Looks like something went wrong.</h1>
            <p>Please try again later.</p>
          </>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}

export default ErrorBoundary;
