import React, {useState} from "react";
import {Button} from "react-bootstrap";

const DotActions = () => {
  let [isOpenDotAction, setIsOpenDotAction] = useState(false);

  const handleDotActionToggle = (e) => {
    // document.addEventListener('click', () => setIsOpenDotAction(isOpenDotAction = false));
    setIsOpenDotAction(!isOpenDotAction);
  };

  return (
    <>
      <div className="dot-actions">
        <Button className="btn-toggle-actions"
                onClick={e => handleDotActionToggle(e)}
                size="sm" variant="default">
          <span className="ac-dot"/>
          <span className="ac-dot"/>
          <span className="ac-dot"/>
        </Button>

        {isOpenDotAction && <div className="dropdown-actions">
          <ul className="action-items">
            <li>
              <button className="action-btn">Block</button>
            </li>
            <li>
              <button className="action-btn">Delete</button>
            </li>
          </ul>
        </div>}
      </div>
    </>
  )
};

export default DotActions;