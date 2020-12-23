import {v4 as uuidv4} from 'uuid';
import storage from 'electron-json-storage';
import {FileItem, LibraryItem, LibraryItems} from "./data";

const fs = require("fs")
const mm = require("musicmetadata")

export interface LibraryRepository {
    libraryItems: LibraryItems

    selectedLibraryItem: LibraryItemWrapper

    getThumbnailForFile(filePath: FileItem): Promise<Buffer>

    getFileName(file: FileItem): string

    selectLibraryItem(libraryItemId: string)

    addLibraryItem(filePaths: string[]): Promise<any>
}

export class LibraryRepositoryImpl implements LibraryRepository {

    private STORAGE_KEY_DATA = "data_books"
    private STORAGE_KEY_SELECTED_LIBRARY_ITEM = "selected_library_item"

    libraryItems: LibraryItems;
    selectedLibraryItem: LibraryItemWrapper

    constructor() {
        this.libraryItems = {
            data: []
        }
        this.selectedLibraryItem = {
            data: null
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
        this.selectedLibraryItem.data = this.libraryItems.data.filter(item => item.id === itemId)[0]
    }

    async addLibraryItem(filePaths: string[]) {
        const instanceThis = this

        function extractBookName(files: FileItem[]): string {
            const file = files[0]
            return file.tags.bookName !== undefined ? file.tags.bookName :
                file.tags.fileTitle !== undefined ? file.tags.fileTitle :
                    file.path.substring(file.path.lastIndexOf('/') + 1, file.path.lastIndexOf('.'))
        }

        async function filesWithTags(): FileItem[] {
            const mappedFiles: FileItem[] = []
            for (const val of filePaths) {
                const res = await instanceThis._extractFileId3Tags(val)
                mappedFiles.push(
                    {
                        id: uuidv4(),
                        path: val,
                        clipLength: 1000,
                        clipLengthPlayed: 200,
                        tags: {
                            fileTitle: res.title,
                            author: res.artist[0],
                            bookName: res.album,
                        }
                    }
                )
            }
            return mappedFiles
        }

        const filesTagged = await filesWithTags()
        const newItem = {
            id: uuidv4(),
            name: extractBookName(filesTagged),
            files: filesTagged
        }
        this.libraryItems.data.push(newItem)
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

    async _saveData(newData) {
        storage.set(this.STORAGE_KEY_DATA, newData, function (error) {
            if (error) {
                throw error;
            }
        });
    }

    async _extractFileId3Tags(val) {
        return new Promise(function (resolve, reject) {
            const readableStream = fs.createReadStream(val)
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

}

export interface LibraryItemWrapper {
    data: LibraryItem | null
}
