function onFormSubmit(e) {
// Mapiranje polja — prilagodi imenima/indeksima iz svoje forme
var r = e.response.getItemResponses();
var payload = {
fullName: r[0].getResponse(),
email: r[1].getResponse(),
phone: r[2].getResponse(),
dateOfBirth: r[3].getResponse(),
// ... dodaj ostala polja po potrebi ...
};
4
var options = {
method: 'post',
contentType: 'application/json',
headers: { 'Idempotency-Key': 'form-' + e.response.getId() },
payload: JSON.stringify(payload),
muteHttpExceptions: true
};
var url = 'https://<your-vercel-app>.vercel.app/api/register';
var res = UrlFetchApp.fetch(url, options);
Logger.log(res.getResponseCode() + ' ' + res.getContentText());
}

