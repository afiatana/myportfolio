
async function test() {
    try {
        const url = 'https://mahidara.co/wp-json/wp/v2/posts?_embed&per_page=10&author=3';
        console.log('Fetching:', url);
        const res = await fetch(url);
        if (!res.ok) {
            console.log('Error status:', res.status, res.statusText);
            const text = await res.text();
            console.log('Response body:', text);
            return;
        }
        const data = await res.json();
        console.log('Number of posts found:', data.length);
        if (data.length > 0) {
            console.log('First post title:', data[0].title.rendered);
        } else {
            console.log('No posts found for this author ID.');
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

test();
