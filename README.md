# Ember helpers

### Block helper
This helper is equalivant to a block inside the Twig templating language. It it very useful if you want to alter a
template outside another template.

Example: http://jsbin.com/yepube

#### Usage

The first definition of a block will be the placeholder.
```
// application.hbs
{{#block "name"}}
  <span>Default application.hbs section</span>
{{/block}}
```

Any subsequent definitions will be replacements for the placeholder
```
// users/index.hbs
{{#block "name"}}
  <span>We override the "name" block inside application.hbs!</span>
{{/block}}
```

More info about this coming soon!
