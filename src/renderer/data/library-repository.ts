import {v4 as uuidv4} from 'uuid';
import storage from 'electron-json-storage';

export class LibraryRepository {

    private static _instance: LibraryRepository;

    private STORAGE_DATA_KEY = "data_books"

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    data: Data;

    gelp(_data) {
        this.data = _data
        console.log("update data:")
                    console.log(_data)
    }

    constructor() {
        this.data = {
            libraryItems: [
                {
                    id: "1",
                    name: "Plato Early",
                    files: [
                        {
                            id: "1",
                            path: "/Users/curli/Books/Early Period, Volume 1/08. Menexenus.mp3",
                            clipLength: 2000,
                            clipLengthPlayed: 2000
                        },
                        {
                            id: "2",
                            path: "/Users/curli/Books/Early Period, Volume 1/09. Ion.mp3",
                            clipLength: 500,
                            clipLengthPlayed: 100
                        },
                    ]
                },

            ]
        }
        const instanceThis = this
        storage.has(this.STORAGE_DATA_KEY, function (error, hasKey) {
            if (hasKey) {
                storage.get(instanceThis.STORAGE_DATA_KEY, function (error, _data) {
                    // instanceThis.data = _data
                    instanceThis.gelp(_data)
                });
            }
        });
    }


    addLibraryItem(files: string[]) {

        function extractBookName(): string {
            const file = files[0]
            return file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'))
        }

        const newItem = {
            id: uuidv4(),
            name: extractBookName(),
            files: files.map(function (val): FileItem {
                return {
                    id: uuidv4(),
                    path: val.substring(val.lastIndexOf('/') + 1),
                    clipLength: 1000,
                    clipLengthPlayed: 200
                }
            })
        }
        console.log(this.data)
        this.data.libraryItems.push(newItem)
        storage.set(this.STORAGE_DATA_KEY, this.data, function (error) {
            if (error) {
                throw error;
            }
        });
    }

}

export interface Data {
    libraryItems: LibraryItem[]
}

export interface LibraryItem {
    id: string
    name: string
    files: FileItem[]
}

export interface FileItem {
    id: string
    path: string
    clipLength: number
    clipLengthPlayed: number
}
