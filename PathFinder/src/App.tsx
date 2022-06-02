import type { Component } from 'solid-js';
import { createSignal, createEffect, createMemo } from 'solid-js';
import { Box, Button, Flex, Heading, HopeProvider, HStack, SimpleGrid, Spacer, VStack } from "@hope-ui/solid";
//import { AppBar, ButtonGroup, Button } from '@mui/material';
// import Button from "@suid/material/Button";
// import Stack from "@suid/material/Stack";

import Vertex from "./Vertex";
import { PathFinder } from "./PathFinder";


enum Algos {
  dijkstra = 'Dijkstra',
  astar = 'Astar',
  huristic = 'Huristic'
}

// const nodeStatusType = {
//   alive: 'secondary',
//   visited: 'primary',
//   dead: 'error',
//   path: 'warning',
//   startNode: 'success',
//   endNode: 'success',
// }


const App: Component = () => {
  // const gridWidth = 10;

  // const [nodes, setNodes] = createSignal([]);

  // let ns: { id: number, status: string }[] = [];
  // for (let i = 0; i < gridWidth**2; i++) {
  //   ns.push({ "id": i, "status": nodeStatusType.alive });
  // }

  // setNodes(ns)
  // const [nodes, setNodes] = createSignal(Array.apply(0, 2).map((x, i) => {
  //   return {"id": i, "status": "nn"}
  // }));

  // console.log(nodes());
  return (

    <HopeProvider >
        <Box bg="tomato" w="100%" p="$4" color="white" margin="5px">
          <Flex>
            <Box>
              <Heading size="2xl">
                Saketh Getla
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://sakethgetla.github.io"
                }} >
                Games
              </Button>
            </Box>
          </Flex>
        </Box>
        <PathFinder />

      {/* <SimpleGrid columns={gridWidth}> */}
      {/*   <For each={nodes()}> */}
      {/*     {(node) => */}
      {/*       <Vertex variant="contained" color={node.status} updateNodes={() => console.log(node.id)}> */}
      {/*       </Vertex> */}
      {/*     } */}
      {/*   </For> */}
      {/* </SimpleGrid> */}
      {/* {nodes()} */}
    </HopeProvider>
  );
};

export default App;
