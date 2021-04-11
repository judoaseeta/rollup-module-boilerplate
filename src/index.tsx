import React from 'react'
export interface HelloWorldProps {
    name: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({
  name
}) =>
<div>
    <h3>Hello World to {name}</h3>
</div>

export default HelloWorld
