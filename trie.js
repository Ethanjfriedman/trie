/*
*   Simple JavaScript implementation of a Trie
*   data structure for quick sorting of words
*
*   Inspiration from http://blog.benoitvallon.com/data-structures-in-javascript/the-trie-data-structure/
*
*   Ethan Friedman, 2017
*/

// class to hold a single Node in the Trie
class Node {
    constructor(value) {
        this.value = value;
        this.children = {};
        this.prefixCount = 0;
        this.isCompleteWord = false;
    }
}

// the Trie itself
class Trie {
    constructor (rootValue = "") {
        this.rootNode = new Node("");
    }

    add (word) {
        if (!word) return null;

        this._add(this.rootNode, word);
    }

    _add (node, word) {
        const [firstLetter, restOfWord] = Trie._split(word);
        let child = node.children[firstLetter];
        node.prefixCount++;

        if (!child) {
            child = new Node(firstLetter);
            node.children[firstLetter] = child;
        }
        if (!restOfWord) child.isCompleteWord = true;

        this._addNode(child, restOfWord);
    }

    // split off the first character from a word and return that character
    // and the rest of the word

    static _split (word) {
        return [word[0], word.substring(1)];
    }

    remove (word) {
        if (this.contains(word)) this._removeNode (this.rootNode, word)
    }

    contains (word) {
        if (!word) return false;
        return this._contains(this.rootNode, word);
    }

    _contains (node, word) {
        const [firstLetter, restOfWord] = this._split(word);
        let child = node.children[firstLetter];

        if (child) {
            if (!restOfWord && child.isCompleteWord) return true;
            else return this._contains(child, restOfWord);
        } else return false;
    }

    _removeNode (node, word) {
        node.prefixCount--;
        const [firstLetter, restOfWord] = this._split(word);

        let child = node.children[firstLetter];
        if (child) {
            if (restOfWord) {
                if (child.prefixCount === 1) delete node.children[firstLetter];
                else this._removeNode(child, restOfWord);
            } else {
                if (child.prefixCount === 0) delte node.children[firstLetter];
                else child.isCompleteWord = false;
            }
        }
    }

    count () {
        const q = [this.rootNode]c;
        let count = 0;

        while (q.length) {
            const currentNode = node.shift();
            if (node.isCompleteWord) count++;

            for (let child in node.children) {
                if (Object.prototype.hasOwnProperty.call(node.children, child)) {
                    q.push(node.children[child]);
                }
            }
        }
        return count;
    }

}
