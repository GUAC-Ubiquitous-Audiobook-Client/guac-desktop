import {KeybindsRepository, KeybindsRepositoryImpl} from "./keybinds-repository";

export class KeybindsRepositoryProvider {

    private static _instance: KeybindsRepositoryProvider;

    private _keybindsRepository: KeybindsRepository = new KeybindsRepositoryImpl()

    private static get instance() {
        return this._instance || (this._instance = new this());
    }

    public static get keybindsRepository() {
        return this.instance._keybindsRepository
    }

}
