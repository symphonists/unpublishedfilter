# Unpublished Filter

This Symphony extension greyes out unpuplished entries in the publish index tables based on field values. It supports two kind of fields:

1. A field named `published` with the values `Yes` or `No` (where `No` is used to find unpublished entries).
2. A field names `status` with values like `published`, `draft` etc. (where all values not equal to `published` are used find unpublished entries).

It doesn't matter which field type you use, the extension just matches text values so you can either use select boxes, text fields or what ever field suits you best. When looking for unpublished entries, the extensions checks the English keywords mentioned above and their translations if your system is localised: so, for example, if your using Symphony in German, you could name your field `Status` and use values like `veröffentlicht` or `Entwurf`.
