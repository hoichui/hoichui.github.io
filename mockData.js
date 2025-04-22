// Mock Categories
const mockCategories = [
    { id: 1, name: "Drama", description: "Emotional and intense storylines" },
    { id: 2, name: "Thriller", description: "Suspenseful and exciting content" },
    { id: 3, name: "Comedy", description: "Light-hearted and humorous content" },
    { id: 4, name: "Romance", description: "Love and relationships" },
    { id: 5, name: "Mystery", description: "Puzzling and enigmatic stories" },
    { id: 6, name: "Action", description: "High-energy and thrilling content" },
    { id: 7, name: "Adventure", description: "Exciting journeys and explorations" },
    { id: 8, name: "Crime", description: "Stories involving criminal activities" }
];

// Mock Movies
const mockMovies = [
    {
        id: 1,
        title: "Feluda: The Mystery Unveiled",
        type: "movie",
        releaseYear: 2023,
        duration: "2h 15m",
        description: "Bengal's most famous detective returns in this thrilling adventure. Follow Feluda as he unravels a complex mystery in the streets of Kolkata.",
        thumbnail: "https://images.unsplash.com/photo-1617286647528-8737797c2222?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        banner: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80",
        ageRating: "12+",
        genres: ["Mystery", "Thriller", "Adventure"],
        starring: ["Abir Chatterjee", "Sabyasachi Chakraborty", "Parambrata Chattopadhyay"],
        director: "Srijit Mukherji",
        isOriginal: false,
        isFeatured: true
    },
    {
        id: 2,
        title: "Mithye Premer Golpo",
        type: "movie",
        releaseYear: 2023,
        duration: "1h 58m",
        description: "A heart-wrenching tale of love, deception, and redemption set in the backdrop of modern-day Kolkata.",
        thumbnail: "https://images.unsplash.com/photo-1598899247752-c129db9a75fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        ageRating: "15+",
        genres: ["Drama", "Romance"],
        starring: ["Ritwick Chakraborty", "Raima Sen", "Paoli Dam"],
        director: "Kaushik Ganguly",
        isOriginal: true,
        isFeatured: false
    },
    {
        id: 3,
        title: "Byomkesh",
        type: "movie",
        releaseYear: 2022,
        duration: "2h 05m",
        description: "The legendary Bengali detective Byomkesh Bakshi investigates a series of mysterious murders in pre-independence Kolkata.",
        thumbnail: "https://images.unsplash.com/photo-1637854890728-16451adcaeab?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        ageRating: "12+",
        genres: ["Mystery", "Crime", "Historical"],
        starring: ["Jisshu Sengupta", "Parambrata Chatterjee", "Swastika Mukherjee"],
        director: "Anjan Dutt",
        isOriginal: false,
        isFeatured: false
    },
    {
        id: 4,
        title: "Projapoti",
        type: "movie",
        releaseYear: 2022,
        duration: "2h 10m",
        description: "A poignant love story that transcends time and social barriers, set in rural Bengal of the 1970s.",
        thumbnail: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        ageRating: "U",
        genres: ["Romance", "Drama"],
        starring: ["Dev", "Mithila Palkar", "Mamata Shankar"],
        director: "Atanu Raychaudhuri",
        isOriginal: false,
        isFeatured: false
    },
    {
        id: 5,
        title: "Ami O Monju",
        type: "movie",
        releaseYear: 2023,
        duration: "1h 45m",
        description: "The bittersweet journey of two childhood friends as they navigate life's challenges and their own feelings for each other.",
        thumbnail: "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        ageRating: "U",
        genres: ["Drama", "Romance", "Coming of Age"],
        starring: ["Arpita Chatterjee", "Anirban Bhattacharya", "Sudipta Chakraborty"],
        director: "Mainak Bhaumik",
        isOriginal: true,
        isFeatured: true
    }
];

// Mock Series
const mockSeries = [
    {
        id: 101,
        title: "Montu Pilot",
        type: "series",
        releaseYear: 2022,
        description: "The gripping saga of Montu, a taxi driver who gets entangled in the criminal underworld of Kolkata while struggling to support his family.",
        thumbnail: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        banner: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80",
        ageRating: "18+",
        genres: ["Crime", "Drama", "Action"],
        starring: ["Sourav Das", "Kanchan Mullick", "Chandrayee Ghosh"],
        director: "Debaloy Bhattacharya",
        isOriginal: true,
        isFeatured: true
    },
    {
        id: 102,
        title: "Rahasya Romancha",
        type: "series",
        releaseYear: 2022,
        description: "An anthology series featuring spine-chilling tales of mystery, supernatural events, and psychological thrillers set in various parts of Bengal.",
        thumbnail: "https://images.unsplash.com/photo-1580130601254-05fa235abeac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        ageRating: "15+",
        genres: ["Mystery", "Thriller", "Horror"],
        starring: ["Anirban Bhattacharya", "Sauraseni Maitra", "Gaurav Chakrabarty"],
        director: "Abhirup Ghosh",
        isOriginal: true,
        isFeatured: false
    },
    {
        id: 103,
        title: "Gora",
        type: "series",
        releaseYear: 2021,
        description: "Based on Rabindranath Tagore's classic novel, this series explores complex themes of identity, religion, and nationalism in colonial India.",
        thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        ageRating: "12+",
        genres: ["Drama", "Historical", "Literary Adaptation"],
        starring: ["Ritwick Chakraborty", "Ishaa Saha", "Surangana Bandyopadhyay"],
        director: "Sayantan Mukherjee",
        isOriginal: true,
        isFeatured: false
    },
    {
        id: 104,
        title: "Mandaar",
        type: "series",
        releaseYear: 2022,
        description: "A dark and gritty adaptation of Shakespeare's Macbeth set in a coastal village of Bengal, exploring ambition, power, and moral corruption.",
        thumbnail: "https://images.unsplash.com/photo-1611048268329-db5f57108ddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        ageRating: "18+",
        genres: ["Drama", "Thriller", "Adaptation"],
        starring: ["Debashish Mondal", "Sohini Sarkar", "Ananya Chatterjee"],
        director: "Anirban Bhattacharya",
        isOriginal: true,
        isFeatured: false
    },
    {
        id: 105,
        title: "Tansener Tanpura",
        type: "series",
        releaseYear: 2021,
        description: "A musical treasure hunt across Bengal as musicians search for the legendary tanpura of Tansen, the greatest musician of the Mughal era.",
        thumbnail: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
        ageRating: "U",
        genres: ["Adventure", "Mystery", "Musical"],
        starring: ["Vikram Chatterjee", "Rupsha Mukhopadhyay", "Jayati Bhatia"],
        director: "Soumik Chattopadhyay",
        isOriginal: true,
        isFeatured: false
    }
];

// Combine all content
const mockContent = [...mockMovies, ...mockSeries];
