# wa-craft/plugin

wa-craft plugins' directory.
Every particular plugin have 3 directories:
- handler: applications to proceed templates
- resource: an original structure of the plugin codes
- template: templates

## command-line: plugins for command-line applications
path pattern:
`{$langauge}/{default | $library}`

## frontend: plugins for frontend (client side) applications
path pattern:
`{$langauge}/{$framework[$version]}[-$mod]`

## backend: plugins for backend (server side) applications
path pattern:
`{$langauge}/{$framework[$version]}[-$library[$library_version]]`

## operation: plugins for operation services
path pattern:
`{$catalog}/{$service[$version]}`