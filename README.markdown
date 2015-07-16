# Unpublished Filter

This Symphony extension greyes out unpuplished entries in the publish index tables based on field values. It supports two kind of fields:

1. A field named `published` with the values `Yes` or `No` (where all values that are not `Yes` are used to find unpublished entries).
2. A field names `status` with values like `published` or `activated` (where all other values are used find unpublished entries).

It doesn't matter which field type you use, the extension just matches text values so you can either use select boxes, text fields or what ever field suits you best. When looking for unpublished entries, the extensions checks the English keywords mentioned above and their translations if your system is localised: so, for example, if your using Symphony in German, you could name your field `Status` and use values like `veröffentlicht` or `Entwurf`.

## Publish dates

As of version 2.1, this extension also checks for the existence of a publish date and marks and greyes out future entries additionally (using `date` or `publish date` as keywords). This only happens when the index table contains a publish status and it only works in conjuction with Date and Time fields so far (version 3.2+ required).

As of version 2.3, this extension also parses date ranges. Date filtering can now be disabled in the configuration.

# Acknowledgement

Entypo pictograms by [Daniel Bruce](http://www.entypo.com).  
Unpublished Filter uses [Moment.js](http://momentjs.com) for date parsing.
