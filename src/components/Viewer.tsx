import {
  Backdrop,
  Box,
  ContactShadows,
  // CameraControls,
  Environment,
  Grid,
  OrbitControls,
  TransformControls,
  Resize,
  Stage,
} from "@react-three/drei";
import { Order } from "./OrderForm";
import { Canvas } from "@react-three/fiber";
import Cup from "./3D/Cup";
import Boba from "./3D/Boba";

interface ViewerProps {
  order: Order;
}

interface ViewIceLevelProps {
  iceLevelId: number;
}

interface ViewToppingProps {
  toppingId: number;
}
interface ViewCupProps {
  cupId: number;
}
const ViewIceLevel = (props: ViewIceLevelProps) => {
  if (props.iceLevelId === 1) {
    return null;
  }
  if (props.iceLevelId === 2) {
    return (
      <Box scale={1}>
        <meshLambertMaterial color={"blue"} />
      </Box>
    );
  }
  if (props.iceLevelId === 3) {
    return (
      <group>
        <Box material-color="blue" position={[-1, 0, 0]} />
        <Box material-color="blue" position={[1, 0, 0]} />
      </group>
    );
  }
  if (props.iceLevelId === 4) {
    return (
      <group>
        <Box material-color="blue" position={[-1, 0, 0]} />
        <Box material-color="blue" position={[1, 0, 0]} />
        <Box material-color="blue" position={[0, 0, 2]} />
      </group>
    );
  }
  console.log("INVALID ICE LEVEL");
  return null;
};

const ViewCup = (props: ViewCupProps) => {
  if (props.cupId === 1) {
    return <Cup />;
  }
  if (props.cupId === 2) {
    return <Cup />;
  }
  if (props.cupId === 3) {
    return <Cup />;
  }
  if (props.cupId === 4) {
    return <Cup />;
  }
};

const ViewToppings = (props: ViewToppingProps) => {
  if (props.toppingId === 1) {
    return <Boba />;
  }
};

const Viewer = ({ order }: ViewerProps) => {
  return (
    <div className="canvas-box">
      {/* <ViewCup cupId={order.cupId} /> */}
      <Canvas>
        <OrbitControls
          maxDistance={1.5}
          minDistance={0.5}
          enableDamping
          enablePan={false}
          autoRotate
        />
        <Stage
          intensity={1.8}
          environment={{
            background: false,
            preset: "studio",
            ground: true,
          }}
        >
          <Resize>
            <group>
              <ViewCup cupId={order.cupId} />
              {/* <ViewIceLevel iceLevelId={order.iceLevelId} /> */}
              <ViewToppings toppingId={order.toppingId} />
            </group>
          </Resize>
        </Stage>
      </Canvas>
    </div>
  );
  // <p className="order-text">{JSON.stringify(order)}</p>;
};

export default Viewer;
