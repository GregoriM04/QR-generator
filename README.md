# QR Generator with JavaScript

![screenshot](/assets/images/screenshot.png "https://gregorim04.github.io/QR-generator/")

This is a simple QR generator component using the [Goqr.me](https://goqr.me/) API. It can generate QR codes using text and URLs.


There was a lot of troubleshooting while coding this, especially when adding animations as feedback. However, it was totally worthwhile because it makes a huge difference, in my opinion. Plus, I learned a lot about the Js 'chain' processing stages (if that makes sense), and I managed to get what I intended in the first place.

Another issue that I got on production was the **CORS** (Cross-Origin Resource Sharing) issue when trying to download the QR picture generated. This is the issue I got in the console:

```
Reason: CORS header 'Access-Control-Allow-Origin' missing
```

I tried several approaches to solve it, but most of them required [server access](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin?utm_source=devtools&utm_medium=firefox-cors-errors&utm_campaign=default) to overcome it, which was not possible in my case.

Luckily, I managed to sort it out by fetching the image data, creating a Blob URL to download it, and revoking the Blob URL to free up memory. This approach avoids CORS issues without requiring any server modifications.

[Click here](https://gregorim04.github.io/QR-generator/) to try the final result on the live site.