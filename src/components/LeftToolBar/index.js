import React, { useContext, useEffect } from "react";
import { GlobPreference } from "../../App";
import {
  getBody,
  moveUpDown,
  deleteElement,
  setVirtualElement,
} from "../../utils/common";
import ElementsList from "./ElementsList";
import TreeItem from "./TreeItems";

function LeftToolBar() {
  const glob_context = useContext(GlobPreference);

  useEffect(() => {
    setVirtualElement(getBody()._id, getBody());
  }, [getBody()]);

  return (
    <div className="left-toolbar toolbar">
      <div className="toolbar-inner">
        {/* <!-- Elements Selector Block --> */}
        <div className="toolbar-block element-container">
          <ElementsList />
        </div>
        {/* <!-- Elements Selector Block end--> */}

        {/* <!-- tree block --> */}
        <div className="toolbar-block tree-container">
          {/* <!-- tree --> */}
          <div
            className="elements-wrapper"
            onMouseLeave={(e) => {
              glob_context.sethashmap((s) => {
                return { ...s, overlay_id: null };
              });
              //   console.log(item);
            }}
          >
            {/* <!-- start (this block is being generated by javascript)--> */}
            <div
              className={
                "pl-none element" +
                (glob_context.hashmap.active_id === getBody()._id
                  ? " active"
                  : "")
              }
              id="body-tree"
            >
              <div
                className="name"
                onClick={(e) => {
                  glob_context.sethashmap((s) => {
                    return {
                      ...s,
                      active_id: getBody()._id,
                    };
                  });
                }}
                onMouseEnter={(e) => {
                  glob_context.sethashmap((s) => {
                    return { ...s, overlay_id: getBody()._id };
                  });
                }}
              >
                <i className="fas fa-caret-down"></i>
                <i className="far fa-hashtag"></i>
                <span>body</span>
              </div>
              <TreeItem childrens={getBody().childrens} />
            </div>
          </div>
        </div>
        {/* <!-- tree block end --> */}

        {/* <!-- Live Output of Generated Css --> */}
        <div className="toolbar-block output-css-container">
          <code className="css-code-output"></code>
        </div>

        {/* <!-- element action options start(up,down,delete) --> */}
        <div
          className="toolbar-block always-bottom"
          id="dom-tree-element-action"
        >
          <div className="inner">
            <i
              className="fad fa-arrow-alt-up"
              id="move-up"
              title="move element up"
              onClick={(e) => {
                moveUpDown(glob_context.hashmap.active_id, true);
                glob_context.setrefresh(!glob_context.refresh);
              }}
            ></i>
            <i
              className="fad fa-arrow-alt-down"
              id="move-down"
              title="move element down"
              onClick={(e) => {
                moveUpDown(glob_context.hashmap.active_id, false);
                glob_context.setrefresh(!glob_context.refresh);
              }}
            ></i>
            <i
              className="fad fa-trash"
              id="delete-item"
              title="delete element"
              onClick={(e) => {
                deleteElement(glob_context.hashmap.active_id);
                glob_context.setrefresh(!glob_context.refresh);
              }}
            ></i>
          </div>
        </div>
        {/* <!-- element action options end --> */}
      </div>
    </div>
  );
}

export default LeftToolBar;
