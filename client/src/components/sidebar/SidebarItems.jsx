import React, { useState } from "react";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sidebarListStyle } from "./style";
import { useNavigate } from "react-router-dom";

export default function SidebarItem({ list, name }) {
  const navigate = useNavigate();

  const localStorageData = JSON.parse(
    localStorage.getItem(`${name}SidebarIds`)
  );
  const [openedItemIds, setOpenedIds] = useState(
    localStorageData ? localStorageData : []
  );

  return (
    <ul style={sidebarListStyle}>
      {list?.map((item) => {
        return (
          <li
            key={item.id}
            className="sidebar-item"
            style={{ '--intensity': '0.6' }}
            onClick={
              item.path
                ? () => navigate(item.path)
                : () => {
                    let duplicateArray;
                    if (openedItemIds.includes(item.id)) {
                      duplicateArray = openedItemIds.filter(
                        (i) => i !== item.id
                      );
                    } else {
                      duplicateArray = [...openedItemIds, item.id];
                    }
                    setOpenedIds(duplicateArray);
                    localStorage.setItem(
                      `${name}SidebarIds`,
                      JSON.stringify(duplicateArray)
                    );
                  }
            }
          >
            <span>
              {item.isParent ? (
                openedItemIds?.includes(item.id) ? (
                  <FontAwesomeIcon
                    className="sidebar-icon"
                    icon={faChevronRight}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="sidebar-icon"
                    icon={faChevronDown}
                  />
                )
              ) : (
                <span className="ms-3" />
              )}
            </span>
            <span className={item.isParent ? "ms-2" : "ms-3"}>{item.title}</span>
            {item.isParent && openedItemIds?.includes(item.id) ? (
              <SidebarItem list={item.child} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
