http://103.27.108.110:9200/_cat/nodes?v&pretty

curl -XGET 'http://103.27.108.110:9200/_cat/nodes?v&pretty'

steps:
put customers products orders 
put mobiles
get indices

curl -H "Content-Type: application/x-ndjson" -XPOST 'http://103.27.108.110:9200/customers/personal/_bulk?pretty&refresh' --data-binary @"customers.json"