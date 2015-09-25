# Unpublished Filter

This Symphony extension greyes out unpuplished entries in the publish index tables based on field values. It supports status fields with toggle values (`yes`/`no`), with descriptive values (`published`/`activated` …) and dates.

It doesn't matter which field type you use, the extension just matches text values so you can either use select boxes, text fields or what ever field suits you best.

## Supported field names and values

Field names:

- **text based:** `status`, `published`, `veröffentlicht`, `état`, `publié`, `pubblicato`
- **date based:** `date`, `publish date`, `Datum`, `Veröffentlichungsdatum`, `Zeitraum`, `Anzeigezeitraum`

Field values:

- `yes`, `published`, `activated`, `enabled`, `visible`, `open`, `ja`, `veröffentlicht`, `aktiviert`, `freigeschaltet`, `offen`, `sichtbar`, `publié`, `oui`, `pubblicato`

## Adding language support

Due to the fact [that the extension cannot determine the content language based on the system language](https://github.com/symphonists/unpublishedfilter/issues/8#issuecomment-143148291), localised strings are hardcoded. If you'd like to add more field names or values, [check out the definitions in the script file](https://github.com/symphonists/unpublishedfilter/blob/master/assets/unpublishedfilter.publish.js#L11-L16).

## Publish dates

Filtering by publish dates only works in cunjuction with the [Date and Time field](https://github.com/hananils/datetime). Date filtering can be disabled in the configuration.

# Acknowledgement

Entypo pictograms by [Daniel Bruce](http://www.entypo.com).
