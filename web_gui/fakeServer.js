var http = require('http');

var headers = {
  "Content-Type": "text/plain",
  "Access-Control-Allow-Origin": "*"
};

var response = '';

http.createServer(function (req, res) {
  console.log('request: ' + req.url);

  var link = req.url.split('/');

  if (link[1] === 'dashboard') {
    response = {
      "network": {
        "hashRate": 3444,
        "blockFound": 126,
        "difficulty": 413260,
        "blockHeight": 171960,
        "lastReward": 14.782005,
        "lastHash": "24bfb341da4d6424a7b0cb113665c4814812f5b32b1d68bbedd07430bf5804f6"
      },
      "pool": {
        "hashRate": 533869,
        "blockFound": 0,
        "miners": 0,
        "fee": 2,
        "effort": 0
      },
      "charts": [
        {
          "difficulty": 415600,
          "hashRate": 598289,
          "effort": 858.1323387872955,
          "time": "2019-02-21T15:40:51.468Z"
        },
        {
          "difficulty": 416062,
          "hashRate": 415249,
          "effort": 1380.4961760506847,
          "time": "2019-02-21T15:40:45.147Z"
        },
        {
          "difficulty": 416592,
          "hashRate": 680068,
          "effort": 1253.399969274494,
          "time": "2019-02-21T15:40:30.862Z"
        },
        {
          "difficulty": 417029,
          "hashRate": 92060,
          "effort": 855.1918451714389,
          "time": "2019-02-21T15:40:22.308Z"
        },
        {
          "difficulty": 417391,
          "hashRate": 107285,
          "effort": 1251.0006205212858,
          "time": "2019-02-21T15:39:43.435Z"
        },
        {
          "difficulty": 417930,
          "hashRate": 263207,
          "effort": 775.7710621395928,
          "time": "2019-02-21T15:38:54.755Z"
        },
        {
          "difficulty": 418173,
          "hashRate": 102985,
          "effort": 1248.6612000296527,
          "time": "2019-02-21T15:38:42.208Z"
        },
        {
          "difficulty": 418307,
          "hashRate": 207106,
          "effort": 1134.782826966797,
          "time": "2019-02-21T15:37:51.047Z"
        },
        {
          "difficulty": 418695,
          "hashRate": 84361,
          "effort": 774.3536464490859,
          "time": "2019-02-21T15:37:27.927Z"
        },
        {
          "difficulty": 419132,
          "hashRate": 204606,
          "effort": 1029.5902007004954,
          "time": "2019-02-21T15:36:49.252Z"
        },
        {
          "difficulty": 419650,
          "hashRate": 385254,
          "effort": 934.8356964136781,
          "time": "2019-02-21T15:36:28.154Z"
        },
        {
          "difficulty": 420132,
          "hashRate": 1524799,
          "effort": 701.5499890510602,
          "time": "2019-02-21T15:36:17.863Z"
        },
        {
          "difficulty": 420562,
          "hashRate": 70839,
          "effort": 932.8084800814148,
          "time": "2019-02-21T15:36:15.423Z"
        },
        {
          "difficulty": 421106,
          "hashRate": 33468,
          "effort": 699.9273342103888,
          "time": "2019-02-21T15:35:19.735Z"
        },
        {
          "difficulty": 421631,
          "hashRate": 67594,
          "effort": 930.4434446233793,
          "time": "2019-02-21T15:33:50.890Z"
        },
        {
          "difficulty": 422516,
          "hashRate": 248370,
          "effort": 1611.4367266565052,
          "time": "2019-02-21T15:32:51.867Z"
        },
        {
          "difficulty": 422934,
          "hashRate": 198080,
          "effort": 696.9021171152,
          "time": "2019-02-21T15:32:24.107Z"
        },
        {
          "difficulty": 423420,
          "hashRate": 389177,
          "effort": 632.8201313116999,
          "time": "2019-02-21T15:32:09.021Z"
        },
        {
          "difficulty": 423864,
          "hashRate": 2887378,
          "effort": 632.1572485514222,
          "time": "2019-02-21T15:32:02.050Z"
        },
        {
          "difficulty": 424274,
          "hashRate": 194204,
          "effort": 574.1329895303506,
          "time": "2019-02-21T15:32:00.477Z"
        },
        {
          "difficulty": 424788,
          "hashRate": 683262,
          "effort": 521.3075698936882,
          "time": "2019-02-21T15:31:47.119Z"
        },
        {
          "difficulty": 425163,
          "hashRate": 153869,
          "effort": 572.9324988298605,
          "time": "2019-02-21T15:31:43.487Z"
        },
        {
          "difficulty": 425692,
          "hashRate": 118382,
          "effort": 520.2005205641638,
          "time": "2019-02-21T15:31:27.092Z"
        },
        {
          "difficulty": 426124,
          "hashRate": 46379,
          "effort": 519.6731467835654,
          "time": "2019-02-21T15:31:07.414Z"
        },
        {
          "difficulty": 426564,
          "hashRate": 25802,
          "effort": 519.1371048658583,
          "time": "2019-02-21T15:30:19.252Z"
        },
        {
          "difficulty": 426983,
          "hashRate": 56938,
          "effort": 518.627673701295,
          "time": "2019-02-21T15:28:53.120Z"
        },
        {
          "difficulty": 427768,
          "hashRate": 99287,
          "effort": 470.6144452132932,
          "time": "2019-02-21T15:28:13.970Z"
        },
        {
          "difficulty": 428335,
          "hashRate": 2074972,
          "effort": 427.2648744557414,
          "time": "2019-02-21T15:27:53.551Z"
        },
        {
          "difficulty": 429008,
          "hashRate": 194613,
          "effort": 387.8132808712192,
          "time": "2019-02-21T15:27:52.041Z"
        },
        {
          "difficulty": 429526,
          "hashRate": 65261,
          "effort": 352.1323505445538,
          "time": "2019-02-21T15:27:43.334Z"
        },
        {
          "difficulty": 430021,
          "hashRate": 380915,
          "effort": 468.14876482776424,
          "time": "2019-02-21T15:27:19.362Z"
        },
        {
          "difficulty": 430464,
          "hashRate": 376130,
          "effort": 811.6532392952721,
          "time": "2019-02-21T15:27:13.235Z"
        },
        {
          "difficulty": 430855,
          "hashRate": 101941,
          "effort": 351.0461756275313,
          "time": "2019-02-21T15:27:03.611Z"
        },
        {
          "difficulty": 431147,
          "hashRate": 286937,
          "effort": 318.9167499715874,
          "time": "2019-02-21T15:26:48.512Z"
        },
        {
          "difficulty": 431458,
          "hashRate": 57795,
          "effort": 289.7153372981843,
          "time": "2019-02-21T15:26:43.101Z"
        },
        {
          "difficulty": 431910,
          "hashRate": 2158556,
          "effort": 318.3533606538399,
          "time": "2019-02-21T15:26:21.097Z"
        },
        {
          "difficulty": 431887,
          "hashRate": 6048,
          "effort": 289.4275585975035,
          "time": "2019-02-21T15:26:20.002Z"
        }
      ]
    };
    res.writeHead(200, headers);
    res.end(JSON.stringify(response));


  } else if (link[1] === 'blocks') {
    response = [
      [
        {
          "height": 171960,
          "difficulty": 413260,
          "hash": "24bfb341da4d6424a7b0cb113665c4814812f5b32b1d68bbedd07430bf5804f6",
          "reward": 14782005000000,
          "shares": 6949901,
          "startTime": "2019-02-21T15:41:18.012Z",
          "endTime": "2019-02-21T15:41:31.875Z"
        },
        {
          "height": 171959,
          "difficulty": 413841,
          "hash": "0411c03b6ceb6cbe45dd96532a464b6886acc6b7f54c0a7f0a87510ee9968bb4",
          "reward": 14786019000000,
          "shares": 6318092,
          "startTime": "2019-02-21T15:41:13.951Z",
          "endTime": "2019-02-21T15:41:17.617Z"
        },
        {
          "height": 171958,
          "difficulty": 414681,
          "hash": "2559a22244e79884f0890235d1b625e5bd23d1eb63e9b2bcbf24dce4ed1e5a9d",
          "reward": 14782033000000,
          "shares": 4315342,
          "startTime": "2019-02-21T15:40:53.621Z",
          "endTime": "2019-02-21T15:41:13.561Z"
        },
        {
          "height": 171957,
          "difficulty": 415091,
          "hash": "fc612ab4c1050e5b887e67cc5ffd2bf2c688c8c52a3ae761b55894a96b389a6f",
          "reward": 14782047000000,
          "shares": 3923038,
          "startTime": "2019-02-21T15:40:51.591Z",
          "endTime": "2019-02-21T15:40:53.097Z"
        }
      ],
      [
        {
          "height": 171956,
          "difficulty": 415600,
          "hash": "10c90342742ebc5a96ec37c9cb1f37d4e592e355806a9848993c7ff9c2cef469",
          "reward": 14782061000000,
          "shares": 3566398,
          "startTime": "2019-02-21T15:40:45.507Z",
          "endTime": "2019-02-21T15:40:51.468Z",
          "status": "confirmed"
        },
        {
          "height": 171955,
          "difficulty": 416062,
          "hash": "df0ac24700643b96f52c47d4731255849d19088d0b2133cf6187836eadbe4b62",
          "reward": 14782075000000,
          "shares": 5743720,
          "startTime": "2019-02-21T15:40:31.315Z",
          "endTime": "2019-02-21T15:40:45.147Z",
          "status": "confirmed"
        },
        {
          "height": 171954,
          "difficulty": 416592,
          "hash": "b77c477601159486d4a8733276e7372a51754171c490662f47bec89dc71d0cfc",
          "reward": 14786089000000,
          "shares": 5221564,
          "startTime": "2019-02-21T15:40:23.184Z",
          "endTime": "2019-02-21T15:40:30.862Z",
          "status": "confirmed"
        },
        {
          "height": 171953,
          "difficulty": 417029,
          "hash": "78a5168905aba3b6c804eaa3f7f57352f21b2d58117c18d6f5be2a6f1a194b39",
          "reward": 14784104000000,
          "shares": 3566398,
          "startTime": "2019-02-21T15:39:43.568Z",
          "endTime": "2019-02-21T15:40:22.308Z",
          "status": "confirmed"
        },
        {
          "height": 171952,
          "difficulty": 417391,
          "hash": "82b4dfee619a917266c433ebc5559c26e78d8ddcbc43cfcd0359f02534557391",
          "reward": 14782118000000,
          "shares": 5221564,
          "startTime": "2019-02-21T15:38:54.765Z",
          "endTime": "2019-02-21T15:39:43.435Z",
          "status": "confirmed"
        },
        {
          "height": 171951,
          "difficulty": 417930,
          "hash": "4eedecca78bb9a085a2fc4f2042c14698750d1c29bfe7dfa21b8112f00112d21",
          "reward": 14786132000000,
          "shares": 3242180,
          "startTime": "2019-02-21T15:38:42.437Z",
          "endTime": "2019-02-21T15:38:54.755Z",
          "status": "confirmed"
        },
        {
          "height": 171950,
          "difficulty": 418173,
          "hash": "eeb5448d9cd0f085ef1e39e994738500d29717814f42531d27cb8894a80dd7b4",
          "reward": 14782146000000,
          "shares": 5221564,
          "startTime": "2019-02-21T15:37:51.506Z",
          "endTime": "2019-02-21T15:38:42.208Z",
          "status": "confirmed"
        },
        {
          "height": 171949,
          "difficulty": 418307,
          "hash": "d1dcdfc078fbfdcb1c2644938ec4d7abfb0840259a855b9ce410f46ca81a045e",
          "reward": 14786160000000,
          "shares": 4746876,
          "startTime": "2019-02-21T15:37:28.127Z",
          "endTime": "2019-02-21T15:37:51.047Z",
          "status": "confirmed"
        },
        {
          "height": 171948,
          "difficulty": 418695,
          "hash": "bb113a3888eedb4a3b77599c30543520b99bc1acc1f23e7e8fd5d9f200ffbd0e",
          "reward": 14782174000000,
          "shares": 3242180,
          "startTime": "2019-02-21T15:36:49.495Z",
          "endTime": "2019-02-21T15:37:27.927Z",
          "status": "confirmed"
        },
        {
          "height": 171947,
          "difficulty": 419132,
          "hash": "5c48f2fb466cb412e3b955d658135c37b9d26b1b9146056cafd91dfdbd007e40",
          "reward": 14782188000000,
          "shares": 4315342,
          "startTime": "2019-02-21T15:36:28.161Z",
          "endTime": "2019-02-21T15:36:49.252Z",
          "status": "confirmed"
        },
        {
          "height": 171946,
          "difficulty": 419650,
          "hash": "762d8aa98554065955d372a01ba7a158275d44bd126ab2927a13c366f271c62f",
          "reward": 14782202000000,
          "shares": 3923038,
          "startTime": "2019-02-21T15:36:17.971Z",
          "endTime": "2019-02-21T15:36:28.154Z",
          "status": "confirmed"
        },
        {
          "height": 171945,
          "difficulty": 420132,
          "hash": "e1f08c5c52198652b5e3f9c726f5892828276d64349a949ec964aa1b866a637a",
          "reward": 14784216000000,
          "shares": 2947436,
          "startTime": "2019-02-21T15:36:15.930Z",
          "endTime": "2019-02-21T15:36:17.863Z",
          "status": "confirmed"
        },
        {
          "height": 171944,
          "difficulty": 420562,
          "hash": "d246a2200fa93adc3e5d8d39e29d34687468dd3ff5907d149e3d8e4fbe222ee6",
          "reward": 14784230000000,
          "shares": 3923038,
          "startTime": "2019-02-21T15:35:20.043Z",
          "endTime": "2019-02-21T15:36:15.423Z",
          "status": "confirmed"
        },
        {
          "height": 171943,
          "difficulty": 421106,
          "hash": "2a6808c8e53d5233bdce36b04b427ecc8badf32e28a49ecac2e96e5a7c094904",
          "reward": 14786244000000,
          "shares": 2947436,
          "startTime": "2019-02-21T15:33:51.668Z",
          "endTime": "2019-02-21T15:35:19.735Z",
          "status": "confirmed"
        },
        {
          "height": 171942,
          "difficulty": 421631,
          "hash": "d5c41ee49214640e7c76c8ca96ed39676f6ea8cf91cc8fa231f8f92c3a75595d",
          "reward": 14782259000000,
          "shares": 3923038,
          "startTime": "2019-02-21T15:32:52.852Z",
          "endTime": "2019-02-21T15:33:50.890Z",
          "status": "confirmed"
        },
        {
          "height": 171941,
          "difficulty": 422516,
          "hash": "52104cee8dba6f5d80db62c1f1b6aab47047f27b97190f174b553388640105d0",
          "reward": 14782273000000,
          "shares": 6808578,
          "startTime": "2019-02-21T15:32:24.454Z",
          "endTime": "2019-02-21T15:32:51.867Z",
          "status": "confirmed"
        },
        {
          "height": 171940,
          "difficulty": 422934,
          "hash": "450ed814bb9c52415d94651498e96ed24cd7c3f7ec51cf569c9845ad7606606e",
          "reward": 14782287000000,
          "shares": 2947436,
          "startTime": "2019-02-21T15:32:09.227Z",
          "endTime": "2019-02-21T15:32:24.107Z",
          "status": "confirmed"
        },
        {
          "height": 171939,
          "difficulty": 423420,
          "hash": "e18d3363ae98f8e06a5e995052de9bcc4195b8ed17114ea9a15bf08332ada6f2",
          "reward": 14782301000000,
          "shares": 2679487,
          "startTime": "2019-02-21T15:32:02.136Z",
          "endTime": "2019-02-21T15:32:09.021Z",
          "status": "confirmed"
        },
        {
          "height": 171938,
          "difficulty": 423864,
          "hash": "5fb26d60defcc1593613f9916aa7d198fb43ce9bd4766e0b894dc51ed1836097",
          "reward": 14784315000000,
          "shares": 2679487,
          "startTime": "2019-02-21T15:32:01.122Z",
          "endTime": "2019-02-21T15:32:02.050Z",
          "status": "confirmed"
        },
        {
          "height": 171937,
          "difficulty": 424274,
          "hash": "592a951ff5ec3f704c46d66827f1136342c583c47a824150839dfa4cb90dac47",
          "reward": 14782329000000,
          "shares": 2435897,
          "startTime": "2019-02-21T15:31:47.934Z",
          "endTime": "2019-02-21T15:32:00.477Z",
          "status": "confirmed"
        },
        {
          "height": 171936,
          "difficulty": 424788,
          "hash": "c91d8590b1cdab40d0771f12a6d96893a161d264e5911663d9fea34a3ae7ba93",
          "reward": 14782343000000,
          "shares": 2214452,
          "startTime": "2019-02-21T15:31:43.878Z",
          "endTime": "2019-02-21T15:31:47.119Z",
          "status": "confirmed"
        },
        {
          "height": 171935,
          "difficulty": 425163,
          "hash": "9f71cf93db5dfd25ea82ddd43581fb001a47e02d9d3be1fa150d9b6aaef2eba2",
          "reward": 14782357000000,
          "shares": 2435897,
          "startTime": "2019-02-21T15:31:27.656Z",
          "endTime": "2019-02-21T15:31:43.487Z",
          "status": "confirmed"
        },
        {
          "height": 171934,
          "difficulty": 425692,
          "hash": "c8b25c0f26f6f1fe167e90ec7242d5efb522407ebb5d487ba7769c4fba408132",
          "reward": 14784371000000,
          "shares": 2214452,
          "startTime": "2019-02-21T15:31:08.386Z",
          "endTime": "2019-02-21T15:31:27.092Z",
          "status": "confirmed"
        },
        {
          "height": 171933,
          "difficulty": 426124,
          "hash": "3c08c5567642a4e1e2e64137c7d9fd0890d0d40a500998c9899f591979ef4b87",
          "reward": 14786385000000,
          "shares": 2214452,
          "startTime": "2019-02-21T15:30:19.667Z",
          "endTime": "2019-02-21T15:31:07.414Z",
          "status": "confirmed"
        },
        {
          "height": 171932,
          "difficulty": 426564,
          "hash": "34312c2f6fa053781aec087ff556747cfad61b6ea102d62cbf344c3fadce4659",
          "reward": 14782400000000,
          "shares": 2214452,
          "startTime": "2019-02-21T15:28:53.427Z",
          "endTime": "2019-02-21T15:30:19.252Z",
          "status": "confirmed"
        },
        {
          "height": 171931,
          "difficulty": 426983,
          "hash": "091f72f052dfdac58425d533023b4e3d848510177539ada383d654b1b1887d39",
          "reward": 14782414000000,
          "shares": 2214452,
          "startTime": "2019-02-21T15:28:14.228Z",
          "endTime": "2019-02-21T15:28:53.120Z",
          "status": "confirmed"
        },
        {
          "height": 171930,
          "difficulty": 427768,
          "hash": "4e97cd41e107f56945ff63822065e474aed43503945420ff3666f15d655794b4",
          "reward": 14786428000000,
          "shares": 2013138,
          "startTime": "2019-02-21T15:27:53.694Z",
          "endTime": "2019-02-21T15:28:13.970Z",
          "status": "confirmed"
        },
        {
          "height": 171929,
          "difficulty": 428335,
          "hash": "69bebb63c67e3308c339b92c7de79d23323e90774353a478ff6cc3ddc45a5e59",
          "reward": 14782442000000,
          "shares": 1830125,
          "startTime": "2019-02-21T15:27:52.669Z",
          "endTime": "2019-02-21T15:27:53.551Z",
          "status": "confirmed"
        },
        {
          "height": 171928,
          "difficulty": 429008,
          "hash": "4fddc34d3a92258ac93d23dc4844e9b21b8e8a16e3a201195ec3ed5c58ef9b11",
          "reward": 14782456000000,
          "shares": 1663750,
          "startTime": "2019-02-21T15:27:43.492Z",
          "endTime": "2019-02-21T15:27:52.041Z",
          "status": "confirmed"
        },
        {
          "height": 171927,
          "difficulty": 429526,
          "hash": "9f2052172b5e19bbfd017c06626745224ab6c0df6b2811fdacd6ac27155c6eeb",
          "reward": 14782470000000,
          "shares": 1512500,
          "startTime": "2019-02-21T15:27:20.158Z",
          "endTime": "2019-02-21T15:27:43.334Z",
          "status": "confirmed"
        },
        {
          "height": 171926,
          "difficulty": 430021,
          "hash": "137d481903bb042507e8ac31981934dfad2d0cbf9f4c84140c1bcf63e6846975",
          "reward": 14782484000000,
          "shares": 2013138,
          "startTime": "2019-02-21T15:27:14.077Z",
          "endTime": "2019-02-21T15:27:19.362Z",
          "status": "confirmed"
        },
        {
          "height": 171925,
          "difficulty": 430464,
          "hash": "169dd7927022cd2408db2510e2fd035c9c5feef8b3f078e036e97e2ab08b835a",
          "reward": 14782498000000,
          "shares": 3493875,
          "startTime": "2019-02-21T15:27:03.946Z",
          "endTime": "2019-02-21T15:27:13.235Z",
          "status": "confirmed"
        },
        {
          "height": 171924,
          "difficulty": 430855,
          "hash": "a8d9a8eb41018b53f358a0b6aa390d5d73d6a58d617f9574bfd47135d60479d2",
          "reward": 14782512000000,
          "shares": 1512500,
          "startTime": "2019-02-21T15:26:48.774Z",
          "endTime": "2019-02-21T15:27:03.611Z",
          "status": "confirmed"
        },
        {
          "height": 171923,
          "difficulty": 431147,
          "hash": "b398eff34ae61f9f197d94a9a3b8070f612d71c15ed16ad0d47d5c039d9e0710",
          "reward": 14782526000000,
          "shares": 1375000,
          "startTime": "2019-02-21T15:26:43.720Z",
          "endTime": "2019-02-21T15:26:48.512Z",
          "status": "confirmed"
        },
        {
          "height": 171922,
          "difficulty": 431458,
          "hash": "63c95436792aee0d0a533015b6d09cedd233bed1b6b44d25327656b03f8fff11",
          "reward": 14782541000000,
          "shares": 1250000,
          "startTime": "2019-02-21T15:26:21.473Z",
          "endTime": "2019-02-21T15:26:43.101Z",
          "status": "confirmed"
        },
        {
          "height": 171921,
          "difficulty": 431910,
          "hash": "f96b3effb42d74b8d81b9fb5890c05a6cdfc9587505725bb77807b7103c2eee5",
          "reward": 14782555000000,
          "shares": 1375000,
          "startTime": "2019-02-21T15:26:20.460Z",
          "endTime": "2019-02-21T15:26:21.097Z",
          "status": "confirmed"
        },
        {
          "height": 171920,
          "difficulty": 431887,
          "hash": "f666937034131cdd3084eabc542d17cd19349eb19197441eeffbff055ad7843a",
          "reward": 14782569000000,
          "shares": 1250000,
          "startTime": "2019-02-21T15:22:53.328Z",
          "endTime": "2019-02-21T15:26:20.002Z",
          "status": "confirmed"
        }
      ]
    ];

    res.writeHead(200, headers);
    res.end(JSON.stringify(response));


  } else if (link[1] === 'tx') {
    // var hash = link[2];
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
    // var hash = link[2];
    response = [
      {
        "miner": "1GWbUQs8amwhXqQ8YBBbpKHywY8wnYKBkauZQnKZE4XwHjUfk4PoMWdJd1ugm62kbAcdBXB92stju9NY16beWwibKM2sBBP",
        "balance": 17903740000
      }
    ];
    res.writeHead(200, headers);
    res.end(JSON.stringify(response));


  } else if (link[1] === 'alias') {
    // var hash = link[2];
    // var alias = link[3];
    response = true;
    res.writeHead(200, headers);
    res.end(JSON.stringify(response));


  } else if (link[1] === 'check') {
    // var alias = link[2];
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
    // var hash = link[2];

    response = {
      "overview": {
        "unconfirmed": 0.76107171714611,
        "confirmed": 6.98688,
        "total": 43.5,
        "h24": 14.5,
        "shares": 45564073,
        "threshold": 1,
        "hashRate": 246078
      },
      "payments": {
        "transactions": [
          {
            "balance": 29000000000000,
            "tx": "5f74da9cf0a80be5165227406d76634b672ae53e3b7b313d4c30606093f70461",
            "time": "2019-02-23T15:00:47.058Z"
          },
          {
            "balance": 14500000000000,
            "tx": "91ff61a744dbf86cc97c931ba04cbcbfa58dcfd0f5efb4e5356d35de96967446",
            "time": "2019-02-25T15:09:16.155Z"
          }
        ]
      }
    };
    res.writeHead(200, headers);
    res.end(JSON.stringify(response));

  }

}).listen(3000);
