# Video

## Formats

There is one thing that should be made clear when talking about video formats.  There are video `containers` and there are video `codecs`.  A `container` is the video file itself, e.g. an `.avi`, `.mov`, `.mp4`, `.flv`, etc.  A `codec` describes _how_ the video in that file is encoded.  For the most part, when you are _serving_ video content, you only have to worry about the `container`.  When you are _encoding_ video content, you care more about the `codec` as it has a direct effect on which browsers/devices will be able to play back your video.

## Containers

### FLV
Flash video, the `.flv` container, is still the de-facto video format for web-content.  `.flv`s can be in numerous codecs, but as the [Flash Player][flash] has all necessary codecs, you do not need to worry about which codec is used and can generally encode in the best one available [TODO: note on multiple video streams]

### MP4
As many mobile devices (Notably iOS devices) do not support `.flv` video, `.mp4` video must be used if you wish to support mobile devices.  In addition, many desktop browsers (such as Chrome, Firefox and Safari) now support mp4 video, negating the requirement to have flash installed in these browsers.

The `mp4` container almost always wraps an `h264` (or `x264` is the open source version of the same codec) codec.  This codec supports numerous encoding levels and the general rule is that the higher the compression the more powerful the computer playing it needs to be.

As far as iOS (iPhone, iPad, iPods, etc) and android devices go, all modern phones / tablets will support most versions of the `h264` codec.  You will only really run into issues if you turn on just about every encoding option available.

If you need to support iPods, however, such as for podcasts, older iPods do not support nearly the same `h264` level as other devices so you will need to account for this when encoding your video.

---

## Encoding

### Encoding FLV
Generally, an FLV should be encoded using the on2VP6 codec, the Sorenson Spark codec, or similar.  FLV files also support the h264 codec, but there can be performance and compatibility issues in some circumstances, so VP6 and Spark are the recommended codecs.

An ideal solution for encoding FLV files is Adobe Media Encoder, which is generally shipped with Adobe video tools, and sometimes Photoshop.  A demo of Adobe Media Encoder for Windows may be downloaded here:

http://www.adobe.com/support/downloads/product.jsp?product=160&platform=Windows

For Mac:

http://www.adobe.com/support/downloads/product.jsp?platform=Macintosh&product=160

Adobe Media Encoder produces high quality, low file-size videos, and is probably the easiest solution to use when it comes to encoding FLV video.

If, for some reason, Adobe Media Encoder is not a viable option, there are highly reliable freeware options for both Mac and PC, though they are much more complex to use than Adobe Media Encoder.

For Windows, there is ffdshow - a multiple codec encoder/decoder.

http://ffdshow-tryout.sourceforge.net

For Mac, there is ffmpegX - a freeware video encoder built on the same base as ffdshow. There are many guides on the site for encoding with different requirements.

http://www.ffmpegx.com/

In a pinch, you can upload a video to youtube (provided it's in a format youtube supports), and youtube will convert it to flv automatically.
********


### Encoding mp4

[Handbrake] is an excellent open-source `mp4`/`h264` video encoder.  It has presets for various devices such as the iPad & iPhone and in general can encode videos with one-click.

In most cases, you will want to make sure the `Web Optimized` box is checked in Handbrake.  This optiom makes sure that the important information is included at the beginning of the video file and allows videos to be easily streamed from a server to a device / browser.

Without this option checked, some devices / browsers will need to download the entire video file before they can start to play it.

---

## Serving

[flash]: http://flash
[Handbrake]: http://handbrake
[node-handbrake]: http://node-handbrake