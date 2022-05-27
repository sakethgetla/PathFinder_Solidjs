
import type { Component } from 'solid-js';
import { createSignal, createEffect, createMemo } from 'solid-js';
import Button from "@suid/material/Button";
import { nodeStatusType } from "./PathFinder";

// const nodeStatusType = {
//   alive: 'secondary',
//   visited: 'visited',
//   dead: 'primary',
//   path: 'path',
//   startNode: 'startNode',
//   endNode: 'endNode',
// }

const Vertex: Component = (props) => {

  const [getColor, setColor] = createSignal(props.color)
  // console.log(props.color);
  function handleClick() {

    if (getColor() == nodeStatusType.alive) {
      setColor(nodeStatusType.dead);
      props.updateNodes(props.id, nodeStatusType.dead);
    } else if (getColor() == nodeStatusType.dead) {
      setColor(nodeStatusType.alive);
      props.updateNodes(props.id, nodeStatusType.alive);
    }
  }
  return (

    <Button variant={props.variant} color={getColor()} onClick={handleClick}
      sx={{
        height: 0,
        width: '100%',
        paddingBottom: '100%',
        /* margin: '5px', */
        minWidth: 0,
        borderRadius: 0,
        minHeight: 0,
        '&:hover': {
          /* backgroundColor: 'primary.dark', */
        }
      }}
    >
      {/* {props.id} */}
    </Button>
  )
}

export default Vertex;
