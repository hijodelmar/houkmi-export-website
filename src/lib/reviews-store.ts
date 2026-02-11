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

const initialData: Review[] = [
    {
        id: "1",
        name: "Markus Schmidt",
        company: "EuroFruit GmbH",
        country: "Germany",
        rating: 5,
        comment: "Outstanding quality. We've been importing tomatoes and peppers from HOUKMI EXPORT for 5 years. Their reliability and product freshness are unmatched in the Moroccan market.",
        status: "approved",
        createdAt: "2024-01-15T12:00:00.000Z",
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
        createdAt: "2024-02-10T14:30:00.000Z",
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
        createdAt: "2024-03-05T09:15:00.000Z",
        image_url: "https://i.pravatar.cc/150?u=jean"
    },
    {
        id: "4",
        name: "Dmitry Volkov",
        company: "Nordic Trade Group",
        country: "Russia",
        rating: 5,
        comment: "Reliable exporter for the Russian market. They handle the complex logistics and documentation perfectly. The peppers arrive crisp and fresh even after long transit.",
        status: "approved",
        createdAt: "2024-03-20T11:45:00.000Z",
        image_url: "https://i.pravatar.cc/150?u=dmitry"
    },
    {
        id: "5",
        name: "Sarah Van den Berg",
        company: "Benelux Imports",
        country: "Netherlands",
        rating: 5,
        comment: "A true B2B partner. HOUKMI EXPORT understands the European standards for residue levels and quality. Their transparency and communication are top-tier.",
        status: "approved",
        createdAt: "2024-04-01T16:20:00.000Z",
        image_url: "https://i.pravatar.cc/150?u=sarah"
    }
];

// Memory cache for the session/server instance
let reviewsCache: Review[] | null = null;

// Paths
const TMP_PATH = '/tmp/reviews.json';
const REPO_PATH = path.join(process.cwd(), 'data', 'reviews.json');

export async function getReviews(): Promise<Review[]> {
    if (reviewsCache) return reviewsCache;

    try {
        // 1. Try /tmp (dynamic changes)
        if (fs.existsSync(TMP_PATH)) {
            const data = fs.readFileSync(TMP_PATH, 'utf8');
            reviewsCache = JSON.parse(data);
            return reviewsCache || initialData;
        }

        // 2. Try Repository data (seeded file)
        if (fs.existsSync(REPO_PATH)) {
            const data = fs.readFileSync(REPO_PATH, 'utf8');
            reviewsCache = JSON.parse(data);
            return reviewsCache || initialData;
        }
    } catch (error) {
        console.error("Error reading reviews:", error);
    }

    // 3. Fallback to code constant
    reviewsCache = [...initialData];
    return reviewsCache;
}

export async function saveReviews(reviews: Review[]): Promise<void> {
    reviewsCache = reviews;
    try {
        fs.writeFileSync(TMP_PATH, JSON.stringify(reviews, null, 2));
    } catch (error) {
        // Vercel /tmp is only writable in some cases, but we keep memory cache
        console.error("Error saving reviews to /tmp:", error);
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
    const updatedReviews = [...reviews, newReview];
    await saveReviews(updatedReviews);
    return newReview;
}

export async function updateReviewStatus(id: string, status: 'approved' | 'rejected'): Promise<Review | null> {
    const reviews = await getReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) return null;

    const updatedReviews = [...reviews];
    updatedReviews[index] = { ...updatedReviews[index], status };
    await saveReviews(updatedReviews);
    return updatedReviews[index];
}

export async function deleteReview(id: string): Promise<boolean> {
    const reviews = await getReviews();
    const filtered = reviews.filter(r => r.id !== id);
    if (filtered.length === reviews.length) return false;

    await saveReviews(filtered);
    return true;
}
