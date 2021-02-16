export default class GotService {
    constructor() {
        this._apiBase = "https://www.anapioficeandfire.com/api";
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }


        return await res.json();
    }

    async getAllCharacter() {
        const res = await this.getResource("/characters?page=5&pageSize=10");
        return res.map(this._transformCharacter)
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);

    }

    getAllHouse(id) {
        return this.getResource(`/characters/${id}`);
    }

    getHouses() {
        return this.getResource(`/houses`);
    }

    getAllBooks() {
        return this.getResource(`/books`);
    }

    getBook(id) {
        return this.getResource(`/books/${id}`)
    }

    _transformCharacter(char) {
        return {
            name: char.name || 'no info',
            gender: char.gender || 'no info',
            born: char.born || 'no info',
            died: char.died || 'no info',
            culture: char.culture || 'no info',
        }
    }

    _tansformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}

