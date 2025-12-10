
async function test() {
    try {
        const url = 'https://mahidara.co/wp-json/wp/v2/posts?_embed&per_page=10&author=3';
        console.log('Fetching:', url);
        const res = await fetch(url);
        const data = await res.json();
        if (data.length > 0) {
            console.log('First post title:', data[0].title.rendered);
            console.log('Has embedded:', !!data[0]._embedded);
            console.log('Featured media:', data[0]._embedded ? data[0]._embedded['wp:featuredmedia'] : 'N/A');
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

test();
