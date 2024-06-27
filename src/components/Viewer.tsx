import { Order } from "./OrderForm";

interface ViewerProps {
  order: Order;
}

interface ViewIceLevelProps {
  iceLevelId: number;
}
const ViewIceLevel = (props: ViewIceLevelProps) => {
  if (props.iceLevelId === 1) {
    return <p>❌</p>;
  }
  if (props.iceLevelId === 2) {
    return <p>🧊</p>;
  }
  if (props.iceLevelId === 3) {
    return <p>🧊🧊</p>;
  }
  if (props.iceLevelId === 4) {
    return <p>🧊🧊🧊</p>;
  }
  console.log("INVALID ICE LEVEL");
  return null;
};

interface ViewCupProps {
  cupId: number;
}
const ViewCup = (props: ViewCupProps) => {
  if (props.cupId === 1) {
    return <p>🥤</p>;
  }
  if (props.cupId === 2) {
    return <p>🐼</p>;
  }
  if (props.cupId === 3) {
    return <p>🐻</p>;
  }
  if (props.cupId === 4) {
    return <p>🎁</p>;
  }
};

const Viewer = ({ order }: ViewerProps) => {
  return (
    <div>
      <ViewIceLevel iceLevelId={order.iceLevelId} />
      <ViewCup cupId={order.cupId} />
    </div>
  );
  // <p className="order-text">{JSON.stringify(order)}</p>;
};

export default Viewer;
