// route for the profile page
app.get('/profile', async (req, res) => {
    // get the data for the user
    const user = {
        id: 1,
        username: 'monalisa',
        display_name: 'Mona Lisa',
        profile_picture: 'https://picsum.photos/200',
        password: 'iammonalisa',
        email: 'monalisa@gmail.com',
        followers: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        following: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        communities: []
    }

    const posts = [
        {
            id: 1,
            made_by: 1,
            liked_by: [2, 3, 4, 5, 6, 7, 8, 9, 10],
            images: [],
            content: 'I just visited this crazy painting of me at the Louvre... definitely check it out, guys!',
            replies: [
                {
                    id: 2,
                    made_by: 2,
                    liked_by: [1, 3, 4],
                    images: [],
                    content: 'Wow, that sounds amazing! I’ve been wanting to see it myself!',
                    replies: [
                        {
                            id: 3,
                            made_by: 3,
                            liked_by: [1, 2],
                            images: [],
                            content: 'I went there last year! It’s such an incredible experience.',
                            replies: []
                        },
                        {
                            id: 4,
                            made_by: 4,
                            liked_by: [1, 2, 5],
                            images: [],
                            content: 'Let’s all plan a group trip next time!',
                            replies: []
                        }
                    ]
                },
                {
                    id: 5,
                    made_by: 5,
                    liked_by: [1, 2, 6],
                    images: [],
                    content: 'I wish I could go, but the tickets are too expensive right now.',
                    replies: [
                        {
                            id: 6,
                            made_by: 6,
                            liked_by: [1, 3],
                            images: [],
                            content: 'Maybe you can find a discount or go during the off-season?',
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 7,
            made_by: 1,
            liked_by: [2, 3, 5, 6],
            images: [],
            content: 'Just finished my first marathon! Such a surreal experience!',
            replies: [
                {
                    id: 8,
                    made_by: 8,
                    liked_by: [1, 9, 10],
                    images: [],
                    content: 'Congrats! How long did it take you?',
                    replies: [
                        {
                            id: 9,
                            made_by: 1,
                            liked_by: [8, 10],
                            images: [],
                            content: 'Thanks! Took me just under 4 hours!',
                            replies: []
                        }
                    ]
                },
                {
                    id: 10,
                    made_by: 9,
                    liked_by: [1],
                    images: [],
                    content: 'Amazing! You’re inspiring me to try it next year.',
                    replies: []
                }
            ]
        },
        {
            id: 11,
            made_by: 1,
            liked_by: [2, 3],
            images: [],
            content: 'Just got my new gaming setup! Razer and Newegg came through big time!',
            replies: [
                {
                    id: 12,
                    made_by: 3,
                    liked_by: [1, 10],
                    images: [],
                    content: 'Let’s game together soon! What games did you get?',
                    replies: []
                },
                {
                    id: 13,
                    made_by: 5,
                    liked_by: [2, 1],
                    images: [],
                    content: 'Nice setup! Razer products are always top-notch.',
                    replies: [
                        {
                            id: 14,
                            made_by: 1,
                            liked_by: [3],
                            images: [],
                            content: 'Absolutely! The mouse and keyboard feel amazing.',
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 15,
            made_by: 1,
            liked_by: [6, 8, 9],
            images: [],
            content: 'Finally tried the famous coffee place downtown—totally lives up to the hype!',
            replies: [
                {
                    id: 16,
                    made_by: 8,
                    liked_by: [4, 10],
                    images: [],
                    content: 'Did you try their espresso? It’s the best in town!',
                    replies: [
                        {
                            id: 11,
                            made_by: 1,
                            liked_by: [8],
                            images: [],
                            content: 'Yes, it was amazing! I’ll definitely be back.',
                            replies: []
                        }
                    ]
                },
                {
                    id: 18,
                    made_by: 6,
                    liked_by: [4, 7],
                    images: [],
                    content: 'I’ve heard about that place. Was it crowded?',
                    replies: [
                        {
                            id: 19,
                            made_by: 1,
                            liked_by: [6],
                            images: [],
                            content: 'A bit, but the vibe was so good it didn’t bother me!',
                            replies: []
                        }
                    ]
                }
            ]
        }
    ];

    const result = {user: user, posts: posts}
    
    res.json(result)
})