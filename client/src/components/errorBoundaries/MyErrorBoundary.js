import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./myerrorboundary.css";

class MyErrorBoundary extends React.Component {
  state = {
    errorMessage: "",
  };

  static getDerivedStateFromError(error) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error, info) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }

  // A fake logging service.
  logErrorToServices = console.log;

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="ErrorBoundaryCountainer">
          <ExclamationCircleOutlined
            style={{ fontSize: "100px", color: "#08c" }}
          />

          <p className="ErrorMassage">{this.state.errorMessage}</p>
          <p className="NotificationMassage">Please refresh the page!</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default MyErrorBoundary;
