## How to make Chrome to proxy your localhost requests

- https://www.whitesmith.co/blog/a-note-about-chrome-and-proxying-requests-to-localhost/
- https://stackoverflow.com/questions/60821841/chrome-option-proxy-bypass-list-loopback-is-not-working

Since 2018, the chromium engine implicitly bypasses localhost when proxying requests.

So to make it possible you should run chrome with `--proxy-bypass-list=<-loopback>` flag.

Working example: `google-chrome --ignore-certificate-errors --proxy-bypass-list="<-loopback>" --proxy-server=http://localhost:8080`. As a proxy you can use mitmproxy.

## Prevent caching in browser

Open Dev Tools, Settings / Disable caching.