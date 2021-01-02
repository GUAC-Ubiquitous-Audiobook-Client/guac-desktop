import {v4 as uuidv4} from 'uuid';
import storage from 'electron-json-storage';
import {FileItem, LibraryItem} from "./data";

const fs = require("fs")
const mm = require("musicmetadata")

export interface LibraryRepository {
    libraryItems: Data

    getThumbnailForFile(filePath: FileItem): Promise<Buffer>

    getFileName(file: FileItem): string

    selectLibraryItem(libraryItemId: string)

    selectFileForCurrentLibraryItem(itemId: string)

    addLibraryItem(filePaths: string[]): Promise<any>

    addFilesToLibraryItem(filePaths: string[]): Promise<any>

    setFileLengthPlayedForCurrentLibraryItem(length: number)

    deleteLibraryItem(itemId: string)

    deleteCurrentSelectedLibraryItem()
}

export class LibraryRepositoryImpl implements LibraryRepository {

    private STORAGE_KEY_DATA = "data_books"
    private STORAGE_KEY_SELECTED_LIBRARY_ITEM = "selected_library_item"

    libraryItems: Data;

    constructor() {
        this.libraryItems = {
            data: [],
            selectedItemId: null,
            getSelectedItem(): LibraryItem | null {
                return this.data.filter(item => item.id === this.selectedItemId)[0]
            },
            getSelectedFileForItem(): FileItem | null {
                const item = this.getSelectedItem()
                return item?.files.filter(file => file.id === item.selectedFileId)[0] ?? null
            }
        }
        const instanceThis = this
        storage.has(this.STORAGE_KEY_DATA, function (error, hasKey) {
            if (hasKey) {
                storage.get(instanceThis.STORAGE_KEY_DATA, function (error, _data) {
                    instanceThis.libraryItems.data = _data.data
                    storage.has(instanceThis.STORAGE_KEY_SELECTED_LIBRARY_ITEM, function (error, hasKey) {
                        if (hasKey) {
                            storage.get(instanceThis.STORAGE_KEY_SELECTED_LIBRARY_ITEM, function (error, _data) {
                                instanceThis.setSelectedLibraryItem(_data)
                            });
                        }
                    });
                });
            }
        });
    }

    private setSelectedLibraryItem(itemId: string) {
        this.libraryItems.selectedItemId = itemId
    }

    private setSelectedFileForLibraryItem(itemId: string) {
        if (this.libraryItems.getSelectedItem() != null) {
            this.libraryItems.getSelectedItem()!!.selectedFileId = itemId
        }
    }

    async _filesWithTags(filePaths: string[]): FileItem[] {
        const instanceThis = this;
        const mappedFiles: FileItem[] = []
        for (const val of filePaths) {
            const tags = await instanceThis._extractFileId3Tags(val)
            const duration = await instanceThis._extractFileDuration(val)
            mappedFiles.push(
                {
                    id: uuidv4(),
                    path: val,
                    clipLength: duration,
                    clipLengthPlayed: 0,
                    tags: {
                        fileTitle: tags.title,
                        author: tags.artist[0],
                        bookName: tags.album,
                    },
                    dateAddedTimestamp: new Date().getTime()
                }
            )
        }
        return mappedFiles
    }

    async addLibraryItem(filePaths: string[]) {

        function extractBookName(files: FileItem[]): string {
            const file = files[0]
            return file.tags.bookName !== undefined ? file.tags.bookName :
                file.tags.fileTitle !== undefined ? file.tags.fileTitle :
                    file.path.substring(file.path.lastIndexOf('/') + 1, file.path.lastIndexOf('.'))
        }

        const filesTagged = await this._filesWithTags(filePaths)
        const newItem: LibraryItem = {
            id: uuidv4(),
            name: extractBookName(filesTagged),
            files: filesTagged,
            selectedFileId: null,
            dateAddedTimestamp: new Date().getTime()
        }
        this.libraryItems.data.push(newItem)
        this._saveData(this.libraryItems)
    }

    async addFilesToLibraryItem(filePaths: string[]) {
        const newItems = await this._filesWithTags(filePaths)
        const libItem = this.libraryItems.getSelectedItem()
        newItems.forEach(function (value) {
            libItem?.files.push(value)
        });
        this._saveData(this.libraryItems)
    }

    async getThumbnailForFile(filePath: FileItem): Promise<Buffer> {
        const res = await this._extractFileId3Tags(filePath)
        return res.picture[0].data
    }

    getFileName(file: FileItem): string {
        return file.path.substring(file.path.lastIndexOf('/') + 1)
    }

    selectLibraryItem(libraryItemId: string) {
        this.setSelectedLibraryItem(libraryItemId)
        storage.set(this.STORAGE_KEY_SELECTED_LIBRARY_ITEM, libraryItemId, function (error) {
            if (error) {
                throw error;
            }
        });
    }

    selectFileForCurrentLibraryItem(itemId: string) {
        this.setSelectedFileForLibraryItem(itemId)
        this._saveData(this.libraryItems)
    }

    setFileLengthPlayedForCurrentLibraryItem(length: number) {
        const file = this.libraryItems.getSelectedFileForItem()
        if (file != null && file.clipLengthPlayed < length) {
            file!!.clipLengthPlayed = length
            this._saveData(this.libraryItems)
        }
    }

    deleteLibraryItem(itemId: string) {
        const index = this.libraryItems.data.findIndex(item => item.id === itemId)
        if (index !== -1) {
            this.libraryItems.data.splice(index, 1);
        }
        this._saveData(this.libraryItems)
    }

    deleteCurrentSelectedLibraryItem() {
        this.deleteLibraryItem(this.libraryItems.getSelectedItem()?.id!!)
    }

    async _saveData(newData) {
        storage.set(this.STORAGE_KEY_DATA, newData, function (error) {
            if (error) {
                throw error;
            }
        });
    }

    async _extractFileId3Tags(filePath) {
        return new Promise(function (resolve, reject) {
            const readableStream = fs.createReadStream(filePath)
            mm(readableStream, function (err, metadata) {
                if (err) {
                    resolve(err)
                    throw err;
                }
                resolve(metadata)
                readableStream.close();
            });
        })
    }

    async _extractFileDuration(filePath) {
        return new Promise<number>(function (resolve, reject) {
            const player: HTMLAudioElement = new Audio()
            player.src = 'file://' + filePath
            player.load()
            player.oncanplaythrough = (event) => {
                resolve(player.duration)
            }
        })
    }

}

export interface Data {
    data: LibraryItem[]
    selectedItemId: string | null

    getSelectedItem(): LibraryItem | null

    getSelectedFileForItem(): FileItem | null
}
