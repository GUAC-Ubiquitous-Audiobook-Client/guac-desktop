import {v4 as uuidv4} from 'uuid';
import storage from 'electron-json-storage';
import {KeybindItem} from "./keybinds-data";

export interface KeybindsRepository {
    keybindsData: Data

    addKeybind()

    deleteKeybind(itemId: string)
}

export class KeybindsRepositoryImpl implements KeybindsRepository {

    private STORAGE_KEY_DATA = "data_keybinds"

    keybindsData: Data;

    constructor() {
        this.keybindsData = {
            data: [
                {
                    id: "1",
                    action: "play",
                    shortcut: "cmd a"
                }
            ],
        }
        const instanceThis = this
        storage.has(this.STORAGE_KEY_DATA, function (error, hasKey) {
            if (hasKey) {
                storage.get(instanceThis.STORAGE_KEY_DATA, function (error, _data) {
                    instanceThis.keybindsData.data = _data.data
                });
            }
        });
    }

    async _saveData(newData) {
        storage.set(this.STORAGE_KEY_DATA, newData, function (error) {
            if (error) {
                throw error;
            }
        });
    }

    addKeybind() {
        const item: KeybindItem = {
            id: uuidv4(),
            action: "",
            shortcut: ""
        }
        this.keybindsData.data.push(item)
        this._saveData(this.keybindsData)
    }

    deleteKeybind(itemId: string) {
        const index = this.keybindsData.data.findIndex(item => item.id === itemId)
        if (index !== -1) {
            this.keybindsData.data.splice(index, 1);
            this._saveData(this.keybindsData)
        }
    }

}

export interface Data {
    data: KeybindItem[]
}
