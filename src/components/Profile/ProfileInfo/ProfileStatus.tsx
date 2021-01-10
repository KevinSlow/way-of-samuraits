import React, { ChangeEvent } from "react";

type ProfileStatusType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};

type ProfileStatusStateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<
  ProfileStatusType,
  ProfileStatusStateType
> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(
    prevProps: ProfileStatusType,
    prevState: ProfileStatusStateType,
    snapshot?: any
  ) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
    console.log("componentDidUpdate");
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "No Status"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
