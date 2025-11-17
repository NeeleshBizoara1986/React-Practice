const ChildComponent = (props: any) => {
    const sendDataToParent = () => {
        props.onSendData('Hello from Child!')
    }

    return (<div>
        <h2>Child Component</h2>
        <button onClick={sendDataToParent}>Send Data To Parent</button>
    </div>)
}

export const Child = ChildComponent;