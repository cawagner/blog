{{{
    "title" : "RIFF: The Once and Future Container Format",
    "tags"  : [ javascript", "history", "riff" ],
    "category" : "Affronts to God",
    "date" : "10-29-2013"
}}}

Since long before the WWW was "a thing," there has been a demand to be able to structure various types of
data without reinventing the wheel each time. Some, like JSON and YAML, have been geared toward data structures.
XML and SGML for text. What about data that doesn't fit so neatly into those categories? One popular solution is a [container format](http://en.wikipedia.org/wiki/Digital_container_format), and one popular container format is RIFF.

The RIFF specification was published by Microsoft in 1991, and it is almost entirely identical to IFF, a
format specified by Electronic Arts in 1985. The only difference between the two formats is the endian-ness,
since IFF was commonly used on big-endian platforms like the Amiga as opposed to the little-endian Intel
platforms that Windows ran on.

Over the years, it's proven itself a simple, yet versatile way to structure the sorts of data that
stubbornly refuse to be represented as text -- images, sounds, videos, etc.
WAV and AVI files are very common and are both stored inside RIFF containers.
New formats are still appearing: Google's WEBP format is one of the more popular examples in the last few years.

## Structure of a RIFF File

A RIFF file is comprised of a series of "chunks," inside of one special top-level `RIFF` chunk that contains all the other chunks as its data.

Every chunk begins with a tag identifying the type of the chunk's contents, followed by the length of the chunk's
contents in bytes as a 32-bit integer, followed by the contents of the chunk. If the chunk's length is uneven, a
padding byte is inserted after the chunk's data. Each tag is a [FourCC](http://en.wikipedia.org/wiki/Fourcc) -- a
series of four ASCII characters. This makes it the same size as a 32-bit integer, so developers can work with the
tag as an integer, which can often be both more efficient and easier to work with: in C, for example, you can
`switch` over an int, but not over a `char[]`.

Generally, each individual type of RIFF file can define what each chunk tag means, so it's not possible to
write an &uuml;ber-parser that can handle all types of data in RIFF containers. But the fact that the data is
structured in a consistent way means that it's possible to effectively write the "parser" once, then just set up
different handlers for each type of chunk it runs into while reading the file.

There are a few special chunk types that are common to most RIFF files. `LIST` chunks are the only type of chunk
allowed to contain subchunks (including other `LIST` chunks), except for the top-level `RIFF` chunk. The content of a `LIST` chunk starts with a 4-byte "list type" tag, and continues with all of the subchunks inside the `LIST`.
A `LIST` chunk with a list type of `INFO` can contain metadata about the RIFF file.

## The Glorious Future

You may be wondering why I'm giving an overview of an easily Google-able format. This is the lead-up to a future
post. In the conclusion to this series, we'll do something horrible. We'll use JavaScript to spit out WAV
files in-memory and play them using the HTML5 audio API.