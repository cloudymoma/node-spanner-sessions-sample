# node-spanner-sessions-sample

Sample codes on how to configure session pool in Node.js client for Cloud Spanner

## How to configure session pool in Node.js client for Cloud Spanner

+ Configure Maximum gRPC channel number
```
node_modules/@google-cloud/spanner/build/src/spanner_grpc_config.json

"channelPool": {
        #increase channel number, and this channel number * 100 = maximum sessions number
        "maxSize": 10,
        "maxConcurrentStreamsLowWatermark": 100
    },
```

+ Configure [SessionPoolOptions](https://github.com/googleapis/nodejs-spanner/blob/master/src/session-pool.ts) to specify the session pool configuration
```
#common.js

const mySessionPoolOptions ={
    max: 100,
    maxIdle: 1,
    min: 100,
    idlesAfter: 1, 
};

const database = instance.database(databaseId,mySessionPoolOptions);
```

## Demo

+ Start express
```
npm start
```

+ Open http://localhost:3000, see the following response, and it means that data connection is created.
```
{name:'',value:'123456789'}
```

+ Use gcloud to check the session number
```
gcloud spanner databases sessions list --instance=testing --database=db > /tmp/1.lst

paste -d' ' - - - - </tmp/1.lst >/tmp/final.lst //format the output

below is sessions information, you could check how many session are created. Please note the session has the TTL even after the node.js program is terminated.

--- approximateLastUseTime: '2020-06-11T08:05:22.417261Z' createTime: '2020-06-11T07:55:17.420371Z' name: projects/test/instances/testing/databases/db/sessions/AN4G3x8L4DrriZbcY0fbsJYVev8awfQce8JcOZHXwNcsVekkLxasCUb_gc65qw
```
