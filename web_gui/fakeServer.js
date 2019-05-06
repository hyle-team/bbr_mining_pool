const http = require('http');
const request = require('request');
let response = '';

function getDashboard(hash, callback) {
  let params = {};
  request.get('https://pool.boolberry.com/api/dashboard', {json: params}, function (error, response, body) {
    if (error) callback(400, error); else callback(200, body);
  });
}
function getBlocks(hash, callback) {
  let params = {};
  request.get('https://pool.boolberry.com/api/blocks', {json: params}, function (error, response, body) {
    if (error) callback(400, error); else callback(200, body);
  });
}

function getMiner(hash, callback) {
  let params = {};
  request.get('https://pool.boolberry.com/api/miner/@mc', {json: params}, function (error, response, body) {
    if (error) callback(400, error); else callback(200, body);
  });
}



http.createServer(function (req, res) {
  console.log('request: ' + req.url);

  const headers = {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*"
  };

  var link = req.url.split('/');

  if (link[1] === 'dashboard') {
    let body = [];
    req.on('data', function (chunk) {
      body.push(chunk);
    }).on('end', function () {
      getDashboard('1111', function (code, data) {
        res.writeHead(code, headers);
        res.end(JSON.stringify(data));
      });
    });
  } else if (link[1] === 'blocks') {
    let body = [];
    req.on('data', function (chunk) {
      body.push(chunk);
    }).on('end', function () {
      getBlocks('1111', function (code, data) {
        res.writeHead(code, headers);
        res.end(JSON.stringify(data));
      });
    });
  } else if (link[1] === 'tx') {
    response = [
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 43400000000000,
        "tx": "7ce4bcd58f3d42e8038cec7eeb5010086995d797ebf547e93a3e5f0d68d47751",
        "time": "2019-02-21T15:27:53.449Z"
      },
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 29000000000000,
        "tx": "9fe805df3273d296200d49cb6a57b113bc6d4b628f325d2bb3d60d8131a937a8",
        "time": "2019-02-21T15:28:53.712Z"
      },
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 43500000000000,
        "tx": "e494b0b436243ecc10998449d0abb36f45c75c95ec7ca91b458617295327e048",
        "time": "2019-02-21T15:32:54.010Z"
      },
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 14400000000000,
        "tx": "ed3d0756624a25ecca443a3dd0ff21c226a73d60f8b4772865d17a5f91605994",
        "time": "2019-02-21T15:35:54.105Z"
      },
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 14500000000000,
        "tx": "cf573c5b7ce9f9f7cb84fc6515a7cc08ccac132c544865a179b7f2e81ed04d9a",
        "time": "2019-02-21T15:36:54.324Z"
      },
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 14500000000000,
        "tx": "a771ad35beda6949ed54ff1035599254f229911f712bec029c9da0e91654aea7",
        "time": "2019-02-21T15:37:54.529Z"
      },
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 14500000000000,
        "tx": "7af4496ed85dd21001ab3eb5332209f427d6298ba6c8dc258e7a729229dd4707",
        "time": "2019-02-21T15:39:54.986Z"
      },
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 29000000000000,
        "tx": "2376160832ece1b8c0812a38a0b72a6477bc60fe53667fa2fe1deb5602143512",
        "time": "2019-02-21T15:40:55.346Z"
      },
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 14500000000000,
        "tx": "49cd26b2100406cc4ac41f6e28bb37e0280a37dcac66c07ecf2f6ceb94ed4ec4",
        "time": "2019-02-21T15:41:57.654Z"
      }
    ];

    res.writeHead(200, headers);
    res.end(JSON.stringify(response));

  } else if (link[1] === 'balance') {
    response = [
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 17903740000
      }
    ];
    res.writeHead(200, headers);
    res.end(JSON.stringify(response));

  } else if (link[1] === 'alias') {
    response = true;
    res.writeHead(200, headers);
    res.end(JSON.stringify(response));

  } else if (link[1] === 'check') {
    response = true;
    res.writeHead(200, headers);
    res.end(JSON.stringify(response));

  } else if (link[1] === 'queue') {
    response = [
      {
        "address": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "alias": "alpha",
        "score": 139113805,
        "time": "2019-02-24T17:46:50.058Z"
      },
      {
        "address": "1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF",
        "alias": "beta",
        "score": 0,
        "time": "2019-02-24T17:47:03.605Z"
      },
      {
        "address": "1EGchyHaHR96Cjy26ENNNTEjrGzge59qWZ4Hjg219HM6GD8HPeKNyKMVYcaAqmhdQLdvBqzpWVqU8YXn6n2goDkgA1rmVxh",
        "alias": "gamma",
        "score": 0,
        "time": "2019-02-24T11:47:03.605Z"
      }
    ];
    res.writeHead(200, headers);
    res.end(JSON.stringify(response));

  } else if (link[1] === 'miner') {
    let body = [];
    req.on('data', function (chunk) {
      body.push(chunk);
    }).on('end', function () {
      getMiner('1111', function (code, data) {
        res.writeHead(code, headers);
        res.end(JSON.stringify(data));
      });
    });
  }

}).listen(3000);
