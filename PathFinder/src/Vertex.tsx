
import type { Component } from 'solid-js';
import { createSignal, createEffect, createMemo } from 'solid-js';
import { Button } from "@hope-ui/solid";
import { nodeStatusType } from "./PathFinder";

const nodeStatusColor = {
  alive: ['#B7BCB0', '#dddddd'],
  visited: ['#FF9636', '#FFCD58'],
  dead: ["#000000", '#444444'],
  path: ['#10BC10', '#31ED31'],
  startNode: ['#10BC10', '#31ED31'],
  endNode: ['#10BC10', '#31ED31'],
}

const Vertex: Component = (props) => {

  const [getStatus, setStatus] = createSignal(props.status)
  // console.log(props.color);
  function handleClick() {

    // toggle color, dead or alive
    if (getStatus() === nodeStatusType.alive) {
      // console.log(props.color);
      setStatus(nodeStatusType.dead);
      props.updateNodes(props.id, nodeStatusType.dead);
    } else if (getStatus() == nodeStatusType.dead) {
      setStatus(nodeStatusType.alive);
      props.updateNodes(props.id, nodeStatusType.alive);
    }
  }
  return (

    <Button bg={nodeStatusColor[getStatus()][0]} _hover={{ background: nodeStatusColor[getStatus()][1] }} onClick={handleClick}
      borderRadius="0"
    /* sx={{ */
    /*   height: 0, */
    /*   width: '100%', */
    /*   paddingBottom: '100%', */
    /*   /\* margin: '5px', *\/ */
    /*   minWidth: 0, */
    /*   borderRadius: 0, */
    /*   minHeight: 0, */
    /*   '&:hover': { */
    /*     /\* backgroundColor: 'primary.dark', *\/ */
    /*   } */
    /* }} */
    >
      {/* {props.id} */}
    </Button>
  )
}

export default Vertex;
