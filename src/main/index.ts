import {windowProcess} from "./window.ts";
import {ioProcess} from "./io.ts";
import {keybindsProcess} from "./keybinds.ts";
import MainProcess from "./main-process";

export let processes: MainProcess[] = [windowProcess, ioProcess, keybindsProcess]
