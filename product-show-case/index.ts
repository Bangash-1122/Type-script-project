/// Interfaces
interface Item {
    type: "book" | "electronics" | "clothing";
    id: string;
    price: number;
}

interface Book extends Item {
    type: "book";
    title: string;
    author: string;
}

interface Electronics extends Item {
    type: "electronics";
    item: string;
    model: string;
    warranty?: number;
}

interface Clothing extends Item {
    type: "clothing";
    item: string;
    brand: string;
    size?: "S" | "M" | "L";
}

// Union type
type Product = Book | Electronics | Clothing;

// Generic Collection class
class Collection<T> {
    items: T[];

    constructor(items: T[]) {
        this.items = items;
    }

    getAll(): T[] {
        return this.items;
    }

    filter(callback: (item: T) => boolean): T[] {
        return this.items.filter(callback);
    }
}

// renderProduct function
function renderProduct(product: Product): string {
    const baseHTML = `
        <div class="item" id="${product.id}">
            <div class="price">$${product.price.toFixed(2)}</div>
    `;

    let additionalInfo = '';

    switch (product.type) {
        case "book":
            additionalInfo = `Book: ${product.title} by ${product.author}`;
            break;
        case "electronics":
            additionalInfo = `Electronics: ${product.item} - ${product.model}`;
            if (product.warranty !== undefined) {
                additionalInfo += ` - Warranty: ${product.warranty} year(s)`;
            }
            break;
        case "clothing":
            additionalInfo = `Clothing: ${product.item} by ${product.brand}`;
            if (product.size !== undefined) {
                additionalInfo += ` - Size ${product.size}`;
            }
            break;
        default:
            throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
    }

    return `${baseHTML}
            <div class="info">${additionalInfo}</div>
        </div>`;
}

// Create products collection
const productData: Product[] = [
    {
        type: "book",
        id: "book-1",
        price: 19.99,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald"
    },
    {
        type: "book",
        id: "book-2",
        price: 14.99,
        title: "1984",
        author: "George Orwell"
    },
    {
        type: "electronics",
        id: "elec-1",
        price: 299.99,
        item: "Smartphone",
        model: "Galaxy S21",
        warranty: 2
    },
    {
        type: "electronics",
        id: "elec-2",
        price: 159.99,
        item: "Headphones",
        model: "WH-1000XM4",
        warranty: 1
    },
    {
        type: "electronics",
        id: "elec-3",
        price: 89.99,
        item: "Smart Watch",
        model: "Fitbit Versa"
    },
    {
        type: "clothing",
        id: "cloth-1",
        price: 49.99,
        item: "T-Shirt",
        brand: "Nike",
        size: "L"
    },
    {
        type: "clothing",
        id: "cloth-2",
        price: 79.99,
        item: "Jeans",
        brand: "Levi's",
        size: "M"
    },
    {
        type: "clothing",
        id: "cloth-3",
        price: 39.99,
        item: "Jacket",
        brand: "Adidas"
    }
];

const products = new Collection<Product>(productData);

// showProducts function
function showProducts(filter?: string): void {
    const outputElement = document.querySelector<HTMLDivElement>('#output');
    if (!outputElement) return;

    let itemsToShow: Product[];

    if (filter) {
        itemsToShow = products.filter((item) => item.type === filter);
    } else {
        itemsToShow = products.getAll();
    }

    const htmlString = itemsToShow.map(renderProduct).join('');
    outputElement.innerHTML = htmlString;
}

// Setup event listeners and page load
document.addEventListener('DOMContentLoaded', () => {
    // Show all products by default
    showProducts();

    // Button event listeners
    const allButton = document.querySelector<HTMLButtonElement>('#all');
    const booksButton = document.querySelector<HTMLButtonElement>('#books');
    const electronicsButton = document.querySelector<HTMLButtonElement>('#electronics');
    const clothingButton = document.querySelector<HTMLButtonElement>('#clothing');

    if (allButton) {
        allButton.addEventListener('click', () => showProducts());
    }

    if (booksButton) {
        booksButton.addEventListener('click', () => showProducts('book'));
    }

    if (electronicsButton) {
        electronicsButton.addEventListener('click', () => showProducts('electronics'));
    }

    if (clothingButton) {
        clothingButton.addEventListener('click', () => showProducts('clothing'));
    }
});