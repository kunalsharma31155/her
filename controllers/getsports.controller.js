const https=require("https");

module.exports.getMatches =  async (req,res,next) => {
    var url="https://api.the-odds-api.com/v3/odds/?apiKey="+req.body.params.apiKey+"&sport="+req.body.params.sport+"&region="+req.body.params.region;
    https.request(url, callback).end()

function callback (matchResponse) {
  let jsonString = ''
  matchResponse.on('data', chunk => {
    jsonString += chunk
  })
  matchResponse.on('end', () => {
    res.status(200).json({success : true, matches : JSON.parse(jsonString)})
  })
}
}