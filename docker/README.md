# read me
> sysctl -w vm.max_map_count=262144
> sysctl -w \
  > net.ipv4.tcp_keepalive_time=600 \
  > net.ipv4.tcp_keepalive_intvl=60 \
  > net.ipv4.tcp_keepalive_probes=20

  >> cat /proc/sys/net/ipv4/tcp_keepalive_time
  
> docker run -d -e ES_JAVA_POTS="-Xms256m -Xmx256m" -p 9200:9200 -p 9300:9300 -v /qpjoy/dt2/workplace/elasticsearch/es-master.yml:/usr/share/elasticsearch/config/elasticsearch.yml --name es-master elasticsearch:7.2.0


## install header
>> docker run -d -p 9100:9100 --name es-manager  mobz/elasticsearch-head:5
>> docker cp 27c75d05ad53:/usr/src/app/_site/vendor.js .
>> line 6886: contentType: application/x-www-form-urlencoded  ===>  contentType: "application/json;charset=UTF-8"
>> line 7574: contentType: application/x-www-form-urlencoded  ===>  application/json;charset=UTF-8

## install ik
>> docker exec -it es-master /bin/bash
>> ./bin/elasticsearch-plugin  install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.2.0/elasticsearch-analysis-ik-7.2.0.zip
>> exit
>> docker restart es-master
>> docker exec -it es-master /bin/bash
>> ./bin/elasticsearch-plugin list

## install docker-ui
>> docker run -it -d --name docker-ui -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock docker.io/uifd/ui-for-docker


# usage
1. http://23.225.161.124:9200/_cluster/health?pretty
2. https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html

### 创建索引，同时提供mapping
 curl -H "Content-Type: application/json" -XPUT
'http://23.225.161.124:9200/people?include_type_name=true' -d '
    {
        "settings": {
            "number_of_shards": 3,
            "number_of_replicas": 1
        },
        "mappings": {
            "properties": {
                "name": {
                    "type": "text"
                },
                "country": {
                    "type": "text"
                },
                "age": {
                    "type": "integer"
                },
                "date": {
                    "type": "date",
                    "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
                }
            }
        }
    }
'

### 为索引添加mapping
curl -H "Content-Type: application/json" -XPOST 
'http://23.225.161.124:9200/book/_mapping?pretty' -d '
    {
            "properties":{
                    "jurisdiction":{"type":"keyword"},
                    "total":{"type":"integer"},
                    "time":{"type":"date","format": "yyyy-MM-dd HH:mm:ss"}
                    }
    }'

### 增加指定ID为1的数据，不加为自动生成ID
curl -H "Content-Type: application/json" -XPUT
'http://23.225.161.124:9200/people/_doc/1' -d '
    {
        "name": "瓦力",
        "country": "China",
        "age": 30,
        "date": "1987-03-07",
        "extra": "whoami"
    }
'

### 更新指定ID为1的数据
curl -H "Content-Type: application/json" -XPOST
'http://23.225.161.124:9200/people/_doc/1/_update' -d '
    {
        "doc": {
            "name": "瓦力"
        }        
    }
'

### 执行脚本语言
curl -H "Content-Type: application/json" -XPOST
'http://23.225.161.124:9200/people/_doc/1/_update' -d '
    {
        "script": {
            "lang": "painless",
            "inline": "ctx._source.age += params.age",
            "params": {
                "age": 100
            }
		}
	}
'

### 删除数据
curl -H "Content-Type: application/json" -XDELETE
'http://23.225.161.124:9200/people/_doc/1'

### 删除索引
curl -H "Content-Type: application/json" -XDELETE
'http://23.225.161.124:9200/people'

### 条件查询
1. 查询所有
curl -H "Content-Type: application/json" -XGET
'http://23.225.161.124:9200/novel/_doc/1'

### _search查询
1. 查询指定ID, from,size指定查询起点和个数;返回值中took为查询时间
curl -H "Content-Type: application/json" -XPOST
'http://23.225.161.124:9200/novel/_search' -d '
    {
        "query": {
            "match_all": {
                
            }
        },
        "from": 1,
        "size": 1
    }
'

2. 查询关键字,sort为排序, 会修改_score
curl -H "Content-Type: application/json" -XPOST
'http://23.225.161.124:9200/novel/_search' -d '
    {
        "query": {
            "match": {
                "title": "ElasticSearch"
            }
        },
        "sort": [
            {"publish_date": {"order": "desc"}}
        ]
    }
'

3. 聚合查询 group_by, stats{count, min, max, avg, sum}
curl -H "Content-Type: application/json" -XPOST
'http://23.225.161.124:9200/novel/_search' -d '
    {
        "aggs": {
            "group_by_word_count": {
                "terms": {
                    "field": "word_count"
                }
            },
            "group_by_publish_date": {
                "terms": {
                    "field": "publish_date"
                }
            },
            "grades1_word_count": {
            	"stats": {
            		"field": "word_count"
            	}
            }
        }    
    }
'

### Query Context 提供_score
1. 全文本查询
1.1 match模糊匹配"ElasticSearch"、"入门", match_phrase匹配特定"ElasticSearch入门"
{
	"query": {
		"match": {
			"author": "ElasticSearch入门"
		}
	}
}
1.2 multi_match匹配多个字段只要包含关键字的
{
	"query": {
		"multi_match": {
			"query": "瓦力",
			"fields": ["author", "title"]
		}
	}
}
1.3 语法查询
// "query": "(ElasticSearch AND 大法) OR Python"
{
	"query": {
		"query_string": {
			"query": "瓦力 OR ElasticSearch",
            "fields": ["title", "author"]
		}
	}
}

2. 字段级别查询
{
	"query": {
		"term": {
			"author": "瓦力"
		}
	}
}
{
	"query": {
		"range": {
			"word_count": {
				"gte": 1000,
				"lte": 2000
			}
		}
	}
}
{
	"query": {
		"range": {
			"publish_date": {
				"gt": "2017-01-01",
				"lte": "now"
			}
		}
	}
}






### Filter Context 查询速度较快，only yes OR no
{
	"query": {
		"bool": {
			"filter":{
				"term": {
					"word_count": 1000
				}
			}
		}
	}
}

### 复合查询
1. 固定分数查询，不支持match，只支持filter
{
	"query": {
		"constant_score": {
			"filter": {
				"match": {
					"title": "ElasticSearch"
				}
			}
		}
	}
}
2. 设置分数并缓存 
{
	"query": {
		"constant_score": {
			"filter": {
				"match": {
					"title": "ElasticSearch"
				}
			},
			"boost": 2
		}
	}
}

should应该满足，或匹配; must必须满足，与逻辑; must_not必须不能满足
{
	"query": {
		"bool": {
			"should": [
				{
					"match": {
						"author": "瓦力"
					}
				},
				{
					"match": {
						"title": "ElasticSearch"
					}
				}
			],
            "filter": [
				{
					"term": {
						"word_count": 3000
					}
				}
			]
		}
	}
}

{
	"query": {
		"bool": {
			"must_not": {
				"term": {
					"author": "瓦力"
				}
			}
		}
	}
}

### node elasticsearch api
https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html

# reference
1. https://blog.csdn.net/qq_22211217/article/details/94665069
2. https://blog.csdn.net/qq_43308337/article/details/90069371
