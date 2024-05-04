class TrieNode {
    children: { [key: string]: TrieNode };
    isEndOfWord: boolean;

    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}


//used to efficiently sort through ticker data object that contain
//A ticker symbol and the name of it
export class TickerTrie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word: string): boolean {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    // Helper function to find words based on a prefix
    findWords(node: TrieNode, prefix: string, results: string[]): void {
        if (node.isEndOfWord) {
            results.push(prefix);
        }
        for (let char in node.children) {
            this.findWords(node.children[char], prefix + char, results);
        }
    }

    // Search for words with given prefix
    searchWithPrefix(prefix: string, maxResults: number): string[] {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }

        let results: string[] = [];
        this.findWords(node, prefix, results);
        return results.slice(0, maxResults);
    }
}

// Example usage
const trie = new TickerTrie();
trie.insert("apple");
trie.insert("app");
trie.insert("banana");
trie.insert("bat");
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // true
console.log(trie.search("banana")); // true
console.log(trie.search("batman")); // false

console.log(trie.searchWithPrefix("app", 5)); // ["app", "apple"]
console.log(trie.searchWithPrefix("b", 5)); // ["banana", "bat"]