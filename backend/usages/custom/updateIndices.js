client.indices.updateAliases({
    index: 'lilith_api',
    body: {
        mappings: {
            properties: {
                files: {
                    type: 'nested',
                    properties: {
                        file_name: {
                            type: "keyword"
                        },
                        file_url: {
                            type: "keyword"
                        }
                    }
                },
            }
        }
    }
}, { ignore: [400] }).then((...dt) => {
    dt.map(console.log);
});
