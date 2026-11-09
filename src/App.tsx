import { registerRootComponent } from "expo";
import HomeScreen from "./HomeScreen";

export default function App() {
    return <HomeScreen />;
}

registerRootComponent(App);
