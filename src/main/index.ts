import {windowProcess} from "./window";
import {ioProcess} from "./io";
import {keybindsProcess} from "./keybinds";
import MainProcess from "./main-process";

export let processes: MainProcess[] = [windowProcess, ioProcess, keybindsProcess]
