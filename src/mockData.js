import { v4 as uuidv4 } from 'uuid'

const mockData = [
    {
        id: uuidv4(),
        title: ' 💻 Tutorials',
        cards: [
            {
                id: uuidv4(),
                title: 'Learn JavaScript',
                videoLink: 'https://www.youtube.com/watch?v=BSG5iHK9Scw'
            },
            {
                id: uuidv4(),
                title: 'Learn Git',
                videoLink: 'https://www.youtube.com/watch?v=BSG5iHK9Scw'
            },
            {
                id: uuidv4(),
                title: 'Learn Python',
                videoLink: 'https://www.youtube.com/watch?v=BSG5iHK9Scw'
            },
        ]
    },
    {
        id: uuidv4(),
        title: '📚 Course tutorials',
        cards: [
            {
                id: uuidv4(),
                title: 'Learn CSS',
                videoLink: 'https://www.youtube.com/watch?v=BSG5iHK9Scw'

            },
            {
                id: uuidv4(),
                title: 'Learn Golang',
                videoLink: 'https://www.youtube.com/watch?v=BSG5iHK9Scw'

            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Completed',
        cards: [
            {
                id: uuidv4(),
                title: 'Learn Cassendra',
                videoLink: 'https://www.youtube.com/watch?v=BSG5iHK9Scw'

            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ❌ Not Completed',
        cards: [
            {
                id: uuidv4(),
                title: 'Learn JAVA',
                videoLink: 'https://www.youtube.com/watch?v=BSG5iHK9Scw'

            }
        ]
    },
    {
        id: uuidv4(),
        title: '📺 Entertainment',
        cards: [
            {
                id: uuidv4(),
                title: 'Watch Friends',
                videoLink: 'https://www.youtube.com/watch?v=BSG5iHK9Scw'

            }
        ]
    }
]

export default mockData;