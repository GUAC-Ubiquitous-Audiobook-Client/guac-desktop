import {LibraryRepository, LibraryRepositoryImpl} from "./library-repository";

export class LibraryRepositoryProvider {

    private static _instance: LibraryRepositoryProvider;

    private _libraryRepository: LibraryRepository = new LibraryRepositoryImpl()

    private static get instance() {
        return this._instance || (this._instance = new this());
    }
    public static get libraryRepository() {
        return this.instance._libraryRepository
    }

}
