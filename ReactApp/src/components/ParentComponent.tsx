import { useState } from "react";
import { Child } from "./ChildComponent";

const ParentComponent  = () => {
    const [messageFromChild, setMessageFromChild] = useState('');

    const handelChildData = (data: any) => {
        setMessageFromChild(data)
    }

    return (
        <div>
            <h1>Parent Component</h1>
            <p>Message from Child: <span>{messageFromChild}</span></p>
            <Child onSendData={handelChildData}/>
        </div>
    )
}

export const Parent = ParentComponent;