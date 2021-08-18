import React from "react";
import { Card } from "antd";

class example extends React.Component {
  state = {
    loading: true,
    reload: 0,
  };
  reload = () => {
    this.setState({
      reload: this.state.reload + 1,
    });
  };
  render() {
    return (
      <Card
        className="MainCard"
        title={this.props.title}
        loading={this.props.loading}
        extra={<a href={this.props.extraUrl}>{this.props.extra}</a>}
      >
        <div className="MainCardBody">{this.props.children}</div>
        <div className="MainCardFooter" show={this.props.footer ? 1 : 0}>
          {this.props.footer}
        </div>
      </Card>
    );
  }
}

export default example;
