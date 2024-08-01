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
import Ice_Less from "./3D/Ice_Less";
import Ice_Regular from "./3D/Ice_Regular";
import Ice_Extra from "./3D/Ice_Extra";
import Milk_Regular from "./3D/Milk_Regular";
import Milk_Almond from "./3D/Milk_Almond";
import Mini_Mochi from "./3D/Mini_Mochi";
import Star_Boba from "./3D/Star_Boba";
import Tea_Black from "./3D/Tea_Black";
import Tea_Green from "./3D/Tea_Green";
import Tea_Butterfly from "./3D/Tea_Butterfly";
import Tea_Hibicus from "./3D/Tea_Hibicus";
import Pudding from "./3D/Pudding";
import Milk_Coconut from "./3D/Milk_Coconut";
import Sugar_Extra from "./3D/Sugar_Extra";
import Duck_Cup_1 from "./3D/Duck_Cup_1";
import Duck_Cup_2 from "./3D/Duck_Cup_2";
import Sugar_Regular from "./3D/Sugar_Regular";
import Flavor_Sakura from "./3D/Flavor_Sakura";
import Flavor_Taro from "./3D/Flavor_Taro";
import Flavor_Lychee from "./3D/Flavor_Lychee";
import Flavor_Yuzu from "./3D/Flavor_Yuzu";
import Flavor_Strawberry from "./3D/Flavor_Strawberry";
import Panda_Cup2 from "./3D/Panda_Cup2";
import Panda_Cup1 from "./3D/Panda_Cup1";
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
interface ViewSugarProps {
  sugarLevelId: number;
}
interface ViewFlavorProps {
  flavorId: number;
}
const ViewFlavor = (props: ViewFlavorProps) => {
  if (props.flavorId === 1) {
    return <Flavor_Sakura />;
  }
  if (props.flavorId === 2) {
    return <Flavor_Taro />;
  }
  if (props.flavorId === 3) {
    return <Flavor_Lychee />;
  }
  if (props.flavorId === 4) {
    return <Flavor_Yuzu />;
  }
  if (props.flavorId === 5) {
    return <Flavor_Strawberry />;
  }
};
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
  if (props.cupId === 3) {
    return (
      <group>
        <Duck_Cup_1 />
        <Duck_Cup_2 />
      </group>
    );
  }

  if (props.cupId === 2) {
    return (
      <group>
        <Panda_Cup1 />
        <Panda_Cup2 />
      </group>
    );
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
    return <Milk_Coconut />;
  }
};
const ViewTea = (props: ViewTeaProps) => {
  if (props.teaId === 1) {
    return <Tea_Black />;
  }
  if (props.teaId === 2) {
    return <Tea_Green />;
  }
  if (props.teaId === 3) {
    return <Tea_Butterfly />;
  }
  if (props.teaId === 4) {
    return <Tea_Hibicus />;
  }
};
const ViewToppings = (props: ViewToppingProps) => {
  if (props.toppingId === 1) {
    return <Star_Boba />;
  }
  if (props.toppingId === 2) {
    return <Pudding />;
  }

  if (props.toppingId === 3) {
    return <Mini_Mochi />;
  }
};
const ViewSugarLevel = (props: ViewSugarProps) => {
  if (props.sugarLevelId === 1) {
    return null;
  }
  if (props.sugarLevelId === 2) {
    return <Sugar_Regular />;
  }
  if (props.sugarLevelId === 3) {
    return <Sugar_Extra />;
  }
};

const Viewer = ({ order }: ViewerProps) => {
  return (
    <div className="canvas-box">
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
              <ViewSugarLevel sugarLevelId={order.sugarLevelId} />
              <ViewFlavor flavorId={order.flavorId} />
            </group>
          </Resize>
        </Stage>
      </Canvas>
    </div>
  );
  // <p className="order-text">{JSON.stringify(order)}</p>;
};

export default Viewer;
