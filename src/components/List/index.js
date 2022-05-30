import React from "react";
import RecycledList from "../../helpers/recycled-list";

import {LegacyListRow} from "./LegacyListRow";



export default  function List() {  
  return (
    <div>
      <div className="list-container">
        <RecycledList itemFn={LegacyListRow}  itemHeight={30} />
      </div>

    </div>
  );
}

