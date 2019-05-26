import {configure} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

configure({adapter: new Adapter()});

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.load = () => {};
