

// поиlet 

export async function load({ fetch, url }) {

    let search = url.searchParams.get('search')

    if (search) {
        search = search.toLowerCase().replace(/[^a-zа-яё0-9\s]/g, '')
        let product = [];
        let urlproduct = '/api/v1/product_list?limit=1000';

        let response = await fetch(urlproduct);
        let json = await response.json();
        let products = json.data.rows;

        for (let i = 0; i < products.length; i++) {
            let title = products[i].title
            if (title) {
                title = title.toLowerCase().replace(/[^a-zа-яё0-9\s]/g, '');
            }
            let article = products[i].article
            if (article) {
                article = article.toLowerCase().replace(/[^a-zа-яё0-9\s]/g, '');
            }
            let searchArr = search.split(' ');
            let searchArrLength = searchArr.length;
            let searchCount = 0;
            for (let j = 0; j < searchArrLength; j++) {
                if (title) {
                    if (title.indexOf(searchArr[j]) !== -1) {
                        searchCount++;
                    }
                }
                if (article) {
                    if (article.indexOf(searchArr[j]) !== -1) {
                        searchCount++;
                    }
                }
            }
            if (searchCount === searchArrLength) {
                product.push(products[i]);
            }


        }

        return {
            product,
            search
        }
    } else {
        return {
            product: [],
            search: ''
        }
    }

}