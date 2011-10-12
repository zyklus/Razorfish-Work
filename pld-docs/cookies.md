# Cookies

Cookies provide a way of storing small amounts of data on the client's browser.  Their usage is fairly straight-foward, but there are a few common issues:

- The maximum total length of all the cookies for a given domain is 4,000 characters (or just under 4KB).  If you go beyond this, you will start to lose data.
    - Because of this limitation, if you absolutely need to store a large amount of data it is often better to store a single delimited cookie instead of multiple cookies, e.g. `key=val,val2,val3` instead of three `key=val` cookies.
- In many circumstances you can, and often should, use a very small number of cookies.  Store most of your client data in a server-side session variable or in a database.  Pass along only a unique key to the cookie that you will later use to identify the client and retrieve the rest of the information.  There are no data limits in this case.
    - The exception to this is for 3rd party tracking, etc. services that use their own cookies.