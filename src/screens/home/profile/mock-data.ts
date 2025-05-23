export interface ProfileDetailsParams {
  id: number;
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
}

export const mockData: ProfileDetailsParams[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/image1/400/300',
    title: 'Exploring the Mountains',
    description:
      'An amazing journey through breathtaking mountain ranges with stunning views.',
    author: 'John Doe',
    date: '2024-04-01',
    tags: ['travel', 'nature', 'adventure'],
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/image2/400/300',
    title: 'Tech Trends in 2025',
    description:
      'A deep dive into emerging technologies shaping the future of software development.',
    author: 'Sara Khan',
    date: '2024-04-03',
    tags: ['technology', 'future', 'software'],
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/image3/400/300',
    title: 'Healthy Eating on a Budget',
    description:
      'Tips and recipes for eating healthy without breaking the bank.',
    author: 'Ahsan Bhatti',
    date: '2024-04-02',
    tags: ['health', 'food', 'budget'],
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/image4/400/300',
    title: 'Designing for User Experience',
    description:
      'Learn the principles behind intuitive and effective UI/UX design.',
    author: 'Emily Watson',
    date: '2024-03-28',
    tags: ['design', 'ui', 'ux'],
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/image5/400/300',
    title: 'Remote Work Productivity',
    description: 'How to stay focused and efficient while working from home.',
    author: 'Ali Raza',
    date: '2024-04-05',
    tags: ['remote', 'productivity', 'career'],
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/image6/400/300',
    title: 'The Art of Minimalist Living',
    description:
      'Discover how less can actually be more in both life and design.',
    author: 'Fatima Noor',
    date: '2024-04-04',
    tags: ['lifestyle', 'minimalism', 'wellbeing'],
  },
  {
    id: 7,
    image: 'https://picsum.photos/seed/image7/400/300',
    title: 'Mobile App Development Tips',
    description:
      'Best practices and tools for developing high-performance mobile apps.',
    author: 'Kamran Sheikh',
    date: '2024-04-06',
    tags: ['development', 'mobile', 'reactnative'],
  },
  {
    id: 8,
    image: 'https://picsum.photos/seed/image8/400/300',
    title: "Beginner's Guide to Investing",
    description:
      'Everything you need to know to start investing with confidence.',
    author: 'Maria Ahmed',
    date: '2024-04-01',
    tags: ['finance', 'investing', 'money'],
  },
  {
    id: 9,
    image: 'https://picsum.photos/seed/image9/400/300',
    title: 'The Power of Morning Routines',
    description:
      'How starting your day right can boost productivity and mental clarity.',
    author: 'Zeeshan Ali',
    date: '2024-03-30',
    tags: ['routine', 'selfhelp', 'productivity'],
  },
  {
    id: 10,
    image: 'https://picsum.photos/seed/image10/400/300',
    title: 'Understanding Async in JavaScript',
    description:
      'A beginner-friendly breakdown of promises, async/await, and handling concurrency.',
    author: 'Bilal Hussain',
    date: '2024-04-07',
    tags: ['javascript', 'programming', 'async'],
  },
];
