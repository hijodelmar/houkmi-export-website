import fs from 'fs';
import path from 'path';

export interface Review {
    id: string;
    name: string;
    company: string;
    country: string;
    rating: number;
    comment: string;
    image_url?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

const DATA_PATH = path.join(process.cwd(), 'data', 'reviews.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Initial dummy data
const initialData: Review[] = [
    {
        id: "1",
        name: "Markus Schmidt",
        company: "EuroFruit GmbH",
        country: "Germany",
        rating: 5,
        comment: "Outstanding quality. We've been importing tomatoes and peppers from HOUKMI EXPORT for 5 years. Their reliability and product freshness are unmatched in the Moroccan market.",
        status: "approved",
        createdAt: new Date().toISOString(),
        image_url: "https://i.pravatar.cc/150?u=markus"
    },
    {
        id: "2",
        name: "Alessandra Rossi",
        company: "Italia Fresca S.r.l.",
        country: "Italy",
        rating: 5,
        comment: "The best sweet oranges we've ever sourced. The color and juice content are exactly what our premium supermarkets demand. Highly professional logistics team.",
        status: "approved",
        createdAt: new Date().toISOString(),
        image_url: "https://i.pravatar.cc/150?u=alessandra"
    },
    {
        id: "3",
        name: "Jean-Pierre Laurent",
        company: "Marché de Paris",
        country: "France",
        rating: 4,
        comment: "Excellent partnership. Their watermelons are a hit every summer in Paris. Consistent quality and GlobalGAP certifications make them a trusted supplier.",
        status: "approved",
        createdAt: new Date().toISOString(),
        image_url: "https://i.pravatar.cc/150?u=jean"
    }
];

export async function getReviews(): Promise<Review[]> {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            await saveReviews(initialData);
            return initialData;
        }
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading reviews:", error);
        return initialData;
    }
}

export async function saveReviews(reviews: Review[]): Promise<void> {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(reviews, null, 2));
    } catch (error) {
        console.error("Error saving reviews:", error);
    }
}

export async function addReview(review: Omit<Review, 'id' | 'status' | 'createdAt'>): Promise<Review> {
    const reviews = await getReviews();
    const newReview: Review = {
        ...review,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    await saveReviews(reviews);
    return newReview;
}

export async function updateReviewStatus(id: string, status: 'approved' | 'rejected'): Promise<Review | null> {
    const reviews = await getReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) return null;

    reviews[index].status = status;
    await saveReviews(reviews);
    return reviews[index];
}

export async function deleteReview(id: string): Promise<boolean> {
    const reviews = await getReviews();
    const filtered = reviews.filter(r => r.id !== id);
    if (filtered.length === reviews.length) return false;

    await saveReviews(filtered);
    return true;
}
