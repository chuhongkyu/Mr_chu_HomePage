import { Environment } from "@react-three/drei";
import { TextGroup } from "./TextGroup";
import Ground from './Ground';

function Scene() {
  return (
    <>
        <Environment preset="forest"/>
        <TextGroup/>
        <Ground/>
    </>
  )
}

export { Scene };