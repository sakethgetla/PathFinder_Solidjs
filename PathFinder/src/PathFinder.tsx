import type { Component } from 'solid-js';
import { createSignal, createEffect, createMemo } from 'solid-js';
import Button from "@suid/material/Button";
import Stack from "@suid/material/Stack";
//import Grid from "@suid/material/Grid";

// import Grid from "./Grid";
import Vertex from "./Vertex";
import { SimpleGrid } from "@hope-ui/solid";
import PriorityQueue from "ts-priority-queue";

const nodeStatusType = {
  alive: 'secondary',
  visited: 'primary',
  dead: 'error',
  path: 'warning',
  startNode: 'success',
  endNode: 'success',
}

enum Algos {
  dijkstra = 'Dijkstra',
  astar = 'Astar',
  huristic = 'Huristic'
}


const PathFinder: Component = () => {

  const [found, setFound] = createSignal(false);
  const [algo, setAlgo] = createSignal(Algos.astar);

  const gridWidth = 20;
  const startNode = 0;
  const endNode = (gridWidth ** 2) - 1;


  let ns: { id: number, status: string }[] = [];
  for (let i = 0; i < gridWidth ** 2; i++) {
    ns.push({ "id": i, "status": nodeStatusType.alive });
  }
  ns[startNode].status = nodeStatusType.startNode;
  ns[endNode].status = nodeStatusType.endNode;
  // setNodes(ns)
  const [getNodes, setNodes] = createSignal(ns);

  // console.log(getNodes());
  //let nodes: { id: number, status: string, hval: number, gval: number }[] = [];


  function reset() {
    console.log('reset')
    // console.log(getNodes())
    setNodes(prevNodes => (
      prevNodes.map((node => (
        // id === startNode || id === endNode ? {...node, "status": nodeStatusType.startNode} : {...node, "status": nodeStatusType.alive}
        node.status === nodeStatusType.path || node.status === nodeStatusType.visited ? {...node, "status": nodeStatusType.alive} : node
      )))
    ))
  }

  // reset();

  function updateNodes(id, status) {
    // console.log("update Nodes", id, status);

    // nodes[id].status = status;
    // console.log("clicked", node.id)
    // console.log(nodes)

    setNodes(prevNodes => (
      prevNodes.map((node => (
        id === node.id ? {...node, "status": status} : node
      )))
    ))
  }

  const dist = ((n1, n2) => {
    // console.log('dist', n1, n2);
    return Math.sqrt(((n1[0] - n2[0]) ** 2) + ((n1[1] - n2[1]) ** 2))
  })

  function inGraph(pos) {
    return pos[0] >= 0 && pos[0] < gridWidth && pos[1] >= 0 && pos[1] < gridWidth
  }
  function isDead(node) {
    return getNodes()[node].status === nodeStatusType.dead;
  }

  function posToNode(pos) {
    return (pos[1] * gridWidth) + pos[0];
  }

  function nodeToPos(node) {
    return [node % gridWidth, Math.floor(node / gridWidth)];
  }

  function getNeighbours(node) {
    var neighbours = [];
    // var neighbour = [];
    var pos = nodeToPos(node);
    [[0, -1], [-1, 0], [1, 0], [0, 1]].map(([i, j]) => {
      var neighbour = [];
      neighbour = [pos[0] + i, pos[1] + j];
      if ((i !== 0 || j !== 0) && inGraph(neighbour) && !isDead(posToNode(neighbour))) {
        neighbours.push(posToNode(neighbour));
      }
    });

    return neighbours;
  }



  // console.log(dist([1, 2], [4, 6]));
  // dist([1, 2], [4, 6])
  function findPath() {


    // [priority, value]
    var queue = new PriorityQueue({ comparator: function(a, b) { return a[0] - b[0] } });
    var currNode = null;
    var foundPath = false;
    var neighbours = [];
    var gVal = {}; // the cost to tavel to that node.
    var prev = {};
    var visited = [];


    function hVal(node) {
      // the distence from this node to the endNode.
      return dist(nodeToPos(node), nodeToPos(endNode));
    }


    function fVal(node, gVal) {
      // console.log(hVal(node) + gVal[node]);
      // console.log('here', hVal(node), gVal[node], node);
      // return hVal(node);
      // return (1*hVal(node)) + gVal[node];
      switch (algo()) {
        case Algos.dijkstra: {
          return gVal[node];
          break;
        }
        case Algos.huristic: {
          return hVal(node);
          break;
        }
        case Algos.astar: {
          return (2 * hVal(node)) + gVal[node];
          break;
        }
        default: {
          return null;
        }
      }
    }

    queue.queue([hVal(startNode), startNode]);
    gVal[startNode] = 0;

    while (!foundPath && queue.length > 0) {
      currNode = queue.dequeue()[1];
      visited.push(currNode);
      if (currNode === endNode) {
        foundPath = true;
      } else {
        neighbours = getNeighbours(currNode);
        neighbours.map((neighbour) => {
          if (!gVal.hasOwnProperty(neighbour) || gVal[neighbour] > gVal[currNode] + 1) {
            // if (!(neighbour in visited)) {
            gVal[neighbour] = gVal[currNode] + 1;
            queue.queue([fVal(neighbour, gVal), neighbour]);
            prev[neighbour] = currNode;
            // if(gVal[neighbour] > gVal[currNode])
          }
        });
      }
    }


    var nodes = {};
    // console.log("before", nodes)

    visited.map(node => {
      nodes[node]= nodeStatusType.visited;
    })

    if (foundPath) {
      currNode = prev[currNode];

      while (currNode != startNode) {
        nodes[currNode]= nodeStatusType.path;
        currNode = prev[currNode];
        // console.log('found');
      }

      // console.log('found');
      nodes[startNode]= nodeStatusType.startNode;
      nodes[endNode]= nodeStatusType.endNode;
      setFound(true);
      // setNodes(nodes);
    }
    // console.log("after", nodes)
    setNodes(prevNodes => (
      prevNodes.map((node => (
        nodes.hasOwnProperty(node.id) ? {...node, "status": nodes[node.id]} : node
      )))
    ))
    // console.log(nodes);
    // console.log(visited.length);

  }

  // console.log('neighbours 8:', getNeighbours(8))
  function renderNodes() {
    return (
      <div>
        {console.log('rerender vertexs')}
        <SimpleGrid columns={gridWidth}>
          <For each={getNodes()}>
            {(node) =>
              <Vertex id={node.id} variant="contained" color={node.status} updateNodes={updateNodes}>
              </Vertex>
            }
          </For>
        </SimpleGrid>
      </div>
    )
  }

  return (
    <>
      <Stack spacing={2} direction="column">
        <Stack spacing={2} direction="row">
          <Button variant="contained" color={algo() === Algos.dijkstra ? 'secondary' : 'primary'} onClick={() => setAlgo(Algos.dijkstra)}>
            {Algos.dijkstra}
          </Button>

          <Button variant="contained" color={algo() === Algos.astar ? 'secondary' : 'primary'} onClick={() => setAlgo(Algos.astar)}>
            {Algos.astar}
          </Button>

          <Button variant="contained" color={algo() === Algos.huristic ? 'secondary' : 'primary'} onClick={() => setAlgo(Algos.huristic)}>
            {Algos.huristic}
          </Button>
        </Stack>

        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={findPath}>
            find Path
          </Button>

          <Button variant="contained" onClick={reset}>
            reset
          </Button>
        </Stack>
        {renderNodes()}
      </Stack>
    </>
  )
}

export { PathFinder, nodeStatusType };
