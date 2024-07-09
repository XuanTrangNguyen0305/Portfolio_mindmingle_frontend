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
import Boba from "./3D/Tea";
import Milk from "./3D/Milk_Regular";
import Tea from "./3D/Tea";
import RegularMilk from "./3D/Milk_Regular";
import Extra_Ice from "./3D/Ice_Extra";
import Ice_Less from "./3D/Ice_Less";
import Ice_Regular from "./3D/Ice_Regular";
import Ice_Extra from "./3D/Ice_Extra";
import Milk_Regular from "./3D/Milk_Regular";
import Milk_Almond from "./3D/Milk_Almond";
import Mini_Mochi from "./3D/Mini_Mochi";
import Star_Boba from "./3D/Star_Boba";
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
interface ViewMilkProps {
  milkId: number;
}
interface ViewTeaProps {
  teaId: number;
}
const ViewIceLevel = (props: ViewIceLevelProps) => {
  if (props.iceLevelId === 1) {
    return null;
  }
  if (props.iceLevelId === 2) {
    return <Ice_Less />;
  }
  if (props.iceLevelId === 3) {
    return <Ice_Regular />;
  }
  if (props.iceLevelId === 4) {
    return <Ice_Extra />;
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
const ViewMilk = (props: ViewMilkProps) => {
  if (props.milkId === 1) {
    return null;
  }
  if (props.milkId === 2) {
    return <Milk_Regular />;
  }
  if (props.milkId === 3) {
    return <Milk_Almond />;
  }
  if (props.milkId === 4) {
    return <Milk />;
  }
};
const ViewTea = (props: ViewTeaProps) => {
  if (props.teaId === 1) {
    return <Tea />;
  }
};
const ViewToppings = (props: ViewToppingProps) => {
  if (props.toppingId === 1) {
    return <Star_Boba />;
  }
  if (props.toppingId === 4) {
    return <Mini_Mochi />;
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
              <ViewToppings toppingId={order.toppingId} />
              <ViewMilk milkId={order.milkId} />
              <ViewTea teaId={order.teaId} />
              <ViewIceLevel iceLevelId={order.iceLevelId} />
            </group>
          </Resize>
        </Stage>
      </Canvas>
    </div>
  );
  // <p className="order-text">{JSON.stringify(order)}</p>;
};

export default Viewer;
