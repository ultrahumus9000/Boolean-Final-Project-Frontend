import React, { useState } from "react";
import { Button } from "@material-ui/core";

export default function Profile() {
  const [editable, setEditable] = useState(false);

  function toggleEdit() {
    console.log("edit");
    setEditable(true);
  }
  return (
    <div className="profile">
      <div className="profile-container">
        <textarea
          rows={1}
          cols={35}
          className="username profile-input"
          contentEditable="true"
        >
          Username will go here
        </textarea>
        <textarea
          rows={10}
          cols={35}
          className="bio profile-input"
          contentEditable="true"
        >
          Bio will go here
        </textarea>
        <Button variant="contained" color="secondary">
          {" "}
          Save
        </Button>
        <p> Delete Account?</p>
      </div>
    </div>
  );
}
