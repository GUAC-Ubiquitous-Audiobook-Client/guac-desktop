import {v4 as uuidv4} from 'uuid';
import storage from 'electron-json-storage';

const fs = require("fs")
const mm = require("musicmetadata")

export class LibraryRepository {

    private static _instance: LibraryRepository;

    private STORAGE_DATA_KEY = "data_books"

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    data: Data;

    constructor() {
        this.data = {
            libraryItems: []
        }
        const instanceThis = this
        storage.has(this.STORAGE_DATA_KEY, function (error, hasKey) {
            if (hasKey) {
                storage.get(instanceThis.STORAGE_DATA_KEY, function (error, _data) {
                    instanceThis.data.libraryItems = _data.libraryItems
                });
            }
        });
    }


    async extractFileId3Tags(val) {
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

    async addLibraryItem(files: string[]) {
        const instanceThis = this

        function extractBookName(files: FileItem[]): string {
            const file = files[0]
            console.log(file)
            return file.tags.bookName !== undefined ? file.tags.bookName :
                file.tags.fileTitle !== undefined ? file.tags.fileTitle :
                    file.path.substring(file.path.lastIndexOf('/') + 1, file.path.lastIndexOf('.'))
        }

        async function filesWithTags(): FileItem[] {
            const mappedFiles: FileItem[] = []
            for (const val of files) {
                const res = await instanceThis.extractFileId3Tags(val)
                console.log(res)
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
                        },
                        getFileName(): string {
                            return val.substring(val.lastIndexOf('/') + 1)
                        },
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
        this.data.libraryItems.push(newItem)
        storage.set(this.STORAGE_DATA_KEY, this.data, function (error) {
            if (error) {
                throw error;
            }
        });
    }

    async getThumbnailForFile(filePath: FileItem): Promise<Buffer> {
        const res = await this.extractFileId3Tags(filePath)
        return res.picture[0].data
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
    tags: Id3Tags

    getFileName(): string
}

export interface Id3Tags {
    fileTitle: string
    author: string
    bookName: string
}
