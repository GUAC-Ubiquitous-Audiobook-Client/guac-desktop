export interface LibraryItems {
    data: LibraryItem[]
}

export interface LibraryItem {
    id: string
    name: string
    files: FileItem[]
    selectedFileId: string | null
    dateAddedTimestamp: number
}

export interface FileItem {
    id: string
    path: string
    clipLength: number
    clipLengthPlayed: number
    tags: Id3Tags,
    dateAddedTimestamp: number
}

export interface Id3Tags {
    fileTitle: string
    author: string
    bookName: string
}
